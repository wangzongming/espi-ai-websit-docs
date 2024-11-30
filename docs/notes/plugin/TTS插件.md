---
title: TTS 插件开发
createTime: 2024/11/7 21:06:45
permalink: /plugin/tts/
---

## 流程图
由于和 LLM 流程完全一致，所以这里直接引用 LLM 插件流程图。

<div style="background:#fff;padding: 32px;text-align:center;border-radius: 32px;">
  <img src="/images/llm-plugin.png" width="80%" />
</div>

## TS描述

```typescript
type Args = {
    // 设备id
    device_id: string,
    // 待 TTS 的文字
    text： string,           
    // 日志输出等级，为0时不应该输出任何日志
    devLog: number,
    // 用户配置的 apikey 等信息
    tts_config: object,
    // 用户配置的 tts 服务
    tts_server: string,
    // 用户配置的 iat 服务
    iat_server: string,  
    // 连接服务逻辑开始前需要调用这个方法告诉框架
    connectServerBeforeCb: () => void,
    // 连接服务后需要调用这个方法告诉框架
    connectServerCb: (status: boolean) => void,
    // TTS 服务返回音频数据时调用
    cb: ({ audio: 音频base64, ... }) => void,
    // 与服务之间发生错误时调用，并且传入错误说明
    llmServerErrorCb: (error: string) => void,
    // 用户配置的设置 TTS 参数的函数
    tts_params_set: Function,
    // 将 ws 服务回传给框架
    logWSServer: (ws: { close: () => void }) => void, 
    // 日志输出对象
    log: {
        error: (msg: string) => void,
        info: (msg: string) => void,
        llm_info: (msg: string) => void
    }
}

// 插件 TS 描述
type Plugin = {
    name: string;               // 插件名称  
    type:"LLM" | "TTS" | "IAT"; // 插件类型 LLM | TTS | IAT
    main(arg: Args): void;      // 逻辑体
}
``` 




## 视频教程

录制中...
<!-- @[bilibili](BV1EZ42187Hg) -->

## 案例代码

下面提供`火山引擎TTS`请求案例。

```js
module.exports = {
    // 插件名字
    name: "esp-ai-plugin-tts-test",
    // 插件类型 LLM | TTS | IAT
    type: "TTS", 
    main({ device_id, text, devLog, tts_config, logWSServer, tts_params_set, cb, log, ttsServerErrorCb, connectServerCb, connectServerBeforeCb, log }) {
        try {
            const { appid, accessToken, appConfig, ...other_config } = tts_config;
            if (!accessToken) return log.error(`请配给 TTS 配置 accessToken 参数。`)
            if (!appid) return log.error(`请配给 TTS 配置 appid 参数。`)

            const host = "openspeech.bytedance.com";
            const api_url = `wss://${host}/api/v1/tts/ws_binary`;
            const default_header = Buffer.from([0x11, 0x10, 0x11, 0x00]);
            const audio_config = {
                voice_type: "BV001_streaming",
                rate: 16000,  
                speed_ratio: 1.0,
                pitch_ratio: 1.0,
                ...other_config, 
                encoding: "mp3", 
            }
            const request_json = {
                app: {
                    cluster: "volcano_tts",
                    ...appConfig,
                    appid: appid,
                    token: accessToken,
                },
                user: {
                    uid: device_id
                },
                audio: tts_params_set ? tts_params_set(audio_config) : audio_config,
                request: {
                    reqid: uuidv4(),
                    text: text,
                    text_type: "plain",
                    operation: "submit"
                }
            };


            return new Promise((resolve) => {
                const submit_request_json = JSON.parse(JSON.stringify(request_json));
                let payload_bytes = Buffer.from(JSON.stringify(submit_request_json));
                payload_bytes = zlib.gzipSync(payload_bytes);  // if no compression, comment this line
                const full_client_request = Buffer.concat([default_header, Buffer.alloc(4), payload_bytes]);
                full_client_request.writeUInt32BE(payload_bytes.length, 4);
                
                connectServerBeforeCb();
                const curTTSWs = new WebSocket(api_url, { headers: { "Authorization": `Bearer; ${accessToken}` }, perMessageDeflate: false });
                logWSServer(curTTSWs)

                // 连接建立完毕，读取数据进行识别
                curTTSWs.on('open', () => {
                    connectServerCb(true);
                    devLog && log.tts_info("-> 火山引擎 TTS 服务连接成功！")
                    send()
                })

                curTTSWs.on('message', (res, err) => {
                    if (err) {
                        console.log('tts message error: ' + err)
                        return
                    }
                    // const protocol_version = res[0] >> 4;
                    const header_size = res[0] & 0x0f;
                    const message_type = res[1] >> 4;
                    const message_type_specific_flags = res[1] & 0x0f;
                    // const serialization_method = res[2] >> 4;
                    const message_compression = res[2] & 0x0f;
                    let payload = res.slice(header_size * 4);
                    let done = false;
                    if (message_type === 0xb) {  // audio-only server response
                        if (message_type_specific_flags === 0) {  // no sequence number as ACK
                            // console.log("                Payload size: 0");
                            return false;
                        } else {
                            const sequence_number = payload.readInt32BE(0);
                            payload = payload.slice(8);

                            done = sequence_number < 0;
                        }
                    } else if (message_type === 0xf) {
                        const code = payload.readUInt32BE(0);
                        const msg_size = payload.readUInt32BE(4);
                        let error_msg = payload.slice(8);
                        if (message_compression === 1) {
                            error_msg = zlib.gunzipSync(error_msg);
                        }
                        error_msg = error_msg.toString('utf-8');
                        console.log(`          Error message code: ${code}`);
                        console.log(`          Error message size: ${msg_size} bytes`);
                        console.log(`                  Error data: ${JSON.stringify(request_json, null, 4)}`);
                        console.log(`               Error message: ${error_msg}`);

                        ttsServerErrorCb(`火山 TTS 接口返回错误 ${res.code}: ${res.message} ${error_msg}`)
                        curTTSWs.close()
                        connectServerCb(false);
                        resolve(false);
                        return
                    } else if (message_type === 0xc) {
                        payload = payload.slice(4);
                        if (message_compression === 1) {
                            payload = zlib.gunzipSync(payload);
                        }
                        log.tts_info(`            Frontend message: ${payload}`);
                    } else {
                        log.tts_info("undefined message type!");
                        done = true;
                    }

                    cb({
                        // 根据服务控制
                        is_over: done,
                        audio: payload,

                        // 固定写法
                        resolve: resolve,
                        ws: curTTSWs,
                    });


                })

                // 连接错误
                curTTSWs.on('error', (err) => {
                    ttsServerErrorCb("websocket connect err: " + err)
                    connectServerCb(false);
                    resolve(false);
                })
                // 传输数据
                function send() {
                    curTTSWs && curTTSWs.send(full_client_request);
                }

            })
        } catch (err) {
            connectServerCb(false);
            log.error(`火山 TTS 错误： ${err}`)
        }
    }
}
```
---
title: IAT/ASR 插件开发
createTime: 2024/11/7 21:06:45
permalink: /plugin/iat/
---

## 流程图
由于和 LLM 流程完全一致，所以这里直接引用 LLM 插件流程图。

<div style="background:#fff;padding: 32px;text-align:center;border-radius: 32px;">
  <img src="/images/llm-plugin.png" width="80%" />
</div>

## TS描述

```typescript
type Args = {
    // 设备ID
    device_id: string;
    // 会话ID
    session_id: string;
    // 日志输出等级，为0时不应该输出任何日志
    devLog: number;
    // 用户配置的 apikey 等信息
    iat_config: object;
    // 用户配置的 iat 服务
    iat_server: string;
    // 用户配置的 llm 服务
    llm_server: string;
    // 用户配置的 tts 服务
    tts_server: string;
    // 将 ws 服务回传给框架
    logWSServer: (ws: { close: () => void }) => void;
    // 与 TTS 服务之间发生错误时调用，并且传入错误说明
    iatServerErrorCb: (error: string) => void;
    // IAT 识别的结果调用这个方法回传给框架
    cb: (result: { text: string }) => void;
    // 记录发送音频数据给服务的函数
    logSendAudio: Function;
    // 连接 IAT 服务逻辑开始前需要调用这个方法告诉框架
    connectServerBeforeCb: () => void;
    // 连接 IAT 服务后需要调用这个方法告诉框架
    connectServerCb: (status: boolean) => void;
    // 当 IAT 服务连接成功了，但是长时间不响应时
    serverTimeOutCb: Function;
    // iat 静默时间达到后触发，一般在这里面进行最后一帧的发送，告诉服务端结束识别
    iatEndQueueCb: Function;
    // 日志输出对象
    log: {
        error: (msg: string) => void;
        info: (msg: string) => void;
        iat_info: (msg: string) => void;
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

下面提供`讯飞IAT`请求案例。

```js
module.exports = {
    // 插件名字
    name: "esp-ai-plugin-iat-test",
    // 插件类型 LLM | TTS | IAT
    type: "IAT", 
    main({ ddevice_id, session_id, log, devLog, iat_config, iat_server, llm_server, tts_server, cb, iatServerErrorCb, logWSServer, logSendAudio, connectServerCb, connectServerBeforeCb, serverTimeOutCb, iatEndQueueCb }) {
        try {
            const { appid, apiSecret, apiKey, ...other_config } = iat_config;
            if (!apiKey) return log.error(`请配给 IAT 配置 apiKey 参数。`)
            if (!apiSecret) return log.error(`请配给 IAT 配置 apiSecret 参数。`)
            if (!appid) return log.error(`请配给 IAT 配置 appid 参数。`)

            // 如果关闭后 message 还没有被关闭，需要定义一个标志控制
            let shouldClose = false;

            // 长时间无反应时应该自动关闭
            // let close_connect_timer = null;

            // console.log('开始连接 IAT 服务...')
            const iatResult = [];
            connectServerBeforeCb();
            const iat_ws = new WebSocket(getServerURL("IAT", { iat_server, llm_server, tts_server, appid, apiSecret, apiKey }))
            logWSServer({
                close: () => {
                    shouldClose = true;
                    log.t_red_info('框架调用 IAT 关闭:' + session_id);
                    // clearTimeout(close_connect_timer);
                    iat_ws.close() 
                }
            });

            // 讯飞 IAT 帧定义
            const XF_IAT_FRAME = {
                STATUS_FIRST_FRAME: 0,
                STATUS_CONTINUE_FRAME: 1,
                STATUS_LAST_FRAME: 2
            }
            let iat_server_connected = false;
            let iat_status = XF_IAT_FRAME.STATUS_FIRST_FRAME;

            // 连接建立完毕，读取数据进行识别
            iat_ws.on('open', (event) => {
                if(shouldClose) return;
                devLog && log.iat_info("-> 讯飞 IAT 服务连接成功: " + session_id)
                iat_server_connected = true;
                connectServerCb(true);

                // clearTimeout(close_connect_timer);
                // close_connect_timer = setTimeout(() => {
                //     // serverTimeOutCb();
                // }, 8000);
            })

            // 当达到静默时间后会自动执行这个任务
            iatEndQueueCb(() => {
                if(shouldClose) return;
                // clearTimeout(close_connect_timer);
                if (iat_server_connected && send_pcm) {
                    iat_status = XF_IAT_FRAME.STATUS_LAST_FRAME;
                    send_pcm("");
                }
            })

            let realStr = "";
            // 得到识别结果后进行处理，仅供参考，具体业务具体对待
            iat_ws.on('message', (data, err) => {
                if(shouldClose) return;
                // clearTimeout(close_connect_timer);
                if (err) {
                    log.iat_info(`err:${err}`)
                    return
                }

                res = JSON.parse(data)
                if (res.code != 0) {
                    log.iat_info(`error code ${res.code}, reason ${res.message}`)
                    return
                }

                let str = ""
                if (res.data.status == 2) {
                    iat_ws.close();

                    iat_server_connected = false;
                    connectServerCb(false);

                    // res.data.status ==2 说明数据全部返回完毕，可以关闭连接，释放资源 
                    currentSid = res.sid
                    iatResult.forEach(i => {
                        if (i != null) {
                            i.ws.forEach(j => {
                                j.cw.forEach(k => {
                                    realStr += k.w;
                                })
                            })
                        }
                    })

                    devLog && log.iat_info(`-> 最终识别结果：${realStr}`)
                    cb({ text: realStr, device_id });
                    return;
                } else {
                    str += "-> 中间识别结果"
                }
                iatResult[res.data.result.sn] = res.data.result
                if (res.data.result.pgs == 'rpl') {
                    res.data.result.rg.forEach(i => {
                        iatResult[i] = null
                    })
                    str += "【动态修正】"
                }
                str += "："
                iatResult.forEach(i => {
                    if (i != null) {
                        i.ws.forEach(j => {
                            j.cw.forEach(k => {
                                str += k.w
                            })
                        })
                    }
                })  
                devLog && log.iat_info(str)
            })

            // 资源释放
            iat_ws.on('close', () => {
                if(shouldClose) return;
                devLog && log.iat_info("-> 讯飞 IAT 服务已关闭：", session_id)
                // clearTimeout(close_connect_timer);
                iat_server_connected = false;
                connectServerCb(false);
            })

            // 建连错误
            iat_ws.on('error', (err) => {
                if(shouldClose) return;
                // clearTimeout(close_connect_timer);
                iatServerErrorCb(err);
                iat_server_connected = false;
                connectServerCb(false);
            })


            function send_pcm(data) {
                if(shouldClose) return;
                if (!iat_server_connected) return;
                let frame = "";
                let frameDataSection = {
                    "status": iat_status, 
                    "format": "audio/L16;rate=16000",
                    "audio": data.toString('base64'),
                    "encoding": "raw", 
                    
                }
                switch (iat_status) {
                    case XF_IAT_FRAME.STATUS_FIRST_FRAME:
                        frame = {
                            // 填充common
                            common: {
                                app_id: appid
                            },
                            // 填充business
                            business: {
                                vad_eos: 2500,
                                language: "zh_cn",
                                domain: "iat",
                                accent: "mandarin",
                                dwa: "wpgs", // 可选参数，动态修正
                                ...other_config,
                            },
                            //填充data
                            data: frameDataSection
                        }
                        if (other_config.dwa === false) {
                            delete frame.business.dwa;
                        }
                        iat_status = XF_IAT_FRAME.STATUS_CONTINUE_FRAME;
                        break;
                    case XF_IAT_FRAME.STATUS_CONTINUE_FRAME:
                    case XF_IAT_FRAME.STATUS_LAST_FRAME:
                        //填充frame
                        frame = {
                            data: frameDataSection
                        }
                        break;
                }
                iat_ws.send(JSON.stringify(frame))
            }

            logSendAudio(send_pcm)
        } catch (err) {
            connectServerCb(false);
            console.log(err);
            log.error("讯飞 IAT 插件错误：", err)
        }
    }
}
```
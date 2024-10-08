# Plugin Development

When you need to use internal or local large language models or speech services, you will need to develop specialized plugins.

There are three types of plugins: `LLM`, `TTS`, and `IAT`. Each type of plugin will receive different parameters provided by the framework and will communicate with the framework by invoking methods with these parameters.

## Required Conventions

1. LLM plugin names must be in the format `esp-ai-plugin-llm-xxx`.
2. TTS plugin names must be in the format `esp-ai-plugin-tts-xxx`.
3. IAT plugin names must be in the format `esp-ai-plugin-iat-xxx`.
4. For plugins to be published externally, the following keywords must be added to the `package.json` in the plugin directory, otherwise, they will not be automatically included.
```json
{
    "keywords": ["esp-ai-plugin", "esp-ai-plugin-llm"]
}
```

## Getting Started Guide

The basic structure of LLM, TTS, and IAT plugins is as follows:

```javascript
const config = {
     plugins: [
        {
            name: 'esp-ai-plugin-llm-test', // Plugin name  
            type: "LLM", // Plugin type: LLM | TTS | IAT
            main(arg) {
                // Plugin logic
            }
        }
     ]
}
```

To maintain code standards, it is of course not directly written into the plugins array. Therefore, the normal steps to create a plugin are as follows:

1. Create a plugin folder `esp-ai-plugin-llm-test`.
2. Add a `package.json` file.
```json
{
  "name": "esp-ai-plugin-llm-example",
  "keywords": ["esp-ai-plugin", "esp-ai-plugin-llm"],
  "version": "0.0.2",
  "description": "ESP-AI LLM Plugin Example | ESP-AI LLM Plugin Development Example",
  "main": "index.js"
}
```
3. Add an `index.js` file and write your logic.
```javascript
module.exports = {
    name: 'esp-ai-plugin-llm-test', // Plugin name  
    type: "LLM", // Plugin type: LLM | TTS | IAT
    main(arg) {
        // Plugin logic
    }
}
```
4. Publish to `npm` (skip this step for private plugins).

You can find publishing tutorials online.
```
npm publish
```

5. Plugin Inclusion

After the plugin is published to `npm`, the framework will automatically include it, and other users can search for it using keywords on `npm`, or see it directly in the `ESP-AI` plugin marketplace.
## LLM 插件

下面提供演示代码，自行根据业务进行修改即可。

``` javascript
/**
 * esp-ai LLM 插件开发
 * 
 * 演示请求流式返回的 LLM 服务
*/
module.exports = {
    // 插件名字
    name: "esp-ai-plugin-llm-example",
    // 插件类型 LLM | TTS | IAT
    type: "LLM",
    /**
     * 大语言模型插件
     * @param {String}      device_id           设备id 
     * @param {Number}      devLog              日志输出等级，为0时不应该输出任何日志   
     * @param {Object}      llm_config          用户配置的 apikey 等信息   
     * @param {String}      iat_server          用户配置的 iat 服务 
     * @param {String}      llm_server          用户配置的 llm 服务 
     * @param {String}      tts_server          用户配置的 tts 服务 
     * @param {String}      text                对话文本
     * @param {Function}    cb                  LLM 服务返回音频数据时调用，eg: cb({ text, texts })
     * @param {Function}    llmServerErrorCb    与 LLM 服务之间发生错误时调用，并且传入错误说明，eg: llmServerErrorCb("意外错误")
     * @param {Function}    llm_params_set      用户配置的设置 LLM 参数的函数
     * @param {Function}    logWSServer         将 ws 服务回传给框架，如果不是ws服务可以这么写: logWSServer({ close: ()=> {  中断逻辑... } })
     * @param {{role, content}[]}  llm_init_messages   用户配置的初始化时的对话数据
     * @param {{role, content}[]}  llm_historys llm 历史对话数据
     * @param {Function}    log                 为保证日志输出的一致性，请使用 log 对象进行日志输出，eg: log.error("错误信息")、log.info("普通信息")、log.llm_info("llm 专属信息")
     *  
    */
    main({ devLog, device_id, llm_config, text, llmServerErrorCb, llm_init_messages = [], llm_historys = [], cb, llm_params_set, logWSServer }) {

        devLog && console.log("对话记录：\n", llm_historys)

        // 请自行约定接口 key 需要配置什么字段
        const { apiKey, epId, ...other_config } = llm_config;

        // 连接 ws 服务后并且上报给框架
        // const llm_ws = new WebSocket("ws://xxx");
        // logWSServer(llm_ws)

        // 如果关闭后 message 还没有被关闭，需要定义一个标志控制
        let shouldClose = false;
        /**
         * 这个变量是固定写法，需要回传给 cb()
         * 具体需要怎么更改见下面逻辑
        */
        const texts = {
            all_text: "",
            count_text: "",
            index: 0,
        }

        // 模拟服务返回的数据
        function moniServer(cb) {
            const moni_data = [
                "你好,",
                "有什么我可以帮您的？",
                "请尽管吩咐！",
            ];

            function reData() {
                // 如果你不能保证 你的 close 方法能够打断推理，那就必须加这个判断
                if (shouldClose) break; 
                const res_text = moni_data.splice(0, 1);
                cb(res_text[0], moni_data.length);
                moni_data.length && setTimeout(reData, 1000);
            }
            reData();
        }


        // 请求llm服务的参数, 将对话信息给到参数中
        const r_params = {
            "model": config.llm,
            "messages": [
                ...llm_init_messages,
                ...llm_historys,
                {
                    "role": "user", "content": text
                },
            ]
        };
        // 根据接口需求自行给接口
        const body = JSON.stringify(llm_params_set ? llm_params_set(r_params) : r_params);

        moniServer((chunk_text, length) => {
            devLog && console.log('LLM 输出 ：', chunk_text);
            texts["count_text"] += chunk_text;
            cb({ text, texts, is_over: length === 0 })
        })
    }
}

```

## TTS 插件

下面提供演示代码，自行根据业务进行修改即可。
  
由于海豚配音不是流式返回的，所以代码中先获取完整的音频数据，然后再返回流数据到客户端。这是一个不错的实践案例，如`LLM`、`IAT`等服务也不是返回流式的，也可以参照这个案例。



``` javascript

const { PassThrough } = require('stream');
const https = require('https');


function wavUrlToStream(url) {
    const stream = new PassThrough();

    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            stream.emit('error', new Error(`Request failed with status code ${response.statusCode}`));
            return;
        }

        response.pipe(stream);
    }).on('error', (err) => {
        stream.emit('error', err);
    });

    return stream;
}

/**
 * esp-ai TTS 插件开发
 * 
 * 演示请求海豚配音服务，并且流式返回到客户端
*/
module.exports = {
    // 插件名字
    name: "esp-ai-plugin-tts-ttson",
    // 插件类型 LLM | TTS | IAT
    type: "TTS",
   
    /**
     * TTS 插件封装 - 火山引擎 TTS 
     * @param {String}      device_id           设备ID   
     * @param {String}      text                待播报的文本   
     * @param {Object}      tts_config          用户配置的 apikey 等信息    
     * @param {String}      iat_server          用户配置的 iat 服务 
     * @param {String}      llm_server          用户配置的 llm 服务 
     * @param {String}      tts_server          用户配置的 tts 服务 
     * @param {Number}      devLog              日志输出等级，为0时不应该输出任何日志   
     * @param {Function}    tts_params_set      用户自定义传输给 TTS 服务的参数，eg: tts_params_set(参数体)
     * @param {Function}    logWSServer         将 ws 服务回传给框架，如果不是ws服务可以这么写: logWSServer({ close: ()=> { 中断逻辑...  }  })
     * @param {Function}    ttsServerErrorCb    与 TTS 服务之间发生错误时调用，并且传入错误说明，eg: ttsServerErrorCb("意外错误")
     * @param {Function}    cb                  TTS 服务返回音频数据时调用，eg: cb({ audio: 音频base64, ... })
     * @param {Function}    log                 为保证日志输出的一致性，请使用 log 对象进行日志输出，eg: log.error("错误信息")、log.info("普通信息")、log.tts_info("tts 专属信息")
    */
    main({device_id, text, devLog, tts_config, logWSServer, tts_params_set, cb, log, ttsServerErrorCb }) {
        // other_config 一般就是其他配置，比如在 tts里面可能是音色等
        const { token, ...other_config } = tts_config;  

        const url = `https://u95167-bd74-2aef8085.westx.seetacloud.com:8443/flashsummary/tts?token=${token}`;
        let language = "ZH";

        if (/[a-zA-Z]/.test(text)) {
            language = "auto";
        }

        const _payload = {
            voice_id: 1683,
            text: text,
            format: "wav",
            to_lang: language,
            auto_translate: 0,
            voice_speed: "0%",
            speed_factor: 1,
            rate: "1.0",
            client_ip: "ACGN",
            emotion: 1,
            volume_change_dB: 4,
            zip_level: 4, // 16k
            // zip_level: 5, // 24k
        }
        const payload = JSON.stringify(tts_params_set ? tts_params_set(_payload) : _payload);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
        };

        const getAR = () => {
            return new Promise((resolve, reject) => {
                const req = https.request(url, options, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        if (res.statusCode !== 200) {
                            console.error(`Error: ${res.statusCode}`);
                            reject(null);
                        } else {
                            const responseJson = JSON.parse(data);
                            resolve(`${responseJson.url}:${responseJson.port}/flashsummary/retrieveFileData?stream=True&token=${config.token}&voice_audio_path=${responseJson.voice_path}`);
                        }
                    });
                });
                req.on('error', (e) => {
                    console.error(`Error fetching audio URL: ${e.message}`);
                    reject(null);
                });

                req.write(payload);
                req.end();
            })
        }


        return new Promise(async (resolve) => { 
            const ar = await getAR();

            if (ar) {
                // devLog && log.tts_info("音频地址：", ar);
 
                const wavStream = wavUrlToStream(ar);
                logWSServer(wavStream)
 

                devLog && log.tts_info("-> tts服务连接成功！")
                wavStream.on('data', (chunk) => {
                    // log.tts_info(`Received ${chunk.length} bytes of data.`);
                    //     let audioBuf = Buffer.from(audio, 'base64')
                    cb({
                        // 根据服务控制
                        is_over: false,
                        audio: chunk,

                        // 固定写法
                        resolve: resolve,
                        ws: wavStream
                    });
                });
                wavStream.on('end', () => { 
                    cb({
                        // 根据服务控制
                        is_over: true,
                        audio: "",
                        // 固定写法
                        resolve: resolve,
                        ws: wavStream
                    });
                });
                wavStream.on('error', (err) => {
                    log.error(`Stream error: ${err.message}`);
                });

            } else { 
                curTTSWs.close()
                ttsServerErrorCb(`tts错误 ${res.code}: ${res.message}`) 
                resolve(false);

            }

        })
    }
}

```
## IAT 插件

下面提供演示代码，自行根据业务进行修改即可。

``` javascript
/**
 * esp-ai IAT 插件开发 
*/
module.exports = {
    // 插件名字
    name: "esp-ai-plugin-iat-example",
    // 插件类型 LLM | TTS | IAT
    type: "IAT",
    /**
     * 讯飞语音识别  
     * @param {String}      device_id           设备ID    
     * @param {Number}      devLog              日志输出等级，为0时不应该输出任何日志   
     * @param {Object}      iat_config          用户配置的 apikey 等信息   
     * @param {String}      iat_server          用户配置的 iat 服务 
     * @param {String}      llm_server          用户配置的 llm 服务 
     * @param {String}      tts_server          用户配置的 tts 服务 
     * @param {Function}    logWSServer         将 ws 服务回传给框架，如果不是ws服务可以这么写: logWSServer({ close: ()=> {} })
     * @param {Function}    iatServerErrorCb    与 TTS 服务之间发生错误时调用，并且传入错误说明，eg: ttsServerErrorCb("意外错误") 
     * @param {Function}    cb                  IAT 识别的结果调用这个方法回传给框架 eg: cb({ text: "我是语音识别结果"  })
     * @param {Function}    logSendAudio        记录发送音频数据给服务的函数，框架在合适的情况下会进行调用
     * @param {Function}    connectServerBeforeCb 连接 iat 服务逻辑开始前需要调用这个方法告诉框架：eg: connectServerBeforeCb()
     * @param {Function}    connectServerCb     连接 iat 服务后需要调用这个方法告诉框架：eg: connectServerCb(true)
     * @param {Function}    serverTimeOutCb     当 IAT 服务连接成功了，但是长时间不响应时
     * @param {Function}    iatEndQueueCb       iat 静默时间达到后触发， 一般在这里面进行最后一帧的发送，告诉服务端结束识别 
     * @param {Function}    log                 为保证日志输出的一致性，请使用 log 对象进行日志输出，eg: log.error("错误信息")、log.info("普通信息")、log.iat_info("iat 专属信息")
     * 
     *  
    */
    main({ device_id, log, devLog, iat_config, iat_server, llm_server, tts_server, cb, iatServerErrorCb, logWSServer, logSendAudio, connectServerCb, connectServerBeforeCb, serverTimeOutCb, iatEndQueueCb  }) {
        
        const { appid, apiSecret, apiKey, ...other_config } = iat_config;

        // // 连接 ws 服务后并且上报给框架
        // const iat_ws = new WebSocket("ws:/xxx")
        // logWSServer(iat_ws);
        // iat_ws.on('open', (event) => {
        //     // 服务连接成功后必须调用这个方法
        //     connectServerCb(true);
        // })
        // iat_ws.on('close', () => {
        //     // 关闭或者意外断开时也必须调用这个方法
        //     connectServerCb(false);
        // })

        // // 建连错误
        // iat_ws.on('error', (err) => { 
        //     // 必须调用下面两个方法
        //     iatServerErrorCb(err);
        //     connectServerCb(false);
        // })


        // 当达到静默时间后会自动执行这个任务
        iatEndQueueCb(() => {
            // 比如发送最后一帧数据等...
        })

        /**
         * 函数回到中可以收到客户端采集到的 pcm 音频：单通道/16khz 
        */
        function send_pcm(data) {
            const { iat_server_connected } = G_devices.get(device_id);
            if (!iat_server_connected) return;

            // 要发送给服务器的参数
            let frameDataSection = {
                "status": 0,
                // 这里的帧率一定要和 inmp441 终端对上
                "format": "audio/L16;rate=16000",
                "audio": data.toString('base64'),
                "encoding": "raw"
            }
            // 发送给服务器的请求... 
            console.log("PCM:", data)
        }

        // 必须将这个函数传给框架，当硬件采集到音频数据后，会调用这个函数
        logSendAudio(send_pcm)


        setTimeout(() => {
            // 不管逻辑怎么写，语音识别完毕都都只需要执行 cb 即可
            cb({ device_id, text: "帮我写一首小诗" })
        }, 3000)
    }
}

```


## 意图识别插件

文档待补充...


## 音乐播放插件

文档待补充...

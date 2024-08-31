# 服务端
服务端用于处理与 `IAT/ASR`、`LLM/RAG`、`TTS` 服务之间的通信和数据处理，并且将最终的音频结果发送给客户端，这样客户端可以直接播放音频数据。

服务端核心使用 `Nodejs` 编写。提供包括但不限于`Nodejs`编程语言的插件开发扩展。

服务端主要是提供各种配置项，你只需要更改配置项即可。



## 免费服务
`ESP-AI 开发者平台` 提供免费服务，建议直接使用开发者平台来进行可视化配置和使用服务。    
地址：https://dev.espai.fun/

## 安装与环境

这里不在赘述，直接看快速开始中的：<a href="start.html#服务端">服务端安装</a>

## 基本代码

``` javascript
const espAi = require("esp-ai"); 
const config = { 
    gen_client_config: ()=>({
        // 具体配置...
    })
};
espAi(config);
```

## 配置项
  
###  gen_client_config
- 说明：为客户端也就是硬件分配一套配置，包括用什么 LLM/TTS/IAT 服务等配置
- 默认: -
- 必填: 是
- 使用案例
``` typescript
const config = { 
    /**
     * 可以根据业务需求用这个方法去库中请求配置等...
     * 客户端配置生成，主要是生成 IAT/LLM/TTS 配置。客户端首次连接时会执行或者在某个空闲时刻内部会有自动更新策略 
     * @param {object} params 参数为客户端中配置的参数， 这里会解析为字面量对象，开发者直接使用 key 方式引用即可。 
     */
    gen_client_config: (params)=>{
        return { 
            iat_server: "xun_fei",
            // iat_server: "esp-ai-plugin-iat-example", // 插件
            iat_config: {
                // 讯飞：https://console.xfyun.cn/services/iat  。打开网址后，右上角三个字段复制进来即可。
                appid: "xxx",
                apiSecret: "xxx",
                apiKey: "xxx", 
                // 静默时间，多少时间检测不到说话就算结束，单位 ms
                vad_eos: 1500,

                // 自定义插件时：
                // 见具体插件文档提供了什么配置...
            },

            llm_server: "xun_fei",
            // llm_server: "dashscope",   // 内置积灵
            // llm_server: "volcengine",  // 内置火山引擎的
            // llm_server: "esp-ai-plugin-llm-example", // 插件
            llm_config: {
                // 讯飞：https://console.xfyun.cn/services/iat  。打开网址后，右上角三个字段复制进来即可。
                appid: "xxx",
                apiSecret: "xxx",
                apiKey: "xxx",
                llm: "v4.0",

                /****************/
                // 阿里积灵（千问等）： https://dashscope.console.aliyun.com/apiKey
                // apiKey: "sk-xxx",
                // // LLM 版本
                // llm: "qwen-turbo",


                /*******  火山引擎 *********/
                // 1. 注册：https://console.volcengine.com/ark
                // 1. 开通: https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D&tab=LLM
                // 2. 创建接入点: https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint
                // apiKey: "xxx",
                // epId: "ep-xxx", // 接入点ID 


                // 自定义插件时：
                // 见具体插件文档提供了什么配置...
            },

            tts_server: "xun_fei",
            // tts_server: "volcengine", // 内置火山引擎的 TTS 服务
            // tts_server: "esp-ai-plugin-tts-ttson",   // 插件
            // tts_server: "esp-ai-plugin-tts-aliyun",  // 插件
            tts_config: {
                // 讯飞：https://console.xfyun.cn/services/iat  。打开网址后，右上角三个字段复制进来即可。
                // appid: "xxx",
                // apiSecret: "xxx",
                // apiKey: "xx",
 

                /*******  火山引擎 *********/
                // 1. 注册：https://console.volcengine.com/speech/app
                // 2. 音色开通： https://console.volcengine.com/speech/service/8?AppID=6359932705
                // 3. 授权： xxx
                // 服务接口认证信息
                // appid: "xxx",
                // accessToken: "xxx",
                // // voice_type: "BV007_streaming", // 清切女声
                // voice_type: "BV051_streaming", // 奶气萌娃


                /****************/
                // 海豚配音
                // url: "https://ht.ttson.cn:37284/flashsummary/tts",
                // token: "",


                /*******阿里云 TTS*********/
                // // 打开网址获取： https://nls-portal.console.aliyun.com/applist 
                // appkey: "xxx", 
                // // 打开网址获取：https://ram.console.aliyun.com/manage/ak
                // AccessKeyID: "xxx",
                // AccessKeySecret: "xxx",

                
                // 自定义插件时：
                // 见具体插件文档提供了什么配置...
            },
            
            /**
             * LLM 初始化提示词
            */
            llm_init_messages: [
                { role: 'system', content: '你是小明同学，是一个无所不能的智能助手。' },
            ],

            
            /**
             * 意图表：当用户唤醒 小明同学 后，小明同学可以做下面的任务
            */
            intention: [
                {
                    // 关键词
                    key: ["帮我开灯", "开灯", "打开灯"],
                    // 向客户端发送的指令
                    instruct: "device_open_001",
                    message: "开啦！还有什么需要帮助的吗？"
                },
                {
                    // 关键词
                    key: ["帮我关灯", "关灯", "关闭灯"],
                    // 向客户端发送的指令
                    instruct: "device_close_001",
                    message: "关啦！还有什么需要帮助的吗？"
                },
                {
                    // 关键词
                    key: ["退下吧", "退下"],
                    // 内置的睡眠指令
                    instruct: "__sleep__",
                    message: "我先退下了，有需要再叫我。"
                }, 
                {
                    /**
                     * 正则匹配
                     * 如：播放音乐最后的倔强  
                     * 返回匹配的字符串为匹配成功
                    */
                    key: async (text = "", llm_historys) => {
                        const regex = /^(播放音乐)(.*)$/;
                        const match = text.match(regex);
                        if (match) {
                            const songName = match[2];
                            console.log("音乐名称:", songName);
                            return songName;
                        } else {
                            return false;
                        }
                    },
                    // 向客户端发送的指令
                    instruct: "__play_music__",
                    message: "好的！",
                    /**
                     * 用于返回音频地址和播放进度
                     * 目前只支持 mp3、wav 格式
                     * @param {String} name 是歌曲名称
                     * @return {number} seek 进度： （以秒为单位）
                     * @return {message} 找不到数据时的TTS
                    */ 
                    music_server: async (name, { user_config }) => { 
                        return {
                            url:"[https](https://xiaomingio.top/music.mp3)",
                            seek: 0,
                            message: message
                        };
                    },
                    /**
                     * 当音频结束后的回调
                     * @param {object} arg.break_second  停止时的进度，单位秒。也就是用户播放了到了多少秒（seek+play_time）
                     * @param {object} arg.play_time     实际播放音频的时间，单位秒。
                     * @param {object} arg.seek          音频开始播放时间，其实也就是 music_server 函数中返回的 seek 值
                     * @param {object} arg.start_time    开始播放音频的 Unix 毫秒数时间戳
                     * @param {object} arg.end_time      结束播放音频的 Unix 毫秒数时间戳
                     * @param {object} arg.event         结束原因： "user_break" 用户打断 | play_end 播放完毕 | foo 未知事件 
                    */
                    on_end: (arg) => {
                        // 请求业务服务器保存进度信息 ...
                        console.log(arg);
                    }
                },
            ],
        }
    }
}
```

### port

- 类型: `number`
- 描述: 服务端口, 默认 8080
- 使用案例:
  ```typescript
  const config = {
    port: 3000 // 自定义服务端口为 3000
  };
  ```

### devLog

- 类型: `number`
- 描述: 日志输出模式:
  - 0: 不输出 (线上模式)
  - 1: 普通输出
  - 2: 详细输出
- 使用案例:
  ```typescript
  const config = {
    devLog: 1 // 设置为普通日志输出模式
  };
  ```

### auth

- 类型: `(params: Record<string, any>, scene: "connect" | "start_session") => Promise<{ success: boolean, message?: string }>`
- 描述: 客户端鉴权，客户端首次连接与每一次调用接口都会进行回调。
- 参数:
  - `params` - 客户端中配置的参数，解析为字面量对象，开发者直接使用 key 方式引用。
  - `scene` - 鉴权的场景:
    - `"connect"`: 连接时
    - `"start_session"`: 开始会话时
- 使用案例:
  ```typescript
  const config = {
    auth: async (params, scene) => {
      if (params.token === "valid_token") {
        return { success: true }; // 鉴权成功
      } else {
        return { success: false, message: "无效的鉴权 token" }; // 鉴权失败
      }
    }
  };
  ```

### llm_params_set

- 类型: `(params: Record<string, any>) => Record<string, any>`
- 描述: LLM 参数控制, 可以设置温度等。
- 参数:
  - `params` - 默认的 LLM 参数。
- 使用案例:
  ```typescript
  const config = {
    llm_params_set: (params) => {
      // 修改默认的 LLM 参数
      return { ...params, temperature: 0.8 };
    }
  };
  ```

### tts_params_set

- 类型: `(params: Record<string, any>) => Record<string, any>`
- 描述: TTS 参数控制, 可以设置说话人、音量、语速等。
- 参数:
  - `params` - 默认的 TTS 参数。
- 使用案例:
  ```typescript
  const config = {
    tts_params_set: (params) => {
      // 修改默认的 TTS 参数
      return { ...params, voice: "male", speed: 0.9 };
    }
  };
  ```

### onDeviceConnect

- 类型: `(arg: { device_id: string, ws: WebSocket, client_version: string }) => void`
- 描述: 新设备连接服务的回调。
- 参数:
  - `device_id` - 设备 ID。
  - `client_version` - 客户端版本。
  - `ws` - 连接句柄，可使用 `ws.send()` 发送数据。
- 使用案例:
  ```typescript
  const config = {
    onDeviceConnect: ({ device_id, ws, client_version }) => {
      console.log(`设备 ${device_id} 已连接，客户端版本: ${client_version}`);
      ws.send("欢迎连接到服务器!");
    }
  };
  ```

### onIAT

- 类型: `(arg: { device_id: string, ws: WebSocket }) => void`
- 描述: 用户发出 IAT 服务回调请求之前的回调。
- 使用案例:
  ```typescript
  const config = {
    onIAT: ({ device_id, ws }) => {
      console.log(`准备进行语音识别服务: ${device_id}`);
    }
  };
  ```

### onIATcb

- 类型: `(arg: { device_id: string, text: string, ws: WebSocket }) => void`
- 描述: IAT 回调: 语音识别过程中的回调。
- 参数:
  - `device_id` - 设备 ID。
  - `text` - 语音转的文字。
- 使用案例:
  ```typescript
  const config = {
    onIATcb: ({ device_id, text, ws }) => {
      console.log(`设备 ${device_id} 的语音识别结果: ${text}`);
    }
  };
  ```

### onIATEndcb

- 类型: `(arg: { device_id: string, text: string, ws: WebSocket }) => void`
- 描述: IAT 回调: 语音识别完毕的回调，可用于发出最后一帧到语音识别服务器等操作。
- 参数:
  - `device_id` - 设备 ID。
  - `text` - 语音转的文字。
- 使用案例:
  ```typescript
  const config = {
    onIATEndcb: ({ device_id, text, ws }) => {
      console.log(`设备 ${device_id} 的语音识别结束: ${text}`);
    }
  };
  ```

### onTTS

- 类型: `(arg: { device_id: string, tts_task_id: string, text: string, ws: WebSocket }) => void`
- 描述: 每调用一次 TTS 服务时执行的回调函数。
- 使用案例:
  ```typescript
  const config = {
    onTTS: ({ device_id, tts_task_id, text, ws }) => {
      console.log(`TTS 服务开始，任务 ID: ${tts_task_id}, 文本: ${text}`);
    }
  };
  ```

### onTTScb

- 类型: `(arg: { device_id: string, is_over: boolean, audio: Buffer, ws: WebSocket }) => void`
- 描述: TTS 回调。
- 参数:
  - `device_id` - 设备 ID。
  - `is_over` - 是否完毕。
  - `audio` - 音频流。
- 使用案例:
  ```typescript
  const config = {
    onTTScb: ({ device_id, is_over, audio, ws }) => {
      console.log(`设备 ${device_id} 的 TTS 转换 ${is_over ? "完成" : "进行中"}`);
    }
  };
  ```

### onLLM

- 类型: `(arg: { device_id: string, text: string, ws: WebSocket }) => void`
- 描述: LLM 服务调用前的回调。
- 参数:
  - `device_id` - 设备 ID。
  - `text` - 大语言模型推理出来的文本片段。
- 使用案例:
  ```typescript
  const config = {
    onLLM: ({ device_id, text, ws }) => {
      console.log(`设备 ${device_id} 调用 LLM 服务，生成文本: ${text}`);
    }
  };
  ```

### onLLMcb

- 类型: `(arg: { device_id: string, text: string, is_over: boolean, llm_historys: Record<string, any>[], ws: WebSocket }) => void`
- 描述: LLM 回调。
- 参数:
  - `device_id` - 设备 ID。
  - `text` - 大语言模型推理出来的文本片段。
  - `is_over` - 是否回答完毕。
  - `llm_historys` - 对话历史。
- 使用案例:
  ```typescript
  const config = {
    onLLMcb: ({ device_id, text, is_over, llm_historys, ws }) => {
      console.log(`设备 ${device_id} 的 LLM 响应: ${text}`);
    }
  };
  ```

### plugins

- 类型: `{ name: string; type: "LLM" | "TTS" | "IAT"; main: (arg: Record<string, any>) => void; }[]`
- 描述: 插件配置。
- 参数:
  - `name` - 插件名称。
  - `type` - 插件类型。
  - `main` - 插件主函数。
- 使用案例:
  ```typescript
  const config = {
    plugins: [
      {
        name: "customPlugin",
        type: "LLM",
        main: (arg) => {
          console.log("自定义插件执行", arg);
        }
      }
    ]
  };
  ```


## 服务压力测试
```js
/***
 * 以下测试数据以腾讯云为服务商：cpu 2核 | 内存 2G | 带宽 4mb |  SSD 50GB
 * 测试过程中服务端开了日志输出，实际性能可以略微在高一点点
 * 
 * 1、连接+发送一条数据，测试情况：(不考虑重新连接是否能连接上，只记录并发请求的情况)
 * --------------------------------------------------------------------------------
 *   连接数量   |  成功量 | 失败量  | 并发瞬间服务情况            | 连接后服务情况  
 * ---------------------------------------------------------------------------------
 *   1000      |  1000  |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   2000      |  2000  |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   3000(最大) |  3000  |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   4000      |  3806  |194(5%)| cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   5000      |  4685  |315(6.7%)| cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   6000      |  4030  |1970(32%)| cpu:100%,100%, mem:1.6GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   10000     |  52    |服务蹦了   | -                         | -
 * ---------------------------------------------------------------------------------
 * 
 * 
 * 2、连接+一些必要标志服+发送音频流，测试情况：10kb音频流，2048字节分片发送。每个连接应发消息数量 6 次
 *  * --------------------------------------------------------------------------------
 *   连接数量   |连接成功量| 应发消息 | 实发消息  | 失败量  | 并发瞬间服务情况            | 连接后服务情况  
 * ---------------------------------------------------------------------------------
 *   100      |  922   | 600     |600      |  0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   500      |  500   | 3000    | 3000    |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   1000     |  1000   | 6000    | 6000    |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   2000(最大)     |  2000   | 12000    | 12000    |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 *   3000     |  2982   | 18000    | 2982    |   0   | cpu:100%,100%, mem:1.5GB  | cpu:4%, 3%, mem:1.5GB 
 * ---------------------------------------------------------------------------------
 * 
*/
```
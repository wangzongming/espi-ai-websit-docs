# 服务端
服务端用于处理与 `IAT/ASR`、`LLM/RAG`、`TTS` 服务之间的通信和数据处理，并且将最终的音频结果发送给客户端，这样客户端可以直接播放音频数据。

服务端核心使用 `Nodejs` 编写。提供包括但不限于`Nodejs`编程语言的插件开发扩展。

服务端主要是提供各种配置项，你只需要更改配置项即可。


## 安装与环境

这里不在赘述，直接看快速开始中的：<a href="start.html#服务端">服务端安装</a>

## 基本代码

``` javascript
const espAi = require("esp-ai"); 
const config = { 
    api_key: {
        // 讯飞：https://console.xfyun.cn/services/iat  。打开网址后，右上角三个字段复制进来即可。
        xun_fei: {
            appid: "5200d300",
            apiSecret: "xxx",
            apiKey: "xx",
            llm: "v4.0",
        }, 
    }
};
espAi(config);
```

## 配置项

除了上面的 `api_key` 是必选的外，还有下面更多的可选项。


###  api_key
- 说明：

不同的服务商需要配置对应的 `key`，每一个扩展插件也需要为其配置相应的 `key`。
每个服务商或者插件的`Key`配置不是完全一样的，具体请参考文档

配置了`iat_server`、`tts_server`、`llm_server`是什么，下面的配置中就必须出现对应的配置。
例如配置了 `tts_server: "xun_fei"` 下面就必须存在讯飞的配置。

- 默认: -
- 必填: 是
- 使用案例
``` typescript
const config = { 
    api_key: {
       /** [内置插件]
        * 讯飞：https://console.xfyun.cn/services/iat  。打开网址后，右上角三个字段复制进来即可。
       */
        xun_fei: {
            appid: "5200d300",
            apiSecret: "xxx",
            apiKey: "xx",
            llm: "v4.0",
        },
        /** [内置插件]
         * 阿里积灵（千问等）： https://dashscope.console.aliyun.com/apiKey
         * 积灵主要是提供llm（推荐使用这个llm服务）
        */ 
        dashscope: {
            apiKey: "sk-xx",
            // LLM 版本
            llm: "qwen-turbo",
        },


        /** [内置插件]
         * 火山引擎（豆包等）：https://console.volcengine.com/speech/service/8?AppID=6359932705
         */ 
        volcengine: {
            // 火山引擎的TTS与LLM使用不同的key，所以需要分别配置
            tts: {
                // 服务接口认证信息
                appid: "xxx",
                accessToken: "xxx",
            },

            // 暂不支持 llm
            llm: {
                // 获取地址：https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint?current=1&pageSize=10
                model: "ep-xxx",// 每个模型都有一个id
                // 获取地址：https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey
                apiKey: "32dacfe4xxx",
            }
        },

        /** [第三方插件]
         * 海豚TTS, 可以不用配置 token, 每天都有免费额度
         * 插件文档地址： https://www.npmjs.com/package/esp-ai-plugin-tts-ttson
         * 海豚配音：https://www.ttson.cn/
        */ 
        "esp-ai-plugin-tts-ttson": {
            token: ""
        }, 
        /**  [第三方插件]
         * 通过onehub支持绝大多数LLM模型
         * 插件文档地址： https://www.npmjs.com/package/esp-ai-plugin-llm-onehub 
         */  
        "esp-ai-plugin-llm-onehub": {
            apiKey: "sk-xxx",
            llm: "gpt-3.5-turbo",
            api_server: "https://api.xn--5kv132d.com/v1/chat/completions",
        }, 
        // 其他自定义插件，插件名称为对象名字，如[custom_plugin]
        // custom_plugin: {
        //     [key: string]: any;
        // }
    } 
}
```

### iat_server
- 说明：

语音识别服务，框架目前内置了讯飞的服务`xun_fei`，如果需要其他服务商或者本地的服务，请自行到<a href="/plugs.html">插件市场</a>下载所需插件或者自行编写插件。

- 默认:  xun_fei
- 必填:  否
- 使用案例
``` javascript
const config = { 
    iat_server: "xun_fei",
}
```
### tts_server
- 说明：

TTS服务，框架目前内置了讯飞的服务`xun_fei`(讯飞)、`volcengine`(火山引擎)，如果需要其他服务商或者本地的服务，请自行到插件市场下载所需插件或者自行编写插件。

- 默认: xun_fei
- 必填:  否
- 使用案例
``` javascript
const config = { 
    tts_server: "xun_fei",
}
```
### llm_server
- 说明：

LLM/RAG 服务，框架目前内置了讯飞的服务`xun_fei`(讯飞)、`dashscope`(阿里积灵)，如果需要其他服务商或者本地的服务，请自行到插件市场下载所需插件或者自行编写插件。

- 默认:  xun_fei
- 必填:  否
- 使用案例
``` javascript
const config = { 
    llm_server: "xun_fei",
}
```


### devLog 
- 说明： 日志输出模式：0 不输出(线上模式)， 1 普通输出， 2 详细输出
- 默认:  1
- 必填:  否
- 使用案例
``` javascript
const config = { 
    devLog: 1,
}
```


### port 
- 说明：服务端口
- 默认: 8080
- 必填: 否
- 使用案例
``` javascript
const config = { 
    port: 3000,
}
```


### auth 
- 说明： 客户端鉴权, 客户端首次连接与每一次调用接口都会进行回调。
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    /**
     * 客户端鉴权, 客户端首次连接与每一次调用接口都会进行回调。
     * 返回 success: false, 如 Promise.resolve({ success: false, message:"ak无效" }) 可使客户端鉴权失败
     * 返回 success: true,  如 Promise.resolve({ success: true }) 可使客户端鉴权成功
     * @param {object} params 参数为客户端中配置的参数， 这里会解析为字面量对象，开发者直接使用 key 方式引用即可。
     * @param {string} scene 什么场景下的鉴权, "connect" 连接时， "start_session" 开始会话时
     */
    auth: async (params, scene) => {
        // some code...
        // console.log(scene, params);
        return { success: true }
        // return { success: false, message:"ak无效" }
    },
}
```

###  intention
- 说明： 用户意图表，当用户唤醒 小明同学后，可以向小明同学发出下面的指令，关键词设置在3到5个为最佳。在打造一个家庭助手时这是必不可少的功能。
内置指令 __play_music__ 、__sleep__

当需要请求意图服务时，可写为异步函数，返回非 `false` 即为匹配成功。如下方的音乐播放。

- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    intention: [
        {
            // 关键词
            key: ["帮我开灯", "开灯", "打开灯"],
            // 向客户端发送的指令
            instruct: "device_open_001",
            message: "开啦！还有什么需要帮助的吗？"， 
            // 附加参数, 不管什么数据，都需要写为 string 类型，且不建议放较大的数据在这里
            data: "ak=123456"; 
        },
        {
            // 关键词
            key: ["帮我关灯", "关灯", "关闭灯"],
            // 向客户端发送的指令
            instruct: "device_close_001",
            message: "关啦！还有什么需要帮助的吗？"
        },
        
        {
            /**
             * 正则匹配
             * 如：播放音乐最后的倔强
             * 
             * 返回匹配的字符串为匹配成功
            */
            key: async (text) => {
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
            // 用于返回音乐地址的服务，`esp-ai` 目前不提供音乐服务
            // name 是歌曲名称
            // 目前只支持 mp3、wav 格式
            music_server: async (name)=>{
                return "https://xiaomingio.top/music.mp3";
            }
        },
        {
            // 关键词
            key: ["退下吧", "退下"],
            // 内置的睡眠指令
            instruct: "__sleep__",
            message: "我先退下了，有需要再叫我。"
        }
    ],
}
```

###  f_reply
- 说明： 被唤醒后的回复
- 默认:  小明在的
- 必填:  否
- 使用案例
``` javascript
const config = { 
    f_reply: "有事请吩咐",
}
```

###  vad_eos
- 默认:  语音识别静默时间, 单位毫秒，默认 2500
- 必填:  否
- 使用案例
``` javascript
const config = { 
    vad_eos: 5000, // 5秒后听不见说话结束会话
}
```
 

###  llm_params_set
- 说明： llm 参数自定义, 可以设置温度等
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    /**
     * llm 参数控制, 可以设置温度等
     * 不同服务要求的参数格式和属性名字不同，根据插件或者服务的实际文档来。
    */
    llm_params_set: (params) => { 
        /** 讯飞温度设置 ... **/
        params.parameter.chat.temperature = 0.4;
        params.parameter.chat.max_tokens = 100; 
        // 改完后一定要返回出去
        return params;
    },
}
```

###  tts_params_set
- 说明： tts 参数自定义, 可以设置说话人、音量、语速等
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    /**
     * tts 参数控制, 可以设置说话人、音量、语速等
     * 不同服务要求的参数格式和属性名字不同，根据下面属性进行配置
    */
    tts_params_set: (params) => { 
        /** 讯飞 **/
        // 说话人列表见：https://help.aliyun.com/zh/dashscope/developer-reference/model-list-old-version?spm=a2c4g.11186623.0.0.5fbe490eBdtzX0
        params.vcn = "aisbabyxu";

        /** 火山引擎 **/
        // 说话人列表见：https://www.volcengine.com/docs/6561/97465
        // params.voice_type = "BV051_streaming" 

        // 改完后一定要返回出去
        return params;
    },
}
```

 

###  onDeviceConnect
- 说明： 新设备连接服务的回调
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = {  
    /**
     * 新设备连接服务的回调 
     * @param {string} device_id 设备id
     * @param {string} client_version 客户端版本
     * @param {WebSocket} ws 连接句柄，可使用 ws.send() 发送数据
     */
    onDeviceConnect: ({ device_id, ws, client_version }) => {
        // 做一些事情...
    };
}
```

###  onIATcb
- 说明： 语音识别过程中的回调
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    /** 
     * @param {string} device_id 设备id
     * @param {string} text 语音转的文字 
    */
   onIATcb({ device_id, text }) { },
}
```

###  onIATEndcb
- 说明： 语音识别完毕的回调，可以在这里面发出最后一帧到语音识别服务器等操作
- 默认:  
- 必填:  否
- 使用案例
``` javascript
const config = {   
    /** 
     * @param {string} device_id 设备id
     * @param {string} text 语音转的文字 
    */
    onIATEndcb: ({ device_id, text }) => {};
}
```

###  onLLMcb 
- 说明： LLM 服务响应回调
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    /** 
     * @param {string} device_id 设备id
     * @param {string} text 大语言模型推理出来的文本片段 
     * @param {boolean} is_over 是否回答完毕 
     * @param {object[]} llm_historys 对话历史 
     * 
    */
    onLLMcb: ({ device_id, text, is_over, llm_historys }) => {};
}
```

###  onTTScb 
- 说明：  tts 回调 
- 默认:  -
- 必填:  否
- 使用案例
``` javascript
const config = { 
    /** 
     * @param {string} device_id 设备id
     * @param {Boolean} is_over  是否完毕
     * @param {Buffer} audio    音频流 
    */
    onTTScb: ({  device_id: string, is_over: boolean, audio: Buffer }) => {};
}
``` 

###  plugins 
- 说明： 
  插件，`LLM`、`TTS`、`IAT` 的插件使用方法都是一模一样的。首先你得有一个插件，不管是在<a href="/plugs.html">插件市场</a>安装的，还是自己写：<a href="/plugs-develop.html">插件开发文档</a>。

一般使用流程是先安装插件，使用命令 `npm i xxx`, 然后更改服务配置 `xxx_server: 'xxx'`，然后在插件中引入即可。
- 默认:  -
- 必填:  否  
- 使用案例
``` javascript
const config = {  
    // 使用 esp-ai-plugin-iat-example 提供 语音识别服务
    iat_server: "esp-ai-plugin-iat-example",
    // 使用 esp-ai-plugin-tts-ttson 提供 tts 服务
    tts_server: "esp-ai-plugin-tts-ttson", // 海豚配音插件
    // 使用 esp-ai-plugin-llm-example 提供 llm 服务
    llm_server: "esp-ai-plugin-llm-example",
    
    // 引入插件
    plugins: [ 
        // 在项目中安装： npm i esp-ai-plugin-iat-example
        require("esp-ai-plugin-iat-example"), 
        // 在项目中安装： npm i esp-ai-plugin-tts-ttson
        require("esp-ai-plugin-tts-ttson"), 
        // 在项目中安装： npm i esp-ai-plugin-llm-example
        require("esp-ai-plugin-llm-example"), 
    ]
}
``` 
# Server

The server is used to handle communication and data processing with `IAT/ASR`, `LLM/RAG`, and `TTS` services, and send the final audio results to the client so the client can directly play the audio data.

The core of the server is written in `Nodejs`. It provides plugin development extensions for `Nodejs` programming language and more.

The server mainly offers various configuration options that you need to modify.

## Installation and Environment

For detailed information, please refer directly to the Quick Start section: [Server Installation](start.html#server).

## Basic Code

```javascript
const espAi = require("esp-ai"); 
const config = { 
    api_key: {
        // Xunfei: https://console.xfyun.cn/services/iat. Open the URL and copy the three fields in the top right corner.
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

## Configuration Options

Besides the required `api_key`, there are additional optional settings.

### api_key
- Description:
Different service providers require their own `key`, and each plugin also needs its corresponding `key`.
The `key` configuration for each service provider or plugin is not exactly the same, please refer to the documentation for specifics.

If `iat_server`, `tts_server`, or `llm_server` are configured, the corresponding configuration must appear below.
For example, if `tts_server: "xun_fei"` is configured, there must be a Xunfei configuration below.

- Default: -
- Required: Yes
- Usage Example
```typescript
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
- Description:
Speech recognition service, the framework currently has Xunfei's service `xun_fei` built-in. For other service providers or local services, please download the required plugins from the <a href="/en/plugs.html">Plugin Market</a> or write your own plugins.

- Default: xun_fei
- Required: No
- Usage Example
```javascript
const config = { 
    iat_server: "xun_fei",
}
```

### tts_server
- Description:
TTS service, the framework currently has Xunfei's service `xun_fei` built-in. For other service providers or local services, please download the required plugins from the Plugin Market or write your own plugins.

- Default: xun_fei
- Required: No
- Usage Example
```javascript
const config = { 
    tts_server: "xun_fei",
}
```

### llm_server
- Description:
LLM/RAG service, the framework currently has Xunfei's service `xun_fei` built-in. For other service providers or local services, please download the required plugins from the Plugin Market or write your own plugins.

- Default: xun_fei
- Required: No
- Usage Example
```javascript
const config = { 
    llm_server: "xun_fei",
}
```

### devLog 
- Description: Log output mode: 0 No output (online mode), 1 Normal output, 2 Detailed output
- Default: 1
- Required: No
- Usage Example
```javascript
const config = { 
    devLog: 1,
}
```

### port 
- Description: Server port
- Default: 8080
- Required: No
- Usage Example
```javascript
const config = { 
    port: 3000,
}
```

### auth 
- Description: Client authentication: The first connection between the client and the interface is called back each time
- Required:  -
- Required:  No
- Example
``` javascript
const config = { 
    /** 
     * retrun success: false, eg Promise.resolve({ success: false, message:"ak无效" }) Client authentication may fail
     * retrun success: true,  eg Promise.resolve({ success: true }) Client authentication may successful
     * @param {object} params Parameters are parameters configured on the client, which are parsed into literal objects, and can be referenced directly by the developer using the key method.
     * @param {string} scene What is the authentication scenario, when "connect" connects, and when "start_session" starts a session
     */
    auth: async (params, scene) => {
        // some code...
        // console.log(scene, params);
        return { success: true }
        // return { success: false, message:"ak fail" }
    },
}
```

### intention
- Description: User intention table. After waking up Xiao Ming, you can give the following commands. Setting 3 to 5 keywords is optimal. This function is essential when creating a home assistant.

Built-in instruction __play_music__ 、__sleep__

When the intent service needs to be requested, it can be written as an asynchronous function, and if it returns anything other than 'false', the match is successful. The following side of the music plays.

- Default: -
- Required: No
- Usage Example
```javascript
const config = { 
    intention: [
        {
            // Keywords
            key: ["帮我开灯", "开灯", "打开灯"],
            // Instruction sent to the client
            instruct: "device_open_001",
            message: "开啦！还有什么需要帮助的吗？", 
            // Additional parameters, write all data as string type, and avoid placing large data here
            data: "ak=123456"; 
        },
        {
            // Keywords
            key: ["帮我关灯", "关灯", "关闭灯"],
            // Instruction sent to the client
            instruct: "device_close_001",
            message: "关啦！还有什么需要帮助的吗？"
        },
          {
            /**
             * regex match
             * Such as: Play music last stubborn
             * 
             * The matching string is returned as a successful match
            */
            key: (text) => {
                const regex = /^(播放音乐)(.*)$/;
                const match = text.match(regex); 
                if (match) { 
                    const songName = match[2]; 
                    console.log("name:", songName);
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
            music_server: async (name)=>{
                return "http://m10.music.126.net/20240723180659/13eabc0c9291dab9a836120bf3f609ea/ymusic/5353/0f0f/0358/d99739615f8e5153d77042092f07fd77.mp3";
            }
        },
        {
            // Keywords
            key: ["退下吧", "退下"],
            // Built-in sleep command
            instruct: "__sleep__",
            message: "我先退下了，有需要再叫我。"
        }
    ],
}
```

### f_reply
- Description: Reply after being woken up
- Default: 小明在的
- Required: No
- Usage Example
```javascript
const config = { 
    f_reply: "有事请吩咐",
}
```

###  vad_eos
- 默认:  Voice recognition silence time, in milliseconds, default 2500
- 必填:  No
- 使用案例
``` javascript
const config = { 
    vad_eos: 5000, // After 5 seconds no speech is heard end session
}
```
 

### llm_params_set
- Description: LLM parameter customization, you can set temperature, etc.
- Default: -
- Required: No
- Usage Example
```javascript
const config = { 
    /**
     * LLM parameter control, you can set temperature, etc.
     * The parameter format and attribute names required by different services are different, according to the actual documentation of the plugin or service.
    */
    llm_params_set: (params) => { 
        /** Xunfei temperature setting ... **/
        params.parameter.chat.temperature = 0.4;
        params.parameter.chat.max_tokens = 100; 
        // Must return the parameters after modification
        return params;
    },
}
```

### tts_params_set
- Description: TTS parameter customization, you can set speaker, volume, speech rate, etc.
- Default: -
- Required: No
- Usage Example
```javascript
const config = { 
    /**
     * TTS parameter control, you can set speaker, volume, speech rate, etc.
     * The parameter format and attribute names required by different services are different, configure according to the following attributes
    */
    tts_params_set: (params) => { 
        /** Xunfei **/
        // Speaker list: https://help.aliyun.com/zh/dashscope/developer-reference/model-list-old-version?spm=a2c4g.11186623.0.0.5fbe490eBdtzX0
        params.vcn = "aisbabyxu";

        /** Volcano Engine **/
        // Speaker list: https://www.volcengine.com/docs/6561/97465
        // params.voice_type = "BV051_streaming" 

        // Must return the parameters after modification
        return params;
    },
}
```

### onDeviceConnect
- Description: Callback for new device connection to the service
- Default: -
- Required: No
- Usage Example
```javascript
const config = {  
    /**
     * Callback for new device connection to the service
     * @param {string} device_id Device ID
     * @param {string} client_version Client version
     * @param {WebSocket} ws Connection handle, can use ws.send() to send data
     */
    onDeviceConnect: ({ device_id, ws, client_version }) => {
        // Do something...
    };
}
```

### onIATcb
- Description: Callback during the speech recognition process
- Default: -
- Required: No
- Usage Example
```javascript
const config = { 
    /** 
     * @param {string} device_id Device ID
     * @param {string} text Recognized text 
    */
   onIATcb({ device_id, text }) { },
}
```

### onIATEndcb
- Description: Callback after speech recognition is complete, you can send the last frame to the speech recognition server here
- Default: -
- Required: No
- Usage Example
```javascript
const config = {   
    /** 
     * @param {string} device_id Device ID
     * @param {string} text Recognized text 
    */
    onIATEndcb: ({ device_id, text }) => {};
}
```

### onLLMcb 
- Description: LLM service response callback
- Default: -
- Required: No
- Usage Example
```javascript
const config = { 
    /** 
     * @param {string} device_id Device ID
     * @param {string} text Text segment inferred by the large language model 
     * @param {boolean} is_over Whether the answer is complete 
     * @param {object[]} llm_historys Conversation history 
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

### plugins 
- Description:
  Plugins, the usage methods for `LLM`, `TTS`, and `IAT` plugins are the same. First, you need a plugin, whether it is installed from the 
  <a href="/en/plugs.html">Plugin Market</a> 
  or self-written: <a href="/en/plugs-develop.html">Plugin DevelopmentDocumentation</a>
The general usage process is to install the plugin using the command `npm i xxx`, then change the service configuration `xxx_server: 'xxx'`, and then introduce it in the plugin.

- Default: -
- Required: No  
- Usage Example
```javascript
const config = {  
    // Use esp-ai-plugin-iat-example to provide speech recognition service
    iat_server: "esp-ai-plugin-iat-example",
    // Use esp-ai-plugin-tts-ttson to provide tts service
    tts_server: "esp-ai-plugin-tts-ttson", // Dolphin dubbing plugin
    // Use esp-ai-plugin-llm-example to provide llm service
    llm_server: "esp-ai-plugin-llm-example",
    
    // Introduce plugins
    plugins: [ 
        // Install in the project: npm i esp-ai-plugin-iat-example
        require("esp-ai-plugin-iat-example"), 
        // Install in the project: npm i esp-ai-plugin-tts-ttson
        require("esp-ai-plugin-tts-ttson"), 
        // Install in the project: npm i esp-ai-plugin-llm-example
        require("esp-ai-plugin-llm-example"), 
    ]
}
```
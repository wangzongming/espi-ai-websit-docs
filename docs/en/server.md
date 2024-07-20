# Server

The server is used to handle communication and data processing with `IAT/ASR`, `LLM/RAG`, and `TTS` services, and send the final audio results to the client so the client can directly play the audio data.

The core of the server is written in `Nodejs`. It provides plugin development extensions for `Nodejs` programming language and more.

The server mainly offers various configuration options that you need to modify.

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
    // Xunfei: https://console.xfyun.cn/services/iat. Open the URL and copy the three fields in the top right corner.
    xun_fei: {
        appid: "xxx",
        apiSecret: "xxx",
        apiKey: "xxx",
        // LLM version
        llm: "v4.0", 
    }, 

    // Custom plugin, plugin name is the object name, such as [custom_plugin]
    custom_plugin: {
        [key: string]: any;
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

### intention
- Description: User intention table. After waking up Xiao Ming, you can give the following commands. Setting 3 to 5 keywords is optimal. This function is essential when creating a home assistant.
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
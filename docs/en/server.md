# Server Side
The server side handles communication and data processing between the `IAT/ASR`, `LLM/RAG`, and `TTS` services, and sends the final audio result to the client so that the client can directly play the audio data.

The core of the server side is written in `Node.js`. It provides plugin development extensions for programming languages including but not limited to `Node.js`.

The server side mainly offers various configuration options; you only need to modify these configuration options.

## Free Service
`ESP-AI Developer Platform` provides a free service. It is recommended to use the developer platform directly for visual configuration and service usage.
URL: <https://dev.espai.fun/>

## Installation and Environment

Details are omitted here. Please refer to the Quick Start section under: <a href="start.html#server-side">Server Side Installation</a>

## Basic Code

```javascript
const espAi = require("esp-ai");
const config = {
    gen_client_config: () => ({
        // Specific configurations...
    })
};
espAi(config);
```

## Configuration Options

### gen_client_config
- Description: Assigns a set of configurations to the client (hardware), including which LLM/TTS/IAT services to use, etc.
- Default: -
- Required: Yes
- Usage Example
```typescript
const config = {
    /**
     * You can request configurations from the library based on business needs using this method...
     * Client configuration generation, primarily generates IAT/LLM/TTS configurations. This function is executed when the client first connects or at some idle moment, as there is an internal automatic update strategy.
     * @param {object} params Parameters configured by the client, parsed into a literal object, developers can directly use the key to reference them.
     */
    gen_client_config: (params) => {
        return {
            iat_server: "xun_fei",
            // iat_server: "esp-ai-plugin-iat-example", // Plugin
            iat_config: {
                // Xunfei: <https://console.xfyun.cn/services/iat>. After opening the website, copy the three fields in the top right corner here.
                appid: "xxx",
                apiSecret: "xxx",
                apiKey: "xxx",
                // Silence duration, how long it takes to consider speech ended when no speech is detected, in milliseconds
                vad_eos: 1500,

                // For custom plugins:
                // Refer to the specific plugin documentation for available configurations...
            },

            llm_server: "xun_fei",
            // llm_server: "dashscope",   // Built-in Qwen
            // llm_server: "volcengine",  // Built-in VolcEngine
            // llm_server: "esp-ai-plugin-llm-example", // Plugin
            llm_config: {
                // Xunfei: <https://console.xfyun.cn/services/iat>. After opening the website, copy the three fields in the top right corner here.
                appid: "xxx",
                apiSecret: "xxx",
                apiKey: "xxx",
                llm: "v4.0",

                /****************/
                // Alibaba Cloud Qwen (Qwen, etc.): <https://dashscope.console.aliyun.com/apiKey>
                // apiKey: "sk-xxx",
                // // LLM version
                // llm: "qwen-turbo",


                /******* VolcEngine *********/
                // 1. Register: <https://console.volcengine.com/ark>
                // 1. Enable: <https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D&tab=LLM>
                // 2. Create Endpoint: <https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint>
                // apiKey: "xxx",
                // epId: "ep-xxx", // Endpoint ID


                // For custom plugins:
                // Refer to the specific plugin documentation for available configurations...
            },

            tts_server: "xun_fei",
            // tts_server: "volcengine", // Built-in VolcEngine TTS service
            // tts_server: "esp-ai-plugin-tts-ttson",   // Plugin
            // tts_server: "esp-ai-plugin-tts-aliyun",  // Plugin
            tts_config: {
                // Xunfei: <https://console.xfyun.cn/services/iat>. After opening the website, copy the three fields in the top right corner here.
                // appid: "xxx",
                // apiSecret: "xxx",
                // apiKey: "xx",

                /******* VolcEngine *********/
                // 1. Register: <https://console.volcengine.com/speech/app>
                // 2. Voice Authorization: <https://console.volcengine.com/speech/service/8?AppID=6359932705>
                // 3. Authorization: xxx
                // Service interface authentication information
                // appid: "xxx",
                // accessToken: "xxx",
                // voice_type: "BV007_streaming", // Clear Female Voice
                // voice_type: "BV051_streaming", // Cute Child Voice


                /****************/
                // Dolphin TTS
                // url: "https://ht.ttson.cn:37284/flashsummary/tts",
                // token: "",


                /******* Alibaba Cloud TTS *********/
                // // Obtain from: <https://nls-portal.console.aliyun.com/applist>
                // appkey: "xxx",
                // // Obtain from: <https://ram.console.aliyun.com/manage/ak>
                // AccessKeyID: "xxx",
                // AccessKeySecret: "xxx",


                // For custom plugins:
                // Refer to the specific plugin documentation for available configurations...
            },

            /**
             * Initial prompt for LLM
             */
            llm_init_messages: [
                { role: 'system', content: 'You are Xiao Ming, an all-powerful intelligent assistant.' },
            ],

            /**
             * Intention Table: After the user wakes up Xiao Ming, Xiao Ming can perform the following tasks
             */
            intention: [
                {
                    // Keywords
                    key: ["Help me turn on the light", "Turn on the light", "Turn on the lights"],
                    // Instruction sent to the client
                    instruct: "device_open_001",
                    message: "Turned on! Is there anything else I can help with?"
                },
                {
                    // Keywords
                    key: ["Help me turn off the light", "Turn off the light", "Turn off the lights"],
                    // Instruction sent to the client
                    instruct: "device_close_001",
                    message: "Turned off! Is there anything else I can help with?"
                },
                {
                    // Keywords
                    key: ["Retire", "Step back"],
                    // Built-in sleep instruction
                    instruct: "__sleep__",
                    message: "I'll step back now, call me if you need anything."
                }, 
                {
                    /**
                     * Regular expression matching
                     * For example: Play the last stubborn song
                     * Returns the matched string as a successful match
                     */
                    key: async (text = "", llm_historys) => {
                        const regex = /^(Play music)(.*)$/;
                        const match = text.match(regex);
                        if (match) {
                            const songName = match[2];
                            console.log("Song Name:", songName);
                            return songName;
                        } else {
                            return false;
                        }
                    },
                    // Instruction sent to the client
                    instruct: "__play_music__",
                    message: "Sure!",
                    /**
                     * Used to return audio URLs and playback progress
                     * Currently only supports mp3, wav formats
                     * @param {String} name is the song name
                     * @return {number} seek Progress: (in seconds)
                     * @return {message} TTS when data cannot be found
                     */
                    music_server: async (name, { user_config }) => {
                        return {
                            url: "[https](https://xiaomingio.top/music.mp3)",
                            seek: 0,
                            message: message
                        };
                    },
                    /**
                     * Callback after audio ends
                     * @param {object} arg.break_second  The stopped progress, in seconds. That is, how many seconds the user has played (seek + play_time)
                     * @param {object} arg.play_time     Actual playback time of the audio, in seconds.
                     * @param {object} arg.seek          Audio start playback time, actually the seek value returned by the music_server function
                     * @param {object} arg.start_time    Start playback audio Unix timestamp in milliseconds
                     * @param {object} arg.end_time      End playback audio Unix timestamp in milliseconds
                     * @param {object} arg.event         End reason: "user_break" User interruption | play_end Playback complete | foo Unknown event
                     */
                    on_end: (arg) => {
                        // Request the business server to save the progress information...
                        console.log(arg);
                    }
                },
            ],
        }
    },
    
    plugins: []
}
```

### port

- Type: `number`
- Description: Server port, default is 8080
- Usage Example:
  ```typescript
  const config = {
    port: 3000 // Customize the server port to 3000
  };
  ```

### devLog

- Type: `number`
- Description: Log output mode:
  - 0: No output (Production mode)
  - 1: Normal output
  - 2: Detailed output
- Usage Example:
  ```typescript
  const config = {
    devLog: 1 // Set to normal log output mode
  };
  ```

### auth

- Type: `(params: Record<string, any>, scene: "connect" | "start_session") => Promise<{ success: boolean, message?: string }>`
- Description: Client authentication, called every time the client initially connects and starts a session.
- Parameters:
  - `params` - Parameters configured by the client, parsed into a literal object, developers can directly use the key to reference them.
  - `scene` - Authentication scene:
    - `"connect"`: When connecting
    - `"start_session"`: When starting a session
- Usage Example:
  ```typescript
  const config = {
    auth: async (params, scene) => {
      if (params.token === "valid_token") {
        return { success: true }; // Authentication successful
      } else {
        return { success: false, message: "Invalid authentication token" }; // Authentication failed
      }
    }
  };
  ```

### llm_params_set

- Type: `(params: Record<string, any>) => Record<string, any>`
- Description: LLM parameter control, can set temperature, etc.
- Parameters:
  - `params` - Default LLM parameters.
- Usage Example:
  ```typescript
  const config = {
    llm_params_set: (params) => {
      // Modify default LLM parameters
      return { ...params, temperature: 0.8 };
    }
  };
  ```

### tts_params_set

- Type: `(params: Record<string, any>) => Record<string, any>`
- Description: TTS parameter control, can set speaker, volume, speed, etc.
- Parameters:
  - `params` - Default TTS parameters.
- Usage Example:
  ```typescript
  const config = {
    tts_params_set: (params) => {
      // Modify default TTS parameters
      return { ...params, voice: "male", speed: 0.9 };
    }
  };
  ```

### onDeviceConnect

- Type: `(arg: { device_id: string, ws: WebSocket, client_version: string }) => void`
- Description: Callback when a new device connects to the service.
- Parameters:
  - `device_id` - Device ID.
  - `client_version` - Client version.
  - `ws` - Connection handle, can send data using `ws.send()`.
- Usage Example:
  ```typescript
  const config = {
    onDeviceConnect: ({ device_id, ws, client_version }) => {
      console.log(`Device ${device_id} connected, client version: ${client_version}`);
      ws.send("Welcome to the server!");
    }
  };
  ```

### onIAT

- Type: `(arg: { device_id: string, ws: WebSocket }) => void`
- Description: Callback before the user triggers an IAT service request.
- Usage Example:
  ```typescript
  const config = {
    onIAT: ({ device_id, ws }) => {
      console.log(`Preparing for speech recognition service: ${device_id}`);
    }
  };
  ```

### onIATcb

- Type: `(arg: { device_id: string, text: string, ws: WebSocket }) => void`
- Description: IAT callback: Callback during speech recognition.
- Parameters:
  - `device_id` - Device ID.
  - `text` - Speech-to-text.
- Usage Example:
  ```typescript
  const config = {
    onIATcb: ({ device_id, text, ws }) => {
      console.log(`Speech recognition result for device ${device_id}: ${text}`);
    }
  };
  ```

### onIATEndcb

- Type: `(arg: { device_id: string, text: string, ws: WebSocket }) => void`
- Description: IAT callback: Callback after speech recognition is completed, used for sending the last frame to the speech recognition server, etc.
- Parameters:
  - `device_id` - Device ID.
  - `text` - Speech-to-text.
- Usage Example:
  ```typescript
  const config = {
    onIATEndcb: ({ device_id, text, ws }) => {
      console.log(`Speech recognition completed for device ${device_id}: ${text}`);
    }
  }; 

### onTTS

- Type: `(arg: { device_id: string, tts_task_id: string, text: string, ws: WebSocket }) => void`
- Description: Callback function executed each time the TTS service is invoked.
- Usage Example:
  ```typescript
  const config = {
    onTTS: ({ device_id, tts_task_id, text, ws }) => {
      console.log(`TTS service started, task ID: ${tts_task_id}, text: ${text}`);
    }
  };
  ```

### onTTScb

- Type: `(arg: { device_id: string, is_over: boolean, audio: Buffer, ws: WebSocket }) => void`
- Description: TTS callback.
- Parameters:
  - `device_id` - Device ID.
  - `is_over` - Whether completed.
  - `audio` - Audio stream.
- Usage Example:
  ```typescript
  const config = {
    onTTScb: ({ device_id, is_over, audio, ws }) => {
      console.log(`TTS conversion for device ${device_id} ${is_over ? "completed" : "in progress"}`);
    }
  };
  ```

### onLLM

- Type: `(arg: { device_id: string, text: string, ws: WebSocket }) => void`
- Description: Callback before invoking the LLM service.
- Parameters:
  - `device_id` - Device ID.
  - `text` - Text segment generated by the large language model inference.
- Usage Example:
  ```typescript
  const config = {
    onLLM: ({ device_id, text, ws }) => {
      console.log(`Device ${device_id} invokes LLM service, generated text: ${text}`);
    }
  };
  ```

### onLLMcb

- Type: `(arg: { device_id: string, text: string, is_over: boolean, llm_historys: Record<string, any>[], ws: WebSocket }) => void`
- Description: LLM callback.
- Parameters:
  - `device_id` - Device ID.
  - `text` - Text segment generated by the large language model inference.
  - `is_over` - Whether the response is complete.
  - `llm_historys` - Conversation history.
- Usage Example:
  ```typescript
  const config = {
    onLLMcb: ({ device_id, text, is_over, llm_historys, ws }) => {
      console.log(`LLM response for device ${device_id}: ${text}`);
    }
  };
  ```

### plugins

- Type: `{ name: string; type: "LLM" | "TTS" | "IAT"; main: (arg: Record<string, any>) => void; }[]`
- Description: Plugin configuration.
- Parameters:
  - `name` - Plugin name.
  - `type` - Plugin type.
  - `main` - Main function of the plugin.
- Usage Example:
  ```typescript
  const config = {
    plugins: [
      {
        name: "customPlugin",
        type: "LLM",
        main: (arg) => {
          console.log("Custom plugin execution", arg);
        }
      }
    ]
  };
  ```

## Service Stress Test
```javascript
/**
 * The following test data uses Tencent Cloud as the service provider: CPU 2 cores | Memory 2GB | Bandwidth 4mb | SSD 50GB
 * During the testing process, server-side logging was enabled, so actual performance can be slightly higher.
 *
 * 1. Connection + Sending a Single Data Packet (Without considering whether reconnection is successful, only recording concurrent request situations)
 * --------------------------------------------------------------------------------
 *   Number of Connections   |  Successful Connections | Failed Connections  | Server Status During Instantaneous Concurrency             | Server Status After Connection  
 * ---------------------------------------------------------------------------------
 *   1000      |  1000  |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   2000      |  2000  |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   3000(peak) |  3000  |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   4000      |  3806  |194(5%)| CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   5000      |  4685  |315(6.7%)| CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   6000      |  4030  |1970(32%)| CPU:100%,100%, MEM:1.6GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   10000     |  52    |Service Crashed   | -                         | -
 * ---------------------------------------------------------------------------------
 *
 * 
 * 2. Connection + Necessary Flags + Sending Audio Stream (Test Situation): 10kb audio stream, sent in 2048-byte chunks. Each connection should send 6 messages.
 *  * --------------------------------------------------------------------------------
 *   Number of Connections   |Successful Connections| Messages to Send | Messages Sent  | Failed Messages  | Server Status During Instantaneous Concurrency             | Server Status After Connection  
 * ---------------------------------------------------------------------------------
 *   100      |  922   | 600     |600      |  0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   500      |  500   | 3000    | 3000    |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   1000     |  1000   | 6000    | 6000    |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   2000(peak)     |  2000   | 12000    | 12000    |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 *   3000     |  2982   | 18000    | 2982    |   0   | CPU:100%,100%, MEM:1.5GB  | CPU:4%, 3%, MEM:1.5GB 
 * ---------------------------------------------------------------------------------
 */
```
# Change Logs
 

## 2024-8-32 Server@2.0.0 Client@2.0.0

🔥🔥🔥 A new member has been added to the ecosystem: `ESP-AI Developer Platform`

🔥🔥🔥 Website: `https://dev.espai.fun`

🔥🔥🔥 Features in the Developer Platform: provides free services, visual configuration services, various online tools, and more...

### Server 

- 🔥 Added: When errors are caught, they will be fed back to the client, allowing clients to reference an error table for relevant error prompts.
- 🔥 Added: Built-in Volcano Engine `LLM` (compatible with Doupao and others)
- 🔥 Added: Each user under the service can have their own independent set of configurations.
- 🔥 Optimized: The `TTS` task mechanism now supports incremental character conversion, making conversations smoother and faster while addressing concerns over TTS service costs.
- 🔥 Optimized: During audio playback, LLM conversation history can be read, and support for controlling start times is included.
- 🆕 Added: `connected_reply` configuration, which allows changing the prompt message after service connection.
- 🆕 Added: Output all configuration items upon service startup, making it easy for users to clearly know what services they are using.
- 🆕 Added: Exception handling to prevent services from crashing directly when not running via methods such as `pm2`.
- 🤔 Adjusted: Removed the `api_key` configuration, replaced by `iat_config`, `llm_config`, `tts_config` (as putting everything in `api_key` was confusing).
- 🤔 Adjusted: Changed the default service port to `8088` (since there's a high chance of conflict with `8080`).
- 🤔 Adjusted: Other configuration parts, details can be found in the documentation.
- 💄 Optimized: Switched to a better prompt sound before starting a session.
- 💄 Optimized: Voice wake-up mechanism, improving offline wake-up accuracy by over `60%` (further improvements will continue in future versions).
- 🐞 Fixed: Issue where sentence breaks would repeat the previous sentence.

##### Installation

```bash
npm i esp-ai@1.x.x
```

Docker Installation:
```bash
docker exec -it esp-ai-server npm i esp-ai@1.x.x
```

### Client

- 🔥 Added: Support for pairing with the `ESP-AI Developer Platform` for a super simple AI dialogue solution for individuals and enterprises. Simply enter an `api_key` on the network configuration page.
- 🔥 Added: `.onError` unified error capture callback, allowing developers to decide how to notify users based on error codes.
- 🔥 Added: `.onConnectedWifiCb` to monitor successful device connection to `wifi`, where the IP address can be obtained directly as a parameter.
- 🔥 Added: Network configuration settings page, which supports customization. In addition to `wifi` information, it also provides additional fields for storing your business data.
- 🔥 Added: Ability to interrupt conversations, by calling `Xiaoming Tongxue` to restart the session.
- 🔥 Added: Multiple built-in wake-up solutions: `Pin level wake-up`, `Tianwen module wake-up`, `Serial string wake-up`, all ready to use with direct configuration.
- 🔥 Added: `.onNetStatus` unified status callback, where the status of the device connecting to wifi or the service can be uniformly obtained.
- 🔥 Added: `.onAPInfo` callback when the device opens a hotspot. You should prompt the user to open the configuration webpage here, and you can get all the hotspot information as parameters.
- 🆕 Added: `setWifiConfig` for manually setting `wifi` information.
- 🆕 Added: Each device generates a UUID during initialization, which can be retrieved as needed, similar to a `sn` code.
- 🤔 Adjusted: Configuration order adjusted, unnecessary parameters are placed at the end and can be left unconfigured. 
- 💄 Optimized: Improved console output.
- 💄 Optimized: Refactored client-side code.
- 🐞 Fixed: Errors when uploading code in certain environments due to undefined `LED_BUILTIN`.
- 🐞 Fixed: Various other issues...

##### Installation
Please download the latest version of the client from the repository release page: <https://github.com/wangzongming/esp-ai/releases>

The file to download is named `esp-ai-xxx.zip`.

## 2024-8-1 Server@1.18.7 Client@1.4.2
### Server 

- 🆕 新增 网络延时输出  
- 🤔 调整 服务启动时输出全部的本地IP地址
- 💄 优化 控制台部分文字颜色调整
- 🐞 修复 在音频数据过大时(如播放歌曲时)，服务会异常断开连接  

##### Install

```bash
npm i esp-ai@1.18.7
```
docker Install
```bash
docker exec -it esp-ai-server  npm i esp-ai@1.18.7
```

### Client 

- 🆕 新增 网络延时输出
- 🐞 修复 在音频数据过大时(如播放歌曲时)，服务会异常断开连接  

##### Install
<a href="https://github.com/user-attachments/files/16454824/esp-ai-1.4.2.zip">esp-ai Arduino依赖库 点击下载</a>



## 2024-7-30 Server@1.15.6 Client@1.3.1 

#### Server 

- 🆕 新增 鉴权配置，用户每次请求接口时都可进行一次鉴权

##### Install

```
npm i esp-ai@1.15.6
```

#### Client 

- 🆕 新增 连接服务时可传递参数，用于服务端鉴权等。

##### Install
<a href="https://github.com/user-attachments/files/16422116/esp-ai-1.3.1.zip">esp-ai Arduino依赖库 点击下载</a>


## 2024-7-23 Server@1.14.5 Client@1.2.1 

#### Server 

- 🐞 修复 播放 `http` 地址放入音乐会报错 

##### Install

```
npm i esp-ai@1.14.5
```

#### Client 

- 🐞 修复 一些其他问题

##### Install
<a href="https://github.com/user-attachments/files/16347295/esp-ai-1.2.1.zip">esp-ai Arduino依赖库 点击下载</a>



## 2024-7-22 Server@1.14.4 Client@1.2.0 

#### Server

- 🐞 修复 讯飞llm服务返回报错后框架未将错误输出

##### Install


```
npm i esp-ai@1.14.4
```

#### Client

- 💄 优化 稳定性提示
 
##### Install
<a href="https://github.com/user-attachments/files/16323083/esp-ai-1.1.0.zip">esp-ai Arduino依赖库 点击下载</a>

## 2024-07-21 

#### Server v1.14.3

- 🆕 Added the music player function
- 🐞 fixed no longer waking up after the first wake up


#### Client v1.2.0

- 💄 Stability optimization Tips


## 2024-07-20

#### Server v1.13.2

- 🆕 Added callback after speech recognition is complete.
- 🆕 Added vad_eos speech recognition silence time configuration.
- 🤔 Refactored TTS plugin parameters, separating any framework-coupled concepts (greatly reducing plugin encapsulation difficulty).
- 🤔 Refactored IAT plugin parameters, separating any framework-coupled concepts (greatly reducing plugin encapsulation difficulty).
- 🤔 Refactored LLM plugin parameters, separating any framework-coupled concepts (greatly reducing plugin encapsulation difficulty).
- 🤔 Extended the silence time when the user is not speaking.
- 💄 Improved error prompts for some configurations.
- 🐞 Fixed an issue where the first wake-up might prevent subsequent wake-ups.
- 🐞 Fixed potential confusion during conversations.

#### Client v1.0.0

- 🤔 Changed the parameter types of `esp_ai.onEvent()` to `String` for easier usage (e.g., directly using `==` to judge commands).
- 💄 Improved voice wake-up accuracy.

## 2024-07-13

- 🆕 Added plugin development functionality, supporting custom plugins for the server.
- 🆕 Added client speaker sampling rate configuration.
- 🆕 Added Dolphin voice-over plugin `TTS`, supporting various voice tones. For details, see: https://www.ttson.cn/
- 💄 Improved audio stream splitting to reduce client speaker noise.
- 💄 Improved conversation fluency.
- 💄 Added a prompt sound before Xiao Ming listens.

## 2024-07-09

#### v1.0.0

- ✨ Refactored client code to header file format.
- 🆕 Added Volcano Engine `TTS` integration.
- 🐞 Fixed an error when calling non-3.5 versions of `iFLYTEK LLM`.
- 🐞 Fixed some server bugs.

## 2024-07-01

#### v0.0.1

- 🆕 Released the test version.
# Change Logs


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
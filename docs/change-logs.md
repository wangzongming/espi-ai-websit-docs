# 升级日志


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

#### 服务端 v1.14.3

- 🆕 新增 音乐播放功能  
- 🐞 修复 第一次唤醒后再也唤醒不了



#### 客户端 v1.2.0

- 💄 优化 稳定性提示
- 
## 2024-07-20 

#### 服务端 v1.13.2

- 🆕 新增 语音识别完毕后增加回调  
- 🆕 新增 vad_eos 语音识别静默时间配置  
- 🤔 调整 重构 TTS 插件的形参，分离插件中任何与框架耦合的概念(极大降低插件封装难度) 
- 🤔 调整 重构 IAT 插件的形参，分离插件中任何与框架耦合的概念(极大降低插件封装难度) 
- 🤔 调整 重构 LLM 插件的形参，分离插件中任何与框架耦合的概念(极大降低插件封装难度)  
- 🤔 调整 延长听不见用户说话的静默时间 
- 💄 优化 部分配置在错误情况下增加提示
- 🐞 修复 有时候第一次唤醒后再也唤醒不了 
- 🐞 修复 对话时可能会混乱 

#### 客户端 v1.0.0  

- 🤔 调整 `esp_ai.onEvent()` 中的两个形参类型为 `String` 类型，更加方便使用 (如使用 `==` 直接判断命令)
- 💄 优化 语音唤醒准确度 



## 2024-07-13 

- 🆕 新增 插件开发功能，支持为服务端开发自定义的插件
- 🆕 新增 增加客户端扬声器采样率配置
- 🆕 新增 海豚配音插件 `TTS`，支持众多音色，详情见：https://www.ttson.cn/
- 💄 优化 音频流拆分，减少客户端喇叭杂音 
- 💄 优化 对话过程的流畅性  
- 💄 优化 小明同学聆听前会发出提示音  


## 2024-07-09
#### v1.0.0  

- ✨ 重构 客户端代码，改为头文件形式。
- 🆕 新增 火山引擎 `TTS` 接入 
- 🐞 修复 调用 `讯飞LLM` 非3.5版本时报错 
- 🐞 修复 服务端部分bug 


## 2024-07-01
#### v0.0.1
- 🆕 新增 测试版发布啦  

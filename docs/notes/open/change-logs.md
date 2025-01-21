---
title:  升级日志
createTime: 2024/07/18 22:10:12
permalink: /change-logs/
--- 

## 发布周期

ESP-AI 遵循 [Semantic Versioning 2.0.0](Shttps://semver.org/lang/zh-CN/) 语义化版本规范。

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每三个月内发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。


ESP-AI 承诺在非必要情况下，我们绝不做破坏性更新！   
我们会制定好每一个版本的发布计划，会在QQ群内公告。

 
## 2025/1/18 Server@2.41.30 - Client@2.41.30


### Server 
 
- 🐞 修复 用户指令问题。
                   
**Install**

```bash
npm i esp-ai@2.41.30
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.41.30
```

### Client 
 
- 🆕 新增 增加开放平台额度不足提示、超体未启用提示、额度卡不存在提示  
- 🐞 修复 `ASR` 中可能包含部分问候语，导致意图识别等出现 `bug`  


**Install**

请到仓库发布页面自行下载最新版客户端：[发行页面](https://github.com/wangzongming/esp-ai/releases)   



## 2025/1/10 Server@2.41.27 - Client@2.40.29

### Server 

- 💄 优化 部分问题
- 🐞 修复 内置讯飞 ASR 插件无法使用的问题

                   
**Install**

```bash
npm i esp-ai@2.41.27
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.41.27
```

### Client 
 
- 💄 优化 部分问题      


**Install**

请到仓库发布页面自行下载最新版客户端：[发行页面](https://github.com/wangzongming/esp-ai/releases)   


 
## 2025/1/8 Server@2.41.24 - Client@2.40.28
 

### Server 

- 💄 优化 日志输出增加毫秒     
- 🐞 修复 音频播放不完整（特别是讯飞服务表现尤其明显）

                   
**Install**

```bash
npm i esp-ai@2.41.24
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.41.24
```

### Client 
 
- 💄 优化 增加更多语音播报     
- 💄 优化 缩小按钮按下所需时间     
- 🐞 修复 不接按钮时会自动重置网络  
- 🐞 修复 打断会发偶数次不好使。  


**Install**

请到仓库发布页面自行下载最新版客户端：[发行页面](https://github.com/wangzongming/esp-ai/releases)   







## 2025/1/7 Server@2.40.23 - Client@2.38.26
 

### Server 
                                    
- 🆕 新增 `f_reply、iatDu、sleep_reply` 可设置为 `false`，以关闭相应的提示音          
- 🆕 新增 `llm` 的 `sendToClient` 可传入文本来替换`llm`的推理数据         
- 🤔 调整 设备`iatDu` 默认为 `false`， 因为问候语加提示音有一些冗余了，所以默认不开启提示音。    
- 💄 优化 音频流发送逻辑优化。                             
- 💄 优化 降低 TTS 插件一些不必要逻辑，不需要再返回 `Promise`。                   

                   
**Install**

```bash
npm i esp-ai@2.40.20
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.40.20
```

### Client 
           
- 🆕 新增 开放内置语音唤醒。                                               
- 🆕 新增 按住按钮唤醒并对话的方式，与 folotoy 魔盒一致(唤醒方式增加  pin_high_listen、 pin_low_listen)。                   
- 🆕 新增 增加硬件 vad_first、vad_course 设置，非噪音环境下会优先使用硬件 vad 检测，而噪音环境下正常走服务 vad 检测。            
- 🆕 新增 `.clearData()` 方法，用于清除设备的所有数据。                          
- 🆕 新增 `reset_btn_config` 配置，用于配置：连续按五次按钮删除设备配网信息。默认使用对话按钮的配置。                       
- 🆕 新增 `.onRepeatedlyClick()` 方法用于监听连续按5次按下，然后执行自定义操作。默认内部执行清除配网信息和其他的储存数据。    
- 🆕 新增 各个环节增加语音提示，如：请帮我配网、等等...                                              
- 🤔 调整 设备`ID`改用 `eFuse MAC`。
- 💄 优化 响应速度进行深度优化                                
- 💄 优化 位置上报异步执行，避免等待上报位置后才开始执行程序。                       
- 💄 优化 重写本地数据存储逻辑。
- 💄 优化 配网页面 `UI` 优化。
- 💄 优化 语音唤醒方式下，用户说话过程中不应该触发唤醒设备。
- 💄 优化 `WIFI` 扫描很慢的问题，新版在您打开配网页面时几乎也就扫描完毕了。
- 💄 优化 音量控制旋钮精度优化。                                       
- 💄 优化 大量代码优化                
- 💄 优化 更新库 arduino-audio-tools 至 v1.0.1 版本                      
- 💄 优化 更新库 arduino-libhelix 至 v0.8.6 版本   
- 💄 优化 对话流畅度                               
- 💄 优化 常用音频硬件中进行缓存             
- 💄 优化 指示灯颜色优化                                                                                 
- 🐞 修复 `WIFI` 连接时必须要等待 10s 的 bug。           
- 🐞 修复 `WIFI` 连接偶尔还是会失败的 bug。   
- 🐞 修复 讯飞 asr 打断后录音一直报音频解析失败的错误。                                     
- 🐞 修复 按钮低电平唤醒无效的 bug。                                     
- 🐞 修复 重启设备时，偶尔存在杂音 
- 🐞 修复 串口发送 `start` 无法唤醒的问题 

**Install**

请到仓库发布页面自行下载最新版客户端：[发行页面](https://github.com/wangzongming/esp-ai/releases)   




## 2024/12/19 Server@2.35.23

### Server 
- 🆕 新增 内置 ESP-AI-LLM、ESP-AI-TTS、ESP-AI-ASR 插件用于请求开放平台提供的AI服务         
- 💄 优化 优化一些其他问题                                         

**Install**

```bash
npm i esp-ai@2.35.23  --registry=https://registry.npmmirror.com 
```

**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.35.23  --registry=https://registry.npmmirror.com 
```


### Client 

未作升级，继续使用上一个版本。


## 2024/12/1 Server@2.33.19 - Client@2.17.6

⚠️⚠️⚠️⚠️⚠️ 

请注意： 
本次升级后需要重新连接 esp32s3 开发板与天问 asrpro 的引脚连接，详情见下！

⚠️⚠️⚠️⚠️⚠️

### Server 

- 💄 优化 优化弱网情况下音频流卡顿情况。                             
- 💄 优化 优化音频流传输逻辑，对话更流畅，不再限制 `TTS` 和音频播放的采样率                            
- 💄 优化 优化一些其他问题   
-                                       
**Install**

```bash
npm i esp-ai@2.33.19
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.33.19
```

### Client 

- ⚠️ 调整 `天问唤醒/串口唤醒`默认使用 `UART2(rx:12, tx:11)` 引脚可改，见硬件接线表页面说明，避免上传代码冲突并且还会与部分开发板调试串口冲突的问题 (本次升级需要重新焊接ASR引脚 pb6->IO11，pb5->IO12)
- 💄 优化 采集音频编码为 mp3 在上传到服务器。                           

**Install**

请到仓库发布页面自行下载最新版客户端：[发行页面](https://github.com/wangzongming/esp-ai/releases)   





## 2024/11/17 Server@2.30.19 - Client@2.15.6

### Server 

-  🤔 调整 讯飞语音识别静默时间，默认是 2.5s ，改为 1.5s 秒。提高对话响应速度。


**Install**

```bash
npm i esp-ai@2.30.19
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.30.19
```

### Client 

未作升级，继续使用上一个版本。



## 2024/11/16 Server@2.29.19 - Client@2.15.6

### Server 

-  🤔 调整 讯飞 `LLM` 跟随官网调整，删除 `V2.1`, 增加 `max-32k`、`pro-128k`。


**Install**

```bash
npm i esp-ai@2.29.19
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.29.19
```

### Client 

- 🆕 新增 增加 `ext6`、`ext7` 扩展字段。用于适应更复杂的配网页面 
- 💄 优化 电位器改变音频的稳定性

**安装**
请到仓库发布页面自行下载最新版客户端：https://github.com/wangzongming/esp-ai/releases   

需要下载的文件名字 `esp-ai-2.15.6.zip`




## 2024/11/15 Server@2.28.19 - Client@2.13.6

### Server 

- 🆕 新增 `onDeviceConnect` 配置参数中新增 `client_params`，用于获取连接设备传递来的参数
- 🆕 新增 `pinMode` 方法，用于使用 `Nodejs` 来控制硬件 `IO`   
- 🆕 新增 `digitalWrite` 方法，用于使用 `Nodejs` 来控制硬件 `IO` 
- 🆕 新增 `digitalRead` 方法，用于使用 `Nodejs` 来控制硬件 `IO` 
- 🆕 新增 `analogWrite` 方法，用于使用 `Nodejs` 来控制硬件 `IO 
- 🆕 新增 `analogRead` 方法，用于使用 `Nodejs` 来控制硬件 `IO`
- 🆕 新增 内置指令配置新增 `__io_high__` 和 `__io_low__` 实现配置即可控制引脚高低电平和`PWM`  
  
**Install**

```bash
npm i esp-ai@2.28.19
```
**docker Install**
```bash
docker exec -it esp-ai-server  npm i esp-ai@2.28.19
```

### Client 

- 🆕 新增 配合服务端调整，接收服务指令来控制引脚  
- 🤔 调整 高低电平唤醒(按钮唤醒)方式默认将引脚电平拉低。  

**安装**
请到仓库发布页面自行下载最新版客户端：https://github.com/wangzongming/esp-ai/releases   

需要下载的文件名字 `esp-ai-2.13.6.zip`




## 2024/11/14 Server@2.21.19 - Client@2.11.6
 
### Server 

- 🆕 新增 is_clone 配置，用于特殊指定音色是否为克隆的(如火山克隆音色)  
- 🐞 修复 火山 llm_params_set 配置无效  
- 🐞 修复 提示音 du 不生效 
  
##### Install

```bash
npm i esp-ai@2.21.19
```
docker Install
```bash
docker exec -it esp-ai-server npm i esp-ai@2.21.19
# 安装完后记得重启： docker exec -it esp-ai-server pm2 reload all
```

### Client 

- 🐞 修复 有时候连接wifi会失败然后自动进入配网状态，但是重启又能连上网的问题  

##### Install

请到仓库发布页面自行下载最新版客户端：https://github.com/wangzongming/esp-ai/releases   

需要下载的文件名字 `esp-ai-2.11.6.zip`




## 2024/11/10 Server@2.20.17 - Client@2.11.5

### [Server](https://espai.fun/change-logs/#server)
🐞 修复 就算不说话也会识别出嗯嗯啊啊的问题

### [Client](https://espai.fun/change-logs/#client)
未做升级，继续使用  Client@2.11.5



## 2024/11/8 Server@2.20.16 - Client@2.11.5
 
本次升级需要注意，需要重新下载依赖包替换到您的 Arduino `libraries` 文件夹中（必须使用下载的压缩包进行替换）。   
Arduino IDE 配置也发生了一些变化，请参见： [客户端环境](/guide/client-dev/)


### Server 

- 🆕 新增 内置支持火山大模型语音合成/克隆
- 🆕 新增 音频支持 16k/24k 播放
- 🆕 新增 实例方法 `.stop` 来手动停止会话
- 🆕 新增 实例方法 `.getLLMHistorys` 来获取 `LLM` 上下文
- 🆕 新增 实例方法 `.setLLMHistorys` 来手动设置 `LLM` 上下文
- 🆕 新增 实例方法 `.restart` 可在服务端直接让设备重启
- 🆕 新增 实例方法 `.getLocalData / .setLocalData` 可在服务端直接调用客户端的这两方法
- 🆕 新增 实例方法 `.tts` 可在服务端实现将文字转语音输出
- 🆕 新增 实例方法 `.setWifiConfig` 用于在服务端直接设置客户端wifi和存储于本地的数据
- 🆕 新增 实例方法 `.getClients` 获取连接了的所有设备, 或者指定设备ID的设置
- 🆕 新增 实例方法 `.updateClientConfig`  更新客户端配置也就是 `gen_client_config` 配置返回出来的数据 
- 🆕 新增 实例方法 `.matchIntention`  用于手动调用用户指令
- 🆕 新增 实例方法 `.isPlaying`  获取设备是否正在播放音频
- 🆕 新增 配置 `logs` 配置项，用于自定义日志处理
- 💄 优化 对话打断更加流畅
- 💄 优化 对话流程稳定性优化
- 💄 优化 响应速度优化
- 💄 优化 音频流下发逻辑
- 💄 优化 所有 `TTS` 音频流采用 mp3 格式，传输量降低 80% 左右,服务播放压力也相应降低
- 🤔 调整 `auth`、`gen_client_config` 配置破坏性调整：改为字面量对象形式，并且增加客户端参数等等。
- 🤔 调整 `auth` 授权失败后，5s 后才进行断开，防止用户无休止请求
- 🐞 修复 有时候可能播放的句子不完整
- 🐞 修复 火山引擎有时候返回的空白 `TTS` 流会导致报错的问题
- 🐞 修复 客户端直接拔电会导致所占用的服务资源无法正确释放
- 🐞 修复 一些其他问题...


### Client 

- 🆕🤔 新增 服务配置(`ESP_AI_server_config`)在前面增加 `protocol` 参数，用于设置连接的服务协议【破坏性更新 请检查您的代码】
- 🆕🤔 新增 wifi配置(`ESP_AI_wifi_config`)在最后面增加一个配网页面参数(html_str)，用于自定义配网地址 
- 🆕 新增 实例方法 `.tts` 可在硬件端实现将文字转语音输出
- 🆕 新增 实例方法 `.stopSession` 可在硬件端实时停止会话
- 🆕 新增 实例方法 `.onBindDevice` 回调用于业务绑定设备(配网成功后会执行一次)
- 🆕 新增 实例方法 `.getLocalData / .setLocalData` 方法用户向芯片中存储一些业务数据
- 🆕 新增 实例方法 `.onSessionStatus` 用于监听用户会话状态
- 🆕 新增 实例方法 `.onPosition` 用于监听设备物理坐标
- 🆕 新增 `.onEvent` 可以监听到会话中的文字
- 🆕 新增 间隔 10s 会向服务端发送心跳包，防止连接断开
- 🆕 新增 音量配置增加 `volume_config.enable` 参数，默认为 `false` 防止`debug`模式下出现大量报错
- 💄 优化 配网页面中 `wifi` 名称改为下拉
- 🤔 调整 如果用户指定了服务地址，那就不在进行使用配网页面的 `api_key` 去请求开放平台(旧版需要手动清除这个key)
- 🤔 调整 `wifi` 配置中配网页面 html 字符串类型进行破坏性调整：改为 string 类型，使用更加方便
- 🐞 修复 `.setVolume` 方法调用传入 0-1 的数值无效  
- 🐞 修复 配网时特殊字符会失败的问题  
- 🐞 修复 一些其他问题...





## 2024-9-3 Server@2.1.2 Client@2.0.1

### Server 
- 💄 优化 一些配置错误也会向客户端下发通知，在客户端错误捕捉中可以直接拿到信息 
- 🐞 修复 plugins 不配置的情况下会直接报错  
- 🐞 修复 自定义指令执行后会被唤醒两次 

### Client 

🐞 修复 wifi 密码配置后无效


## 2024-9-1 Server@2.0.0 Client@2.0.0  

🔥🔥🔥 `ESP-AI` 生态中新增一名新成员：`ESP-AI 开发者平台`

🔥🔥🔥 网址：`https://dev.espai.fun`

🔥🔥🔥 开发者平台中功能：提供免费服务、可视化配置服务、各种在线工具...

### Server 

- 🔥 新增 错误捕捉到后会回馈到客户端，客户端可以参照错误对照表进行相关错误提示。
- 🔥 新增 内置火山引擎 `LLM` (可接入豆包等) 
- 🔥 新增 服务下的每个用户都可以拥有一套独立的配置  
- 🔥 优化 `TTS` 任务机制，增量字数转换，在解决TTS服务付费焦虑的同时让对话更加连贯快速。
- 🔥 优化 音频播放中可以读取到 llm 对话历史，并且支持控制开始时间等等
- 🆕 新增 `connected_reply` 配置，用于更改服务连接后的提示语 
- 🆕 新增 服务启动时输出所有配置项，方便用户清楚的知道用的什么服务
- 🆕 新增 异常捕捉处理，防止未使用 `pm2` 等方式运行时服务报错直接挂掉。
- 🤔 调整 删除 `api_key` 配置，使用 `iat_config、llm_config、tts_config` 代替。(因为全部放到`api_key`太过于迷惑) 
- 🤔 调整 修改服务默认端口为 `8088`（因为`8080`冲突概率极大）
- 🤔 调整 其他部分配置，详情见文档
- 💄 优化 更换更好的开始会话前提示音
- 🐞 修复 断句会存在和上一句出现重复的问题  
  
##### Install

```bash
npm i esp-ai@2.0.0
```
docker Install
```bash
docker exec -it esp-ai-server npm i esp-ai@2.0.0
# 安装完后记得重启： docker exec -it esp-ai-server pm2 reload all
```

### Client 

- 🔥 新增 支持搭配 `ESP-AI 开发者平台`连接，实现超简单个人与企业的AI对话方案解决. 只需在配网页面填入一个 `api_key` 即可
- 🔥 新增 `.onError` 统一错误捕捉回调，开发者可根据错误码来决定怎么提示用户
- 🔥 新增 `.onConnectedWifiCb` 用于监听设备连接 `wifi` 成功，形参中可以直接拿到 `ip` 地址
- 🔥 新增 配网设置页面，并且页面支持自定义，除了` wifi `信息外还提供额外的扩展字段用于保存自己的业务数据
- 🔥 新增 对话过程可打断，通过呼喊`小明同学`重新开始会话 
- 🔥 新增 新增多种内置唤醒方案：`引脚高低电平唤醒`、`天问模块唤醒`、`串口字符串唤醒`，直接配置就可使用。
- 🔥 新增 `.onNetStatus` 统一状态回调，设备连接wifi、连接服务等状态都可以在回调中统一获取
- 🔥 新增 `.onAPInfo` 设备打开热点后回调，在这个回调中你应该提示用户打开配网页，回调形参中可以拿到热点所有信息。 
- 🆕 新增 `setWifiConfig` 用于手动设置`wifi`信息 
- 🆕 新增 每个设备初始化时都会生成一个 UUID，在需要时可以拿到。 相当于`sn`码
- 🤔 调整 配置顺序调整，不必要的参数放后面可留空不配置  
<!-- - 🤔 调整 唤醒方案优化，精度提升至 60%（后续将继续优化） -->
- 🤔 调整 内置语音唤醒方案暂时推迟到未来的3个左右的版本发布（由于精度优化过于耗费时间，所以需要单独在做一次升级）。
- 💄 优化 美化控制台输出
- 💄 优化 重构客户端代码
- 🐞 修复 某些环境中上传代码会报错 `LED_BUILTIN` 未定义 
- 🐞 修复 一些其他问题...

##### Install
请到仓库发布页面自行下载最新版客户端：https://github.com/wangzongming/esp-ai/releases   

需要下载的文件名字 `esp-ai-xxx.zip`



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

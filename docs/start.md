# 快速开始

## ESP-AI 是什么？

`ESP-AI`为你的开发板提供全套的AI对话方案，包括但不限于 `ESP32` 系列开发板的 `IAT(ASR)+LLM+TTS` 集成方案。依赖式注入到项目，不影响现有项目。

为什么说包括但不限于`ESP32`开发板呢？因为即使你的另一块开发板使用的是其他开发板，你也可以用`ESP32`来基于本项目搭建`AI`服务，并且使用串口通信方式来将指令或者对话发送到你的另一块开发板。


## ESP-AI 能做什么？
我们设想这样的一个场景，你手里有一个机器人，他可以做一些固定的动作，但是你想和它进行交流，并且让它可以理解你的一些指令。如果你要从零开始实现这套流程，那你讲会从收集麦克风的音频流开始，然后进入无休止的调试...

现在有了`ESP-AI`你大可不必这么做了，你只需要引入`ESP-AI`即可，对于**离线语音唤醒、语音识别、大语言模型调用、文字转语音、喇叭输出音频**等流程都已经帮你实现好了，而且`ESP-AI`使用插件式设计框架，上述中的每一个步骤都提供了扩展方法，让你可以随意定制你的产品。

## ESP-AI 技术栈

- **在软件方面**：本项目服务端代码基于 `Nodejs`，硬件代码基于 `Arduino`。服务端虽然基于`Nodejs`进行开发，但是也提供其他编程语言编写插件，详情见插件开发章节。

- **在硬件方面**：本项目主要基于`ESP`系列的开发板进行运行。

## 特性

- ✔️ 可定制的离线语音唤醒
- ✔️ IAT(ASR) ➡️ LLM/RAG ➡️ TTS
- ✔️ 用户指令识别(家电控制、唱歌等)
- ✔️ 配置化
- ✔️ 插件化
- ✔️ 服务与客户端为一对多关系
- ✔️ 服务端鉴权 
- ✔️ 流式数据交互 
- ✔️ 开箱即用

## 下一步计划
 
- 🤔 唤醒精准度提升
- 🤔 提供无代码接入方案
- 🤔 用户意图推理过程加入AI（如： 帮我关灯、快开灯，都将识别为: "开灯" 指令）
- 🤔 提供免费测试服务
- 🤔 唤醒词在线生成
- 🤔 其他语言编写插件的方法（避免只能使用nodejs进行开发插件）
- 🤔 提供专用开发板（避免当前的复杂接线）

## 开发环境准备

### 本地开发环境准备
后续升级仅需在<a target="_block" href="https://github.com/wangzongming/esp-ai/releases">发布页面</a>下载相关文件即可，下面的依赖文件只是首次需要安装。

docker 镜像或者window懒人包安装服务端时不需要 `Nodejs` 环境。

| 环境           | 版本    | 备注                                                                                                                               |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Nodejs`       | >= v18.x 建议18.x   | npm版本需要低于10.x, 6.x到9.x都行  |
| `VsCode IDE`   | 最新版  |                                                                                                                                    |
| `Arduino IDE`  | >= v2.x |                                        |
| `esp` 开发板   | v2.x    | `Arduino IDE` 中搜索安装`esp`开发板                                                                                                |
| 硬件代码依赖库 | 最新版  | 需将`Github` 仓库中 `/client/libraries` <br/>中的插件导入到IDE插件中，<br/>默认位置在`C:\Users\用户名\Documents\Arduino\libraries` |

#### 硬件代码依赖库说明
| 文件名                         | 备注                                               | 版本   |
| ------------------------------ | -------------------------------------------------- | ------ |
| arduino-audio-tool             | https://github.com/pschatzmann/arduino-audio-tools |        |
| WebSockets                     | 新版IDE可以直接搜索安装                            | v2.4.0 |
| Arduino_JSON                   | 新版IDE可以直接搜索安装                            | v0.2.0 |
| esp-ai                         | esp-ai 暂时不可搜索安装                            |        |
| xiao_ming_tong_xue_inferencing | 离线语音识别模型  暂时不可搜索安装                 |        |

### 讯飞 KEY 申请

注册网址：https://console.xfyun.cn/services/iat  

`ESP-AI` 完整内置对接了讯飞的 `IAT`、`LLM`、`TTS` 服务，所以在开始用自己服务前可以先用讯飞的来测试。


<!-- 1. 安装服务端插件
2. 将插件引入你的项目中，配置好相关的`key`并运行
3. 将提供的客户端代码烧录到 `ESP32s3` 开发板中(需将/client/libraries 中的插件导入到IDE)

# 所需环境 

 -->


## 客户端

硬件端这里成为客户端

### 硬件代码 - Arduino

1. 创建一个文件 `example/example.ino` ，注意：文件必须放到一个文件夹里，文件夹名字必须和文件一样
2. 用 `Arduino IDE` 打开 `example.ino` 文件
3. 写入下面代码，然后上传到开发板中
``` c
#include <esp-ai.h>

ESP_AI esp_ai;
// [必  填] 是否调试模式， 会输出更多信息
bool debug = true;
// [必  填] wifi 配置： { wifi 账号， wifi 密码 }  注意：要用双引号！
ESP_AI_wifi_config wifi_config = { "oldwang", "oldwang520" };
// [必  填] 服务配置： { 服务IP， 服务端口, "请求参数，用多个参数&号分割，最大256字节" }
ESP_AI_server_config server_config = { "192.168.1.5", 8080, "api-key=your_api_key&p2=test" };
// [必  填] 离线唤醒方案：{ 方案, 识别阈值 }, "edge_impulse" | "diy"，为 "diy" 时可调用 esp_ai.wakeUp() 方法进行唤醒
ESP_AI_wake_up_config wake_up_config = { "edge_impulse", 0.7 };

// [可留空] 麦克风引脚配置：{ bck_io_num, ws_io_num, data_in_num }
ESP_AI_i2s_config_mic i2s_config_mic = { 4, 5, 6 };
// [可留空] 扬声器引脚配置：{ bck_io_num, ws_io_num, data_in_num, 采样率 }
ESP_AI_i2s_config_speaker i2s_config_speaker = { 16, 17, 15, 16000 };
// [可留空] 音量调节配置：{ 输入引脚，输入最大值(1024|4096)，默认音量(0-1) }
ESP_AI_volume_config volume_config = { 34, 4096, 0.5 };
 

void setup() {
  Serial.begin(115200);
  // 开始运行 ESP-AI
  esp_ai.begin({ i2s_config_mic, i2s_config_speaker, wifi_config, server_config, wake_up_config, volume_config, debug }); 
}

void loop() {
  esp_ai.loop(); 
}
```

### 硬件代码 - IDF

``` c
// 开发中 ...
```

### 硬件物料 

| 硬件           | 数量 | 价格 |
| -------------- | ---- | ---- |
| esp32s3(N16R8) | 1    | 25   |
| INMP441        | 1    | 8    |
| Max98357A      | 1    | 5    |
| LED            | 1    | 0.5  |
| 小喇叭         | 1    | 6    |
| 面包板         | 1    | 5    |
| 杜邦线         | 若干 | 1    |


### 硬件接线 - ESP32-S3
 
| ESP32-s3 | INMP441 | Max98357A | 电位器(可选) | LED(可选) |
| -------- | ------- | --------- | ------------ | --------- |
| 3v3      | VDD     | VDD       | VDD          |           |
| GND      | GND     | GND       | GND          | GND       |
| GND      | L/R     |           |              |           |
| 4        | SCK     |           |              |           |
| 5        | WS      |           |              |           |
| 6        | SD      |           |              |           |
| 15       |         | DIN       |              |           |
| 16       |         | BCLK      |              |           |
| 17       |         | LRC       |              |           |
| 34/35    |         |           | OUT          |           |
| 18       |         |           |              | 正极      |

接线图待补充...


### 硬件接线 - XIAOESP32S3
开发中...

### 硬件接线 - nodemcu32s
开发中...

## 服务端

服务端用于向硬件(客户端)提供服务，用于调用 `LLM`、`IAT`、`TTS` 等服务，并且可以方便向外提供扩展等。
与客户端是一对多的关系，也就是说一台服务能够供多个客户端连接。

### 服务端代码 - Node.js

1. 继续在上面创建的 `example` 目录中创建一个文件 `index.js` 
2. 在 `index.js` 中添加以下代码：
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
3. 安装服务端依赖
<CodeGroup>

  <CodeGroupItem title="yarn">

```bash:no-line-numbers
yarn add esp-ai
```

  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash:no-line-numbers
npm install esp-ai
```

  </CodeGroupItem>
  
  <CodeGroupItem title="pnpm">

```bash:no-line-numbers
pnpm install esp-ai
```

  </CodeGroupItem>
</CodeGroup>

4. 运行服务
```
# 生产环境中请使用 pm2 来运行服务以保证服务的可靠和性能： pm2 start ./index.js -i max 
node ./index.js
```

### Docker 方式安装

- 我们将容器命名为：`esp-ai-server`
- 配置文件放到`/esp-ai-server/index.js` **(请先手动创建好这个文件)**
- 宿主机端口为`8080`

注意：上面这三个配置只能更改宿主机的，镜像的必须如下写死。
 
#### 运行容器
必须先手动创建好 `/esp-ai-server/index.js` 文件，该文件案例在仓库的 `example/index.js` 目录下。
```bash
docker run -itd -p 8080:8080 -v /esp-ai-server/index.js:/server/index.js --name esp-ai-server registry.cn-shanghai.aliyuncs.com/xiaomingio/esp-ai:1.0.0
```

配置文件将映射到了`/esp-ai-server/index.js`，需要自行更改配置文件，更改文件后重启服务即可：
```bash
docker exec -it esp-ai-server pm2 restart all
```

#### 容器内安装插件
直接在容器内执行安装插件的命令
```bash
docker exec -it esp-ai-server yarn add [插件名字]
```

然后自行修改配置文件后，依然需要重启容器
```bash
docker exec -it esp-ai-server pm2 restart all
```

#### 查看运行日志
```bash
docker exec -it esp-ai-server pm2 logs
```

#### 更新依赖
用最新的版本号替换下面代码中的版本号即可。

```bash
docker exec -it esp-ai-server yarn add esp-ai@1.15.6
```

更新完毕后需要查看`package.json`中的版本号是否正确，如果正确，则重启容器即可。
```bash
docker exec -it esp-ai-server cat ./package.json
```

### 懒人包 
实现中...


## 详细文档

- <a href="client.html">客户端详细文档</a>
- <a href="server.html">服务端端详细文档</a> 

## 最后

大喊 `小明同学` 就可以愉快的和它聊天啦！🎉

---
title: 第一个 ESP-AI 程序
createTime: 2024/11/7 21:06:45
permalink: /example/hello-world/
---

如果你是个人玩家或者新手，更推荐使用 ESP-AI 开放平台提供的固件与服务，只需要在线烧录即可，无需搭建本地复杂繁琐的环境。[ESP-AI开放平台](https://dev.espai.fun/)

在进行本案列前请确保你已经看完了[快速开始](/guide/intro/)中的环境搭建，否则环境都没有是不可能正确运行程序的。
 

## 1. Arduino 代码
```c
#include <esp-ai.h>
ESP_AI esp_ai;

void setup() {
  Serial.begin(115200);
  
  // [必  填] 是否调试模式， 会输出更多信息
  bool debug = true;

  // wifi 配置： { wifi 账号， wifi 密码 }  注意：要用双引号！ 
  // 不填则需要打开配网页面进行配网。
  ESP_AI_wifi_config wifi_config = { "", "", "ESP-AI"  };
   
  // { 服务IP， 服务端口, "请求参数，用多个参数&号分割" }
  ESP_AI_server_config server_config = { "http", "192.168.1.5", 8088, "api-key=your_api_key&p2=test" };

  // 离线唤醒方案：{ 方案, 识别阈值 }, "edge_impulse" | "diy"，为 "diy" 时可调用 esp_ai.wakeUp() 方法进行唤醒 
  ESP_AI_wake_up_config wake_up_config = {};
  strcpy(wake_up_config.wake_up_scheme, "asrpro");  // 唤醒方案
  strcpy(wake_up_config.str, "start");              // 串口和天问asrpro 唤醒时需要配置的字符串，也就是从另一个开发版发送来的字符串

  // 开始运行 ESP-AI 
  esp_ai.begin({debug, wifi_config, server_config, wake_up_config });
}

void loop() {
  esp_ai.loop(); 
}
```
 
## 2. Nodejs 代码

在目录中建立 `index.js` 文件

```js 
const espAi = require("esp-ai"); 
const config = { 
    gen_client_config: ()=>({

        // 调用讯飞语音识别
        iat_server: "xun_fei",
        iat_config: {
            // 讯飞：https://console.xfyun.cn/services/iat  。打开网址后，右上角三个字段复制进来即可。
            appid: "xxx",
            apiSecret: "xxx",
            apiKey: "xxx",  
        },

        // 调用火山引擎LLM
        llm_server: "volcengine",
        llm_config: {
            // 1. 注册：https://console.volcengine.com/ark
            // 1. 开通: https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D&tab=LLM
            // 2. 创建接入点: https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint
            apiKey: "xxx",
            epId: "ep-xxx", // 接入点ID 
        },

        // 调用火山引擎TTS
        tts_server: "volcengine",
        tts_config: {
            // 1. 注册：https://console.volcengine.com/speech/app
            // 2. 音色开通： https://console.volcengine.com/speech/service/8?AppID=6359932705
            // 3. 授权： xxx
            // 服务接口认证信息
            appid: "xxx",
            accessToken: "xxx",
            rate: 24000, //采样率，只支持 16k 或者 24k，大模型语音合成必须使用 24k
            // voice_type: "BV007_streaming", // 清切女声
            voice_type: "BV051_streaming", // 奶气萌娃
        },
        /**
         * 意图表：当用户唤醒 小明同学 后，小明同学可以做下面的任务
        */
        intention: [ 
            {
                // 关键词
                key: ["退下吧", "退下"],
                // 内置的睡眠指令
                instruct: "__sleep__",
                message: "我先退下了，有需要再叫我。"
            }
        ],

    })
};

const espAiIns = espAi(config);

```
## 3. 运行服务
运行服务（在目录中打开命令行工具执行下面代码）
```
node ./index.js
```


## 4. 配网

如果 `Arduino` 代码中你已经写好了 `wifi` 信息，那这一步是不需要的。因为设备上电会自动连接 `wifi`。

`Arduino` 代码上传后，查看串口输入日志中的热点地址(`192.168.4.1`)，然后连接开发板热点，然后打开地址进行配网。

 



## 视频教程

录制中...
<!-- @[bilibili](BV1EZ42187Hg) -->
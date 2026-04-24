---
title: オリジナルのESP-AIプログラム
createTime: 2024/11/7 21:06:45
permalink: /ja/example/hello-world/
---

初心者向けパーソナルアプリケーション、ESP-AIオープンプラットフォームが提供するためとサービスを利用することをお勧めします。雑で面流なローカル環境をセットアップする近く、オンラインで书き入れるだけで済みます。 [ESP-AI开放平台](https://dev.espai.fun/)

このケースに入る前に、[快速开始](/guide/intro/) の環境設定を読んで中に確認してください。そうしないと、環境が必要なプログラムを正しく実行できません。

この機会に、Tianwen は目を覚ますために使用されます。配線は正しく、配線が確認されました。[硬件接线](/guide/1e7b8i8e/)


## ビデオチュートリアル
@[ビリビリ](BV187mzYDECh)


## 1. Arduino コード
```c
/**
 * 本案例演示: 连接自定义服务和固定 wifi
 * 注意：配置值要用双引号！ 
 **/

#include <esp-ai.h>

ESP_AI esp_ai;

void setup()
{
  Serial.begin(115200);
  // [必  填] 是否调试模式， 会输出更多信息
  bool debug = true;
  // [必  填] wifi 配置： { wifi 账号， wifi 密码, "热点名字" } 可不设置，连不上wifi时会打开热点：ESP-AI，连接wifi后打开地址： 192.168.4.1 进行配网(控制台会输出地址，或者在ap回调中也能拿到信息)
  ESP_AI_wifi_config wifi_config = {"test2", "12345678", "ESP-AI"};
  // [可 填] 服务配置： { 服务协议, 服务IP， 服务端口, "[可选] 请求参数" }
  ESP_AI_server_config server_config = {"http", "192.168.3.23", 8088};
  // [必  填] 唤醒方案： { 方案, 语音唤醒用的阈值(本方案忽略即可), 引脚唤醒方案(本方案忽略), 发送的字符串 }
  ESP_AI_wake_up_config wake_up_config = { "asrpro", 1, 10, "start" };   
  // 启动
  esp_ai.begin({debug, wifi_config, server_config, wake_up_config });
}

void loop()
{
  esp_ai.loop();
}

```
 
## 2. Nodejs コード

`index.js` します


iFlytek や Huoshan などのサードパーティのサービスを利用することもできます。詳細については、[内置的官方/讯飞/火山/阿里等服务配置](/example/builtin-server/)をご参照ください。

```js 
const espAi = require("esp-ai"); 
const config = { 
    gen_client_config: ()=>({
          // 官方 ASR 服务配置 
        iat_server: "esp-ai-asr",
        iat_config: {
            // 开放平台秘钥
            api_key: "xxx",

            // 等待用户首次说话时间(被唤醒后，多少时间检测不到说话就自动退下，单位 ms， 默认: 5000)
            // vad_first: 5000,
            // 对话过程中等待用户说话时间(对话过程中，多少时间检测不到说话就自动退下，单位 ms， 默认: 2000)
            // vad_course: 2000,
        }, 

        // 官方 LLM 服务
        llm_server: "esp-ai-llm",
        llm_config: { 
            // 开放平台秘钥
            api_key: "xxx",
            
            // [可选] 使用的大模型, 默认使用 qwen2.5:32b 
            // model: "wizardlm2",
        },

        // 官方 TTS 服务
        tts_server: "esp-ai-tts",
        tts_config: {  
            // 开放平台秘钥
            api_key: "xxx",
            // [可选] 音色ID，默认使用小明音色，到 ESP-AI 开放平台中可以轻松克隆音色或者使用别人的音色
            // reference_id: "f209d2acacfc407e95dedc91fe1b9741", 
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
## 3. サービスを実行します
サービスを実行します (ディレクトリでコマンド ライン(ツールを开き、時間のコードを実行します)。
```
node ./index.js
```


## 4. 循環ネットワーク

`Arduino` コードに `wifi` 情報をすでに入力している場合、この注意はありません。デバイスの電源がオンになると、デバイスは自動で `wifi` に接続継続されるためです。

`Arduino` (`192.168.4.1`) を確認し、开発ボードのホットスポットに开続して、ネットワークはのアドレスの使用を構成します。

 

 
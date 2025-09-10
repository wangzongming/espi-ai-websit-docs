---
title: 第一个 ESP-AI 程序
createTime: 2024/11/7 21:06:45
permalink: /example/hello-world/
---

如果你是个人玩家或者新手，更推荐使用 ESP-AI 开放平台提供的固件与服务，只需要在线烧录即可，无需搭建本地复杂繁琐的环境。[ESP-AI开放平台](https://dev.espai.fun/)

在进行本案列前请确保你已经看完了[快速开始](/guide/intro/)中的环境搭建，否则环境都没有是不可能正确运行程序的。

本案例用天问唤醒，请确认你的接线是否正确，[硬件接线](/guide/1e7b8i8e/)


## 视频教程 
@[bilibili](BV187mzYDECh)


## 1. Arduino 代码
```c
/**
 * 本案例演示: 连接自定义服务和固定 wifi
 * 注意：配置值要用双引号！ 
 **/
#include <esp-ai.h>

ESP_AI esp_ai;
 

void setup() {
  Serial.begin(115200);
  
  // [必  填] 是否调试模式， 会输出更多信息
  bool debug = true;

  // wifi 配置： { wifi 账号， wifi 密码 }  注意：要用双引号！ 
  // 不填则需要打开配网页面进行配网。填写则会自动连接wifi。
  ESP_AI_wifi_config wifi_config = { "联域科技", "lykj987654321", "ESP-AI"  };
  
  // 服务地址，用开发者平台，只需要配置为空，需要在配网页面配置。
  // ESP_AI_server_config server_config = { };
  // 或者直接秘钥配置上，这样就不用在配网页面配置了
  // 注意：设备需要和开放平台进行绑定，参见设备绑定： https://gitee.com/xm124/esp-ai-business-arduino 代码中的 esp_ai.onBindDevice 函数
  ESP_AI_server_config server_config = {"http", "node.espai.fun", 80, "api_key=开放平台秘钥"};
  // 或者配置为自己部署的服务： { 服务IP， 服务端口, "连接自己业务服务的请求参数，用多个参数&号分割，服务端用 auth 接收" }
  // ESP_AI_server_config server_config = { "http", "192.168.1.5", 8088, "p1=111&p2=test" };

  // 离线唤醒方案：{ 方案, 识别阈值 },  "diy"，为 "diy" 时可调用 esp_ai.wakeUp() 方法进行唤醒 
  ESP_AI_wake_up_config wake_up_config = { "pin_high", 1, 10 };  // 如果按钮按下是低电平，那使用 pin_low 即可 

  // 开始运行 ESP-AI 
  esp_ai.begin({debug, wifi_config, server_config, wake_up_config });

  // 模拟绑定设备，实际中的逻辑应该是由配网页面调用
  String binded = esp_ai.getLocalData("binded");
  if(binded != "1"){
    on_bind_device(); 
  }

}

void loop() {
  esp_ai.loop(); 
}


// 绑定设备到开放平台的方法参考代码
HTTPClient on_bind_device_http;
void on_bind_device()
{    
  on_bind_device_http.begin("http://api.espai2.fun/devices/add");
  on_bind_device_http.addHeader("Content-Type", "application/json");

  JSONVar json_params;
  json_params["device_id"] = get_device_id(); 
  json_params["api_key"] = "开放平台秘钥";  
  json_params["version"] = "0.0.1"; // 固件版本号, 用于 OTA 升级
  json_params["bin_id"] = "固件ID"; // 固件ID, 用于 OTA 升级
  json_params["wifi_ssid"] = "联域科技"; // wifi 账号
  json_params["wifi_pwd"] = "lykj987654321";  // wifi 密码
  String send_data = JSON.stringify(json_params);  
  int httpCode = on_bind_device_http.POST(send_data);   
  if (httpCode > 0)
  {
    String payload = on_bind_device_http.getString(); 
    JSONVar parse_res = JSON.parse(payload); 
    if (JSON.typeof(parse_res) == "undefined" || String(httpCode) != "200")
    {
      on_bind_device_http.end();   
      // 这个 json 数据中的 message 会在配网页面弹出
      Serial.println("设备绑定失败，错误码:" + String(httpCode));

      // 如果是使用 esp_ai.onBindDevice 方法，请返回这个 json 数据
      //return "{\"success\":false,\"message\":\"设备绑定失败，错误码:" + String(httpCode) + "，重启设备试试呢。\"}"
    }

    if (parse_res.hasOwnProperty("success"))
    {
      bool success = (bool)parse_res["success"];
      String message = (const char *)parse_res["message"];
      String code = (const char *)parse_res["code"];
      if (success == false)
      {  
        on_bind_device_http.end();
        Serial.println("绑定设备失败，错误原因：" + message);
 
        // 如果是使用 esp_ai.onBindDevice 方法，请返回这个 json 数据
        // return "{\"success\":false,\"message\":\"绑定设备失败，错误原因：" + message + "\"}";
      }
      else
      { 
        // 设备激活成功！ 
        on_bind_device_http.end();
        Serial.println("设备绑定成功");
        esp_ai.setLocalData("binded", "1");
        // 如果是使用 esp_ai.onBindDevice 方法，请返回这个 json 数据
        // return "{\"success\":true,\"message\":\"设备激活成功，即将重启设备。\"}";
      }
    }
    else
    { 
      on_bind_device_http.end();
      Serial.println("设备激活失败，请求服务失败！");
    }
  }
  else
  {
      Serial.println("设备激活失败，请求服务失败！");
      on_bind_device_http.end(); 
  }
}
```
 
## 2. Nodejs 代码

在目录中建立 `index.js` 文件


你也可以用第三方的服务，比如讯飞、火山的，详情见： [内置的官方/讯飞/火山/阿里等服务配置](/example/builtin-server/)

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
## 3. 运行服务
运行服务（在目录中打开命令行工具执行下面代码）
```
node ./index.js
```


## 4. 配网

如果 `Arduino` 代码中你已经写好了 `wifi` 信息，那这一步是不需要的。因为设备上电会自动连接 `wifi`。

`Arduino` 代码上传后，查看串口输入日志中的热点地址(`192.168.4.1`)，然后连接开发板热点，然后打开地址进行配网。

 

 
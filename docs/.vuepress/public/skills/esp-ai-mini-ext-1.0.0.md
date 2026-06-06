# ESP-AI Mini Ext Development Expert

## When to use this skill

Use this skill whenever the task involves:

- ESP-AI Mini Ext
- ESP-AI SDK
- ESP32-S3 AI development board
- INMP441 microphone
- MAX98357 speaker amplifier
- WS2812 RGB LED
- TFT display
- OLED display
- Voice assistant development
- AI toy development
- AI chatbot hardware
- ESP-AI ecosystem devices
- Embedded software development for ESP-AI devices
- Arduino firmware development for ESP-AI Mini Ext
- Device binding and network provisioning
- BLE WiFi provisioning
- Battery monitoring
- Character display rendering
- ESP-AI examples and demos

Automatically use this skill when users mention:

- ESP-AI
- Mini Ext
- mini-ext
- espai
- esp-ai
- ESP32-S3 voice assistant
- AI hardware development
- AI toy
- OLED version
- TFT version
- INMP441
- MAX98357
- WS2812
- Device binding
- BLE network configuration

---

## What this skill provides

This skill contains:

- Complete hardware pin definitions
- ESP-AI SDK usage guidelines
- TFT display development rules
- OLED display development rules
- Audio input/output configuration
- Battery monitoring implementation
- Device binding workflow
- BLE provisioning workflow
- WS2812 control examples
- Embedded firmware best practices

Always prioritize the information in this skill over generic ESP32 examples.

# ESP-AI Mini Ext 开发板开发规范（Skills）

## 角色定义

你是一名专业 ESP32-S3 嵌入式工程师。

当用户要求编写 ESP-AI Mini Ext 开发板程序时：

* 优先使用 ESP-AI SDK
* 优先使用 Arduino Framework
* 保持代码可直接编译运行
* 不允许虚构引脚
* 不允许猜测硬件资源
* 必须严格遵守本文档中的 IO 定义

---

# 一、开发板介绍

ESP-AI Mini Ext 是基于 ESP32-S3 的 AI 开发板。

板载资源：

* ESP32-S3
* INMP441 数字麦克风
* MAX98357 功放
* WS2812 RGB 灯
* 唤醒按键
* 电池电压检测
* TFT 或 OLED 显示屏（根据套件不同）
* ESP-AI SDK

适用于：

* AI 语音助手
* AI 玩偶
* AI 机器人
* AI 桌面助手
* ChatGPT 终端
* ESP-AI 生态设备

---

# 二、硬件资源

## 麦克风 INMP441

I2S 输入

| 功能  | GPIO |
| --- | ---- |
| SCK | 4    |
| WS  | 5    |
| SD  | 6    |

---

## 功放 MAX98357

I2S 输出

| 功能   | GPIO |
| ---- | ---- |
| DIN  | 15   |
| BCLK | 16   |
| LRC  | 17   |

---

## WS2812

| 功能  | GPIO |
| --- | ---- |
| DIN | 18   |

仅支持单颗 WS2812。

---

## 唤醒按钮

| 功能  | GPIO |
| --- | ---- |
| KEY | 10   |

按下为 HIGH。

---

## 电池电压检测

| 功能      | GPIO |
| ------- | ---- |
| BAT_ADC | 8    |

硬件分压：

300K + 100K

倍率：

4倍

计算公式：

battery_voltage = adc_voltage × 4

---

# 三、TFT 套件引脚

## SPI TFT

| 功能   | GPIO |
| ---- | ---- |
| MOSI | 42   |
| SCLK | 39   |
| CS   | 13   |
| DC   | 7    |
| BL   | 3    |


驱动：

* 1.54 寸 ST7789_DRIVER 
* 2.0 寸/2.4 寸 ST7789_2_DRIVER  
* 双目/圆屏幕驱动  1.28寸 GC9A01_DRIVER  
* 双目/圆屏幕驱动  0.71寸 GC9D01_DRIVER  

生成 TFT 示例时优先采用 TFT_eSPI。

---

# 四、OLED 套件引脚

OLED 使用 I2C。

| 功能  | GPIO |
| --- | ---- |
| SCL | 42   |
| SDA | 39   |

推荐库：

* U8g2
* Adafruit SSD1306

默认地址：

0x3C

---

# 五、扩展 IO

## TFT 版本

| GPIO |
| ---- |
| IO2  |

---

## OLED 版本

| GPIO |
| ---- |
| IO2  |
| IO3  |
| IO7  |
| IO13 |

---

# 六、ESP-AI SDK 开发规范

ESP-AI 提供完整设备接入能力。

开发时优先使用 ESP-AI SDK。

主要参考资料：
[ESP-AI 开发板配置](https://espai.fun/config-client/board-configuration/) 
[ESP-AI 设备绑定](https://espai.fun/config-client/bind/) 
[ESP-AI 设备配置](https://espai.fun/config-client/config/) 
[ESP-AI 设备实例](https://espai.fun/config-client/instance/) 
[ESP-AI 蓝牙配网](https://espai.fun/config-client/ble_net/) 
[ESP-AI Hello World](https://espai.fun/example/hello-world/) 
[ESP-AI Auth](https://espai.fun/example/auth/) 
[ESP-AI LED](https://espai.fun/example/led/) 
[硬件发送文字和ai聊天](https://espai.fun/dev/char_text/) 
[ESP-AI 电池检测](https://espai.fun/dev/battery/)

其他参考资料：
https://espai.fun/


相关模块：

## Board Configuration

作用：

开发板配置。

主要内容：

* 设备型号
* 音频配置
* 屏幕配置
* 网络配置

---

## Device Bind

作用：

设备绑定用户账号。

典型流程：

1. 获取设备ID
2. 调用绑定接口
3. 用户扫码
4. 完成绑定

参考代码

```c
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
  // 必须将 api_key 设置到本地数据,否则可能某些功能不可使用,比如 闹钟 等
  esp_ai.setLocalData("api_key", "开放平台秘钥");
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
  json_params["api_key"] = "开放平台秘钥";   // http://api.espai2.fun 获取
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

---

## Client Config

作用：

配置设备参数。

包括：

* 音量
* 亮度
* 唤醒词
* AI模型
* 系统参数

---

## Client Instance

作用：

创建 ESP-AI 客户端实例。

所有 AI 功能均依赖实例对象。

---

## BLE Network

作用：

蓝牙配网。

标准流程：

1. 开启 BLE
2. 手机连接设备
3. 发送 WiFi 信息
4. 自动联网

---

# 七、ESP-AI 示例

## Hello World

最简单示例。

功能：

* 初始化 ESP-AI
* 连接服务器
* 输出日志

适用于：

验证设备是否接入成功。

---

## Auth 示例

功能：

设备认证。

包含：

* Token
* Device ID
* 用户绑定

适用于：

正式产品开发。

---

## LED 示例

功能：

控制板载 WS2812。

GPIO：

18

示例能力：

* 呼吸灯
* 彩虹灯
* 状态灯
* AI 回复动画

---

# 八、字符显示

ESP-AI 提供字符显示组件。

适用于：

* OLED
* TFT

常见用途：

* AI 回复显示
* 聊天记录显示
* 系统状态显示
* 网络状态显示

建议：

长文本分页显示。

---

# 九、电池检测

电池 ADC：

GPIO8

分压：

300K + 100K

倍率：

4倍

示例：

float voltage = analogRead(8) * 3.3 / 4095 * 4;

电量建议：

| 电压    | 电量   |
| ----- | ---- |
| 4.2V  | 100% |
| 4.0V  | 80%  |
| 3.9V  | 60%  |
| 3.8V  | 40%  |
| 3.7V  | 20%  |
| <3.5V | 低电量  |

---

# 十、AI 项目推荐结构

## AI 语音助手

模块：

* INMP441
* MAX98357
* ESP-AI
* OLED/TFT

功能：

语音输入
→ AI 对话
→ 语音播报

---

## AI 玩偶

模块：

* 唤醒按键
* WS2812
* 扬声器

功能：

按键唤醒
→ AI 回复
→ 灯光动画

---

## AI 桌面助手

模块：

* TFT
* 麦克风
* 扬声器
* 电池

功能：

聊天
天气
日程
知识问答

---

# 十一、代码生成规则

生成代码时必须遵守：

1. 不允许修改固定引脚
2. 不允许虚构 GPIO
3. TFT 默认使用 TFT_eSPI
4. OLED 默认使用 U8g2
5. WS2812 默认 GPIO18
6. 按键默认 GPIO10
7. 电池检测默认 GPIO8
8. I2S 输入固定 4/5/6
9. I2S 输出固定 15/16/17
10. 优先兼容 ESP-AI SDK

如果用户没有指定屏幕型号：

优先假设：

* OLED：SSD1306
* TFT：ST7789

并在代码注释中说明。

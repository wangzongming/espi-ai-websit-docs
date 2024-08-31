# Client

This document will help you delve into the hardware development aspects, including explanations of various APIs provided by the `ESP-AI` hardware library.

## Basic Code

We won't go into detail here; refer directly to the Quick Start section for the <a href="start.html#client">client code</a>.

## Pin Wiring

We won't go into detail here; refer directly to the Quick Start section for the <a href="start.html#hardware-wiring-esp32-s3">pin wiring</a>.

## APIs

In the basic code, we used the two most fundamental APIs: `esp_ai.begin` and `esp_ai.loop`, which must be called. Below is a list of all the available APIs, which can be selected based on your needs.

### .begin

Before using any methods, this method should be called in the `setup()` function to initialize the hardware pins.

#### Example Code
```cpp
ESP_AI esp_ai;  

void setup() {
  Serial.begin(115200);
  
  // [REQUIRED] Debug mode, outputs more information
  bool debug = true;

  // [OPTIONAL] WiFi configuration: { WiFi SSID, WiFi password, hotspot name } Note: use double quotes! If it fails to connect to WiFi, it automatically opens a hotspot, and users can connect to the hotspot and open the configuration URL.
  ESP_AI_wifi_config wifi_config = { "", "", "ESP-AI" };
  // 自定义配网页面
  // char html_str[] = "html 按照 client\esp-ai\src\webServer\index.html目录中的文件来写即可。";
  // wifi_config.html_str = (char *)malloc(strlen(html_str) + 1);
  // strcpy(wifi_config.html_str, html_str);


  // [REQUIRED] Server configuration: { IP address, port, "query parameters, separated by ampersand (&), max 256 bytes" }
  ESP_AI_server_config server_config = { "192.168.1.5", 8088  };

  /**
  * [REQUIRED] Offline wake-up scheme: { Scheme, Recognition threshold, Pin number, Serial string }, "edge_impulse" | "asrpro" | "pin_high" | "pin_low" | "serial" | "custom". For "custom", call `esp_ai.wakeUp()` to wake up.
  * In the given parameters, the pin number is only useful when using button wake-up; for other methods, you can set any value or leave it empty. Other methods are similar.
  * Voice Wake-Up Schemes:
  * edge_impulse: Built-in voice wake-up scheme (supported by ESP32S3 boards)
  * asrpro: Tianwen voice module wake-up
  * pin_high: High-level pin wake-up
  * pin_low: Low-level pin wake-up
  * serial: Serial string wake-up
  * custom: Custom, manually call `esp_ai.wakeUp()` to wake up
  */  
  ESP_AI_wake_up_config wake_up_config = {};
  strcpy(wake_up_config.wake_up_scheme, "asrpro"); // 唤醒方案
  strcpy(wake_up_config.str, "start");  // 串口和天问asrpro 唤醒时需要配置的字符串，也就是从另一个开发版发送来的字符串
  // strcpy(wake_up_config.threshold,  0.95);  //  内置语音唤醒时需要配置 唤醒阈值 0-1
  // strcpy(wake_up_config.str, 10);  // 引脚高低电平唤醒时需要的引脚IO

  // [OPTIONAL] Microphone pin configuration: { BCK IO number, WS IO number, DATA_IN IO number }
  ESP_AI_i2s_config_mic i2s_config_mic = { 4, 5, 6 };

  // [OPTIONAL] Speaker pin configuration: { BCK IO number, WS IO number, DATA_IN IO number, sampling rate }
  ESP_AI_i2s_config_speaker i2s_config_speaker = { 16, 17, 15, 16000 };

  // [OPTIONAL] Volume control configuration: { Input pin, Max input value (1024|4096), default volume (0-1) }
  ESP_AI_volume_config volume_config = { 34, 4096, 0.5 };

  // Start ESP-AI
  esp_ai.begin({ i2s_config_mic, i2s_config_speaker, wifi_config, server_config, wake_up_config, volume_config, debug }); 
}
```
#### Parameter Description

| Parameter Name            | Required | Type                        | Description       |
| ------------------------- | -------- | --------------------------- | ----------------- |
| debug                     | ✔️        | bool                        | See example comment |
| wifi_config               | ✔️        | ESP_AI_wifi_config          | See example comment |
| server_config             | ✔️        | ESP_AI_server_config        | See example comment |
| wake_up_config            | ✔️        | ESP_AI_wake_up_config       | See example comment |
| i2s_config_mic            |          | ESP_AI_i2s_config_mic       | See example comment |
| i2s_config_speaker        |          | ESP_AI_i2s_config_speaker   | See example comment |
| volume_config             |          | ESP_AI_volume_config        | See example comment |

---

### .loop

Call this in the `loop()` function to handle internal hardware logic. It must be placed at the top of the `loop()` function.

#### Example Code
```cpp
ESP_AI esp_ai;  

void loop() {
  esp_ai.loop();
}
```
#### Parameter Description
None

---

### .setWifiConfig 

Manually set the WiFi SSID, WiFi password, and API key. After setting, it will reconnect to WiFi. Apart from the SSID and password, other parameters are optional, and you can pass an empty string if you don’t want to change them. Returns `true` on success, `false` on failure.

#### Example Code
```cpp
esp_ai.setWifiConfig("oldwang", "oldwang520"); // Will reconnect to WiFi
```
#### Parameter Description
None

---

### .wifiIsConnected
Returns whether connected to WiFi.

#### Example Code
```cpp
ESP_AI esp_ai;  
void loop() {
  esp_ai.loop();
  
  // Returns `true` after connecting to WiFi, must be placed after `esp_ai.loop();`
  if (!esp_ai.wifiIsConnected()) {
    return;
  }
}
```
#### Parameter Description
None

---

### .localIP
Returns the local IP address of the development board, available after connecting to WiFi.

#### Example Code
```cpp
Serial.println(esp_ai.localIP().c_str());
```
#### Parameter Description
None

---
### .wakeUp

#### Example Code
Calling this method will directly wake up "Xiaoming" and enter the conversation flow. This should be used in conjunction with physical buttons or third-party voice wake-up boards (such as Tianwen).

```cpp
esp_ai.wakeUp()
```
#### Parameter Description
Sets the speaker volume.


---
### .setVolume

#### Example Code
```cpp
// Set volume level 0-100
esp_ai.setVolume(50);
```
#### Parameter Description
- Type: `int`  
- Range: `0-100`


---
### .onEvent
Callback for receiving user control commands, such as turning lights on or off. You need to perform the corresponding operations within this callback.

#### Example Code
```cpp
void on_command(String command_id, String data) {
  Serial.printf("\nReceived command: %s -- %s\n", command_id, data);

  // Control light demonstration
  if (command_id == "device_open_001") {
    Serial.println("Turn on the light");
    digitalWrite(led_pin, HIGH);
  }
  if (command_id == "device_close_001") {
    Serial.println("Turn off the light");
    digitalWrite(led_pin, LOW);
  }
}

void setup() {
  Serial.begin(115200); 
  esp_ai.begin({ ...  });
  // User command listener
  esp_ai.onEvent(on_command);
}
```
#### Parameter Description
None

---

### .onError
Unified error callback

| Error Code | Error Message |
|------------|---------------|
| 000        | Unknown service error |
| 001        | Internal service error |
| 002        | Server authentication error |
| 100        | Unknown IAT service error |
| 101        | Failed to connect to IAT service |
| 102        | Unknown IAT service invocation error |
| 200        | Unknown LLM service error |
| 201        | Failed to connect to LLM service |
| 202        | Unknown LLM service invocation error |
| 300        | Unknown TTS service error |
| 301        | Failed to connect to TTS service |
| 302        | Unknown TTS service invocation error |

#### Example Code
```cpp
void onError(String code, String at_pos, String message) {
  // some code...
}

void setup() {
  Serial.begin(115200); 
  esp_ai.begin({ ...  });
  // 错误监听, 需要放到 begin 前面，否则可能监听不到一些数据
  esp_ai.onError(onError);
}
```
#### Parameter Description
None

---
### .onAPInfo
Called when the board cannot connect and starts a hotspot. Receiving this callback indicates that the user should be prompted to open the configuration page.

#### Example Code
```cpp
// @url Configuration URL, in case of a display, it is recommended to generate a QR code and display it.
void onAPInfo(String url, String ip, String ap_name) {
  // some code...
}

void setup() {
  Serial.begin(115200); 
  esp_ai.begin({ ...  });
  // User command listener
  esp_ai.onAPInfo(onAPInfo);
}
```
#### Parameter Description
None


### .onNetStatus
Callbacks for changes in device network status and service connection status 

| 标志符    |  说明  |
| --------- | ------ |
| "0"      |  未连接wifi  
| "0_ing"  |  正在连接wifi  
| "0_ap"   |  已经打开了配网热点，需要用户配网 
| "2"      |  未连接服务
| "3"      |  已连接服务器 

#### 案例代码
``` c 
void onNetStatus(String status) {
  // some code...
}

void setup() {
  Serial.begin(115200); 
  // 设备网络状态监听, 需要放到 begin 前面，否则可能监听不到一些数据
  esp_ai.onNetStatus(onNetStatus);
  esp_ai.begin({ ...  }); 
}
```
#### 参数说明
无

## Customize the web page

``` c++
ESP_AI_wifi_config wifi_config = { "", "", "ESP-AI" };
// 自定义配网页面
// 详细内容暂无，可自行参照： client\esp-ai\src\webServer\index.html 写即可
char html_str[] = "HTML content";
wifi_config.html_str = (char *)malloc(strlen(html_str) + 1);
strcpy(wifi_config.html_str, html_str);
```


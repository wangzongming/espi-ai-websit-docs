# 客户端

本文档将会帮助你深入硬件部分的开发，包括`ESP-AI`硬件库提供的各种`api`讲解。

## 基本代码

这里不在赘述，直接看快速开始中的：<a href="start.html#客户端">客户端代码</a>

## 引脚接线
这里不在赘述，直接看快速开始中的：<a href="start.html#硬件接线-esp32-s3">引脚接线</a>

## API

在基本代码中我们用到了`esp_ai.begin`、`esp_ai.loop`这两个最基本的`api`是必须调用的。下面将会列举出全部的`api`，这些`api`根据需要选择使用。

### .begin

在使用任何方法之前都应该先在 `setup()`中 调用本方法初始化硬件引脚。

#### 案例代码
```c
ESP_AI esp_ai;  

void setup() {
  Serial.begin(115200);
  
  // [必  填] 是否调试模式， 会输出更多信息
  bool debug = true;

  // [可 选] wifi 配置： { wifi 账号， wifi 密码, 热点名字 }  注意：要用双引号！ 连不上wifi时会自动打开热点，用户连接热点后打开配网地址即可配网
  ESP_AI_wifi_config wifi_config = { "", "", "ESP-AI" };
  // 自定义配网页面
  // char html_str[] = "html 按照 client\esp-ai\src\webServer\index.html目录中的文件来写即可。";
  // wifi_config.html_str = (char *)malloc(strlen(html_str) + 1);
  // strcpy(wifi_config.html_str, html_str);

  // [必  填] 服务配置： { 服务IP， 服务端口, "固定请求参数，用多个参数&号分割，最大256字节" }
  ESP_AI_server_config server_config = { }; // 如果你使用的是开发者平台，这留空即可 
  // ESP_AI_server_config server_config = { "192.168.1.5", 8088 }; // 如果你是自建服务，请配置你的ip和端口


  /**
  * [必  填] 离线唤醒方案：{ 方案, 识别阈值, 引脚号, 串口字符串 }, "edge_impulse" | "asrpro" | "pin_high" | "pin_low" | "serial" | "custom"，为 "custom" 时可调用 esp_ai.wakeUp() 方法进行唤醒
  * 所给的参数中，引脚号只有用按钮方式唤醒才能用上，其余时候随便设置一个或者留空字符串即可，其他方式相同
  * 语音唤醒方案：
  * edge_impulse：内置语音唤醒方案 (esp32S3板子支持)
  *       asrpro：天问语音模块唤醒 [目前的推荐方案]
  *     pin_high：引脚高电平唤醒
  *      pin_low：引脚低电平唤醒
  *       serial：串口字符唤醒
  *       custom：自定义，自行调用 esp_ai.wakeUp() 唤醒
  */  
  ESP_AI_wake_up_config wake_up_config = {};
  strcpy(wake_up_config.wake_up_scheme, "asrpro"); // 唤醒方案
  strcpy(wake_up_config.str, "start");  // 串口和天问asrpro 唤醒时需要配置的字符串，也就是从另一个开发版发送来的字符串
  // strcpy(wake_up_config.threshold,  0.95);  //  内置语音唤醒时需要配置 唤醒阈值 0-1
  // strcpy(wake_up_config.str, 10);  // 引脚高低电平唤醒时需要的引脚IO


  // [可留空] 麦克风引脚配置：{ bck_io_num, ws_io_num, data_in_num }
  ESP_AI_i2s_config_mic i2s_config_mic = { 4, 5, 6 };

  // [可留空] 扬声器引脚配置：{ bck_io_num, ws_io_num, data_in_num, 采样率 }
  ESP_AI_i2s_config_speaker i2s_config_speaker = { 16, 17, 15, 16000 };

  // [可留空] 音量调节配置：{ 输入引脚，输入最大值(1024|4096)，默认音量(0-1) }
  ESP_AI_volume_config volume_config = { 34, 4096, 0.5 };

  // 开始运行 ESP-AI
  esp_ai.begin({debug, wifi_config, server_config, wake_up_config, volume_config, i2s_config_mic, i2s_config_speaker});
}
```
#### 参数说明

| 参数名             | 是否必填 | 类型                      | 描述       |
| ------------------ | -------- | ------------------------- | ---------- |
| debug              | ✔️        | bool                      | 见案例注释 |
| wifi_config        | ✔️        | ESP_AI_wifi_config        | 见案例注释 |
| server_config      | ✔️        | ESP_AI_server_config      | 见案例注释 |
| wake_up_config     | ✔️        | ESP_AI_wake_up_config     | 见案例注释 |
| i2s_config_mic     |          | ESP_AI_i2s_config_mic     | 见案例注释 |
| i2s_config_speaker |          | ESP_AI_i2s_config_speaker | 见案例注释 |
| volume_config      |          | ESP_AI_volume_config      | 见案例注释 |

 

---

### .loop

固定在 `loop()`中调用，用于处理硬件内部逻辑。一定要放到 `loop()` 中最顶部。

#### 案例代码
``` c
ESP_AI esp_ai;  

void loop() {
  esp_ai.loop();
}
```
#### 参数说明
无

---

### .setWifiConfig 

手动设置 wifi账号/wifi密码/api_key/ext1/ext2 配置，设置后会重新连接wifi
除了 wifi 账号和和密码外其他都是可选的，不改是传入空字符串即可
设置成功会返回 true，失败返回 false

#### 案例代码
``` c
esp_ai.setWifiConfig("oldwang", "oldwang520"); // 会重新连接wifi
```
#### 参数说明
无

---

### .wifiIsConnected
返回是否连接WiFi

#### 案例代码
``` c
ESP_AI esp_ai;  
void loop() {
  esp_ai.loop();
  
  // 连接wifi后会返回 True，必须放到 esp_ai.loop(); 后面
  if (!esp_ai.wifiIsConnected()) {
    return;
  }
}
```
#### 参数说明
无

---

### .localIP
返回开发板本地IP，连接WiFi后存在

#### 案例代码
``` c
Serial.println(esp_ai.localIP().c_str());
```
#### 参数说明
无

---
### .wakeUp

#### 案例代码
调用这个方法会直接唤醒`小明同学` 然后进入对话流程。如果使用物理按钮或者第三方语音唤醒板子(比如：天问等)时需要用这个配合唤醒。
``` c
esp_ai.wakeUp()
```
#### 参数说明
设置喇叭音量


---
### .setVolume

#### 案例代码
``` c
// 设置音量 0-100
esp_ai.setVolume(50);
```
#### 参数说明
- 类型：int  
- 范围：0-100


---
### .onEvent
接收到用户的控制指令后的回调，比如用户让`开灯`或者`关灯`。你需要在这个回调中进行相应的操作。

#### 案例代码
``` c
void on_command(String command_id, String data) {
  Serial.printf("\n收到指令：%s -- %s\n", command_id, data);

  // 控制小灯演示
  if (command_id == "device_open_001") {
    Serial.println("开灯");
    digitalWrite(led_pin, HIGH);
  }
  if (command_id == "device_close_001") {
    Serial.println("关灯");
    digitalWrite(led_pin, LOW);
  }
}

void setup() {
  Serial.begin(115200); 
  esp_ai.begin({ ...  });
  // 用户指令监听
  esp_ai.onEvent(on_command);
}
```
#### 参数说明
无



---
### .onError
统一错误回调

错误码  |  错误信息
-------|-----------  
000    |  未知服务错误  
001    |  服务内部错误  
002    |  服务端认证错误  
100    |  未知 IAT 服务错误   
101    |  未知 IAT 服务连接失败   
102    |  未知 IAT 服务调用错误   
200    |  未知 LLM 服务错误   
201    |  未知 LLM 服务连接失败   
202    |  未知 LLM 服务调用错误   
200    |  未知 TTS 服务错误   
201    |  未知 TTS 服务连接失败   
202    |  未知 TTS 服务调用错误   

#### 案例代码
``` c
void onError(String code, String at_pos, String message) {
  // some code...
}

void setup() {
  Serial.begin(115200); 
  // 错误监听, 需要放到 begin 前面，否则可能监听不到一些数据
  esp_ai.onError(onError);
  esp_ai.begin({ ...  });
}
```
#### 参数说明
无

---
### .onAPInfo
板子连接不上时会启动热点并且调用本回调，收到这个回调说明该提示用户打开配网页面了

#### 案例代码
``` c
// @url 配网地址, 有屏幕的情况下建议将 url 生成为二维码显示
void onAPInfo(String url, String ip, String onAPInfoap_name) {
  // some code...
}

void setup() {
  Serial.begin(115200); 
  esp_ai.begin({ ...  });
  // 用户指令监听
  esp_ai.onAPInfo(onAPInfo);
}
```
#### 参数说明
无


### .onNetStatus
设备网络状态、与服务连接状态改变的回调 

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

### .onConnectedWifi
设备连接上wifi后的回调
device_ip 是局域网ip

#### 案例代码
``` c 
void onConnectedWifi(String status) {
  // some code...
}

void setup() {
  Serial.begin(115200); 
  // 设备网络状态监听, 需要放到 begin 前面，否则可能监听不到一些数据
  esp_ai.onConnectedWifi(onConnectedWifi);
  esp_ai.begin({ ...  });
}
```
#### 参数说明
无

## 自定义配网页面

```c
ESP_AI_wifi_config wifi_config = { "", "", "ESP-AI" };
// 自定义配网页面
// 详细内容暂无，可自行参照： client\esp-ai\src\webServer\index.html 写即可
char html_str[] = "HTML content";
wifi_config.html_str = (char *)malloc(strlen(html_str) + 1);
strcpy(wifi_config.html_str, html_str);
```


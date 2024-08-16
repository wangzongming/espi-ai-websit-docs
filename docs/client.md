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
// [必  填] 是否调试模式， 会输出更多信息
bool debug = true;
// [必  填] wifi 配置： { wifi 账号， wifi 密码 }  注意：要用双引号！
ESP_AI_wifi_config wifi_config = { "oldwang", "oldwang520" };
// [必  填] 服务配置： { 服务IP， 服务端口, "请求参数，用多个参数&号分割，最大256字节" }
ESP_AI_server_config server_config = { "192.168.1.5", 8088, "api-key=your_api_key&p2=test"  };
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
设置wifi账号密码，并且重新连接`wifi`。

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
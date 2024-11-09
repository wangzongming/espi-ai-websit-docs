---
title: 语音控制点亮 LED
createTime: 2024/11/07 15:15:27
permalink: /example/7naihdpt/
---

## Nodejs 代码
 
```js
const config = {
    gen_client_config: async (){
        return {
            intention: [
                { 
                    key: ["开灯", "打开灯"], 
                    // 向设备发送一个字符串，客户端使用 onEvent 监听
                    instruct: "device_open_001", 
                    message: "好的"
                },
                
                { 
                    key: ["关灯", "关闭灯"], 
                    // 向设备发送一个字符串，客户端使用 onEvent 监听
                    instruct: "device_close_001", 
                    message: "好的"
                }
            ]
        }
    }
}
```


## Arduino 代码
 
```c

...

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
    pinMode(led_pin, OUTPUT);   
    
    esp_ai.begin({ ...  });
    // 用户指令监听
    esp_ai.onEvent(on_command);
}

```


## 视频教程

录制中...
<!-- @[bilibili](BV1EZ42187Hg) -->
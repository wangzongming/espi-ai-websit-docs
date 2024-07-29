# Client

This document will help you dive into the hardware part of the development, including explanations of various `api` provided by the `ESP-AI` hardware library.

## Basic Code

For the basic code, refer directly to the quick start section: <a href="start.html#client">Client Code</a>.

## Pin Connections

For the pin connections, refer directly to the quick start section: <a href="start.html#hardware-wiring-esp32-s3">Pin Connections</a>.

## API

In the basic code, we used the two most fundamental `api`, `esp_ai.begin` and `esp_ai.loop`, which must be called. Below, all available `api` are listed, which can be used as needed.

### .begin

This method should be called in `setup()` to initialize hardware pins before using any other methods.

#### Example Code
```c
ESP_AI esp_ai;  
// [Required] Debug mode, outputs more information
bool debug = true;
// [Required] WiFi configuration: { WiFi SSID, WiFi password } Note: Use double quotes!
ESP_AI_wifi_config wifi_config = { "oldwang", "oldwang520" };
// [Required] Server configuration: { Server IP, Server port }
ESP_AI_server_config server_config = { "192.168.1.5", 8080 };
// [Required] Offline wake-up scheme: { Scheme, Recognition threshold }, "edge_impulse" | "diy", use `esp_ai.wakeUp()` to wake up if "diy" is chosen
ESP_AI_wake_up_config wake_up_config = { "edge_impulse", 0.7 };

// [Optional] Microphone pin configuration: { bck_io_num, ws_io_num, data_in_num }
ESP_AI_i2s_config_mic i2s_config_mic = { 4, 5, 6 };
// [Optional] Speaker pin configuration: { bck_io_num, ws_io_num, data_in_num, Sampling rate }
ESP_AI_i2s_config_speaker i2s_config_speaker = { 16, 17, 15, 16000 };
// [Optional] Volume adjustment configuration: { Input pin, Maximum input value (1024|4096), Default volume (0-1) }
ESP_AI_volume_config volume_config = { 34, 4096, 0.5 };

void setup() {
  Serial.begin(115200);
  // Start running ESP-AI
  esp_ai.begin({ i2s_config_mic, i2s_config_speaker, wifi_config, server_config, wake_up_config, volume_config, debug }); 
}
```

#### Parameter Description

| Parameter Name      | Required | Type                      | Description    |
| ------------------  | -------- | ------------------------- | -------------- |
| debug               | ✔️       | bool                      | See example notes |
| wifi_config         | ✔️       | ESP_AI_wifi_config        | See example notes |
| server_config       | ✔️       | ESP_AI_server_config      | See example notes |
| wake_up_config      | ✔️       | ESP_AI_wake_up_config     | See example notes |
| i2s_config_mic      |          | ESP_AI_i2s_config_mic     | See example notes |
| i2s_config_speaker  |          | ESP_AI_i2s_config_speaker | See example notes |
| volume_config       |          | ESP_AI_volume_config      | See example notes |

### .loop

This should be called in the `loop()` to handle the internal logic of the hardware. Make sure to place it at the top of `loop()`.

#### Example Code
``` c
ESP_AI esp_ai;  

void loop() {
  esp_ai.loop();
}
```

#### Parameter Description
None

### .wifiIsConnected
Returns whether WiFi is connected.

#### Example Code
``` c
ESP_AI esp_ai;  
void loop() {
  esp_ai.loop();
  
  // Returns true after connecting to WiFi, must be placed after esp_ai.loop()
  if (!esp_ai.wifiIsConnected()) {
    return;
  }
}
```

#### Parameter Description
None

### .localIP
Returns the local IP of the development board after connecting to WiFi.

#### Example Code
``` c
Serial.println(esp_ai.localIP().c_str());
```

#### Parameter Description
None

### .wakeUp

Calling this method directly wakes up `Xiao Ming` and enters the conversation process. This is used when using a physical button or a third-party voice wake-up board (e.g., Tianwen).

#### Example Code
``` c
esp_ai.wakeUp()
```

#### Parameter Description
None

### .setVolume

#### Example Code
``` c
// Set volume 0-100
esp_ai.setVolume(50);
```

#### Parameter Description
- Type: int  
- Range: 0-100

### .onEvent
Callback for receiving user control commands, such as turning the light on or off. You need to perform the corresponding operations within this callback.

#### Example Code
``` c
void on_command(String command_id, String data) {
  Serial.printf("\nReceived command: %s -- %s\n", command_id, data);

  // Control the light for demonstration
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
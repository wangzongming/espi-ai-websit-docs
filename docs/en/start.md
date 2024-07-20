# Quick Start

## What is ESP-AI?

`ESP-AI` provides a complete AI conversation solution for your development board, including but not limited to the `IAT (ASR) + LLM + TTS` integration solution for the `ESP32` series development boards. It is injected into the project as a dependency and does not affect existing projects.

Why is it said to include but not be limited to `ESP32` development boards? Because even if your other development board uses another board, you can still use `ESP32` to build an `AI` service based on this project and use serial communication to send commands or conversations to your other development board.

## What can ESP-AI do?
Imagine this scenario: you have a robot that can perform some fixed actions, but you want to communicate with it and make it understand some of your commands. If you start from scratch, you will begin by collecting audio streams from the microphone and then enter endless debugging...

Now with `ESP-AI`, you don't have to do that. You just need to introduce `ESP-AI`. It has already implemented processes for **offline voice wake-up, speech recognition, large language model invocation, text-to-speech, and speaker audio output**. Moreover, `ESP-AI` uses a plugin design framework, and each step mentioned above provides extension methods, allowing you to customize your product freely.

## ESP-AI Technology Stack

- **Software**: The server-side code of this project is based on `Nodejs`, and the hardware code is based on `Arduino`. Although the server-side is developed based on `Nodejs`, plugins can be written in other programming languages. For details, see the plugin development section.

- **Hardware**: This project mainly runs on `ESP` series development boards.

## Features

- ✔️ Customizable offline voice wake-up
- ✔️ IAT (ASR) ➡️ LLM/RAG ➡️ TTS
- ✔️ Configurable
- ✔️ Plugin-based
- ✔️ Ready to use

## Next Steps

- 🤔 Provide a no-code integration solution
- 🤔 Integrate AI into user intent inference (e.g., "Turn off the light", "Turn on the light" will both be recognized as: "Turn on the light" command)
- 🤔 Offer free and paid services
- 🤔 Online wake word generation
- 🤔 Methods for writing plugins in other languages (avoid using only Nodejs for plugin development)
- 🤔 Provide dedicated development boards (avoid current complex wiring)

## Development Environment Setup

### Local Development Environment Setup
For subsequent upgrades, simply download the relevant files from the <a target="_block" href="https://github.com/wangzongming/esp-ai/releases">release page</a>. The following dependency files only need to be installed for the first time.

| Environment | Version | Notes |
| -------- | ------- | ------- |
| `Nodejs`      | Recommended: greater than v14.0.0 and less than v18.x    | |
| `VsCode IDE`      | Latest version     | |
| `Arduino IDE`      | >= v2.x     |  |
| `esp` development board     | v2.x     |  Search for `esp` development board in `Arduino IDE` |
| Hardware code dependency libraries      | Latest version   | Import the plugins from the `/client/libraries` directory of the `Github` repository into the IDE plugins, default location: `C:\Users\Username\Documents\Arduino\libraries` | 

#### Hardware Code Dependency Libraries Description
| File Name | Notes | Version |
| -------- | ------- | ------- |
| arduino-audio-tool      | https://github.com/pschatzmann/arduino-audio-tools     | |
| WebSockets      | Can be directly searched and installed in the new IDE     | v2.4.0 |
| Arduino_JSON      | Can be directly searched and installed in the new IDE     | v0.2.0 |
| esp-ai      | esp-ai cannot be searched and installed temporarily     | |
| xiao_ming_tong_xue_inferencing      | Offline voice recognition model cannot be searched and installed temporarily   | |

### Applying for iFLYTEK Key

Registration URL: https://console.xfyun.cn/services/iat  

`ESP-AI` fully integrates with iFLYTEK's `IAT`, `LLM`, and `TTS` services, so you can test with iFLYTEK's services before using your own.

## Client Code

1. Create a file `example/example.ino`, note: the file must be placed in a folder, and the folder name must be the same as the file name.
2. Open the `example.ino` file with `Arduino IDE`.
3. Write the following code, then upload it to the development board.
``` c
#include <esp-ai.h>

ESP_AI esp_ai;
// [Required] Debug mode, will output more information
bool debug = true;
// [Required] WiFi configuration: { wifi SSID, wifi password } Note: Use double quotes!
ESP_AI_wifi_config wifi_config = { "oldwang", "oldwang520" };
// [Required] Server configuration: { server IP, server port }
ESP_AI_server_config server_config = { "192.168.1.5", 8080 };
// [Required] Offline wake-up solution: { solution, recognition threshold }, "edge_impulse" | "diy", use "diy" to call esp_ai.wakeUp() method for wake-up
ESP_AI_wake_up_config wake_up_config = { "edge_impulse", 0.7 };

// [Optional] Microphone pin configuration: { bck_io_num, ws_io_num, data_in_num }
ESP_AI_i2s_config_mic i2s_config_mic = { 4, 5, 6 };
// [Optional] Speaker pin configuration: { bck_io_num, ws_io_num, data_in_num, sampling rate }
ESP_AI_i2s_config_speaker i2s_config_speaker = { 16, 17, 15, 16000 };
// [Optional] Volume adjustment configuration: { input pin, input max value (1024|4096), default volume (0-1) }
ESP_AI_volume_config volume_config = { 34, 4096, 0.5 };

void setup() {
  Serial.begin(115200);
  // Start running ESP-AI
  esp_ai.begin({ i2s_config_mic, i2s_config_speaker, wifi_config, server_config, wake_up_config, volume_config, debug }); 
}

void loop() {
  esp_ai.loop(); 
}
```

## Server Code

1. Continue to create a file `index.js` in the above-created `example` directory.
2. Add the following code to `index.js`:
``` javascript
const espAi = require("esp-ai"); 
const config = { 
    api_key: {
        // iFLYTEK: https://console.xfyun.cn/services/iat. After opening the URL, copy the three fields in the upper right corner.
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
3. Install server dependencies
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

4. Run the server
```
# In a production environment, use pm2 to run the service to ensure reliability and performance: pm2 start ./index.js -i max 
node ./index.js
```

## Hardware Wiring

- INMP441      is a microphone module
- Max98357A    is an amplifier module
- Potentiometer        used to adjust output volume
- LED          used to demonstrate user commands to turn lights on/off

### ESP32-S3 Development Board
 
| ESP32-s3 | INMP441 | Max98357A | Potentiometer (optional) | LED (optional) |
| -------- | ------- |  -------  | ----       | --- |
| 3v3      | VDD     |  VDD      | VDD        |     |
| GND      | GND     |  GND      | GND        |  GND|
| GND      | L/R     |           |            |     |
| 4        | SCK     |           |            |     |
| 5        | WS      |           |            |     |
| 6        | SD      |           |            |     |
| 15       |         | DIN       |            |     | 
| 16       |         | BCLK      |            |     |
| 17       |         | LRC       |            |     |
| 34       |         |           |    OUT     |     |
| 18       |         |           |            | Positive |

Wiring diagram to be added...

### ESP32XIAOS3 Development Board
It is on the way just like other development boards...

## Finally

Shout `Xiao Ming` to start chatting happily! 🎉

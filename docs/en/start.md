# Quick Start

## What is ESP-AI?

`ESP-AI` provides a complete AI conversation solution for your development board, including but not limited to the `IAT(ASR)+LLM+TTS` integration solution for the `ESP32` series development boards. It is dependency injected into the project without affecting existing projects.

Why say it includes but is not limited to `ESP32` development boards? Because even if your other development board uses a different one, you can still use `ESP32` to build an `AI` service based on this project and use serial communication to send instructions or dialogues to your other development board.

## What can ESP-AI do?

Imagine a scenario where you have a robot that can perform some fixed actions, but you want to communicate with it and let it understand some of your commands. If you start implementing this process from scratch, you will start by collecting the audio stream from the microphone and then enter into endless debugging...

Now with `ESP-AI`, you don't have to do that. You just need to introduce `ESP-AI`. It has already implemented processes for **offline voice wake-up, voice recognition, large language model invocation, text-to-speech, and speaker audio output**. Moreover, `ESP-AI` uses a plug-in design framework, and each of the above steps provides extension methods so you can customize your product at will.

## ESP-AI Technology Stack

- **Software**: The server-side code of this project is based on `Nodejs`, and the hardware code is based on `Arduino`. Although the server-side is developed based on `Nodejs`, it also provides plugins written in other programming languages. For details, see the plugin development section.

- **Hardware**: This project mainly runs on the `ESP` series of development boards.

## Features

- ✔️ Customizable offline voice wake-up
- ✔️ IAT(ASR) ➡️ LLM/RAG ➡️ TTS
- ✔️ User command recognition (home appliance control, singing, etc.)
- ✔️ Configurable
- ✔️ Plugin-based
- ✔️ The service and client have a one-to-many relationship
- ✔️ Server authentication
- ✔️ Streaming data interaction 
- ✔️ Ready to use

## Next Steps

- 🤔 Provide a no-code access solution
- 🤔 Integrate AI into user intent inference (e.g., "turn off the light" and "quickly turn on the light" will both be recognized as the "turn on the light" command)
- 🤔 Offer free and paid services
- 🤔 Online generation of wake words
- 🤔 Methods for writing plugins in other languages (to avoid only using Node.js to develop plugins)
- 🤔 Provide a dedicated development board (to avoid current complex wiring)

## Development Environment Setup

### Local Development Environment Setup

For future upgrades, simply download the relevant files from the [release page](https://github.com/wangzongming/esp-ai/releases). The dependencies below only need to be installed once.

No `Nodejs` environment is required when installing the server using a Docker image or a Windows lazy package.

| Environment    | Version | Note                                                                                           |
| -------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `Nodejs`       | >= v18.x | npm version needs to be below 10.x; 6.x to 9.x are fine                                        |
| `VsCode IDE`   | Latest  |                                                                                                |
| `Arduino IDE`  | >= v2.x |                                                                                                |
| `ESP` Board    | v2.x    | Search and install the `ESP` board in `Arduino IDE`                                            |
| Hardware Code Libraries | Latest | Import plugins from `/client/libraries` in the GitHub repository into the IDE's plugins. Default location is `C:\Users\Username\Documents\Arduino\libraries` |

#### Hardware Code Library Explanation
| Filename                        | Note                                     | Version   |
| ------------------------------- | ---------------------------------------- | --------- |
| arduino-audio-tool              | https://github.com/pschatzmann/arduino-audio-tools |           |
| WebSockets                      | New version IDE can search and install directly | v2.4.0 |
| Arduino_JSON                    | New version IDE can search and install directly | v0.2.0 |
| esp-ai                          | ESP-AI temporarily unavailable for search and installation |           |
| xiao_ming_tong_xue_inferencing  | Offline voice recognition model temporarily unavailable for search and installation |           |

### Applying for an iFLYTEK Key

Registration URL: https://console.xfyun.cn/services/iat

`ESP-AI` fully integrates with iFLYTEK's `IAT`, `LLM`, and `TTS` services, so you can test using iFLYTEK's services before using your own.

## Client

The hardware end is referred to as the client.

### Hardware Code - Arduino

1. Create a file `example/example.ino`. Note: The file must be placed in a folder, and the folder name must be the same as the file name.
2. Open the `example.ino` file with `Arduino IDE`.
3. Write the following code and upload it to the development board.
``` c
#include <esp-ai.h>

ESP_AI esp_ai;
// [Required] Debug mode, will output more information
bool debug = true;
// [Required] WiFi configuration: { wifi SSID, wifi password } Note: Use double quotes!
ESP_AI_wifi_config wifi_config = { "oldwang", "oldwang520" };
// [Required] Service configuration: { service IP, service port, params max 256 byts }
ESP_AI_server_config server_config = { "192.168.1.5", 8080, "api-key=your_api_key&p2=test" };
// [Required] Offline wake-up solution: { solution, recognition threshold }, "edge_impulse" | "diy", for "diy" you can call the esp_ai.wakeUp() method to wake up
ESP_AI_wake_up_config wake_up_config = { "edge_impulse", 0.7 };

// [Optional] Microphone pin configuration: { bck_io_num, ws_io_num, data_in_num }
ESP_AI_i2s_config_mic i2s_config_mic = { 4, 5, 6 };
// [Optional] Speaker pin configuration: { bck_io_num, ws_io_num, data_in_num, sample rate }
ESP_AI_i2s_config_speaker i2s_config_speaker = { 16, 17, 15, 16000 };
// [Optional] Volume control configuration: { input pin, input max value (1024|4096), default volume (0-1) }
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

### Hardware Code - IDF

``` c
// Under development...
```

### Hardware Materials

| Hardware       | Quantity | Price |
| -------------- | -------- | ----- |
| esp32s3(N16R8) | 1        | 25    |
| INMP441        | 1        | 8     |
| Max98357A      | 1        | 5     |
| LED            | 1        | 0.5   |
| Small speaker  | 1        | 6     |
| Breadboard     | 1        | 5     |
| Dupont wires   | Some     | 1     |

### Hardware Wiring - ESP32-S3

| ESP32-s3 | INMP441 | Max98357A | Potentiometer (optional) | LED (optional) |
| -------- | ------- | --------- | ----------------------- | -------------- |
| 3v3      | VDD     | VDD       | VDD                     |                |
| GND      | GND     | GND       | GND                     | GND            |
| GND      | L/R     |           |                         |                |
| 4        | SCK     |           |                         |                |
| 5        | WS      |           |                         |                |
| 6        | SD      |           |                         |                |
| 15       |         | DIN       |                         |                |
| 16       |         | BCLK      |                         |                |
| 17       |         | LRC       |                         |                |
| 34/35    |         |           | OUT                     |                |
| 18       |         |           |                         | Positive       |

Wiring diagram to be added...

### Hardware Wiring - XIAOESP32S3
Under development...

### Hardware Wiring - nodemcu32s
Under development...

## Server

The server provides services to the hardware (client), used to call `LLM`, `IAT`, `TTS`, etc., and can conveniently provide extensions. The server and client have a one-to-many relationship, meaning one server can serve multiple clients.

### Server Code - Node.js

1. In the previously created `example` directory, create a file `index.js`.
2. Add the following code to `index.js`:
``` javascript
const espAi = require("esp-ai"); 
const config = { 
    api_key: {
        // iFLYTEK: https://console.xfyun.cn/services/iat. Open the URL and copy the three fields in the upper right corner.
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

```

bash:no-line-numbers
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
# For production environments, use pm2 to run the service to ensure reliability and performance: pm2 start ./index.js -i max 
node ./index.js
```

### Docker Installation
 
- We will name the container: `esp-ai-server`
- Place the configuration file at: `/esp-ai-server/index.js`
- The host machine port is: `8080`

Note: These three configurations can only modify those on the host machine; the image settings must be hard-coded as follows.

#### Running the Container
```bash
docker run -itd -p 8080:8080 -v /esp-ai-server/index.js:/server/index.js --name esp-ai-server registry.cn-shanghai.aliyuncs.com/xiaomingio/esp-ai:1.0.0
```

The configuration file is mapped to `/esp-ai-server/index.js`. You need to modify this configuration file yourself. After making changes, you can restart the service:
```bash
docker exec -it esp-ai-server pm2 restart all
```

#### Installing Plugins Inside the Container
Execute the plugin installation command directly inside the container:
```bash
docker exec -it esp-ai-server yarn add [plugin-name]
```

After modifying the configuration file, you still need to restart the container:
```bash
docker exec -it esp-ai-server pm2 restart all
```

#### Viewing Runtime Logs
```bash
docker exec -it esp-ai-server pm2 logs
```

#### Update Dependency
Replace the version number in the code below with the latest version number.

```bash
docker exec -it esp-ai-server yarn add esp-ai@1.15.6
```

After the update, you need to check whether the version number in package.json is correct. If it is correct, restart the container.
```bash
docker exec -it esp-ai-server cat ./package.json
```

### Lazy Package
Under implementation...

## Detailed Documentation

- [Client Detailed Documentation](client.html)
- [Server Detailed Documentation](server.html)

## Finally

Shout "Xiao Ming classmate" and you can chat with it happily! 🎉
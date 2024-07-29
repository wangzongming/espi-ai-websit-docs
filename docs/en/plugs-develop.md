# Plugin Development

When you need to use internal or local large language models or speech services, you will need to develop specialized plugins.

There are three types of plugins: `LLM`, `TTS`, and `IAT`. Each type of plugin will receive different parameters provided by the framework and will communicate with the framework by invoking methods with these parameters.

## Required Conventions

1. LLM plugin names must be in the format `esp-ai-plugin-llm-xxx`.
2. TTS plugin names must be in the format `esp-ai-plugin-tts-xxx`.
3. IAT plugin names must be in the format `esp-ai-plugin-iat-xxx`.
4. For plugins to be published externally, the following keywords must be added to the `package.json` in the plugin directory, otherwise, they will not be automatically included.
```json
{
    "keywords": ["esp-ai-plugin", "esp-ai-plugin-llm"]
}
```

## Getting Started Guide

The basic structure of LLM, TTS, and IAT plugins is as follows:

```javascript
const config = {
     plugins: [
        {
            name: 'esp-ai-plugin-llm-test', // Plugin name  
            type: "LLM", // Plugin type: LLM | TTS | IAT
            main(arg) {
                // Plugin logic
            }
        }
     ]
}
```

To maintain code standards, it is of course not directly written into the plugins array. Therefore, the normal steps to create a plugin are as follows:

1. Create a plugin folder `esp-ai-plugin-llm-test`.
2. Add a `package.json` file.
```json
{
  "name": "esp-ai-plugin-llm-example",
  "keywords": ["esp-ai-plugin", "esp-ai-plugin-llm"],
  "version": "0.0.2",
  "description": "ESP-AI LLM Plugin Example | ESP-AI LLM Plugin Development Example",
  "main": "index.js"
}
```
3. Add an `index.js` file and write your logic.
```javascript
module.exports = {
    name: 'esp-ai-plugin-llm-test', // Plugin name  
    type: "LLM", // Plugin type: LLM | TTS | IAT
    main(arg) {
        // Plugin logic
    }
}
```
4. Publish to `npm` (skip this step for private plugins).

You can find publishing tutorials online.
```
npm publish
```

5. Plugin Inclusion

After the plugin is published to `npm`, the framework will automatically include it, and other users can search for it using keywords on `npm`, or see it directly in the `ESP-AI` plugin marketplace.

## LLM Plugin

Here is a sample code for the LLM plugin, which you can modify based on your business needs.

```javascript
/**
 * esp-ai LLM Plugin Development
 * 
 * Demonstrates requesting a streaming LLM service
 */
module.exports = {
    // Plugin name
    name: "esp-ai-plugin-llm-example",
    // Plugin type: LLM | TTS | IAT
    type: "LLM",
    /**
     * Large Language Model Plugin
     * @param {String}      device_id           Device ID 
     * @param {Number}      devLog              Log output level; no logs should be output when it is 0
     * @param {Object}      api_key             User-configured key
     * @param {String}      text                Dialog text
     * @param {Function}    cb                  Called when the LLM service returns audio data, e.g., cb({ text, texts })
     * @param {Function}    llmServerErrorCb    Called when an error occurs between the LLM service, with an error description, e.g., llmServerErrorCb("Unexpected error")
     * @param {Function}    llm_params_set      Function to set LLM parameters configured by the user
     * @param {Function}    logWSServer         Passes the ws service back to the framework; if not a ws service, can write: logWSServer({ close: () => {} })
     * @param {{role, content}[]}  llm_init_messages   Initial dialog data configured by the user
     * @param {{role, content}[]}  llm_historys        LLM dialog history data
     * @param {Function}    log                 To ensure consistent log output, please use the log object for log output, e.g., log.error("Error message"), log.info("General information"), log.llm_info("LLM-specific information")
     */
    main({ device_id, devLog, api_key, text, llmServerErrorCb, llm_init_messages = [], llm_historys = [], cb, llm_params_set, logWSServer }) {
        devLog && console.log("Dialog history:\n", llm_historys);

        // Please define what fields the api_key needs to configure
        const config = { ...api_key };

        // Connect the ws service and report it to the framework
        // const llm_ws = new WebSocket("ws://xxx");
        // logWSServer(llm_ws);

        /**
         * This variable is fixed and needs to be passed back to cb()
         * See the logic below for specific changes
         */
        const texts = {
            all_text: "",
            count_text: "",
        };

        // Simulate data returned by the service
        function moniServer(cb) {
            const moni_data = [
                "Hello,",
                "How can I help you?",
                "Please feel free to ask!",
            ];

            function reData() {
                const res_text = moni_data.splice(0, 1);
                cb(res_text[0], moni_data.length);
                moni_data.length && setTimeout(reData, 1000);
            }
            reData();
        }

        // Parameters for requesting the LLM service, including dialog information
        const r_params = {
            "model": config.llm,
            "messages": [
                ...llm_init_messages,
                ...llm_historys,
                {
                    "role": "user", "content": text
                },
            ]
        };
        // Adjust the request based on the API requirements
        const body = JSON.stringify(llm_params_set ? llm_params_set(r_params) : r_params);

        moniServer((chunk_text, length) => {
            devLog && console.log('LLM output:', chunk_text);
            texts["count_text"] += chunk_text;
            cb({ text, texts, is_over: length === 0 });
        });
    }
}
```

## TTS Plugin

Here is a sample code for the TTS plugin, which you can modify based on your business needs.

Because Dolphin dubbing does not return data in a streaming format, the code first gets the complete audio data and then returns the stream data to the client. This is a good practice case, and services like `LLM` and `IAT` that do not return streaming data can also refer to this example.

```javascript
const { PassThrough } = require('stream');
const https = require('https');

function wavUrlToStream(url) {
    const stream = new PassThrough();

    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            stream.emit('error', new Error(`Request failed with status code ${response.statusCode}`));
            return;
        }

        response.pipe(stream);
    }).on('error', (err) => {
        stream.emit('error', err);
    });

    return stream;
}

/**
 * esp-ai TTS Plugin Development
 * 
 * Demonstrates requesting Dolphin dubbing service and streaming the response to the client
 */
module.exports = {
    // Plugin name
    name: "esp-ai-plugin-tts-ttson",
    // Plugin type: LLM | TTS | IAT
    type: "TTS",
    /**
     * TTS Plugin encapsulation 
     * @param {String}      device_id           Device ID
     * @param {String}      text                Text to be broadcast
     * @param {Object}      api_key             User-configured key
     * @param {Number}      devLog              Log output level; no logs should be output when it is 0
     * @param {Function}    tts_params_set      Function to set parameters passed to the TTS service, e.g., tts_params_set(params)
     * @param {Function}    logWSServer         Passes the ws service back to the framework; if not a ws service, can write: logWSServer({ close: () => {} })
     * @param {Function}    ttsServerErrorCb    Called when an error occurs between the TTS service, with an error description, e.g., ttsServerErrorCb("Unexpected error")
     * @param {Function}    cb                  Called when the TTS service returns audio data, e.g., cb({ audio: audioBase64, ... })
     * @param {Function}    log                 To ensure consistent log output, please use the log object for log output, e.g., log.error("Error message"), log.info("General information"), log.tts_info("TTS-specific information")
     */
    main({ device_id, text, devLog, api_key, logWSServer, tts_params_set, cb, log, ttsServerErrorCb }) {
        const config = { ...api_key };

        const url = `https://u95167-bd74-2aef8085.westx.seetacloud.com:8443/flashsummary/tts?token=${config.token}`;
        let language =

 "zh";

        if (/[\u4e00-\u9fa5]/.test(text)) {
            language = "zh";
        } else {
            language = "en";
        }

        const data = {
            "version": "1.0",
            "language": language,
            "voice": "siyue",
            "text": text,
        };

        const requestBody = tts_params_set ? tts_params_set(data) : data;

        const body = JSON.stringify(requestBody);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length,
            },
        };

        const req = https.request(url, options, (res) => {
            let rawData = '';
            res.setEncoding('utf8');

            res.on('data', (chunk) => { rawData += chunk; });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData && parsedData.code !== '200') {
                        ttsServerErrorCb(parsedData.msg);
                    } else {
                        const audioStream = wavUrlToStream(parsedData.audio);
                        logWSServer(audioStream);
                    }
                } catch (e) {
                    log.error(e.message);
                    ttsServerErrorCb(e.message);
                }
            });
        });

        req.on('error', (e) => {
            log.error(e.message);
            ttsServerErrorCb(e.message);
        });

        req.write(body);
        req.end();
    }
};
```

## IAT Plugin

Here is a sample code for the IAT plugin, which you can modify based on your business needs.

```javascript
const WebSocket = require('ws');

/**
 * esp-ai IAT Plugin Development
 * 
 * Demonstrates connecting to a WebSocket-based IAT service
 */
module.exports = {
    // Plugin name
    name: "esp-ai-plugin-iat-example",
    // Plugin type: LLM | TTS | IAT
    type: "IAT",
    /**
     * IAT Plugin encapsulation
     * @param {String}      device_id           Device ID
     * @param {Object}      api_key             User-configured key
     * @param {Function}    logWSServer         Passes the ws service back to the framework; if not a ws service, can write: logWSServer({ close: () => {} })
     * @param {Function}    log                 To ensure consistent log output, please use the log object for log output, e.g., log.error("Error message"), log.info("General information"), log.iat_info("IAT-specific information")
     */
    main({ device_id, api_key, logWSServer, log }) {
        const config = { ...api_key };

        const ws = new WebSocket("ws://example.com");

        ws.on('open', function open() {
            log.iat_info('connected');
            ws.send(JSON.stringify({ device_id, config }));
        });

        ws.on('message', function incoming(data) {
            log.iat_info('received: %s', data);
        });

        ws.on('close', function close() {
            log.iat_info('disconnected');
        });

        ws.on('error', function error(err) {
            log.error('error: %s', err.message);
        });

        logWSServer(ws);
    }
};
``` 


## Intent recognition Plugin

...


## Music player  Plugin

...

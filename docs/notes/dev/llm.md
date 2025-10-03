---
title: 大语言模型接口 LLM
createTime: 2024/12/19 19:25:46
permalink: /dev/llm-api/
---

数据采用流式返回，使用 https 协议。

可用模型如下, 调用费用为每100字/额度。（开放平台每天 500 免费额度），提示词超过500字部分，每200字每次对话扣除1额度。

## 千问模型
| 模型名字       | 模型ID               |
| -------------- | -------------------- |
| 千问2.5-72b    | qwen2.5-72b-instruct |
| 千问2.5-14b    | qwen2.5-14b-instruct |
| 千问3 (可联网) | qwen-plus-latest     |
| 千问视觉大模型 | qwen-vl-plus         |


<!-- ## 豆包模型 & DS模型
| 模型名字                  | 模型ID                  |
| ------------------------- | ----------------------- |
| Doubao-lite-4k            | ep-20250215214941-l969g |
| DeepSeek-R1               | ep-20250214173250-dxmgk |
| Doubao-pro-32k            | ep-20250214173702-c78m6 |
| Doubao-1.5-pro-256k       | ep-20250218153720-6gctb |
| Doubao-1.5-vision-pro-32k | ep-20250218153813-g2tlb |
 -->

::: code-tabs
@tab nodejs
```js
const axios = require('axios');

// 参数
const body = {
    "message": [                     // 消息列表，最后一个元素一定是 user 角色
        {
            "role": "user",          // 角色： user  | assistant | system
            "content": "你好呀！"
        }
    ], 
    "model": "qwen2.5-72b-instruct",
    "stream": true, // 是否为流模式返回
    "api_key": "开放平台 api_key"
};

// 发出请求
axios.post("https://api.espai.fun/ai_api/llm", body, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'stream'
}).then((response) => { 
    const stream = response.data;
    stream.on('data', chunk => {
        const chunk_text = chunk.toString();
        console.log("推理数据：", chunk_text)
    });

    stream.on('end', () => {
        console.log("推理完毕：")
    });

    stream.on('error', (err) => { 
        console.error('Stream error:', err); 
    });
})
```



@tab javascript-web页面中
```ts
// 参数
const body = {
    "message": [                     // 消息列表，最后一个元素一定是 user 角色
        {
            "role": "user",          // 角色： user  | assistant | system
            "content": "你好呀！"
        }
    ],
    "model": "qwen2.5-72b-instruct",
    "api_key": "开放平台 api_key"
};

fetch('https://api.espai.fun/ai_api/llm', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    mode:"cors"
})
.then(response => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    function read() {
        return reader.read().then(({ done, value }) => {
            if (done) { 
                console.log("推理完毕"); 
                return;
            }

            // 处理接收到的数据块
            const chunkData = decoder.decode(value, { stream: true });
            console.log(chunkData); 
            // 继续读取下一个数据块
            read();
        });
    }

    read(); // 开始读取流
})
.catch(error => {
    console.error('请求出错:', error); 
});

```
:::
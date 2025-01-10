---
title: 大语言模型接口
createTime: 2024/12/19 19:25:46
permalink: /dev/llm-api/
---

数据采用流式返回，使用 https 协议。

可用模型如下, 调用费用为每次一个额度。（开放平台每天 200 免费额度）

| 模型名字  | 模型ID        |
| --------- | ------------- |
| 千问32B   | qwen2.5:32b   |
| 千问7B    | qwen2.5:7b    |
| openchat  | openchat      |
| codellama | codellama:13b |
| wizardlm2 | wizardlm2     |
| 千问32    | qwen2.5:32b   |

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
    "model": "qwen2.5:7b",           // 模型ID
    "api_key": "开放平台 api_key"
};

// 发出请求
axios.post("https://espai.natapp4.cc/v1/llm", body, {
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
    "model": "qwen2.5:7b",           // 模型ID
    "api_key": "开放平台 api_key"
};

fetch('https://espai.natapp4.cc/v1/llm', {
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
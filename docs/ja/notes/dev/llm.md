---
title: 大規模な講演プログラム
createTime: 2024/12/19 19:25:46
permalink: /ja/dev/llm-api/
---

データは、httpsプロトコルを使用してストリーミングフォームで回されます。

使用できる機種は以下のとおりです。 1回通信、1回通話料金。(オープンプラットフォームには1日あたり200の素材のない切り道があります)

|モデル名 |モデルID |
| --------- | ------------- |
|前の記事32B|クウェン2.5:32b |
|前文 7B |クウェン2.5:7b |
|オープンチャット |オープンチャット |
|コデラマ |コデラマ:13b |
|ウィザードlm2 |ウィザードlm2 |
|前の記事 32 |クウェン2.5:32b |

::: コードタブ
@タブノードjs
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



@tab JavaScript Web ページ
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
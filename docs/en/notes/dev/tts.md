---
title: 大模型语音合成接口
createTime: 2024/12/19 19:25:46
permalink: /en/dev/tts-api/
---

接口支持流式与非流式请求，接口返回 `44khz` `单声道的` `wav` 流。

调用费用为每次一个额度。（开放平台每天 200 免费额度）

::: code-tabs
@tab Nodejs
```js 
const axios = require('axios');
const { PassThrough } = require('stream'); 

const api_key = "开放平台 api_key"; 
const response = await axios.post('https://espai.natapp4.cc/v1/tts', { streaming: true }, {
    headers: {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json',
    },
    responseType: 'stream' 
}); 
   
const audioStream = response.data;   
const stream = new PassThrough();
audioStream.pipe(stream);
stream.on('data', (chunk) => {
    console.log("音频 chunk", chunk)
})
stream.on('end', () => {
    console.log("音频结束")
}); 
 
```



@tab javascript-网页中
```ts
const blob = await fetch('https://espai.natapp4.cc/v1/tts', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${开放平台 api_key}`,
        'Content-Type': 'application/json', 
    },
    mode: "cors",
    body: JSON.stringify({
        reference_id: "说话人ID", // 获取方式： 开放平台 -> 超体 -> 点击打开TTS编辑面板 -> 找到你要用的音色 -> 点击复制ID
        text:"要播放的文本"
     })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.blob();  
});
const audioUrl = URL.createObjectURL(blob); // 创建一个指向 Blob 的 URL
const audio = new Audio(audioUrl);          // 创建一个新的 <audio> 元素
audio.play();                               // 播放音频

```
:::
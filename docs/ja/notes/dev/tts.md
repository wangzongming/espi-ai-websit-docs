---
title: ラージモデル音響合成システム
createTime: 2024/12/19 19:25:46
permalink: /ja/dev/tts-api/
---

このインターフェイスはストリーミング要件と不ストリーミング要件をサポートし、`44khz` `单声道的` `wav`ストリームを回します。

通話料は1通話で金額は1。(オープンプラットフォームには1日あたり200の素材のない切り道があります)

::: コードタブ
@tab Nodejs
```js 
const axios = require('axios');
const { PassThrough } = require('stream'); 

const api_key = "开放平台 api_key"; 
const response = await axios.post('https://api.espai.fun/ai_api/tts', { 
    streaming: true,
    reference_id: "说话人ID", // 获取方式： 开放平台 -> 超体 -> 点击打开TTS编辑面板 -> 找到你要用的音色 -> 点击复制ID
}, {
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



@tab JavaScript - Web ページ内
```ts
const blob = await fetch('https://api.espai.fun/ai_api/tts', {
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
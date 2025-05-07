---
title: 大模型语音合成接口 TTS
createTime: 2024/12/19 19:25:46
permalink: /dev/tts-api/
---

接口支持流式与非流式请求，接口返回 `44khz` `单声道的` `wav` 流。

调用费用为每次一个额度。（开放平台每天 500 免费额度）

::: code-tabs
@tab Nodejs
```js 
const axios = require('axios');
const { PassThrough } = require('stream'); 
const fs = require('fs')
const path = require('path')

const api_key = "开放平台 api_key";  
  
const url = "https://api.espai.fun/ai_api/tts";
const response = await axios.post(url, {
        api_key:"xxx",  // 获取方式： 开放平台 -> 超体 -> 左下角秘钥
        reference_id: "cosyvoice-v2-espai-xxx", // 获取方式： 开放平台 -> 超体 -> 点击打开TTS编辑面板 -> 找到你要用的音色 -> 点击复制ID
        text: "要播放的文本",
        // sample_rate: 24000, // 采样率
        // volume: 90, // 音量
        // rate: 1, // 语速
    }, {
    headers: { 
        'Content-Type': 'application/json',
    },
    responseType: 'stream'
}); 

const writeStreamMP3 = fs.createWriteStream(path.join(__dirname, `./test.mp3`));
const audioStream = response.data;
const stream = new PassThrough();
audioStream.pipe(stream);
stream.on('data', (chunk) => {
    // console.log("音频 chunk", chunk)
    writeStreamMP3.write(chunk);
})
stream.on('end', () => {
    console.log("音频结束")
    writeStreamMP3.end()
});
```



@tab javascript-网页中
```ts 
 
const url = "https://api.espai.fun/ai_api/tts";
const resp = await fetch(`${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // 设置请求头
    },
    mode: "cors",
    body: JSON.stringify({
         api_key:"xxx",  // 获取方式： 开放平台 -> 超体 -> 左下角秘钥
        reference_id: "cosyvoice-v2-espai-xxx", // 获取方式： 开放平台 -> 超体 -> 点击打开TTS编辑面板 -> 找到你要用的音色 -> 点击复制ID
        text: "要播放的文本",
        // sample_rate: 24000, // 采样率
        // volume: 90, // 音量
        // rate: 1, // 语速
    })
})
let arr = new Uint8Array();
// 合并两个 Uint8Array 的函数
function concatUint8Arrays(arr1, arr2) {
    const newLength = arr1.length + arr2.length;
    const newArr = new Uint8Array(newLength);
    newArr.set(arr1);
    newArr.set(arr2, arr1.length);
    return newArr;
}

const reader = resp.body.getReader();
while (1) {
const { done, value } = await reader.read()
if (done) { 
    break;
}
arr = concatUint8Arrays(arr, value);
}
const strVal = new TextDecoder().decode(arr);
if(strVal && strVal.includes(`"success":false`)){
    const strObj = JSON.parse(strVal);
    console.log(`语音合成失败: ${strObj.message}`);
    return;
} 
const blob = new Blob([arr], { type: 'application/octet-stream' });
const audioUrl = URL.createObjectURL(blob); // 创建一个指向 Blob 的 URL
// const audio = new Audio(audioUrl); // 创建一个新的 <audio> 元素
// audio.play(); // 播放音频
```
:::
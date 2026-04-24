---
title: 音声認識インターフェース
createTime: 2024/12/19 19:25:46
permalink: /ja/dev/asr-api/
---
データ交換には `ws` プロトコルを使用します。

通話料は1通話で金額は1。(オープンプラットフォームには1日あたり200の素材のない切り道があります)

::: コードタブ
@tab突然変化
```js 

const api_key = "开放平台 api_key";
const vad_first = 5000;  // 首次对话时静默时间
const vad_course = 2000; // 对话过程中静默时间
const iat_ws = new WebSocket(`wss://api.espai.fun/ai_api/asr?api_key=${api_key}&vad_first=${vad_first}&vad_course=${vad_course}`);

let realStr = "";
// 得到识别结果后进行处理，仅供参考，具体业务具体对待
iat_ws.on('message', (event) => {  
    if (!event) return;
    const data = JSON.parse(event);
    switch (data.type) {
        case 'result':
            realStr += data.text;
            console.log('识别到：', realStr)
            break;
        case 'final': 
            realStr += data.text; 
            console.log('识别接收：', realStr) 
            break; 
        case 'error': 
            console.log(`ESP-AI-ASR 服务错误： ${data.text}`)
            break;
    }
})

// 资源释放
iat_ws.on('close', () => {
    console.log('asr 服务关闭')
})

// 建连错误
iat_ws.on('error', (err) => {
    console.log('asr 服务出错：', err)
})


// 发送 mp3 音频流
iat_ws.send("xxx"); 
 
```



@tab ファイルの変化
```ts
const formData = new FormData();
formData.append("api_key", "开放平台 api_key");
formData.append("audio", File 对象); // 一般是 input 输入上传的文件
const { success, data, message } = await myFetch("https://api.espai.fun/ai_api/stt", formData);
if (success) {
    console.log("音频内容：", data)
} else { 
    console.error(`文件上传失败：${message}`)
}

async function myFetch(apiName, body) {
    return new Promise((resolve) => {  
        const isFormData = (body instanceof FormData); 
        fetch(apiName, {
            method: "POST",
            mode: "cors",
            body: body
        }).then((res) => res.json()).then((res) => resolve(res))
    })
}
```
:::
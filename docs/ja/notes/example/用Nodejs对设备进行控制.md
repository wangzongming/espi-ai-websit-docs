---
title: Nodejsでデバイスを制御する
createTime: 2024/11/07 15:15:10
permalink: /ja/example/nodejsCtlDev/
---

以下に操作手順の一部を示します。。詳細については、[服务端实例](/config-server/instance/)をご参照ください。


## ビデオチュートリアル
 
@[ビリビリ](BV12CUYYYEjj)

## ハードウェアに保存されたデータを操作する

```js
const espAiIns = espAi({ ... });
await espAiIns.setLocalData("xxx-xxx-xxx-xxx", "ext1", "业务数据");
```

## ハードウェアに语らせましょう

```js
const espAiIns = espAi({ ... });
await espAiIns.tts("xxx-xxx-xxx-xxx", "你好啊");
```

## ピンのハイおよびローレベルが貢献

Heのパターンについてさらに知りたいですか?詳細については、[服务端实例](/config-server/instance/)を参照してください。

```js
const espAi = require("esp-ai");

const config = {
    // ...
    // 监听设备连接
    onDeviceConnect({ device_id, instance }) { 
        //===== 让 LED 闪烁 =====
        // 给设备的 21 号引脚设置为输出模式
        instance.pinMode(device_id, 21, "OUTPUT"); 

        // 让 LED 闪烁
        setInterval(()=>{ 
            console.log('========== 点亮 LED ========== ')
            instance.digitalWrite(device_id, 21, "HIGH");    // 设置高电平
            setTimeout(()=>{
                console.log('========== 熄灭 LED ========== ')
                instance.digitalWrite(device_id, 21, "LOW"); // 设置低电平
            }, 1000)
        }, 2000)
    }
};

// 实例化 esp-ai
const espAiIns = espAi(config);

```


## 高レベル、低レベル、低レベル

```js
const espAi = require("esp-ai");

const config = {
    // ...
    // 监听设备连接
    onDeviceConnect({ device_id, instance }) { 
        // 给设备的 21 号引脚设置为输入模式
        instance.pinMode(device_id, 21, "INPUT"); 
        // 读取引脚电平
        instance.digitalRead(device_id, 21, function(val){
            console.log('引脚状态变化：', val);
        }) 
    }
};

// 实例化 esp-ai
const espAiIns = espAi(config);

```


## PWM出力

```js
const espAi = require("esp-ai");

const config = {
    // ...
    // 监听设备连接
    onDeviceConnect({ device_id, instance }) { 
        // 给设备的 21 号引脚设置为输入模式
        instance.pinMode(device_id, 21, "OUTPUT"); 

        // 熄灭 LED
        instance.analogWrite(device_id, 21, 255);

        // led 呼吸灯
        let i = 250;
        setInterval(() => {
            i -= 50;
            if (i < 0) i = 250;
            // PWM输出
            instance.analogWrite(device_id, 21, i)
        }, 100) 

    }
}; 

// 实例化 esp-ai
const espAiIns = espAi(config);

```




## ポテンショメータ入力夤を読み取っている

```js
const espAi = require("esp-ai");

const config = {
    // ...
    // 监听设备连接
    onDeviceConnect({ device_id, instance }) { 
        // 给设备的 21 号引脚设置为输入模式
        instance.pinMode(device_id, 21, "INPUT"); 

        instance.analogRead(device_id, 21, function(val){
            console.log('引脚状态变化：', val);
        }) 
    }
}; 

// 实例化 esp-ai
const espAiIns = espAi(config);

```

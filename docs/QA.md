---
title: 常见问题
createTime: 2024/11/07 15:11:22
permalink: /qa/
---
 

## 1、esp32s3 开发版 Arduino 上传代码报错: A fatal error occurred: Failed to connect to ESP32-S3: No serial data received.

![上传报错](/images/qa/upload-error.jpg)

#### 解决方法
1. 拔掉你板子上的其他引脚特别是tx、tx
2. 检查串口是否正确选择
3. 重启电脑
4. 找卖家退货 换新 

因为正常板子插到右边的c口都可以直接上传，亲测过两块不一样的s3板子都是直接插上就能用。

## 2、天问唤醒不了

1. 有的板子你插到右边 c 口时和天问的串口好像冲突，就唤醒不了
2. 确认两个板子共地了
3. 波特率是否正确，天问默认 9600
 


## 3、Arduino 烧录报错 config.audo_clear = true
1. esp32库版本需要安装 2.0.17 版本
2. 左上角选择的开发板不是 esp32s3 dev module


## 4、怎么重新配网，重新设置 api_key

1. 方式一，查看局域网地址，然后打开局域网地址就可以进行配网。

![上传报错](/images/qa/ip.png)


2. 方式二，用这个按钮去清除设备内的程序，然后重新烧录。

![上传报错](/images/qa/clear-flash.png)
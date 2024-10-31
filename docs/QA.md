# 常见问题

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



## 4、服务端播放音乐报错：流写入停止： Error: spawn /www-server/esp-ai-node-server/node_modules/ffmpeg-static/ffmpeg EACCES

执行下面命令可以看到提示没有权限 

![上传报错](/images/qa/image-1.png)

解决方法：删除掉 node_modules 文件夹，重新 npm install。
需要注意用 taobao 镜像安装的会报错的话，可以切换到腾讯源： 

```
npm config set registry https://mirrors.cloud.tencent.com/npm/
npm i esp-ai
```


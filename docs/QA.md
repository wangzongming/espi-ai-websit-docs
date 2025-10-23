---
title: 常见问题
createTime: 2024/11/07 15:11:22
permalink: /qa/
---
 
## 开放平台
### 1、怎么重新配网，重新设置 api_key

1. 方式一，打开开放平台->超体->设备管理->编辑(设备在线才可以编辑)->设置wifi
2. 方式二，按五次按钮（见接线表中的三脚按钮接线）会自动清除所有信息，然后进行配网
3. 方式三，用这个按钮去清除设备内的程序，然后重新烧录。

![上传报错](/images/qa/clear-flash.png)

### 2、开放平台、文档网站、发布页面 都是做什么的？ 

1. 技术细节以**文档平台**为准: [https://espai.fun](https://espai.fun)  
2. **发行版本**以github发布页面为准: [https://github.com/wangzongming/esp-ai/releases](https://github.com/wangzongming/esp-ai/releases)    
3. 开放平台提供一站式 AI 服务 [dev.espai.fun](dev.espai.fun)，帮你省下高昂的 AI 接口费用和云服务费用。   

## 硬件设备

### 1、esp32s3 开发版 Arduino 上传代码报错: A fatal error occurred: Failed to connect to ESP32-S3: No serial data received.

![上传报错](/images/qa/upload-error.jpg)

#### 解决方法
1. 拔掉你板子上的其他引脚特别是tx、tx
2. 检查串口是否正确选择
3. 重启电脑
4. 找卖家退货 换新 

因为正常板子插到右边的c口都可以直接上传，亲测过两块不一样的s3板子都是直接插上就能用。

### 2、天问唤醒不了

1. 有的板子你插到右边 c 口时和天问的串口好像冲突，就唤醒不了
2. 确认两个板子共地了
3. 波特率是否正确，天问默认 9600
4. 2024年12月1日升级后，天问引脚更换，需要重新焊接，

### 3、Arduino 烧录报错 config.audo_clear = true
1. esp32库版本需要安装 2.0.17 版本
2. 左上角选择的开发板不是 esp32s3 dev module

[//]: # (### 4、天问唤醒词怎么改？)
[//]: # (跟着视频操作 [http://twen51.com/new/twen51/coursePlayCloud.php?id=24&info_id=217])


### 4、一直按重启键，板子偶尔连不上WIFI 

这一般是路由器问题，特别是使用手机热点时容易出现，点名一加手机，该手机经测试，在省电模式下和设备断开wifi连接的速度超级慢。很多时候在设备重启完成后手机依然还未断开连接，就会导致设备连不上wifi。

## 小程序

### 1、蓝牙配网未初始化？

[小程序蓝牙未授权](https://esp-ai2.oss-cn-beijing.aliyuncs.com/qa/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%93%9D%E7%89%99%E6%9C%AA%E6%8E%88%E6%9D%83.mp4)

[微信蓝牙未授权](https://esp-ai2.oss-cn-beijing.aliyuncs.com/qa/%E5%BE%AE%E4%BF%A1%E8%93%9D%E7%89%99%E6%9C%AA%E6%8E%88%E6%9D%83.mp4)

## 服务端

### 1、自己部署的服务连不上
1. 防火墙没关
2. 端口为开放(公网服务)
3. ip地址用错了
4. 端口用错了
5. 客户端代码配置错了，自行看客户端服务配置文档

### 2、说话时提以下音频错误
`reason audioCoding decode fai!`
请更新最新服务端和客户端代码
 
### 3、安装很慢
请使用 `npm install esp-ai --registry=https://registry.npmmirror.com`

---
title: Docker
createTime: 2024/11/07 15:11:22
permalink: /guide/3kyfq46z/
---

- 我们将容器命名为：`esp-ai-server`
- 配置文件放到`/esp-ai-server/index.js` **(请先手动创建好这个文件)**
- 宿主机端口为`8088`

注意：上面这三个配置只能更改宿主机的，镜像的必须如下写死。


#### 创建配置文件
```bash
sudo touch /esp-ai-server/index.js
```

#### 编辑配置文件
```bash
sudo nano /esp-ai-server/index.js
```
打开后把下面代码复制进去：(记得自己去复制自己的key)
```javascript
const espAi = require("esp-ai"); 
const config = { 
  // ...
};
espAi(config);
```
然后 ctrl + o 保存。
然后 ctrl + x 退出。

#### 运行容器
必须先手动创建好 `/esp-ai-server/index.js` 文件，该文件案例在仓库的 `example/index.js` 目录下。
```bash
sudo docker run -itd -p 8088:8088 -v /esp-ai-server/index.js:/server/index.js --name esp-ai-server registry.cn-shanghai.aliyuncs.com/xiaomingio/esp-ai:1.0.0
```

配置文件将映射到了`/esp-ai-server/index.js`，需要自行更改配置文件，更改文件后重启服务即可：
```bash
sudo docker exec -it esp-ai-server pm2 restart all
```

#### 容器内安装插件
直接在容器内执行安装插件的命令
```bash
sudo docker exec -it esp-ai-server npm i [插件名字]  --registry=https://registry.npm.taobao.org  --strict-ssl=false 
```

然后自行修改配置文件后，依然需要重启容器
```bash
sudo docker exec -it esp-ai-server pm2 restart all
```

#### 查看运行日志
```bash
sudo docker exec -it esp-ai-server pm2 logs
```

#### 更新依赖
用最新的版本号替换下面代码中的版本号即可。

```bash
sudo docker exec -it esp-ai-server npm i esp-ai@1.xx.xx  --registry=https://registry.npm.taobao.org  --strict-ssl=false 
```

更新完毕后需要查看`package.json`中的版本号是否正确，如果正确，则重启容器即可。
```bash
sudo docker exec -it esp-ai-server cat ./package.json
```

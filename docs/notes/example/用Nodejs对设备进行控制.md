---
title: 用Nodejs对设备进行控制
createTime: 2024/11/07 15:15:10
permalink: /example/nodejsCtlDev/
---
## Nodejs 代码操作
服务端目前还只支持设置，暂不支持读取。比如传入硬件ID才行，因为一个服务会挂载很多设备。

详情见：[setLocalData](/config-server/instance/#setlocaldata)

```c
const espAiIns = espAi({ ... });
await espAiIns.setLocalData("xxx-xxx-xxx-xxx", "ext1", "业务数据");
```

---
title: ドッカー
createTime: 2024/11/07 15:11:22
permalink: /ja/guide/3kyfq46z/
---

- コンテナーに名前を公開します: `esp-ai-server`
- ファイルの構成を `/esp-ai-server/index.js` に設定します **(初期にこのファイルをマニュアルで作ってください)**
- ホスト ポートは `8088` です

注記:第3章の構成はホスト上でのみ変更でき、ミラーは時のようにハードシールドする必要があります。


#### SET ファイルを作成する
```bash
sudo touch /esp-ai-server/index.js
```

#### SET ファイルを収集する
```bash
sudo nano /esp-ai-server/index.js
```
开したら、時のコードをコピーします (自分のキーを忘れずにコピーしてください)。
```javascript
const espAi = require("esp-ai"); 
const config = { 
  // ...
};
espAi(config);
```
時間、Ctrl + O、時間を節約します。
時に Ctrl +。

#### コンテナを実行する
初期`/esp-ai-server/index.js`マニュアル マニュアル作成必要。このファイルはウェアハウスの `example/index.js` ディレクトリにあります。
```bash
sudo docker run -itd -p 8088:8088 -v /esp-ai-server/index.js:/server/index.js --name esp-ai-server registry.cn-shanghai.aliyuncs.com/xiaomingio/esp-ai:1.0.0
```

ファイルの構成は `/esp-ai-server/index.js` にマップされます。設定に必要な設定を行います。。ファイルを変更した後、サービスを再起動します。。
```bash
sudo docker exec -it esp-ai-server pm2 restart all
```

#### コンテナにプラグインをインストールする
コマンドを実行してプラグインをコンテナに直接インストールします
```bash
sudo docker exec -it esp-ai-server npm i [插件名字]  --registry=https://registry.npm.taobao.org  --strict-ssl=false 
```

そのあと、 ｂｙ。
```bash
sudo docker exec -it esp-ai-server pm2 restart all
```

#### 実行ログを確認する
```bash
sudo docker exec -it esp-ai-server pm2 logs
```

#### 依存関係の更新の更新
次のコード内のバージョン番号を最新のバージョン番号に設定変更できるだけです。

```bash
sudo docker exec -it esp-ai-server npm i esp-ai@1.xx.xx  --registry=https://registry.npm.taobao.org  --strict-ssl=false 
```

アップデートが完了しましたら、`package.json` のバージョン番号が正しいかどうかを確認する必要があります。時が来ました、コンテナーを再スタートです。
```bash
sudo docker exec -it esp-ai-server cat ./package.json
```

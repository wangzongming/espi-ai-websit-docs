---
title: ユキは尋ねた。
createTime: 2026/04/23 14:57:00
permalink: /ja/qa/
---

## 1. ESP32-S3 開発ボードで Arduino にき込み時にエラーが発生しました
`A fatal error occurred: Failed to connect to ESP32-S3: No serial data received.`

![upload-error](/images/qa/upload-error.jpg)

#### 治療方法
1. ボード上の他のピン（特にTX/RX）を外してください。
2. ポジティブ選択とネガティブ選択。
3.PCの再起動。
4. 問題の解決策は問題を解決する可能性であり、失敗の可能性は解決策です。

## 2. Tianwen（ティアンウェン）でウェイクアップできない

1. Type-Cのボードでは右側。。
2. 2枚のボードに共通がGNDになっているか確認してください。
3. ボーレートが正しいか確認してください（天文の自信は 9600）。
4. 2024/12/01 以降、システムの構成が更新され、必要に応じて更新されます。。

## 3. Arduino にき込み時に `config.audo_clear = true` エラーが発生しました
1. `esp32` ライブラリは `2.0.17` を使用してください。
2. `esp32s3 dev module` の設定の確認。

## 4. ネットワークの再構成と API キーのリセット

1. 方法 1:ボタンを5回すと情報がクリアされ、再配布ネットワークができます。
2.方法2:Flash Eliminate ツールでプログラムを Eliminate し、再度予約き込みます。

![clear-flash](/images/qa/clear-flash.png)

＃＃５ 玄関前から玄関まで
1.ファイアウォール設定確認。
2. ポート開設確認（パブリック環境）。
3. IPアドレス設定の確認。
4. ポートの設定と確認。
5.クライアント側の設定を確認する。

## 6. 会話中 `reason audioCoding decode fai!` エラー
サーバー横とクライアント横を最新コードに更新してください。

## 7. Tianwen のウェイクワード変アップデート
次のアニメーションの説明は以下を参照してください。
http://twen51.com/new/twen51/coursePlayCloud.php?id=24&info_id=217

## 8. インストールが遅い

のコマンドを2回目に使用する場合:
`npm install esp-ai --registry=https://registry.npmmirror.com`

＃＃９。

1. 技術的な詳細については、「技術的な詳細」を参照してください。: [https://espai.fun](https://espai.fun)
2.リリースはGitHubを参照: [https://github.com/wangzongming/esp-ai/releases](https://github.com/wangzongming/esp-ai/releases)
3. オープンプラットフォームが提供するのはAIサービス一式を: [https://dev.espai.fun](https://dev.espai.fun)

## 10. リセットボタンを継続して戦うときはWi-Fiにシステムが入らない

向こう側には多くの出来事や問題がある。特殊省電力機能を設定している場合、切断および再接続の設定は失敗します。。

# recs-seem-web

## ローカルでのセットアップ

- npm環境構築

以下のコマンドで`npm`をインストール

``` sh
curl https://get.volta.sh | bash
source  ~/.bashrc
volta install node # LTS版をインストール
node -v
```

- aquaセットアップ

[`aqua`](#how-to-install-aqua)をインストール後、いかのコマンドを実行する

``` sh
aqua i -l
```

- hostsの設定変更

`/etc/hosts`を以下の項目を追加する

``` diff
+ 127.0.0.1       www.al.kansai-u.ac.jp.test
```

## あくまでたたき台

- テストコードは書かない
- CI/CDパイプラインもなし
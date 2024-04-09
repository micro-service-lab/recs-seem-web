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

- hostsの設定変更

`/etc/hosts`を以下の項目を追加する

``` diff
+ 127.0.0.1       www.al.kansai-u.ac.jp.test
```

## あくまでたたき台

- テストコードは書かない
- CI/CDパイプラインもなし
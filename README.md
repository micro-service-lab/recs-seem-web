# recs-seem-web

## ローカルでのセットアップ

```mermaid
graph TD;
    A[Frontend (React)] --> B[BFF (Node.js)];
    B --> C[Authentication Service (Go)];
    C --> D[Postgres];
    
    B --> E[Organization Management (Java)];
    E --> F[Cassandra];
    
    B --> G[File Management (Node.js)];
    G --> H[MongoDB];
    
    B --> I[Real-Time Chat (Python)];
    I --> J[Redis];
    
    B --> K[Absence Management (C#)];
    K --> L[DynamoDB];
    
    B --> M[Event Management (Rust)];
    M --> N[Cassandra];
    
    B --> O[Minutes Management (PHP)];
    O --> P[Elasticsearch];
    
    subgraph Saga Orchestrator
        Q[Orchestration Service (Java)]
    end
    
    Q --> C;
    Q --> E;
    Q --> G;
    Q --> I;
    Q --> K;
    Q --> M;
    Q --> O;
    
    subgraph Kubernetes EKS
        B;
        C;
        E;
        G;
        I;
        K;
        M;
        O;
    end

    %% Messaging and Communication
    C -.->|gRPC| E;
    E -.->|gRPC| G;
    G -.->|gRPC| I;
    I -.->|gRPC| K;
    K -.->|gRPC| M;
    M -.->|gRPC| O;

    C -->|Kafka| E;
    E -->|Kafka| G;
    G -->|Kafka| I;
    I -->|Kafka| K;
    K -->|Kafka| M;
    M -->|Kafka| O;
```

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
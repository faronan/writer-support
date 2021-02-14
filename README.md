# Writer Support

![ci-main](https://github.com/faronan/writer-support/workflows/CI/badge.svg)

![license](https://img.shields.io/github/license/faronan/writer-support)

## 概要

[Writer Support](https://writer-support.vercel.app/)は、より良い文章を書くためのサービスです。

文章の文法ミスや誤字脱字をチェックし、発見した改善点を振り返って、自分の癖を分析できます。

### 使い方

URL: https://writer-support.vercel.app

![image](https://user-images.githubusercontent.com/40588536/107873560-cf11ea00-6ef6-11eb-983d-402392e10055.png)

- 画面右上の【ゲストログイン】【ログイン】ボタンからログインします。
- ログイン後、画面上部の【文章をチェック 🗒】ボタンから、校正機能を使用できます。
  - 文章を作成して【送信】ボタンを押すと、文法ミスや誤字脱字を発見できます。
- ログイン後、画面上部の【文章の癖を分析 👀】ボタンから、分析機能を使用できます。
  - 発見した改善点をランキングやグラフ表示で確認できます。

<details>
  <summary>画面詳細</summary>
  <h3>校正機能<h3>

![校正機能](https://user-images.githubusercontent.com/40588536/107892237-22bc1c00-6f67-11eb-9ca6-6b0010ea7eb4.gif '校正機能')

<h3>分析機能<h3>　　

![分析機能](https://user-images.githubusercontent.com/40588536/107892329-b68de800-6f67-11eb-9de6-1c0dd3a29bfe.png '分析機能')

</details>

### 背景

私は「読みやすい文章」こそ良い文章だと考えています。
文法ミスや誤字脱字のない完璧な文章でも、読み手に理解して貰えなければ良い文章ではないと思います。

しかし、せっかく読み手のことを思って書いた文章が、ちょっとした文法ミスによって伝わりにくくなくなってしまうのは、とても悲しいです。
そこで、機械的なチェックをツールに任せて改善していくことで、人にしかできない読み手への配慮により集中できればという思いで、本サービスを開発しました。

既存の文章校正ツールと違って、発見した改善点を記録・分析できる点が本サービスの特徴です。

## 技術スタック

- バックエンド: [NestJS](https://nestjs.com/) v.7.6.11
- ORM: [Prisma](https://www.prisma.io/) v.2.16.0
- API: [GraphQL](https://graphql.org/)
  - [GraphQL Code Generator](https://graphql-code-generator.com/) v.1.20.1
  - [Apollo Client](https://www.apollographql.com/docs/react/) v.3.3.7
  - [Apollo Server](https://www.apollographql.com/docs/apollo-server/) v.3.0.0-alpha.3 (alpha 版の理由は[#9](https://github.com/faronan/writer-support/pull/9) に記載)
- フロントエンド: [Next.js](https://nextjs.org/) v.10.0.4
- スタイリング: [Chakra UI](https://chakra-ui.com/) v.1.2.1

---

- 静的解析: [ESLint](https://eslint.org/) v7.16.0 + [Prettier](https://prettier.io/) v.2.1.2
- テスト: [Jest](https://jestjs.io/ja/) v26.6.3
  - [React Testing Library](https://testing-library.com/) v11.2.3
- Monorepo(パッケージ管理): [Lerna](https://lerna.js.org/) v3.22

---

- ホスティング: [Vercel](https://vercel.com/)
- コンテナ管理: [Cloud Run](https://cloud.google.com/run)
  - [Docker](https://www.docker.com/)
  - [Cloud Build](https://cloud.google.com/build)
- データベース: [Cloud SQL](https://cloud.google.com/sql)
  - [Mysql 8.0](https://cloud.google.com/sql/docs/mysql)
- CI: [GitHub Actions](https://github.co.jp/features/actions)

## 構成図

![image](https://user-images.githubusercontent.com/40588536/107873126-565d5e80-6ef3-11eb-856c-291d41e2d5d4.png)

## 機能一覧

- ログイン機能([Next Auth](https://next-auth.js.org/))
- 校正機能([textlint](https://textlint.github.io/))
  - チェック項目選択可
  - 文章作成補助機能
    - スニペット機能
    - NG ワード機能
- 分析機能
  - 間違えやすい項目をランキングで表示
  - グラフによる可視化([Recharts](https://recharts.org/))
  - 日時やユーザーでの絞り込み

## セットアップ

ローカルでこのリポジトリを動かす時の手順です。
※docker-compose を使います。

#### 1. リポジトリをクローンします。

```
$git clone https://github.com/faronan/writer-support.git
```

#### 2. ディレトリを移動します。

```
$cd writer-support
```

#### 3. パッケージをインストールします。

lerna によって、サーバーとフロント両方のインストールが行われます。

```
$npm install
```

#### 4. 環境変数を設定します。

`packages/front/.env.local`

```
NEXTAUTH_URL=http://localhost:3000
SERVER_URL=http://localhost:8080/graphql
```

`packages/server/prisma/.env`

```
DATABASE_URL="mysql://root:password@db/development"
PORT="8080"
```

#### 5. コンテナを起動します。

コンテナの初回起動時は、 DB コンテナの準備中に他コンテナが立ち上がって、接続に失敗してしまうことがあります。
それを防ぐために、DB コンテナだけ先に起動します。

```
$docker-compose up db
$docker-compose up
```

#### 6. URL にアクセスします。

コンテナが起動したら、ブラウザから以下の URL にアクセスできます。

- サーバー: http://localhost:8080/graphql
- フロント: http://localhost:3000

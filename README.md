# Product Development Cases (Next.js)

プロダクト開発部の実績一覧と実績詳細を表示する Next.js アプリです。

- 一覧ページ: `/`
- 詳細ページ: `/cases/[id]`

## Tech Stack

- Next.js 14 (App Router)
- React 18
- CSS (global styles)

## 画面構成

### 一覧ページ (`/`)

- Hero
- Cases 一覧カード
- 一覧カードから詳細ページへ遷移

実装ファイル:

- `/Users/naggigoishi/Documents/projects/prodev/app/page.js`
- `/Users/naggigoishi/Documents/projects/prodev/app/components/HeroSection.jsx`
- `/Users/naggigoishi/Documents/projects/prodev/app/components/CasesSection.jsx`

### 詳細ページ (`/cases/[id]`)

- Hero
- 課題定義
- 問題の分解
- 設計判断
- 図解
- 結果 など

実装ファイル:

- `/Users/naggigoishi/Documents/projects/prodev/app/cases/[id]/page.js`

## データ構成

詳細ページの本文は Markdown ファイルで管理します。

- 配置: `app/content/cases/{id}.md`
- `{id}` は URL の `/cases/{id}` と一致させます

各 Markdown は frontmatter を持てます。

- `title`: 一覧/詳細で使うタイトル
- `lead`: 詳細ページのリード文
- `summary`（任意）: 一覧カードの概要（未指定の場合 `lead` を使用）
- `meta`（任意）: 一覧カードのメタ表示
- `imageSrc`（任意）: 一覧カード画像（未指定の場合 `/cases/{id}/hero.png`）
- `tags`（任意）: 一覧カード用タグ
- `order`（任意）: 一覧の並び順

## 遷移ルール

一覧カードのリンクは `id` を使い、`/cases/{id}` へ遷移します。

対応する `app/content/cases/{id}.md` が存在しない場合は 404 になります。

## 新しい実績の追加手順

1. `app/content/cases/{id}.md` を追加
2. （任意）frontmatter を設定（title/lead/summary/meta/imageSrc/tags/order）
3. （任意）画像を `public/cases/...` に配置

## よくある不具合と原因

### 一覧から詳細に行くと 404

原因:

- `app/content/cases/{id}.md` が存在しない

対応:

- `app/content/cases/{id}.md` を追加する

### 詳細ページが空白に見える

原因:

- `.reveal` の表示制御がルート変更で再実行されない

現在の対応:

- `ClientEffects` を `layout.js` で全ページ適用
- ルート変更時に `.reveal` の監視を再設定

対象ファイル:

- `/Users/naggigoishi/Documents/projects/prodev/app/ClientEffects.jsx`
- `/Users/naggigoishi/Documents/projects/prodev/app/layout.js`

## 開発コマンド

```bash
npm install
npm run dev
npm run build
npm run start
```

## 補足

- `/Users/naggigoishi/Documents/projects/prodev/index.html` は静的試作ファイルです。
- 現在の本番実装は `app/` 配下（Next.js App Router）です。

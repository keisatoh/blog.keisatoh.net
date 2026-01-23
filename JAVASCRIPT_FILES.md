# JavaScriptファイルについて

このプロジェクトには、以下の3つのJavaScript設定ファイルがあります：

## 1. astro.config.mjs

**目的**: Astroフレームワークの設定ファイル

**役割**:
- サイトのURL設定 (`https://blog.keisatoh.net`)
- 統合機能の設定:
  - Tailwind CSS (スタイリング)
  - Svelte (コンポーネントフレームワーク)
  - Sitemap (SEO用のサイトマップ生成)
- 画像設定:
  - レスポンシブレイアウト
  - デフォルト画像フォーマット (AVIF)
- Markdownのシンタックスハイライト設定 (GitHub Dark Dimmedテーマ)

## 2. tailwind.config.cjs

**目的**: Tailwind CSSの設定ファイル

**役割**:
- コンテンツファイルのパス指定 (Astro、HTML、JS、TS、Svelteなど)
- カスタムカラー設定:
  - グレー色の定義 (`#888888`)
- タイポグラフィプラグインのカスタマイズ:
  - ブロッククォートのスタイル設定
  - フォントウェイト、色、マージン、パディングの調整
  - 引用符の除去設定

## 3. .eslintrc.cjs

**目的**: ESLintの設定ファイル（コード品質チェックツール）

**役割**:
- Astro推奨ルールとPrettier設定の継承
- ブラウザとNode.js環境のサポート
- ECMAScript最新版の使用設定
- Astroファイル専用の設定:
  - 専用パーサーの使用
  - TypeScript統合

## まとめ

このプロジェクトには**アプリケーションロジック用のJavaScriptファイルは存在しません**。

すべてのJavaScriptファイルは**設定ファイル**であり、開発ツールやフレームワークの動作を制御するために使用されています。実際のアプリケーションコードは、TypeScriptとAstroファイルで書かれています。

### ファイルの種類:
- `.mjs` = ES Module形式のJavaScript
- `.cjs` = CommonJS形式のJavaScript

---
layout: ../../layouts/PostLayout.astro
title: "Astroでブログをつくった"
date: "2023-01-29"
description: "Astro + Tailwind CSSでブログを作成した。Astroでブログを作成するのは、ずいぶん楽で、おすすめできる。"
dek: "たのしい＼(^o^)／"
---

昨年末にコロナウイルスに感染し、名古屋のホテルで療養していた。体調が良くなってきたころ、ホテルの小さな机の上でAstroを触り始め、楽しくなってブログを作った。

ソースコード：[https://github.com/keisatoh/blog.keisatoh.net](https://github.com/keisatoh/blog.keisatoh.net)

もともとはてなブログやWordPressでブログを書いていたけど、適当に放っておいたらproライセンスが切れたり、ドメインが失行していたりして、なにかを書く場所を失っていた。自作ブログはもともと憧れがある。僕がSSGという単語を知る前から、lifehacking.jpの[「ブログをWordPressからHugoに移行しました」](https://lifehacking.jp/2020/05/goodbye-wordpress-hello-hugo/)を読んで、静的で軽く、Markdownで執筆できるスタイルに魅力を感じていた。

思えばそこが今回のモチベーションの遠い起点で、次点で愛読している[r7kamuraさんのブログ](https://r7kamura.com/)だと思う。当時の自分には難しかったが、いつの間にかだいたい理解できるようになっていて感慨深い。今回は得意なJavaScriptを使おう。

## 使用技術

### Astro
フレームワークはAstroを採用した。使ってみたかった。
> Astroは、コンテンツにフォーカスした高速なWebサイトを構築するためのオールインワンWebフレームワークです。
> [はじめに 🚀 Astroドキュメント](https://docs.astro.build/ja/getting-started/)

Astroは2021年に登場したフレームワークで、ビルド時に可能な限りJavaScriptを排除した、高速なSSGに強みがあるとされている。また、ReactやVue、Svelteといった他のフレームワークを同じページで混在できたり、先日発表されたばかりの最新バージョンではページまたはエンドポイントごとにSSGとSSRを混在させられたりと、びっくりがたくさん。

コンテンツ重視をうたっているだけあって、ビルトインでMarkdownまわりのあれこれやページネーションがサポートされていて、ブログにはもってこいである。実際に開発体験はすごくよくて、たのしかった。

たとえば記事一覧ページ（`pages/post/`下のmdファイルを一覧で表示する）を実現するのに、以下のAstroコンポーネントのみで済む:

```astro
---
const posts = await Astro.glob('../pages/post/*.md');
---

<div>
{posts.map((post) => (
  <article>
    <h1>{post.frontmatter.title}</h1>
    <a href={post.url}>Read more</a>
  </article>
))}
</div>
```
Astroコンポーネントは、`---`に囲まれたコンポーネントスクリプトと、その下のコンポーネントテンプレートによって構成される。スクリプト部はTypeScriptが書けるし、テンプレート部はJSXのような記法が使える（プレーンなHTMLを書くこともできる）。
特有のくせがなく、それでいて欲しいメソッドは充実していて（ここでいう`Astro.glob`）、ドキュメントを読めばだいたい全部わかるのがうれしい。


### Tailwind CSS
CSSはTailwind CSSで書いた。最近は、学校の課題や個人でなにかを作るとき、ほぼ毎度Tailwindを使用している。デザインを試行錯誤しながらスタイリングするときにも、ストレスが少ないのがいい（今回デザインカンプは作っていない）。

記事本文のスタイリングには[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)を採用した。

Markdownファイルのフロントマターには`layout`プロパティがあり、Layoutコンポーネントが指定できる。そして、指定したLayoutコンポーネントの`<slot />`の箇所にレンダリングされる。

```astro
<article class="prose">
  <slot />
</article>
```

@tailwindcss/typographyを使うと、`prose`クラスを振るだけで、読みやすい文章になるようよしなにスタイリングしてくれる。カスタマイズすることもできるけど、現状はほぼデフォルトのまま使用している。

### Cloudflare Pages + Imgur
デプロイ先にはCloudflare Pagesを選んだ。昨年、NuxtでSSGしたサイトをデプロイした時にパフォーマンスが良かったのと、当時比較検討した結果、無料プランでできることの幅がもっとも広かったため。たとえば、商用利用ができる。無料（Hobby）アカウントの[ポリシー](https://vercel.com/docs/concepts/limits/fair-use-policy#commercial-usage)によって「非営利の個人使用のみ」と定められているVercelと比べて、Amazonなどのアフィリエイトリンクを貼りやすいと思う。また、このサイトのドメインがCloudflareで取得・管理されているので一元化できる利点もある。

画像はリポジトリ内ではなく外部に置きたかったので、[Imgur](https://imgur.com/)へアップロードすることにした。アップロードすると同EXIFを消してくれたり、WebP画像も生成してくれるので、手軽に運用できそう。アップロード先の選択肢には[Gyazo](https://gyazo.com/ja)も上がったが、前述の機能が無料で使えるImgurに軍配が上がった。

## （ちょっとだけ）工夫したところ
ちょっとだけ工夫した点として、`dek`プロパティの存在がある。

まず、[The Verge](https://www.theverge.com/)にみられるような、タイトル下の短い文章をつけたいと思った。[これはdekと呼ばれるらしい](https://underthecurve.github.io/jekyll/update/2016/12/29/hed-dek-led-graf.html)。たしかに、WIREDやCNETのソースを覗くと、それらしき名前のクラスが振られている。

というわけで、mdファイルのフロントマターに`dek`プロパティを用意して、それを記事ページと記事一覧ページ（トップページ）のタイトル下に表示した。日記を書くときなんかにいちいち考えるのは面倒なので、dekがないときの一覧ページには本文冒頭から抜粋することにした。

つまり、トップページにはdekか本文冒頭が表示される。以下、抜粋するための関数:

```ts
const getExcerpt = (html: string, excerptLength: number) => {
  const removeHTMLTags = (html) => {
    return html
      .replace(/\r?\n/g, ' ')
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
  };
  const plainText = removeHTMLTags(html);

  const excerpt = plainText.slice(0, excerptLength);
  // 抜粋する文字数より本文が長い場合、末尾に3点リーダーをつける
  return excerptLength < plainText.length ? excerpt + '…' : excerpt;
};
```

この関数によって返される本文冒頭は、前述のユースケースだけでなく、`description`プロパティ未入力時のmetaタグの中にも利用している。

dekとの論理演算を除けば、はてなブログやnoteなどの多くのブログサービスにみられるポピュラーな実装だと思う。さきほどの関数は、まさにはてなブログっぽさを意識している。


## さいごに
気に入ったのでしばらくの間Astroを触っていくし、Astroの話をよくすると思います。


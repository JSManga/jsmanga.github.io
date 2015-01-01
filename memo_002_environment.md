---
layout: default
date: 2014/7/26
---

# 環境構築

環境構築というのは、いつでも面倒なものです。
(そういう理由から、JavaScriptを本編では採用しました)
プログラミングに限らず、面倒だったことはメモするべきです。
今回は、このページをどうやって作ったかを簡単に。


1. GitHubに登録
1. 個人サイト用のレポジトリ「ユーザ名.github.io」を作成
1. レポジトリのSettingから好きなテーマを選択

これで、[http://jsmanga.github.io](http://jsmanga.github.io) ができました。


ところで、HTMLタグの直打ちはシンドイです。それにソースコードを見やすく表示したい。
そこで、Markdownという簡単なフォーマットで書くと、HTMLを生成してくれるRuby製のツール「Jekyll」を導入します。

1. [Rubyのインストール](http://allabout.co.jp/gm/gc/431930/)
1. ``` gem install jekyll ```
1. jekyll用の設定ファイル``_config.yml``を用意します


``` yaml
auto: true
server: true
markdown: redcarpet
```

ここでJekyllを動かすときの雛形に、``index.html``を使います。``<section>``タグ内を変更し、``_layout``フォルダを作って移します

(変更前)

``` html
<section>
    <h3>
        <a name="welcome-to-github-pages">...</a>
        Welcome to GitHub Pages.
    </h3>
	<p>This automatic page...中略 </p>
</section>
```

(変更後)

``` html
<section>
｛｛content｝｝ <!-- 全角だから、半角にしてね。ここに本文が挿入されます-->
</section>
```

あとは、``index.html``の元となる``index.markdown``(例)

```
---
layout: index
---

+ 連載
  + JavaScript編
    + [はじめようプログラミング](js_001.html)

+ 雑記
  + [はじめに](memo_001_intro.html)
  + [環境構築](memo_002_environment.html)
```

を書いて`` jekyll build``とか``jekyll serve --safe --watch``すると
``_site``というフォルダにHTMLサイトが自動生成されます。これらをGithubとかFC2とかサーバに上げます。

日付管理とかブログみたいにするなら、WordpressとかOctopressとかが良いと思います。
でも私のように好きに連載用のページとか並べるくらいなら、Jekyllが最適です。

あと、Markdown書くときはAtomというエディタのプレビューが便利。


(2014/07/26 - 管理人)

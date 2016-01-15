/* exported Harmonic */
/* global __HARMONIC */

// Note: `__HARMONIC` is not an actual identifer,
// it is the prefix of `harmonic build`'s substitution patterns.
// The substitution patterns look like a property access so that
// we can just whitelist `__HARMONIC` as a global identifier
// instead of having to whitelist every single substitution.

// TODO ESLint's `exported` directive seems to not be working correctly
// with the current version.
// We should probably `export` Harmonic using ES2015 module syntax and
// trash the `exported` directive.
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Harmonic = (function () {
    // eslint-disable-line no-unused-vars

    function Harmonic(name) {
        _classCallCheck(this, Harmonic);

        this.name = name;
    }

    _createClass(Harmonic, [{
        key: "getConfig",
        value: function getConfig() {
            return {"index_posts":10,"name":"Lazaro's blog","title":"Lazaro's blog","domain":"http://blog.lazarodm.com.br","subtitle":"de tudo um pouco","author":"Lázaro Danillo Menezes","description":"Blog onde tentarei falar de tudo um pouco","bio":"Thats me","theme":"lazaro-blog-theme","preprocessor":false,"posts_permalink":":language/:year/:month/:title","pages_permalink":":language/pages/:title","header_tokens":["<!--","-->"],"i18n":{"default":"pt-br","languages":["pt-br"]}};
        }
    }, {
        key: "getPosts",
        value: function getPosts() {
            return {"pt-br":[{"layout":"post","title":"Usando TabView com NativeScript","date":"2016-01-15T02:17:00.577Z","comments":"true","published":"true","keywords":"android, nativescript, tab, tabview, arquivos separados","description":"Utilizando o componente TabView com NativeScript","categories":["desenvolvimento"," android"," mobile"],"content":"<p>Nos últimos dias tenho brincado um pouco com <a href=\"nativescript.org\">Native Script</a>, fazendo pequenos apps para estudo e para matar a curiosidade e, em uma dessas apps, resolvi usar o componente TabView.</p>\n<p>Para quem não conhece, o NativeScript é uma framework para o desenvolvimento de aplicativos móveis, para as plataformas Android e iOS utilizando JavaScript, ou TypeScript, XML e CSS mas que será &quot;traduzida&quot; para uma aplicação nativa. Para mais detalhes de como ele faz esta &#39;mágica&#39;, dê uma olhada na <a href=\"http://docs.nativescript.org/\">documentação</a>.</p>\n<p>A principal diferença do NativeScript para outras frameworks, como o Apache Cordova, é que, com o Native Script, não temos uma aplicação sendo executada dentro de um WebView ou de um browser. Toda a camada de interface com o usuário é nativa, gerada a partir dos módulos e do runtime da framework.</p>\n<p>Como começar com o NativeScript então?</p>\n<p>O primeiro passo, é instalar o client. Os detalhes de como proceder a instalação para o seu ambiente podem ser encontrados <a href=\"http://docs.nativescript.org/start/quick-setup#the-nativescript-cli\">neste link</a></p>\n<p>Basicamente, o comando será:</p>\n<pre><code>$ npm install -g nativescript\n</code></pre><p>Em seguida, utlize o comando</p>\n<pre><code>$ tns doctor\n</code></pre><p>para que seja feita uma verificação se todas as dependências estão instaladas.</p>\n<p>Você deverá ver uma saída como esta</p>\n<pre><code>$ tns doctor\nNOTE: You can develop for iOS only on Mac OS X systems.\nTo be able to work with iOS devices and projects, you need Mac OS X Mavericks or later.\n\nNo issues were detected.\n</code></pre><p>Se algo saiu errado, satisfaça as dependencias necessárias para que possa prosseguir.</p>\n","file":"src/posts/usando-tabview-com-nativescript.md","filename":"usando-tabview-com-nativescript","link":"2016/01/usando-tabview-com-nativescript","lang":"pt-br","default_lang":false},{"layout":"post","title":"Olá, Mundo","date":"2016-01-03T00:06:03.881Z","comments":"true","published":"true","keywords":"","description":"Post inicial","categories":["Hello World!"],"author":"Lázaro Menezes","content":"<p>Olá mundo!</p>\n<p>Este é o primeiro post, espero que de muitos, neste blog. Criado para tentar compartilhar\nalgumas experiências e testes que faço no mundo do desenvolvimento de software, e talvez\numa coisa ou outra fora deste escopo.</p>\n","file":"src/posts/ol-mundo.md","filename":"ol-mundo","link":"2016/01/ol-mundo","lang":"pt-br","default_lang":false}]};
        }
    }, {
        key: "getPages",
        value: function getPages() {
            return {};
        }
    }]);

    return Harmonic;
})();
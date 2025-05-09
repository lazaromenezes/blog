---
author: Lázaro Menezes
date: "2016-01-22T01:08:00-03:00"
title: Começando com NativeScript
disable_share: false
draft: true
featured_image: images/colorful-code.jpg
featured_image_credits: "[Free photo 84917813 © creativecommonsstockphotos - Dreamstime.com](https://www.dreamstime.com/colorful-computer-programing-code-monitor-public-domain-image-free-84917813) - © Creative Commons Zero (CC0)"
tags:
- NativeScript
- Mobile
- Development
toc: false
---

Nos últimos dias tenho brincado um pouco com [NativeScript](nativescript.org), fazendo pequenos apps para estudo e para matar a curiosidade e, em uma dessas apps, resolvi usar o componente TabView.

Para quem não conhece, o NativeScript é uma framework para o desenvolvimento de aplicativos móveis, para as plataformas Android e iOS utilizando JavaScript, ou TypeScript, XML e CSS mas que será "traduzida" para uma aplicação nativa. Para mais detalhes de como ele faz esta 'mágica', dê uma olhada na [documentação](http://docs.nativescript.org/).

A principal diferença do NativeScript para outras frameworks, como o Apache Cordova, é que, com o Native Script, não temos uma aplicação sendo executada dentro de um WebView ou de um browser. Toda a camada de interface com o usuário é nativa, gerada a partir dos módulos e do runtime da framework.

## Primeiros passos

O primeiro passo é instalar o client do NativeScript. Os detalhes de como proceder a instalação para o seu ambiente podem ser encontrados [neste link](http://docs.nativescript.org/start/quick-setup#the-nativescript-cli)

Basicamente, o comando será:

```shell
$ npm install -g nativescript
```

Em seguida, utlize o comando

```shell
$ tns doctor
```

para que seja feita uma verificação se todas as dependências estão instaladas.

Você deverá ver uma saída como esta

```shell
$ tns doctor
NOTE: You can develop for iOS only on Mac OS X systems.
To be able to work with iOS devices and projects, you need Mac OS X Mavericks or later.

No issues were detected.
```

Se algo saiu errado, satisfaça as dependencias necessárias para que possa prosseguir.

## Criando a aplicação

Para criar a aplicação, digite o seguinte comando:

```shell
$ tns create tabViewTest
```

Isto irá criar um novo diretório chamado _tabViewTest_, que conterá o projeto.


---
title: "Brincando com o perfil do Github"
author: Lázaro Menezes
draft: false
disable_share: false
date: 2020-09-15T13:20:27-03:00
tags: 
    - GitHub
    - Fun
featured_image: ""
description: ""
featured_image: images/playing-with-github-profile/lazaromenezes.png
---

Há alguns meses o Github lançou um recurso que permite aos usuários customizar sua página de perfil, adicionando mais detalhes do que no campo 'bio'.

Para isto, basta apenas que criarmos um repositório com o nosso nome de usuário e adicionar um arquivo README.md a este repositório que o conteúdo deste arquivo será exibido na sua página de perfil, acima da lista de repositórios populares, como podem ver na imagem abaixo:

[![https://github.com/lazaromenezes][lazaromenezes]](https://github.com/lazaromenezes)

Para mais detalhes de como fazer, e também um passo a passo, visite a documentação oficial [aqui](https://docs.github.com/pt/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme).

Bom já que estamos falando de um arquivo de texto, em um serviço de repositório de código, não demorou muito para que os programadores começacem a explorar o recurso das mais váriadas formas. Com isso, várias formas divertidas de perfil foram surgindo, dos mais informativos...

[![https://github.com/arturssmirnovs][arturssmirnovs]](https://github.com/arturssmirnovs)

...aos mais ousados...

[![https://github.com/JonathanGin52][jonathangin52]](https://github.com/JonathanGin52)

...sim, isto é um jogo funcional :D

Não se esqueça de dar uma olhada neste [repositório](https://github.com/abhisheknaiidu/awesome-github-profile-readme), que contém uma compilação de vários modelos e ideias, além de uma listagem de ferramentas para incrementar o seu perfil.

É claro que eu quis participar da brincadeira!

## Como construí o meu perfil (até agora)

Fiz um perfil divido em 4 partes principais.

Na primeira, uma sessão de badges com contador e links de contato.

A segunda, é uma mini biografia.

A seguir, uma lista com os últimos posts deste blog.

E, por fim, um biscoito da sorte aleatório. E é sobre ele a próxima sessão

### Biscoito da sorte

Há alguns anos, quando experimentava alguma distribuição Linux - infelizmente não me recordo qual era - todas as vezes que iniciava uma sessão de terminal, era presenteado com uma mensagem. Estas mensagens eram exibidas pelo programa [Fortune](https://en.wikipedia.org/wiki/Fortune_(Unix)) que estava configurado no arquivo _.profile_.

Esta foi a minha inspiração. 

Para exibir a mensagem, escrevi uma [API](https://github.com/lazaromenezes/image-api) simples para gerar uma imagem aleatória que possa ser embutida via Markdown.

Isso pode ser feito assim:

```Markdown
![](http://images.lazarodm.com.br/image/fortune?fontSize=15)
```

Esta API para imagens consome a ~~[Fortune Cookie API](http://fortunecookieapi.herokuapp.com/)~~ [Fortune API](https://github.com/lazaromenezes/fortune-api), que provê as mensagens de biscoito da sorte.

Em um próximo artigo falarei mais sobre a [Image API](https://github.com/lazaromenezes/image-api), que está em estágios bem iniciais, mas penso em adicionar novos recursos. (Pull requests são bem vindos :))

### Próximos passos para o perfil

O próximo passo para o perfil é automatizar criação a lista de posts recentes, fique ligado ;)

[lazaromenezes]:/images/playing-with-github-profile/lazaromenezes.png "Meu perfil no Github"
[arturssmirnovs]:/images/playing-with-github-profile/arturssmirnovs.png "O perfil do Arturs Smirnovs no Github"
[jonathangin52]:/images/playing-with-github-profile/jonathangin52.png "O perfil do Jonathan Gin no Github" 

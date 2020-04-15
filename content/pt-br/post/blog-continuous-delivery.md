---
author: Lázaro Menezes
date: "2020-04-13T21:07:12-03:00"
draft: false
title: Como configurei Continuous Delivery para este blog...
description: ...ou "Como usar uma bazuca pra matar uma formiga"
disable_share: true
tags: 
    - Continuous Delivery
    - DevOps
featured_image: images/delivery-cartoon.svg
---

Este blog nunca teve muito conteúdo, ou conteúdo nenhum, pra ser sincero. O principal motivo é que passo muito mais tempo fuçando em configurações, ferramentas, templates e outras coisas ao invés de realmente escrever.

Numa dessas aventuras, resolvi estudar algumas ferramentas e experimentar com algumas técnicas e tecnologias. Meu objetivo era fazer com que o blog fosse atualizado sempre que eu fizesse um _pull request_ para o [repositório](https://github.com/lazaromenezes/blog) em determinado _branch_, um cenário simples de entrega contínua.

Este blog é feito com um gerador de sites estáticos, [Hugo](https://gohugo.io/). Este gerador, em resumo, processa arquivos _Markdown_ em páginas HTML, aplicando um template. No fim do processo, o que se tem é um site totalmente funcional, estático, independente de linguagem de servidor. Todo o código pode ser encontrado em (https://github.com/lazaromenezes/blog)

A ideia neste post é mostrar, de forma simples, como todo o processo para um novo post entrar no ar acontece e, sim, tudo isso poderia ter sido feito de maneira muito mais simples, mas, no geral, a ideia era experimentar com várias coisas diferentes.

As ferramentas utilizadas foram o já mencionado Hugo para a geração do site, [Travis CI](https://travis-ci.org/) para integração contínua, [Docker](https://www.docker.com/) ~~pq é legal~~ para experimentar, já que não havia usado ainda e [Heroku](heroku.com) para hospedagem.

Toda a _mágica_ acontece em dois arquivos de configuração, [.travis.yml](https://github.com/lazaromenezes/blog/blob/master/.travis.yml) e [Dockerfile](https://github.com/lazaromenezes/blog/blob/master/Dockerfile), e é sobre o conteúdo deles que irei comentar neste post.

## Dockerfile

Irei começar pelo Dockerfile.

```Dockerfile
FROM nginx:1.16.0-alpine
COPY env/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY public /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
```

Este arquivo é utilizado para que uma imagem contendo o site seja criada. Esta imagem será utilizada pelo Heroku para a criação dos containers que servirão os arquivos do blog. 

Utilizando como base uma imagem do [NGINX](https://www.nginx.com/), copio um arquivo de configuração para a imagem, copio também o conteúdo que foi gerado pelo Hugo e, por fim o NGINX é iniciado.

```sh
sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf
```

Este trecho, substitui o termo $PORT pelo conteúdo da variável de ambiente de mesmo nome que existe no host do container.

## .travis.yml

Aqui, vamos por partes.

```yaml
language: minimal
branches:
  only:
  - master
services:
- docker
```

Este primeiro bloco, indica ao Travis-CI a imagem que será utilizada, através da propriedade _language_, neste caso, utilizando _minimal_, quero utilizar a imagem mais simples possível. Em seguda, na sessão _branches_ digo ao travis para que este build só seja inicializado quando houver mudanças no branch _master_ e, por fim, no bloco _services_ indico que este build irá utilizar o Docker.

```yaml
install:
- wget -qO- https://toolbelt.heroku.com/install.sh | sh
- wget https://github.com/gohugoio/hugo/releases/download/v0.55.5/hugo_0.55.5_Linux-64bit.tar.gz
- tar -xzvf hugo_0.55.5_Linux-64bit.tar.gz
- chmod +x hugo
- export PATH=$PATH:$PWD
```

A sessão install, é utilizada pelo Travis-CI antes do build principal, aqui pode-se instalar dependências não inclusas na imagem que será utilizada para o build, neste caso, instalo o _CLI_ do Heroku com `- wget -qO- https://toolbelt.heroku.com/install.sh | sh` e as linhas seguintes instalam o Hugo. 

A última linha nesta sessão serve para que o diretório em que estas ferramentas foram instaladas estejam no _$PATH_ para que sejam acessíveis de outros diretórios.

```yaml
script:
- HUGO_ENV=PRODUCTION hugo
```

Esta sessão é o "build" em si. Neste momento o site será gerado. A variável ```HUGO_ENV``` serve para informar qual o ambiente para que algumas configurações sejam feitas.

```yaml
after_success:
- echo "$HEROKU_API_KEY" | docker login -u _ --password-stdin registry.heroku.com
- docker build -t registry.heroku.com/$HEROKU_APP_NAME/web .
- docker push registry.heroku.com/$HEROKU_APP_NAME/web
- heroku container:release web --app $HEROKU_APP_NAME
```

Bom, depois que tudo der certo na geração do site, é hora de criar a imagem Docker. Faço no bloco `after_success` - pensando agora, talvez tenha que mudar um pouco (facepalm), mas fica pra depois. Nesta sessão, faço o login no registro do Heroku, compilo e publico a imagem. Por último, utilizando o _CLI_ instalado no passo anterior, faço com queo Heroku inicialize a aplicação.

As variáveis `$HEROKU_API_KEY` e `$HEROKU_APP_NAME` são variáves de ambiente adicionadas no arquivo. Elas estão na última sessão do arquivo _.travis.yml_.

```yaml
env:
  global:
  - secure: Vfyhyx(...)7GdA=
  - secure: j0/2IZ(...)ZjKY=
  ```

Estas variáveis foram adicionadas ao arquivo utilizando o _CLI_ do próprio Travis CI, para que sejam criptografadas de forma segura. Para mais detalhes, veja este [link](https://docs.travis-ci.com/user/environment-variables/#defining-encrypted-variables-in-travisyml).

Bom, é isso. Quando tudo corre bem, toda vez que um código novo é integrado no branch master, dentro de poucos minutos a imagem está rodando no Heroku e o novo post, ou página, no ar.

Outros experimentos estão para acontecer, como colocar uma etapa de testes automatizados e também um ambiente de _staging_ onde conseguiria testar novas configurações sem que tenha que mudar o site oficial mas...quem sabe um dia ;)

----------------------------------

<p style="font-size: 12px;font-style: italic; font-family: sans-serif">Créditos da imagem de capa</p>

<p style="font-size: 12px;font-style: italic; font-family: sans-serif"><a href="https://commons.wikimedia.org/w/index.php?curid=69760875">"File:Delivery and Shipping Guys Cartoon.svg"</a><span> by <a href="https://vectortoons.com/free-stuff/">Free Clip Art</a></span> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0?ref=ccsearch&atype=html" style="margin-right: 5px;">CC BY-SA 4.0</a></p>

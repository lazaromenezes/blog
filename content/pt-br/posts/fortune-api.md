---
title: "Fortune API"
date: 2021-02-17T22:29:22-03:00
draft: false
author: Lázaro Menezes
disable_share: false
tags:
- Hobby
- Development 
- Go
- Docker
toc: true
featured_image: images/fortune-api/fortune-cookie.jpg
featured_image_credits: "[Food photo created by Racool_studio - www.freepik.com](https://www.freepik.com/photos/food)"
---

Quando criei meu [perfil dinamico]({{<ref "./playing-with-github-profile">}}) no GitHub, usei uma API de terceiros para gerar mensagens aleatórias, ou biscoitos da sorte, mas esta APi parou de funcionar, quebrando uma das funcionalidades do perfil. Então resolvi escrever uma nova.

## A ideia

Para esta nova API, volta à minha fonte de inspiração, o programa [Fortune](https://en.wikipedia.org/wiki/Fortune_(Unix)).

A estratégia era criar um único endpoint para executar o Fortune e devolver a resposta. Nada mais do que isso.

## Implementando

Desta vez, escolhi programar em Go, para variar um pouco. O código está abaixo:

```Go
package main

import (
    "log"
    "net/http"
    "os"
    "os/exec"
)

func handleFortune(writer http.ResponseWriter, request *http.Request){
  fortune, err := exec.Command("fortune").Output()
  if err != nil {
    writer.Write([]byte(err.Error()))
  }
  writer.Write(fortune)
}

func main() {
  port := os.Getenv("PORT")
  if port == "" {
    port = "8080"
  }
  http.HandleFunc("/fortune", handleFortune)
  log.Fatal(http.ListenAndServe(":" + port, nil))
}
```

Vamos ver algumas partes interessantes.

A função `handleFortune` irá manipular os requests feitos para a rota `/fortune`. Nesta função, junto com o tratamento de erro, o Fortune é executado.

```Go
fortune, err := exec.Command("fortune").Output()
```

Outro ponto interessante é a porta que a API usa para ouvir os requests HTTP. O código tenta obter a porta através de uma variável de ambiente chamada `PORT` antes de usar um valor *hard-coded*.

```Go
port := os.Getenv("PORT")
```

Isto é feito para que o serviço que execute e gerencie o container possa informar uma porta dinamicamente.

Mas...Por que um container? 

Usei um container pois a API espera que o Fortune esteja instalado no *host*. Se este código for executado sem a presença do Fortune, a única resposta será uma mensagem de erro e nada daquelas mensagens divertidas.

```Docker
FROM alpine

RUN apk add fortune

COPY ./main /opt/fortune-api
RUN chmod +x /opt/fortune-api

ENTRYPOINT ["/opt/fortune-api"]
```

Tentei deixar o mais simples possível. O Dockerfile instala o Fortune, copia o binário da API para `/opt/fortune-api` e executa este programa no *entrypoint*.

Para completar, fiz um *workflow* com GitHub Actions para automatizar as tarefas de compilar, construir a imagem Docker e publicar no Heroku.

```yaml
name: Fortune API CD

on:
  push:
    branches:
      - main 

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Code checkout
        uses: actions/checkout@v2

      - name: Setup GO
        uses: actions/setup-go@v2

      - name: Build API 
        run: CGO_ENABLED=0 go build main.go 

      - name: Build and Push Image
        uses: akhileshns/heroku-deploy@v3.8.9
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: br-com-lazarodm-fortune-api
          heroku_email: lazarodm@gmail.com
          usedocker: true
```

Todo o código pode ser visto [aqui](https://github.com/lazaromenezes/fortune-api) e o resultado final [aqui](http://fortune-api.lazarodm.com.br/fortune).

Até mais :D

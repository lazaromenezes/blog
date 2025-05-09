---
title: "Preparando uma aplicação AspNet Core para o Heroku"
date: 2021-12-09T09:23:04-03:00
tags: [dotnet, heroku, deployment]
featured_image: "images/ciworkflow.png"
featured_image_credits: "Créditos da imagem de capa: ['Introduction to CI/CD with GitLab'](https://docs.gitlab.com/ee/ci/introduction/)"
description: ""
---

## Contexto

Recentemente estava ajudando uma amiga a fazer deploy de uma aplicação Dotnet Core no Heroku e para atingir o objetivo sabíamos que deveríamos usar uma imagem Docker. Criar a imagem e rodar a aplicação não foi um problema mas, algumas plataformas em nuvem para containers exigem que sua aplicação escute uma variável de ambiente **`PORT`** para que, quando criarem o container eles possam, internamente, fazer os redirecionamentos e binding necessários. Alguns exemplos que já utilizei que tem essa exigência são o [Heroku](https://heroku.com) e o [Cloud Run](https://cloud.google.com/run) do Google Cloud.

Por padrão, a aplicação AspNet Core vai ouvir as portas 80 e 443 porém existem algumas opções para que possamos mudar esta porta.

Uma dessas opções envolve alterar o código de bootstrap da aplicação para, programaticamente, atribuir a porta e, assim, usar o valor enviado pela plataforma. Outra solução é usar uma variável de ambiente especial para aplicações AspNet Core, a **`ASPNETCORE_URLS`**.

Uma aplicação AspNet Core utiliza a variável de ambiente **`ASPNETCORE_URLS`** para definir, além de outras coisas, que porta esta aplicação irá responder. Vou deixar aqui o [link para a documentação](https://docs.microsoft.com/pt-br/aspnet/core/fundamentals/host/web-host?view=aspnetcore-6.0#server-urls).

## Solução

Sabendo disso, optamos por utilizar essa alternativa. Basicamente, atribuir essa variável de ambiente na imagem e deixar a aplicação sem alterações.

Nossa primeira tentativa não funcionou, por um motivo que ficou óbvio alguns minutos depois...

```Dockerfile
...
ENV ASPNETCORE_URLS=http://+$PORT
ENTRYPOINT ["dotnet", "TodasPodem.Web.dll"]
```

...Definimos a variável **`ASPNETCORE_URLS`** no momento de compilar a *imagem*, mas **`PORT`** só é definida no momento em que o *container* é criado!! :facepalm:

A solução também veio alguns minutos depois. Criar um *entrypoint* diferente:

```shell
#!/bin/bash

ASPNETCORE_URLS=http://+:$PORT

dotnet TodasPodem.Web.dll
```

Fizemos um shell script para definirmos a variável e executamos a aplicação logo em seguida e, na imagem, a definição ficou como:

```Dockerfile
...
RUN chmod +x ./entrypoint.sh

ENTRYPOINT "./entrypoint.sh"
```

Assim, nossa aplicação passou a ouvir a porta enviada pelo Heroku logo após o deploy.

O projeto em que fizemos esta solução pode ser encontrado [aqui](https://github.com/makintoshi/todas-podem).

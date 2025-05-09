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
featured_image: images/fortune-api/fortune-cookie.jpg
featured_image_credits: "[Food photo created by Racool_studio - www.freepik.com](https://www.freepik.com/photos/food)"
toc: true
---

When I first created my dynamic [Github Profile]({{<ref "/post/playing-with-github-profile">}}) I was using a third party API for getting random messages, aka fortune cookies, but this API suddenly stopped working, breaking the profile. So I decided to write one!

## The idea

For this API I got back to the source of it, the [Fortune](https://en.wikipedia.org/wiki/Fortune_(Unix)) Unix program.

The strategy was create an endpoint that would execute Fortune and give it's output as a response. Simple enough.

## Implementing

For this round, I choose Go as my programming language, just to use something different. Here is the code:

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

Now, let's check some interesting parts.

The function `handleFortune` is a function handler for the main, and single, route `/fortune`. At this function, within some error handling, the Fortune program is executed.

```Go
fortune, err := exec.Command("fortune").Output()
```

Other piece of this code that worths checking is the port the API uses for listening requests. It tries to get something for an environment variable named `PORT` before using a hard-coded value.

```Go
port := os.Getenv("PORT")
```

This was done so I can run this code from services that can start managed container instances, like Heroku.

But...why a container for such a simple thing? 

Basically, it expects Fortune to be installed on your system. If you run it without having the program, it'll give you an error message instead of a random fancy quotation or phrase.

```Docker
FROM alpine

RUN apk add fortune

COPY ./main /opt/fortune-api
RUN chmod +x /opt/fortune-api

ENTRYPOINT ["/opt/fortune-api"]
```

I tried to make it the simplest I could. The Dockerfile installs Fortune, copy the compiled Go program to `/opt/fortune-api` and executes it as an *entrypoint*.

To complete everything, there's a GitHub Actions workflow that does all the tasks, from compiling the API and building the Docker image to pushing it to Heroku

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

The entire source code can be found [here](https://github.com/lazaromenezes/fortune-api) and the final result can be seen [here](http://fortune-api.lazarodm.com.br/fortune).

See ya :D

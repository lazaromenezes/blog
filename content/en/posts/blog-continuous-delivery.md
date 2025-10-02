---
title: How did I setup Continuous Delivery for this blog...
author: Lázaro Menezes
draft: false
disable_share: false
toc: false
date: 2020-04-13T21:07:00
tags:
  - Continuous Delivery
  - DevOps
featured_image: images/delivery-cartoon.svg
featured_image_credits: "['File:Delivery and Shipping Guys Cartoon.svg'](https://commons.wikimedia.org/w/index.php?curid=69760875) by [Free Clip Art](https://vectortoons.com/free-stuff/) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0?ref=ccsearch&atype=html')"
description: ...or "Killing a fly with a cannon"
---
This blog never had a lot of content, or no content at all, to be honest. The main reason is that I spend all of my time playing around with setups, tools, templates and anything else instead of actually wrinting.

In one of these quests I decided to study some new tools and experiment with other technologies. My goal was to make this blog to be updated as I complete a pull request to its [repository](https://github.com/lazaromenezes/blog) in a given branch. An usual continuous delivery use case.

This site is made using a static site generator, [Hugo](https://gohugo.io/). This generator, in short, _compiles_ Markdown files into HTML pages, applying a template for it. In the end you have a working website, static, server independent. All the code can be found [here](https://github.com/lazaromenezes/blog)

This post is for giving an overview of what happens to a new post to be live. And yes, everything here can be done in a lot of different, and simple, ways, but remember that the idea was to experiment.

The used tools where Hugo, mentioned above, for site creation, [Travis CI](https://travis-ci.org/) for continuous integration, [Docker](https://www.docker.com/) ~~because it's cool~~ for experimenting, since I haven't used it before, and [Heroku](heroku.com) for hosting.

All the _magic_ lives inside two configuration files: [.travis.yml](https://github.com/lazaromenezes/blog/blob/master/.travis.yml) and [Dockerfile](https://github.com/lazaromenezes/blog/blob/master/Dockerfile), and it's about them I'll write below.

## Dockerfile

Starting from the Dockerfile.

```Dockerfile
FROM nginx:1.16.0-alpine
COPY env/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY public /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
```

It's used to script how an image containing this site should be created. This image is going to be used by Heroku to create containers that will serve the blog files. 

The base image is an [NGINX](https://www.nginx.com/) image, later, a config file is copied from the file system to the image and so it is the _public_ folder that was created by Hugo. In the end, NGINX is started

```sh
sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf
```

This piece replaces the token _$PORT_ inside the config file for the _$PORT_ environment variable value that exists in the container host.

## .travis.yml

Here we'll go in pieces.

```yaml
language: minimal
branches:
  only:
  - master
services:
- docker
```

This first block tells Travis-CI which image we're going to use, using the _language_ property. In this case, by setting it to _minimal_, I want to use the simplest possible image. Next, with _branches_ I setup Travis to run this build only when the _master_ branch is updated. Last, in the _services_ section, Travis-CI is told that we need Docker.

```yaml
install:
- wget -qO- https://toolbelt.heroku.com/install.sh | sh
- wget https://github.com/gohugoio/hugo/releases/download/v0.55.5/hugo_0.55.5_Linux-64bit.tar.gz
- tar -xzvf hugo_0.55.5_Linux-64bit.tar.gz
- chmod +x hugo
- export PATH=$PATH:$PWD
```

The install section is used by Travis-CI before the main build. Here you can install dependencies that aren't included into the base image. I'm installing Heroku CLI with `- wget -qO- https://toolbelt.heroku.com/install.sh | sh` and also Hugo with the following lines. 

The last line is just setting the current directory to the system _$PATH_.

```yaml
script:
- HUGO_ENV=PRODUCTION hugo
```

Here the site is built. The \`\`\`HUGO_ENV\`\`\` variable indicate to Hugo that this is a production build, so some additional adjustments are done, like enabling Google Analytics.

```yaml
after_success:
- echo "$HEROKU_API_KEY" | docker login -u _ --password-stdin registry.heroku.com
- docker build -t registry.heroku.com/$HEROKU_APP_NAME/web .
- docker push registry.heroku.com/$HEROKU_APP_NAME/web
- heroku container:release web --app $HEROKU_APP_NAME
```

If we're lucky here and everything is still fine, we start creating the Docker image. Here, we authenticate within Heroku container registry, build the image and push it to Heroku. In the last line the website is started using Heroku CLI.

The `$HEROKU_API_KEY` and `$HEROKU_APP_NAME` variables were added into the file. They're secrets added with Travis CLI help. Check this [link](https://docs.travis-ci.com/user/environment-variables/#defining-encrypted-variables-in-travisyml) for more details.

```yaml
env:
  global:
  - secure: Vfyhyx(...)7GdA=
  - secure: j0/2IZ(...)ZjKY=
```

Well, it's all folks! When everything happens without any errors, anytime a new code is merged into the master branch, in a couple of minutes the image is running in Herok and the new content is live.

New experiments to come are running automated tests and a _staging_ environment for checking new settings without destroying the live site but...maybe some day ;)

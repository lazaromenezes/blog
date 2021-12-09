---
title: "Getting an AspNet Core app ready for Heroku"
date: 2021-12-09T09:23:04-03:00
tags: [dotnet, heroku, deployment]
featured_image: "images/ciworkflow.png"
featured_image_credits: "Feature image from: ['Introduction to CI/CD with GitLab'](https://docs.gitlab.com/ee/ci/introduction/)"
description: ""
---

## Context

A couple of days ago I was helping a friend to deploy an AspNet Core application on Heroku and to be able to do it we knew that Docker was necessary. Create the image and start the application locally wasn't a big issue but, some cloud platforms for running containers require your application to listen to a **`PORT`** environment variable so, when they create the container, all their internal bindings are done properly. Some providers I tested that have this requirement are [Heroku](https://heroku.com) and GCP [Cloud Run](https://cloud.google.com/run).

By default, an AspNet Core application will listen to the 80 and 443 ports but there are some options to change this behavior.

One of these options is to change the boostraping code so the **`PORT`** value can be assigned to the application. Another solution is to use a special environment variable for AspNet Core applications: **`ASPNETCORE_URLS`**.

An AspNet Core application uses the **`ASPNETCORE_URLS`** environment variable to define in which port this application is responding to requests, in addition to other things. Here's some [documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-6.0#server-urls) for it.

## Solution

Knowing about these options, we choose to use the environment variable approach. We just needed to set this environment variable to our image and leave the application untouched.

Our first attempt didn't work, for an obvious reason we realized a few minutes after trying to run it...

```Dockerfile
...
ENV ASPNETCORE_URLS=http://+$PORT
ENTRYPOINT ["dotnet", "TodasPodem.Web.dll"]
```

...We defined the **`ASPNETCORE_URLS`** into the image build time, but **`PORT`** is sonly sent at the container runtime!! :facepalm:

The solution came to us a few minutes later, and it was creating a different *entrypoint*:

```shell
#!/bin/bash

ASPNETCORE_URLS=http://+:$PORT

dotnet TodasPodem.Web.dll
```

It's just a small shell script where we define our desired variable and run the application. And, for the new Dokerfile:

```Dockerfile
...
RUN chmod +x ./entrypoint.sh

ENTRYPOINT "./entrypoint.sh"
```

Using this approach, our application started to listen the **`PORT`** value sent by Heroky right after its deployment.

The project we used it can be found [here](https://github.com/makintoshi/todas-podem).

---
title: "Playing With Github Profile"
author: Lázaro Menezes
draft: false
disable_share: false
date: 2020-09-15T13:20:27-03:00
tags: 
    - GitHub
    - Fun
description: ""
featured_image: images/playing-with-github-profile/lazaromenezes.png
---

Some months ago Github released a new feature for allowing their users to customize the profile page, adding more details than it's allowed into the 'bio' field. 

In order to do this, one needs to create a repository with its username and add a README.md file to it. With this, this file contant is shown into your Github profile page, right above your popular repositories list, like in the image below: 

[![https://github.com/lazaromenezes][lazaromenezes]](https://github.com/lazaromenezes)

You can always check the [official docs](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme) for more details and a step-by-step guide.

Since we're talking about a kind of text file, in a source code repository service, you can imagine it wouldn't take a long time for developers to start exploring the new feature in a lot of different ways. With that a lot of interisting profiles came up, from the most informatives...

[![https://github.com/arturssmirnovs][arturssmirnovs]](https://github.com/arturssmirnovs)

...to the most adventurous...

[![https://github.com/JonathanGin52][jonathangin52]](https://github.com/JonathanGin52)

...yes, this is a working game :D

Take a look into this [repository](https://github.com/abhisheknaiidu/awesome-github-profile-readme), it contains a compilation of a lot of different profile ideas and also a list of awesome tools that can be used.

Of course I wanted to play this game!

## How did I build my profile (so far)

It's a simple profile, with four blocks.

First block is for badges: social media, counters.

The second one is a bio section, followed by a blog posts list.

Last but not least, there's a fortune cookie.

### The Fortune Cookie

Some years ago while I was experimenting a Linux distribuition that, unfortunately, I can't remember which one it was, everytime I got into a new terminal session I was shown a message. Those messages were displayed by the [Fortune](https://en.wikipedia.org/wiki/Fortune_(Unix)) program since it was setup into the _.profile_ file.

This was my inspiration.

To show it I wrote a simple [API](https://github.com/lazaromenezes/image-api) to render a random imagem that could be embedded via Markdown.

You can use it, like this:

```Markdown
![](http://images.lazarodm.com.br/image/fortune?fontSize=15)
```

This API makes use of ~~[Fortune Cookie API](http://fortunecookieapi.herokuapp.com/)~~ [Fortune API](https://github.com/lazaromenezes/fortune-api), that provides the fortune cookie messages.

I'll talk more about the [Image API](https://github.com/lazaromenezes/image-api) in a next article. The API is still in its early stages, but I think to add new features to it. (Pull requests are welcome :))

### Profile next steps

The next step for the profile is automate the article list. Stay tuned!

[lazaromenezes]:/images/playing-with-github-profile/lazaromenezes.png "My Github profile"
[arturssmirnovs]:/images/playing-with-github-profile/arturssmirnovs.png "Arturs Smirnovs's profile"
[jonathangin52]:/images/playing-with-github-profile/jonathangin52.png "Jonathan Gin's profile" 

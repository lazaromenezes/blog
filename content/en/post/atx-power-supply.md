---
title: "ATX Power Supply"
date: 2021-01-03T19:18:22-03:00
draft: true
author: Lázaro Menezes
disable_share: false
tags:
- Hobby
- Electronics
- ATX Power Supply
---

New year, new hobby!

For 2021 I decided to start a new hobby, electronics, and, while learning, build something that I can use within one of the other hobbies. It's planned to be an year-long project and I expect coming back here to write a couple of lines as it progresses. I'll bring more details into the project in a next post.

But, before actually start the main project, I needed something that could help me with the prototypes, so I started building a prototyping tool. 

Basically, it's a power source capable to provide different tensions, easily accessible within the protoboards.

I knew it was possible to achieve it using an ATX power supply, used in desktops, but I didn't know exactly how although I knew wire colors had something to do with it :D. After doing some research - see references below - it turned out it wouldn't be as complicated as I was thinking. 

Basically, each wire color represents an kind of output, with some of them having special functions. The map below shows it.

![atxmap]

## Special wires

Most of the wires gives you a specific tension output when the power supply is on, from -12V to +12V but some of them have special functions. Let's highlight some of them

### Green - Power On

The green wire is used for turning on the power supply. This is done by grounding. If you want a switch, you need to put it between the green and any of the black wires:

![switch]

### Grey - Power Good

The grey wire is powered when the power supply is working. It can be used to turn a led on to indicate it.

![power-good]

### Purple - Stand By

I didn't use this one but it worths mentioning. 

The purple wire is powered as long as the power supply is plugged in a power source - wall output, per example. It provides +5V and can be used to turn an indication led on, per example.

## Final result



## References

* [Convert ATX PSU to Bench Supply](https://www.electronics-tutorials.ws/blog/convert-atx-psu-to-bench-supply.html)
* [(pt-br) Manual do Mundo - Como Fazer uma Fonte de Bancada](https://www.youtube.com/watch?v=2Ou7MOVZeo4)

[atxmap]:/images/atx-power-supply/atx-map.jpg "ATX power supply color map"
[switch]:/images/atx-power-supply/switch.png "Wiring the switch"
[power-good]:/images/atx-power-supply/power-good.png "Wiring the LED"

---
title: "Fonte de bancada com fonte ATX"
date: 2021-01-03T19:18:22-03:00
draft: false
author: Lázaro Menezes
disable_share: false
tags:
- Hobby
- Electronics
- ATX Power Supply
featured_image: images/atx-power-supply/pexels-pixabay-326461.jpg
featured_image_credits: "[Pixbay](https://www.pexels.com/pt-br/foto/aprendizado-de-maquina-atual-ciclo-circuito-326461/)"
toc: true
---

Ano novo, hobby novo!

Para este ano de 2021 decidi começar um novo hobby, eletrônica, e, enquanto aprendo, construir algo que eu possa usar junto com outros hobbies. Planejei um projeto para durar o ano todo e espero voltar em breve para escrever sobre o progresso. Trarei mais detalhes em um próximo post.

Mas antes de começar o projeto principal, eu precisava de algo para me ajudar com os protótipos que virão, então, comecei por contruir uma ferramenta de protótipos: Uma fonte de bancada capaz de oferecer tensões diferentes de uma forma prática, junto com as protoboards.

Já sabia que era possível fazer esta fonte com uma fonte ATX, usada em desktops, mas não sabia exatamente como, embora soubesse que as cores dos fios tinham relação com isso :D

Após algumas pesquisas - veja abaixo nas referências - percebi que não seria tão complicado. Cada cor de fio representa uma saída específica, seja um valor de tensão ou uma funcionalidade, conforme o mapa abaixo:

![atxmap]

## Fios especiais

A maioria dos fios fornece uma tensão específica, de -12V até +12V, mas alguns deles tem funções especiais. Vamos ver alguns a seguir.

### Verde - Power On

O fio verde é usado para ligar a fonte. Para ligar, basta aterrar este fio. É aqui que podemos colocar um interruptor, ou botão, usando o fio verde e um dos fios pretos:

![green]

### Cinza - Power Good

O fio cinza está energizado quando a fonte está funcionando. Pode ser utilizado para colocar um LED para indicar este funcionamento. Para ligar um LED é importante ligar em série com um resistor ao invés de ligá-lo diretamente na fonte, para não queimá-lo.

![grey]

### Roxo - Stand By

Não usei este, mas é interessante mencioná-lo.

O fio roxo é energizado assim que a fonte é colocada na tomada. Ele fornece +5V e pode ser utilizado para ligar um led indicando que a fonte tem energia, mas não necessáriamente está ligada.

### Ligações para a fonte

Estas são as ligações finais. Minha fonte não tem o fio branco, -5.0V, então deixei o espaço vazio por enquanto. Quem sabe num futuro upgrade?

![all]

## Resultado Final

![08]

## Referências

Referências que utilizei para construir minha fonte de bancada

* [Manual do Mundo - Como Fazer uma Fonte de Bancada](https://www.youtube.com/watch?v=2Ou7MOVZeo4)
* [(en) Convert ATX PSU to Bench Supply](https://www.electronics-tutorials.ws/blog/convert-atx-psu-to-bench-supply.html)

## Making off

![01]

![02]

![03]

![04]

![05]

![06]

![07]

[atxmap]:/images/atx-power-supply/atx-map.jpg "Mapa de cores"
[green]:/images/atx-power-supply/green.jpg "Interruptor"
[grey]:/images/atx-power-supply/grey.jpg "LED"
[all]:/images/atx-power-supply/all.jpg "Todos os fios"

[01]:/images/atx-power-supply/01.jpg "Projeto topo"
[02]:/images/atx-power-supply/02.jpg "Projeto traseiro"
[03]:/images/atx-power-supply/03.jpg "Bournes fixados"
[04]:/images/atx-power-supply/04.jpg "Cortes"
[05]:/images/atx-power-supply/05.jpg "Fonte fixada"
[06]:/images/atx-power-supply/06.jpg "Fiação soldada"
[07]:/images/atx-power-supply/07.jpg "Vista superior com bournes, switch e LED"
[08]:/images/atx-power-supply/08.jpg "Resultado final"

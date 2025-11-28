---
title: "Deploy Contínuo para Godot no Itch.io"
date: 2025-11-27T19:00:00Z
draft: false
toc: true
tags:
- Gamedev
- CI/CD
- Devops
- Integração contínua
- Entrega contínua
- Godot
- Indie
- Itch.io
- Github
- Actions
featured_image: images/godot-build-pipeline/overblown.gif
featured_image_credits: "[Feita pelo @tumati para o jogo 'Overblown' que fizemos](http://tumati.itch.io/)"
---

## Introdução

O processo de entrega de um software normalmente envolve uma sequencia de tarefas, que, apesar de variar conforme o tipo de software, podem incluir compilar uma versão otimizada - versão *release* - e/ou empactodada da aplicação, configurar um servidor, copiar binários para esse servidor entre várias outras. 

Com jogos, não precisa ser diferente. Neste artigo vou mostrar uma solução de como configurar um _pipeline_ de integração e entrega contínua para jogos [Godot](https://godotengine.org/) utilizando [Github Actions](https://github.com/features/actions), fazendo o _deploy_ diretamente na [itch.io](https://itch.io).

### Preparando a Itch.io

Se ainda não tem a sua página do jogo criada, dê uma pausa e crie a página, vamos precisar do valor da URL do jogo mais adiante. 

![05]

Neste momento não é necessário fazer nenhum _upload_, apenas configure o essencial, como escolher se o jogo será somente download ou web, por exemplo, pois o _deploy_ será feito com uma ferramenta disponibilizada pelo itch.io chamada [butler](https://itch.io/docs/butler/). 

O _butler_ é uma ferramenta de linha de comando para interagir com o itch.io realizando pequenas tarefas, como _upload_ de _builds_. Mas como o _butler_ acessa a sua página? Através de uma chave de API. 

#### Criando uma Chave de API no itch.io

Para criar uma chave de API - _API key_ - na itch, basta seguir os passos a seguir

Primeiro, vá na pagina de configurações

![01]

Em seguida, no fim do menu lateral, ache a opção _API Keys_ 

![02]

Nesta tela, você poderá ver todas as chaves já criadas, quando foram criadas e também cancelar - botão _Revoke_ - estas chaves caso necessário, por exemplo, se uma vazar. 

É aqui também que novas chaves são criadas, para isso somente clique no botão _Generate new API key_.

![03]

Para visualizar a nova chave, clique no botão _View_ e copie este valor. Vamos utilizá-lo no próximo passo.

![04]

Isso é tudo por aqui então bora para o [Github](https://github.com/).

### Preparando o Github

Nesta etapa, vou assumir que você já tem um repositório no Github para o seu jogo e já consegue fazer _push_ do seu código normalmente. Caso precise aprender, veja algum desses vídeos abaixo.

{{< youtube id="1vWzOnu4Nq0" autoplay="false" >}}

Na página do repositório, precisamos fazer algumas configurações simples, com algumas variáveis que serão utilizadas na próxima etapa. Então, para começar, abra a página de configurações do repositório.

![06]

No menu lateral, expanda o grupo _Secrets and variables_ e clique na opção _Actions_.

![07]

Nesta tela, clique em _New repository secret_ e crie três variáveis com os valores a seguir:

![08]

```
Name: ITCHIO_USERNAME 
Secret: seu nome de usuario no itch.io

Name: ITCHIO_GAME 
Secret: o 'id' do seu jogo na itch.io, que é o valor no fim da url

Name: BUTLER_CREDENTIALS 
Secret: a chave de API que você criou no itch.io
```

No fim, você deve ter uma tela como a vista abaixo. Por se tratar de _secrets_, você não irá conseguir ver os valores novamente, mas pode alterar por outros caso precisar.

![09]

### Preparando o Projeto

Finalmente chegamos na Godot! Antes de seguir com os passos um aviso importante: 

> Os passos a seguir são como eu faço nos meus projetos atualmente e contém alguns 'atalhos' para que os scripts fiquem menores e não há um jeito certo ou errado e podem ser facilmente adaptados.

#### Configurações de Export

Neste exemplo, irei mostrar uma configuração básica para export em Windows, Linux e HTML5. 

O mínimo necessário que temos que configurar para esse processo são as propriedades _Name_ e _Export Path_ e também **ativar** a opção _Runnable_ caso esteja desativada.

A imagem a seguir mostra um exemplo para Linux e o quadro abaixo mostra os valores para cada plataforma.

![10]

```
Linux
Name: linux
Export Path: dist/linux/linux.x86_64

HTML5
Name: html
Export Path: dist/html/index.html

Windows
Name: windows
Export Path: dist/windows/jogo.exe
```

Para que o próximo passo funcione exatamente como vou mostrar, é importante não mudar os nomes `linux`, `html` e `windows` e nem os camanhos `dist/linux`, `dist/html`, `dist/windows` e, para a versão web é importante também que a página chame `index.html` para que o itch.io reconheça automaticamente.

E isso é tudo na Godot, mas agora precisamos realizar uma última etapa.

#### Script do Pipeline

No diretório - ou pasta - do seu jogo, precisamos criar um script que vai dar instruções para o Github de como exportar seu jogo e colocá-lo na itch.io.

Crie um diretório chamado `.github` e dentro dele outro chamado `workflows` e, finalmente, dentro de `.github/workflows` crie um arquivo _YAML_. Eu costumo chamar de `ci.yaml`. 

O conteúdo do arquivo `ci.yaml` é o seguinte. Logo abaixo vou explicar alguns pontos importantes.

```yaml
name: "Chip Ball CI"
on:
  push:
    branches:
    - main

env:
  GODOT_VERSION: 4.5.1
  USER_VERSION: "0.0.${{ github.run_number }}"

jobs:
  build-desktop-clients:
    name: Export Game Binaries
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        target: [windows, linux, html]
    steps:
      - uses: actions/checkout@v4
        name: Checkout
      
      - uses: chickensoft-games/setup-godot@v2
        name: Setup Godot
        with:
          version: ${{ env.GODOT_VERSION }}
          use-dotnet: false
          include-templates: true

      - name: Prepare dist 
        run: mkdir -p dist/${{ matrix.target }}

      - name: Export release
        run: godot --headless --export-release ${{ matrix.target }}

      - uses: manleydev/butler-publish-itchio-action@master
        env:
          BUTLER_CREDENTIALS: ${{ secrets.BUTLER_CREDENTIALS }}
          CHANNEL: ${{ matrix.target }}
          ITCH_GAME: ${{ secrets.ITCHIO_GAME }}
          ITCH_USER: ${{ secrets.ITCHIO_USERNAME }}
          PACKAGE: dist/${{ matrix.target }}
          VERSION: ${{ env.USER_VERSION }}
  ```

No primeiro bloco, informamos um nome para essa configuração e que esse script só deve ser executado quando algo for integrado no _branch_ `main`, assim, podemos criar outros _branches_ com itens ainda em progresso diminuindo o risco de acabar com algo quebrado na página.

```yaml
name: "Chip Ball CI"
on:
  push:
    branches:
    - main
```

Em seguida, algumas variáveis são configuradas, uma para informar que versão da Godot vamos utilizar, 4.5.1 neste exemplo, e outra para ter um número de versão de cada exportação. Isso será usado na itch.io. A expressão `${{ github.run_number }}` irá ter um número sequencial - 1, 2, 3, ... - para cada vez que você executar uma exportação direto no Github.

```yaml
env:
  GODOT_VERSION: 4.5.1
  USER_VERSION: "0.0.${{ github.run_number }}"
```

O próximo bloco, define um _job_ - um trabalho - que contém a sequencia de ações que devemos seguir. Por ter alguns detalhes, também vou quebrar a explicação em partes.

Nesta primeira parte, o script está definindo o _job_, dando o id `build-desktop-clients` para ele, um nome e definindo em que ambiente ele irá ser executado: `ubuntu-latest`.

```yaml
jobs:
  build-desktop-clients:
    name: Export Game Binaries
    runs-on: ubuntu-latest
```

Em seguida, defino a estratégia de **matriz** para esse _job_. Isso quer dizer que os passos que vamos definir depois serão executados uma vez para cada item dessa matriz, no caso, a opção `target` define `windows`, `linux` e `html`. Por isso a importância de manter aqueles nomes nas configurações de _export_.

```yaml
strategy:
      fail-fast: false
      matrix:
        target: [windows, linux, html]
```

Enfim, os passos explicados um a um:

O primeiro passo apenas faz o checkout do código para o ambiente de execução.

```yaml
- uses: actions/checkout@v4
  name: Checkout
```

Em seguida, instalamos a Godot na versão informada pela variável `${{ env.GODOT_VERSION }}`. Como neste exemplo só uso _GDScript_, informei que não quero usar `dotnet` mas quero que a ação faça o download dos _export templates_.

```yaml      
- uses: chickensoft-games/setup-godot@v2
  name: Setup Godot
  with:
    version: ${{ env.GODOT_VERSION }}
    use-dotnet: false
    include-templates: true
```

Na sequência, crio os diretórios para o export. Note a variável `${{ matrix.target }}` que terá o valor de cada plataforma definida na estratégia.

```yaml      
- name: Prepare dist 
  run: mkdir -p dist/${{ matrix.target }}
```

Enfim, o _export_ em si. Utilizando o executável da Godot, exportamos o jogo por linha de comando, novamente informando a plataforma.

```yaml      
- name: Export release
  run: godot --headless --export-release ${{ matrix.target }}
```

E a última ação utiliza o _butler_ para fazer o _upload_ do jogo exportado diretamente para a itch.io. É aqui que usamos todas as secrets criadas no passo do Github acima.

```yaml      
- uses: manleydev/butler-publish-itchio-action@master
  env:
    BUTLER_CREDENTIALS: ${{ secrets.BUTLER_CREDENTIALS }}
    CHANNEL: ${{ matrix.target }}
    ITCH_GAME: ${{ secrets.ITCHIO_GAME }}
    ITCH_USER: ${{ secrets.ITCHIO_USERNAME }}
    PACKAGE: dist/${{ matrix.target }}
    VERSION: ${{ env.USER_VERSION }}
```

Se tudo correr bem, em alguns minutos após você fazer um `push` do seu código para o Github, seu jogo estará disponível na itch.io.

![11]

## Conclusão

Este método que apresentei é a forma que uso atualmente para automatizar os meus projetos, mas não quer dizer que é a única e tão pouco a melhor. Existem outras _actions_ além da `chickensoft-games/setup-godot@v2` que também configuram um ambiente Godot, além de outras ferramentas para CI/CD, como Gitlab e Jenkins, mas, indepdentente da forma, é bom ter um recurso para evitar repetição e ter, de certa forma, uma garantia que seus jogos sejam exportados sempre da mesma forma, evitando surpresas que um ambiente de desenvolvimento pode oferecer.


[01]:/images/godot-build-pipeline/itch-settings.png "Menu de configurações no itch" 
[02]:/images/godot-build-pipeline/itch-api-keys-menu.png "Página de configurações do itch.io, mostrando o menu API Keys" 
[03]:/images/godot-build-pipeline/itch-api-keys.png "Lista de API Keys, ou chaves de API" 
[04]:/images/godot-build-pipeline/itch-api-key-view.png "Visualizando uma API Key ou chave de API. Nem adianta tentar, já deletei essa ;)" 
[05]:/images/godot-build-pipeline/itch-game-url.png "Exemplo de URL de jogo. Vamos precisar do valor final (id do jogo) em um passo futuro" 

[06]:/images/godot-build-pipeline/github-settings-button.png "Menu de configurações do Github"
[07]:/images/godot-build-pipeline/github-actions-menu.png "Menu para acessar as configurações de variável de ações no Github"
[08]:/images/godot-build-pipeline/github-add-secret.png "Tela para adição de Secrets no Github"
[09]:/images/godot-build-pipeline/github-secrets.png "Lista de secrets adicionados"

[10]:/images/godot-build-pipeline/godot-export-config.png "Exemplo de export config"
[11]:/images/godot-build-pipeline/action-success.png "Exemplo de visualização de Github Actions executada com sucesso"
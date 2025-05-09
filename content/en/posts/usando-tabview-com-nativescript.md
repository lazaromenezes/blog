---
author: Lázaro Menezes
date: "2016-01-23T02:17:00-03:00"
title: 'Native Script: Separando os arquivos para o TabView'
disable_share: false
draft: true
featured_image: images/colorful-code.jpg
featured_image_credits: "[Free photo 84917813 © creativecommonsstockphotos - Dreamstime.com](https://www.dreamstime.com/colorful-computer-programing-code-monitor-public-domain-image-free-84917813) - © Creative Commons Zero (CC0)"
tags:
- NativeScript
- Mobile
- Development
toc: false
---

Se você já precisou utilizar o componente TabView com a framework NativeScript, deve ter notado que grande parte dos tutoriais e da documentação mostram a criação do layout toda no mesmo arquivo, como neste exemplo, extraído da documentação oficial (https://docs.nativescript.org/ApiReference/ui/tab-view/how-to.html):

```xml
<Page>
 <TabView>
   <TabView.items>
     <TabViewItem title="Tab 1">
       <TabViewItem.view>
          <Label text="Label in Tab1" />
       </TabViewItem.view>
     </TabViewItem>
     <TabViewItem title="Tab 2">
       <TabViewItem.view>
          <Label text="Label in Tab2" />
       </TabViewItem.view>
     </TabViewItem>
   </TabView.items>
 </TabView>
</Page>
```
Mas, dependendo da complexidade da view que irá compor cada aba, terminaríamos com um arquivo XML muito complexo, de difícil leitura.

Particularmente - e aqui talvez seja questão de preferência, ou gosto - gostaria que minhas abas fossem tradas como páginas separadas, tendo cada uma o seu XML e arquivos JavaScript relacionados.

Neste post irei demonstrar uma solução para este 'problema', inspirado por esta [thread] (https://groups.google.com/forum/#!topic/nativescript/szdHGxhmbTM).

O projeto completo pode ser encontrado no GitHub, neste link (https://github.com/lazaromenezes/nativescript-tabview-example).

Irei começar a partir de uma aplicação feita em uma página simples e irei refatorar a mesma para que chegue no ponto em que teremos as abas em arquivos independentes.

## Criando a aplicação inicial

Começando com uma aplicação base e adicionando a plataforma android

```shell
$ tns create nativescript-tabview-example
$ tns platform add android
```
Após criada a aplicação, alterei os arquivos main-page.xml e main-view-model.js para que fiquem conforme abaixo:

#### main-page.xml
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded">

  <Page.actionBar>
    <ActionBar title="TabView Example" android.position="actionBar" />
  </Page.actionBar>

  <TabView>
   <TabView.items>

     <!-- Tab 1 -->
     <TabViewItem title="Tab 1">
       <TabViewItem.view>
         <ListView items="{{ items }}">
           <ListView.itemTemplate>
             <Label text="{{ title }}" textWrap="true" />
           </ListView.itemTemplate>
         </ListView>
       </TabViewItem.view>
     </TabViewItem>

     <!-- Tab 1 -->
     <TabViewItem title="Tab 2">
       <TabViewItem.view>
          <Label text="{{ username }}" />
       </TabViewItem.view>
     </TabViewItem>

   </TabView.items>
 </TabView>
</Page>
```
### main-view-model.js
```javascript
var observable = require("data/observable");

var MainViewModel = (function (_super) {

    __extends(MainViewModel, _super);

    function MainViewModel() {
        _super.call(this);
        this.items = [{title: "Item 1"}, {title: "Item 2"}];
        this.username = "Joe";
    }

    return MainViewModel;

})(observable.Observable);

exports.MainViewModel = MainViewModel;

exports.mainViewModel = new MainViewModel();

```
![preview do primeiro estágio](/images/tabview1.png "Preview do primeiro estágio")

## Separando a View

A partir deste ponto, irei separar as abas em novos arquivos.

Criei um diretório chamado **tabs** e neste diretório adicionei os arquivos xml para cada aba:

### tabs/tab1.xml
```xml
<TabViewItem title="Tab 1">
  <TabViewItem.view>
    <ListView items="{{ items }}">
      <ListView.itemTemplate>
        <Label text="{{ title }}" textWrap="true" />
      </ListView.itemTemplate>
    </ListView>
  </TabViewItem.view>
</TabViewItem>
```
### tabs/tab2.xml
```xml
<TabViewItem title="Tab 2">
  <TabViewItem.view>
     <Label text="{{ username }}" />
  </TabViewItem.view>
</TabViewItem>
```
Estes arquivos serão nossas views para cada aba. Feito isso, é necessário que o arquivo **main-page.xml** saiba que eles existam. Para isto, criamos um namespace para o diretorio **tabs** e adicionamos cada arquivo de aba como uma tag:

### main-page.xml
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:tabs="tabs" loaded="pageLoaded">

  <Page.actionBar>
    <ActionBar title="TabView Example" android.position="actionBar" />
  </Page.actionBar>

  <TabView>
   <TabView.items>
     <tabs:tab1 />
     <tabs:tab2 />
   </TabView.items>
 </TabView>
</Page>
```

Neste ponto, temos as views de cada aba separadas, mas a view-model continua sendo apenas uma para a página. Mas, se sentir necessidade, podemos ainda separar as view-models para cada aba, o que pode ser visto na próxima sessão.

## Separando as View-Models

Agora que separamos a view, podemos também separar as View-Models que fazem o *data binding* para estas abas.

Para isto, adicionei no diretório **tabs** os arquivos JavaScript referentes à inicialização da view model e o da própria view model para cada aba. Estes arquivos seguem a mesma estrutura dos arquivos **main-page.js** e **main-view-model.js**.

### tabs/tab1-view-model.js
```javascript
var observable = require("data/observable");

var TabOneViewModel = (function (_super) {

    __extends(TabOneViewModel, _super);

    function TabOneViewModel() {
        _super.call(this);
        this.items = [{title: "Item 3"}, {title: "Item 2"}];
    }

    return TabOneViewModel;

})(observable.Observable);

exports.TabOneViewModel = TabOneViewModel;

exports.viewModel = new TabOneViewModel();
```
### tabs/tab1.js
```javascript
var vmModule = require("./tab1-view-model");

function tabOneLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.viewModel;
}

exports.tabOneLoaded = tabOneLoaded;
```

E na view, foi aplicado um layout que executa o método tabOneLoaded ao ser carregado:

### tabs/tab1.xml
```xml
<TabViewItem title="Tab 1" >
  <TabViewItem.view >
    <StackLayout loaded="tabOneLoaded">
      <ListView items="{{ items }}">
        <ListView.itemTemplate>
          <Label text="{{ title }}" textWrap="true" />
        </ListView.itemTemplate>
      </ListView>
    </StackLayout>
  </TabViewItem.view>
</TabViewItem>
```
O mesmo procedimento foi repetido para a segunda aba:

### tabs/tab2-view-model.js
```javascript
var observable = require("data/observable");

var TabTwoViewModel = (function (_super) {

    __extends(TabTwoViewModel, _super);

    function TabTwoViewModel() {
        _super.call(this);
        this.username = "Joe";
    }

    return TabTwoViewModel;

})(observable.Observable);

exports.TabTwoViewModel = TabTwoViewModel;

exports.viewModel = new TabTwoViewModel();
```

### tabs/tab2.js
```javascript
var vmModule = require("./tab2-view-model");

function tabTwoLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.viewModel;
}

exports.tabTwoLoaded = tabTwoLoaded;
```

### tabs/tab2.xml
```xml
<TabViewItem title="Tab 2">
  <TabViewItem.view >
    <StackLayout loaded="tabTwoLoaded">
     <Label text="{{ username }}" />
   </StackLayout>
  </TabViewItem.view>
</TabViewItem>
```

E, para finalizar, a view model da pagina principal perdeu os dados específicos das abas:

### main-view-model.js
```javascript
var observable = require("data/observable");

var MainViewModel = (function (_super) {

    __extends(MainViewModel, _super);

    function MainViewModel() {
        _super.call(this);
    }

    return MainViewModel;

})(observable.Observable);

exports.MainViewModel = MainViewModel;

exports.mainViewModel = new MainViewModel();
``` 

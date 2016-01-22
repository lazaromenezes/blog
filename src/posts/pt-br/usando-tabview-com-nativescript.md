<!--
layout: post
title: Native Script: Separando os arquivos para o TabView
date: 2016-01-15T02:17:00.577Z
comments: true
published: true
keywords: android, NativeScript, tab, tabview, arquivos separados, javascript, mobile
description: Uma proposta para deixar a utilização do TabView mais limpa no NativeScript
categories: Desenvolvimento, Android, NativeScript
-->

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

O projeto completo pode ser encontrado no GitHub, neste link: LINK AQUI.

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

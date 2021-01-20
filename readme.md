![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# s-monaco-editor
An easy-to-use web component of Monaco Editor for any framework (Angular, React, Vue, etc.) or vanilla JS.  

[Demo](https://seanwong24.github.io/s-monaco-editor/)

# How to install
## Use NPM
```sh
npm i @seanwong24/s-monaco-editor
```
## Use CDN
```html
<script type="module" src="https://unpkg.com/@seanwong24/s-monaco-editor/dist/s-monaco-editor/s-monaco-editor.esm.js"></script>
<script nomodule src="https://unpkg.com/@seanwong24/s-monaco-editor/dist/s-monaco-editor/s-monaco-editor.js"></script>
```

# How to use
First you need to [import the component to your project](#how-to-import), then the easiest way to use the component is to put ```s-monaco-editor``` tag inside any element that you want to attach in html.
```html
<s-monaco-editor 
    style="width: 600px; height: 500px;" 
    monaco-vs-path="./build/monaco-editor/vs"
    value="console.log('Hello Wrold!')" 
    language="javascript"
></s-monaco-editor>
```
Leave ```monaco-vs-path``` unset to use monaco from the CDN. To use your own version of Monaco Editor, just provide the ```vs``` path of your Monaco Editor. 
## Get monaco and editor instance
You can add a listener of ```'componentLoad``` event to obtain the Monaco and current editor instance like the below example:
```js
document.querySelector('s-monaco-editor').addEventListener('componentLoad', (event) => {
	const {monaco, editor} = event.detail;
});
```
## Properties & attributes
To see the list of available properties and attributes, [check here](./src/components/s-monaco-editor/readme.md).

# How to import
Basically, you want to call ```defineCustomElements()``` from the loader. If you want, you can optionally call ```applyPolyfills()``` first as well. For different project types, please check below sections for more details.
## Vanilla JS
### Script tag
First, [install using NPM](#use-npm).  
Then in the html
```html
<!-- for ES6 -->
<script type="module" src="node_modules/@seanwong24/s-monaco-editor/dist/s-monaco-editor/s-monaco-editor.esm.js"></script>
<!-- for ES5 -->
<script nomodule src="node_modules/@seanwong24/s-monaco-editor/dist/s-monaco-editor/s-monaco-editor.js"></script>
```
### Import statement
First, [install using NPM](#use-npm).  
Then in JS file
```js
import { applyPolyfills, defineCustomElements } from "node_modules/@seanwong24/s-monaco-editor/loader/index.js";
applyPolyfills().then(() => {
  defineCustomElements();
});
```
And in html
```html
<script type="module" src="path/to/the/js/file"></script>
```
Note that ```type="module"``` only works in modern browsers.
## Angular
### Use loader
First [install using NPM](#use-npm).  
Then include ```CUSTOM_ELEMENTS_SCHEMA``` in any module that uses ```s-monaco-editor```. For example, in ```AppModule```
```ts
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  // add this
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```
After that, in ```main.ts```
```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// add this
import { applyPolyfills, defineCustomElements } from '@seanwong24/s-monaco-editor/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// and add this
applyPolyfills().then(() => {
  defineCustomElements()
});
```
## React
### Use loader
First [install using NPM](#use-npm).  
Then in ```index.js```
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// add this
import { applyPolyfills, defineCustomElements } from "@seanwong24/s-monaco-editor/loader";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// and add this
applyPolyfills().then(() => {
  defineCustomElements();
});
```
## Vue
### Use loader
First [install using NPM](#use-npm).
Then in ```main.js```
```js
import Vue from 'vue';
import App from './App.vue';

import { applyPolyfills, defineCustomElements } from '@seanwong24/s-monaco-editor/loader';

Vue.config.productionTip = false;

// add this
Vue.config.ignoredElements = ['s-monaco-editor'];

// and add this
applyPolyfills().then(() => {
  defineCustomElements();
});

new Vue({
  render: h => h(App)
}).$mount('#app');
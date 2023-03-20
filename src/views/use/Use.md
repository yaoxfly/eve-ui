#  快速上手
本节将介绍如何在项目中使用 `@yaoxfly/eve-ui`,并在最底部介绍了`ie`兼容的一些说明。

# 引入 @yaoxfly/eve-ui
你可以引入整个 `@yaoxfly/eve-ui`，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 `@yaoxfly/eve-ui`。

## 完整引入

在 `main.js` 中写入以下内容：

```js
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入@yaoxfly/eve-ui
import eveUi from '@yaoxfly/eve-ui'
import '@yaoxfly/eve-ui/lib/eve-ui.css'

Vue.use(eveUi)
```


接着在`store`目录的`index.js`文件里引入组件插件里的`store`

```js
import modules from '@yaoxfly/eve-ui/src/store/modules'
export default new Vuex.Store({
  modules: {
    ...modules
  }
})
```
> 组件库里`store`不管是完整引入还是按需，都需要引入，否则某些组件的功能会不完整,比如`Menu`和`TagViews`等组件的联动功能，由于组件是基于`element-ui`的所以`element-ui`也要引入。


### 引入自定义样式(美化@yaoxfly/eve-ui)
当前组件是基于`element-ui`组件进行开发，原本的样式不符合业务需求，所以专门写了一套样式进行美化，配搭脚手架工程，如果有需要可以引入。

```js
import eveUi from '@yaoxfly/eve-ui'
import '@yaoxfly/eve-ui/lib/eve-ui.css'
//要在eve-ui.css 样式之后引入
//后台管理自定义样式1--需要配合脚手架工程切换主题功能用的，当前样式未进行编译，引入后本地开发编译会变慢，上线后不影响。
import '@yaoxfly/eve-ui/src/style/admin/index.scss'
//后台管理自定义样式2--不需要配合脚手架工程切换主题的 
import '@yaoxfly/eve-ui/style/admin/eve-common.css'
//互联网端自定义样式
import '@yaoxfly/eve-ui/style/front/eve-common.css'
Vue.use(eveUi)
```

> 特别注意：样式要在`@yaoxfly/eve-ui`样式之后引入，否则样式无法覆盖，以上自定义样式只需要引入一个就行，否则会相互覆盖。


## 按需引入(全局)

借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 `babel-plugin-component`：

```
npm install babel-plugin-component -D
```

然后在根目录(即src的同级目录下)创建.babelrc文件，并将.babelrc文件修改为：

```js
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "@yaoxfly/eve-ui",
        "styleLibraryName": "lib/theme-chalk"
      }
    ]
  ]
}
```
接下来，如果你只希望引入部分组件，比如 `Tree`、`Header`和`Menu`组件，那么需要在 `main.js` 中写入以下内容：

``` js
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { Tree, Header, Menu } from '@yaoxfly/eve-ui'
const component = [Tree, Header, Menu]
component.forEach(item => {
  Vue.use(item)
})
import '@yaoxfly/eve-ui/lib/eve-ui.css'
```

完整组件列表

```js
 { 
   Breadcrumb,
   Container,
   Dialog,
   DropDownTree,
   Header,
   Main,
   Menu,
   RichText,
   Scroll,
   SelectForm,
   TablePagination,
   TagViews,
   Tree,  
   Upload
  } 
```

## 按需引入(单页面)
有时并不想全局引入组件,这时候可以在页面组件中单独引入需要的组件,那么可以在页面组件的`<script>`标签中写入以下内容：
```js
import EveTree from '@yaoxfly/eve-ui/lib/tree'
import '@yaoxfly/eve-ui/lib/theme-chalk/tree.css'
export default {
  components: {
    EveTree
  },
}
```

某些组件在不引入全局css的情况样式会有点乱，如果有其他样式问题，可以在`main.js`引入全局样式 
```js
import '@yaoxfly/eve-ui/lib/eve-ui.css'
```

不要忘了引入依赖包 `element-ui` 在 `main.js`文件中引入

```js
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

在模板上简单使用
```html
<template>
  <div>
     <eve-tree></eve-tree>
  </div>
</template>
```

完整组件列表和引入方式

```js
import Breadcrumb from '@yaoxfly/eve-ui/lib/breadcrumb'
import '@yaoxfly/eve-ui/lib/theme-chalk/breadcrumb.css'
import Container from '@yaoxfly/eve-ui/lib/container'
import '@yaoxfly/eve-ui/lib/theme-chalk/container.css'
import Dialog from '@yaoxfly/eve-ui/lib/dialog'
import '@yaoxfly/eve-ui/lib/theme-chalk/dialog.css'
import DropDownTree from '@yaoxfly/eve-ui/lib/drop-down-tree'
import '@yaoxfly/eve-ui/lib/theme-chalk/drop-down-tree.css'
import Header from '@yaoxfly/eve-ui/lib/header'
import '@yaoxfly/eve-ui/lib/theme-chalk/header.css'
import Main from '@yaoxfly/eve-ui/lib/main'
import '@yaoxfly/eve-ui/lib/theme-chalk/main.css'
import Menu from '@yaoxfly/eve-ui/lib/menu'
import '@yaoxfly/eve-ui/lib/theme-chalk/menu.css'
import RichText from '@yaoxfly/eve-ui/lib/rich-text'
import '@yaoxfly/eve-ui/lib/theme-chalk/rich-text.css'
import Scroll from '@yaoxfly/eve-ui/lib/scroll'
import '@yaoxfly/eve-ui/lib/theme-chalk/scroll.css'
import SelectForm from '@yaoxfly/eve-ui/lib/select-form'
import '@yaoxfly/eve-ui/lib/theme-chalk/select-form.css'
import TablePagination from '@yaoxfly/eve-ui/lib/table-pagination'
import '@yaoxfly/eve-ui/lib/theme-chalk/table-pagination.css'
import TagViews from '@yaoxfly/eve-ui/lib/tag-views'
import '@yaoxfly/eve-ui/lib/theme-chalk/tag-views.css'
import Tree from '@yaoxfly/eve-ui/lib/tree'
import '@yaoxfly/eve-ui/lib/theme-chalk/tree.css'
import Upload from '@yaoxfly/eve-ui/lib/upload'
import '@yaoxfly/eve-ui/lib/theme-chalk/upload.css'
import Iframe from '@yaoxfly/eve-ui/lib/iframe'
import '@yaoxfly/eve-ui/lib/theme-chalk/iframe.css'

export default {
  components: {
    Breadcrumb,
    Container,
    Dialog,
    DropDownTree,
    Header,
    Main,
    Menu,
    RichText,
    Scroll,
    SelectForm,
    TablePagination,
    TagViews,
    Tree,
    Upload,
    Iframe
  },
}
```

## 兼容ie 
目前组件库只支持ie11, ie11以下不支持,兼容ie11,需要做以下操作

首先下载`babel-polyfill`

```js
npm i babel-polyfill --save-dev
```

在`main.js`文件最顶部引入

```js
import 'babel-polyfill'
```

接着在`vue.config.js`(如果没有可以在根目录创建一个)配置属性`transpileDependencies`

```js
transpileDependencies: ['@yaoxfly/eve-ui'] 
```


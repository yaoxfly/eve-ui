  # Menu 菜单
  菜单组件,与Header和Breadcrumb以及TagViews组件有联动关系。
  > 全局样式 `li{
    display: inline-block;`} 会影响到菜单三级(包括三级)以上的样式及布局,设置当前样式时不要设置为全局，以免导致菜单样式错乱。
  # 基础用法
 <template>
  <div>
    <Example/>
  </div>
</template>
<script>
import Example from './Example'
export default {
  components: {
    Example,
  }
}
</script>

# 演示代码

```html
<template>
  <div>
    <eve-menu :data="data" :top="55"> </eve-menu>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: [
        {
          path: '',
          type: 'submenu',
          text: '菜单1',
          children: [
            {
              title: '开发指南',
              path: 'main',
              type: 'item', // 子菜单
              icon: 'el-icon-location',
              text: 'Main',
            }
          ],
        },
        {
          path: '/',
          type: 'item',
          text: '开始'
        },
      ]
    }
  },
  methods: {}
}
</script>
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| mode  | 模式  |string| horizontal / vertical |  vertical | 
| unique-opened | 是否只保持一个子菜单的展开 | boolean | — | false | 
| router | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转；设置为false,路由不跳转。 |  boolean | — | true |
| background-color|  菜单的背景色 |  string | — | #ffffff |
| text-color |  菜单的文字颜色 |  string | — | #303133 |
| active-text-color |  当前激活菜单的文字颜色 |  string | — | #409EFF |
| collapse | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） |  boolean | — | false |
| shrink-width |   面包屑、页签的收缩按钮，收缩后左侧的宽度，如果有padding、margin也要算进去 |  number | — | 64 |
| border-right |   菜单整体右边边框的线 |  boolean | — | true |
| item-border-right | 菜单选项右边边框的线 |  boolean | — | false |

### Attributes(自定义)
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| -----  | ------ | ----- | ----- | - |
| data   |   菜单数据,详细参数见下表 |  array | — | [] |
| width  |   菜单宽度 |  number | — | 256 |
| top    |   距离顶部(header)的距离|  number | — | 42 |
| config |   配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认,详细参数见下表 |  object | —|{}|
| padding-left  | 各级菜单距离左边的距离   | number,string  | —| 10 |

> 设置了`box-sizing: border-box`后会影响`top`属性,如果出现菜单纵向没铺满的`bug`,可自由调节当前值到铺满的为止，或者设置`top`值为`0`并在`app.vue`中添加样式 `body{overflow: hidden;}`

### data 
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| type | 类型   | string |  submenu(父菜单)，item(子菜单)  | — |
| text | 菜单文本，可根据下表的config自定义修改参数名 | string |  — | — |
| path | 菜单路径 ，可根据下表的config自定义修改参数名| string |  — | — |
| children | 树结构数据的孩子节点，可根据下表的config自定义修改参数名 | string |  — | — |
| title | 菜单分组的title ，可根据下表的config自定义修改参数名  | string |  — | — |
| icon | 菜单的图标  | string |  — | — |


>  `path`是唯一的，不能配置一样的`path`，如果父菜单没有跳转的功能，就不需要配置`path`

### config
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| text | 菜单文本渲染的key值 | string |  — | text |
| path | 菜单路径渲染的key值 | string |  — | path |
| children | 树结构数据的孩子节点key值 | string |  — | children |
| title | 菜单分组的title   | string |  — | title |

> 当这里的配置修改时，为了联动，Breadcrumb以及TagViews组件的配置，也要进行同步修改。

### Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| select |菜单激活回调| function(param)，包含index(当前路径)、indexPath(路径数组)、data(菜单数据),text(菜单文本)、currentData(当前菜单详细信息)|
| right-content-button |右边部分icon和用户信息等按钮的点击事件| function(param)  包含导航按钮的index(下标)和数据| 
| dialog-operate |右边dialog的按钮的点击事件| function(param) ,包含dialog按钮的index(下标)和数据| 

### Function
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| update | 更新组件--配合header联动用, 当header组件调用findlowestMenu方法赋值时，跳转菜单，导致左边菜单展开多个情况时使用| —| 


### Slot
| name                 | 说明        |
| -------------------- | ----------  |
| ——            |  在菜单的上方添加内容 |



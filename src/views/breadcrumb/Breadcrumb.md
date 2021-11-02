  # Breadcrumb 面包屑
  显示当前页面的路径，快速返回之前的任意页面。
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
    <eve-breadcrumb :data="data"></eve-breadcrumb>
  </div>
</template>
<script>

export default {
  name: 'Breadcrumb',
  data () {
    return {
      data: [
        {
          text: '导航组件',
        },
        {
          text: 'Breadcrumb',
        }
      ]
    }
  },
  mounted () {

  },

  methods: {

  }
}
</script>
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| separator  | 面包屑分割符  |string| — |  / | 
| separator-class | 图标分隔符 class  例如 el-icon-arrow-right 可使用相应的iconfont(字体图标) 作为分隔符,注意这将使 separator 设置失效 | string | — |  —  | 
| replace |  在进行路由跳转时，启用replace将不会向 history 添加新记录 |  boolean | — |   false  |
| menu| 菜单数据--菜单和面包屑数据同享一份数据时可使用，内置了转换方法可自动转换成面包屑数据，数据格式参考Menu组件 |  array | — | [] |
| data | 面包屑数据，如有传菜单数据会替换掉这个数据 |  array | — | []； 范例:[{text:'导航组件',path:'/test'},{text:'Breadcrumb'}] |
| width | 宽度 |   number, string | — | 100% |
| height |  高度 |  number, string | — | 40 |
| Left | 文本离左边的距离 |  number, string | — |  20 |
| icon-class | 左边字体图标类，详细参数见下表 |  object | — |  —  |
| icon | 是否显示收缩图标 |  boolean | — |  false  |
| icon-left |  图标、图片等离左边的距离 |  number, string | — |  10  |
| config |  配置菜单、面包屑数据的text、path、children等key值--支持只修改某个key值,其他配置默认,详细参数见下表 |  object | — |   —   |

>  `menu` 属性转换的面包屑数据，内部做好了缓存功能,刷新页面，数据也不丢失，`data`属性需自行处理缓存功能，可监听路由处理。

### icon-class
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| expand | 展开 | string | 参考element-ui字体图标库 | el-icon-s-fold |
| shrink | 收缩 | string | 参考element-ui字体图标库 | el-icon-s-unfold |

### config
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| text | 菜单文本渲染的key值 | string |  — | text |
| path | 菜单路径渲染的key值 | string |  — | path |
| children | 树结构数据的孩子节点key值 | string |  — | children |

> 当这里的配置修改时，为了联动，Menu组件的配置，也要进行同步修改。

### Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| icon-click | 左边收缩图标的回调事件 | — |

### Slot
| 方法名 | 说明 
| ----| ----| 
| left-icon | 左边收缩展开小图标 |  
| left-content | 左边内容 |  

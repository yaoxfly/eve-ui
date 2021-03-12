# Iframe  内联框架
基于html标签iframe封装的组件，iframe元素会创建包含另外一个文档的内联框架（即行内框架）。
# 基本用法

<template>
  <div>
    <Example />
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
    <eve-iframe :src="src"> </eve-iframe>
  </div>
</template>
<script>
export default {
  name: 'Iframe',
  data () {
    return {
        src:'http://www.baidu.com'
    }
  },
}
</script>
```
### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| --------------- | ---------------- | ------- | ------ | - |
| src  | url地址 | string | —  | —   |
| top    | 距离顶部的距离 | number  | —    | 139  |
| scrolling    | 是否显示滚动条 属性值：no(无滚动条)、auto(自动) | string  | — |  no  |
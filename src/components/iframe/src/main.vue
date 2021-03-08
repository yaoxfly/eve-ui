<template>
  <div>
    <iframe
      class="eve-iframe"
      :src="src"
      :scrolling="scrolling"
      frameborder="0"
      :style="{ height: `calc(100vh - ${top}px)` }"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'EveIframe',
  props: {
    // url链接
    src: {
      type: String,
      // default: () => 'http://172.16.111.56:8080/tysq/iframe/upms/view/org/org'
      default: () => ''
    },
    // 距离顶部的距离
    top: {
      type: Number,
      default: () => 139
    },
    //是否显示滚动条 属性值：no(无滚动条)、auto(自动)
    scrolling: {
      type: String,
      default: () => 'no'
    }
  }
}
</script>

<style >
.eve-iframe {
  width: 100%;
}
</style>

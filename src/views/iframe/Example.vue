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
      src: 'http://www.baidu.com'
    }
  },
}
</script>
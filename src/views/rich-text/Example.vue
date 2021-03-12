
<template>
  <div>
    <eve-rich-text
      v-model="value"
      @on-click="onClick"
      @on-blur="onBlur"
      :init="init"
      ref="eve-rich-text"
    ></eve-rich-text>

    <el-button :style="{ marginTop: '25px' }" @click="getText"
      >获取富文本的文本和字数</el-button
    >
  </div>
</template>
<script>
export default {
  name: 'RichText',
  data () {
    return {
      value: '',
      init: {
        height: 327,
        plugins: ['image'],
        ax_wordlimit_num: 40,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        images_upload_handler: (blobInfo, success) => {
          console.log(blobInfo, success, 111)
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        },
      }
    }
  },
  mounted () { },
  methods: {
    //聚焦事件
    onClick () {
      console.log(this.value)
    },
    //失焦事件
    onBlur (e, func) {
      console.log(e, func)
    },
    //获取富文本的文本
    getText () {
      console.log(this.$refs['eve-rich-text'].getText())
    }
  }
}
</script>



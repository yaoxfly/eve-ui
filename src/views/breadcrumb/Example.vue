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

<template>
  <div>
    <eve-tree
      :data="data"
      :convert-setting="convertSetting"
      @append="append"
      @remove="remove"
      @edit="edit"
    ></eve-tree>
  </div>
</template>
<script>

export default {
  data () {
    return {
      convertSetting: {
        convert: true
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          pid: -1
        },
        {
          id: 2,
          label: '二级 1',
          pid: 1
        },
        {
          id: 3,
          label: '二级 1',
          pid: -1
        },
        {
          id: 4,
          label: '二级 1',
          pid: 2
        }
      ],
    }
  },


  methods: {
    append (node, data) {
      console.log(node, data)
    },
    remove (node, data) {
      console.log(node, data)
    },
    edit (node, data) {
      console.log(node, data)
    }
  }
}
</script>
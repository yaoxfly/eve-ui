<template>
  <div>
    <eve-tree
      :data="data"
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
          disabled: true, //设置某个节点不能被选择
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
            children: [{
              id: 6,
              label: '三级 2-1-1',

            }]
          }, {
            id: 3,
            label: '二级 2-2',

            children: [{
              id: 7,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          id: 8,
          children: [{
            id: 10,
            label: '二级 3-1',
            children: [{
              id: 11,
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            id: 12,
            children: [{
              id: 13,
              label: '三级 3-2-1'
            }]
          }]
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
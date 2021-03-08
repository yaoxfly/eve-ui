<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="250"
      v-model="value"
      :convert-setting="convertSetting"
      @node-click="nodeClick"
    ></eve-drop-down-tree>
  </div>
</template>
<script>

export default {
  data () {
    return {
      convertSetting: {
        convert: true,
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
          label: '一级 2',
          pid: -1
        },
        {
          id: 4,
          label: '三级 1',
          pid: 2
        }
      ],
      //双向绑定的值--如果初始就有值可回显
      value: ''
    }
  },
  methods: {
    /**@description  节点被点击时的回调
     * @author yx
     * @param  {Object}  data 递给 data 属性的数组中该节点所对应的对象
     * @param  {Object}  node 节点对应的 Node
     * @param  {Object}  indeterminate 节点组件本身
    */
    nodeClick (data, node, indeterminate) {
      console.log(data, node, indeterminate, 'nodeClick')
    }
  }
}
</script>

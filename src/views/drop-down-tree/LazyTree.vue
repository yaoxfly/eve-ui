<template>
  <div>
    <eve-drop-down-tree
      :width="250"
      :load="load"
      multiple
      lazy
      :option="dropDownTree.option"
      v-model="dropDownTree.value"
      @check="check"
      check-strictly
    ></eve-drop-down-tree>
    <el-button @click="getParam" style="margin-top: 10px">获取树参数</el-button>
  </div>
</template>
<script>

export default {
  name: 'example',
  components: {},
  data () {
    return {
      dropDownTree: {
        option: [{ id: 1, label: '一级 1' }, { id: 4, label: '懒加截' }], //懒加载必须传递--否则懒加载的节点会显示id
        data: [
          {
            id: 1,
            label: '一级 1',
          },
          {
            id: 2,
            label: '一级 2',

          }, {
            id: 3,
            label: '二级 3',
          }
        ],
        value: [1, 4]
      }
    }
  },

  methods: {
    load (node, resolve) {
      if (node.level === 0) {
        return resolve(this.dropDownTree.data)
      }
      if (node.level >= 1) {
        console.log(node.data)
        if (node.data.id === 1) {
          setTimeout(() => {
            return resolve([{ id: 4, label: '懒加截1', leaf: true }]) //leaf 叶子节点
          }, 500)
        }

        if (node.data.id === 2) {
          setTimeout(() => {
            return resolve([{ id: 5, label: '懒加截2', }])
          }, 500)
        }

        if (node.data.id === 3) {
          setTimeout(() => {
            return resolve([{ id: 6, label: '懒加截3' }])
          }, 500)
        }
      }
    },

    /** @description 当复选框被点击的时候触发
     * @param  {Object}  data  //传递给 data 属性的数组中该节点所对应的对象(当前点击)
     * @param  {Object}  checked //树目前的选中状态对象，包含 checkedNodes、checkedKeys、
     * halfCheckedNodes、halfCheckedKeys 四个属性
    * @author yx
    */
    check (data, checked) {
      console.log(data, checked, 'check')
    },

    getParam () {
      alert(this.dropDownTree.value)
      console.log(this.dropDownTree.option, this.dropDownTree.value)
    },
  }
}
</script>
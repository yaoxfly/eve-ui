<template>
  <div>
    <div>
      <eve-select-form
        :model="model"
        :data="data"
        @handle-submit="handleSubmit"
      >
        <template #level>
          <eve-drop-down-tree
            :data="treeData"
            v-model="model.level"
            @node-click="nodeClick"
          ></eve-drop-down-tree>
        </template>
        <!--这里的插槽名是动态的-->
        <template #input-name> 我是插槽追加的 </template>
      </eve-select-form>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      //表单数据
      data:
        [
          {
            label: '等级(插槽下拉树)：',
            prop: 'level', //当前值就是你要传给后台的key值，也就是插槽名，所以插槽名是动态的，嗯，就是这么酷
            type: 'custom', //自定义类型，就是用slot来加入其它自定义的表单组件
          },

          {
            label: '统一社会信用代码：',
            prop: 'name',
            type: 'input',
          },

          {
            label: '所属部门：',
            prop: 'department',
            type: 'select',
            option: [
              {
                label: '北京市',
                value: 'beijing'
              },
              {
                label: '上海市',
                value: 'shanghai'
              },
              {
                label: '深圳市',
                value: 'shenzhen'
              }
            ]
          },
          {
            label: '状态：',
            prop: 'status',
            type: 'checkbox',
            option: [
              {
                label: '北京市',
                value: 'beijing1'
              },
              {
                label: '上海市',
                value: 'shanghai2'
              },
              {
                label: '深圳市',
                value: 'shenzhen3'
              }
            ]
          },
          {
            label: '地址：',
            prop: 'address',
            type: 'radio',
            option: [
              {
                label: '北京市',
                value: 'beijing'
              },
              {
                label: '上海市',
                value: 'shanghai'
              },
              {
                label: '深圳市',
                value: 'shenzhen'
              }
            ]
          },
          {
            label: '日期：',
            prop: 'date',
            type: 'date',
            // pickerType: 'date', //类型可选为:date、datetime
            // valueFormat: 'yyyy-MM', //输出值的格式转换
            // format: 'yyyy-MM'//选择框里的值的格式转换
          },
          {
            label: '时间：',
            prop: 'time',
            type: 'time',
            // valueFormat: 'mm:ss', //输出值的格式转换
            // format: 'mm:ss'//选择框里的值的格式转换
          }
        ],

      //树的数据
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 2,
            label: '二级 1-1',
            children: [{
              id: 3,
              label: '三级 1-1-1'
            }
            ]
          }]
        }, {
          id: 4,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
            children: [{
              id: 6,
              label: '三级 2-1-1'
            }]
          }, {
            id: 7,
            label: '二级 2-2',
            children: [{
              id: 8,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          id: 9,
          label: '一级 3',
          children: [{
            id: 10,
            label: '二级 3-1',
            children: [{
              id: 11,
              label: '三级 3-1-1'
            }]
          }, {
            id: 12,
            label: '二级 3-2',
            children: [{
              id: 13,
              label: '三级 3-2-1'
            }]
          }]
        }
      ],

      //表单双向绑定(prop)--点击查询按钮时获取值-重置验证时也要用到
      model: {
        name: '',
        department: '',
        status: [], //checkbox是多选的时候，声明时一定要写成数组形式，否则会出现选一个全部勾选情况。
        address: '',
        date: '',
        time: '',
        level: ''
      },
    }
  },

  methods: {
    handleSubmit (emit) {
      console.log(emit)
    },
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


<style  scoped>
.eve-select-form__demo {
  position: absolute;
  right: -60px;
  top: 10px;
}
</style>
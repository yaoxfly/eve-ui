<template>
  <div>
    <eve-table-pagination
      class="home-table-pagination"
      @btn-operate="btnOperate"
      @current-change="currentChange"
      :page-size="pageSize"
      :columns="columns"
      :data="data"
      :button="button"
      @sort-change="sortChange"
      :default-sort="{ prop: 'age', order: 'ascending' }"
    >
    </eve-table-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {
      pageSize: 20, //一页显示几条
      //表格数据
      data: [
        {
          id: 1,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
          children: [{
            id: 31,
            name: 'John Brown',
            age: 200,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            children: [{
              id: 2003344,
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03',
            }]
          }, {
            id: 200,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          }]
        },

        {
          id: 7,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 8,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
      ],

      //表头 prop 对应着表格数据的key，序号和操作默认都有可不需添加。
      columns: [
        {
          type: 'index', // 序号
          width: 75,
          label: '序号',
        },
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Age',
          prop: 'age',
          sortable: true,
          filters: [{ text: 18, value: 18 }, { text: 19, value: 19 }, { text: 26, value: 26 }],
          filterMethod: (value, row, column) => {
            const property = column.property
            return row[property] === value
          }
        },
        {
          label: 'Address',
          prop: 'address',
          render: (h, data) => {
            const { row: { address } = {} } = data
            return (
              <div>
                <span style="fontSize: '14px'">{address}我是被转换的数据1</span>
              </div >)
          },
          // formatData: (data) => {
          //   console.log(data, 11)
          //   return data + '我是被转换的数据1'
          // }
        },
        {
          label: '操作',
          type: 'operate',
          width: 285
        },
      ],

      //按钮--组件内部已经内置了这四个按钮,而且样式统一,以下只是范例,需要修改文本、颜色时再传这个数组
      button: [
        {
          value: '新增',
          type: 'text'
        },
        {
          value: '查看',
          type: 'primary'
        },

        {
          value: '修改',
          plain: true
        },
        {
          value: '删除',
          round: true,
          type: 'success'
        }
      ]
    }
  },

  methods: {

    //操作按钮  
    btnOperate (emit) {
      console.log(emit)
      // this.visible = !this.visible
    },

    //页面切换
    currentChange (emit) {
      console.log(emit)
    },

    //排序改变
    sortChange ({ column, prop, order }) {
      console.log(column, prop, order)
    },

  }
}
</script>



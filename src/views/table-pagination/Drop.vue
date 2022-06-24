<template>
  <div>
    <eve-table-pagination
      :page-size="pageSize"
      :columns="columns"
      :data="data"
      columns-drop
      rows-drop
      :total="20"
      @columns-drop="columnsDrop"
      @rows-drop="rowsDrop"
    >
    </eve-table-pagination>
  </div>
</template>
<script>
export default {
  name: 'DropTablePaginations',
  data() {
    return {
      pageSize: 10, //一页显示几条
      //表格数据
      data: [
        {
          id: 1,
          name: 'John Brown 1',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          id: 2,
          name: 'Jim Green 2',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          id: 3,
          name: 'Joe Black 3',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        }
      ],

      //表头 prop 对应着表格数据的key，拖拽表格的时候要把所有的列都写出来，并且设置个唯一值，这里以每个列都设置了一个prop为例
      columns: [
        {
          label: '序号',
          prop: 'index',
          type: 'index',
          width: 100
        },
        {
          type: 'selection',
          prop: 'selection',
          width: 80
        },
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Age',
          prop: 'age'
        },
        {
          label: 'Address',
          prop: 'address',
          render: (h, data) => {
            const { row: { address } = {} } = data
            return (
              <div>
                <span style="fontSize: '14px'">{address}我是被转换的数据1</span>
              </div>
            )
          }
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'operate',
          width: 100,
          render: (h, data) => {
            return <span class="eve-table-pagination__button-text">新增</span>
          }
        }
      ]
    }
  },

  mounted() {
    this.getTableColumns()
    this.getTableData()
  },

  methods: {
    //获取表格列排序数据,回填排序
    getTableColumns() {
      //异步获取数据、模仿ajax 具体的数据需要根据后端数据返回进行回填
      setTimeout(() => {
        const arr = []
        // 单纯修改，组件不会更新,需要给数组重新赋值
        this.columns.forEach((item, index) => {
          if (item.prop === 'index') {
            item.sort = 1
            arr.push(item)
          }
          if (item.prop === 'selection') {
            item.sort = 3
            arr.push(item)
          }
          if (item.prop === 'name') {
            item.sort = 2
            arr.push(item)
          }
          if (item.prop === 'address') {
            item.sort = 4
            arr.push(item)
          }
          if (item.prop === 'age') {
            item.sort = 5
            arr.push(item)
          }
          if (item.prop === 'operate') {
            item.sort = 6
            arr.push(item)
          }
        })
        this.columns = arr
      }, 1000)
    },

    //获取表格数据,回填排序
    getTableData() {
      //异步获取数据、模仿ajax，具体的数据需要根据后端数据返回进行回填
      setTimeout(() => {
        const arr = []
        // 单纯修改，组件不会更新,需要给数组重新赋值
        this.data.forEach((item, index) => {
          if (item.id === 1) {
            item.sort = 2
            arr.push(item)
          }
          if (item.id === 2) {
            item.sort = 1
            arr.push(item)
          }
          if (item.id === 3) {
            item.sort = 3
            arr.push(item)
          }
        })
        this.data = arr
      }, 1000)
    },

    // 拖拽列数据回调
    columnsDrop(columns) {
      console.log(columns, '拖拽后，新的列')
    },

    // 拖拽行数据回调
    rowsDrop(rows) {
      console.log(rows, '拖拽后，新的行')
    }
  }
}
</script>

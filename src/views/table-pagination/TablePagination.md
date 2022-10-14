# TablePagination 表格分页

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比，分页或其他自定义操作。
> 由于封装的表格内部有根据`id`进行操作，`id`属性一定要设置,默认是`id`，可根据后端返回的唯一值进行修改，或者自定义添加唯一值；
由于表格默认不能换行，使用`render`自定义行的时候，如果出现特殊图标 ，在`columns`属性中设置`showOverflowTooltip` 为`false`。 

# 基础用法

<template>
  <div>
    <Example/>
  </div>
</template>

<script>
import Example from './Example'
import Drop from './Drop'
export default {
  components: {
    Example,
    Drop
  }
}
</script>

# 演示代码

``` html
<template>
  <div>
    <eve-table-pagination
      class="home-table-pagination"
      @btn-operate="btnOperate"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :columns="columns"
      :data="data"
      :button="button"
      :total="20"
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
      pageSize: 10, //一页显示几条
      currentPage: 1,
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
        {
          id: 9,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 10,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 11,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 12,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
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
          //使用render自定义行的时候，如果出现特殊图标 ，在columns属性中设置showOverflowTooltip 为false。
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
      this.currentPage = emit
      console.log(emit)
    },

    //排序改变
    sortChange ({ column, prop, order }) {
      console.log(column, prop, order)
    },

  }
}
</script>
```

# 支持列、行拖拽的表格
设置`columns-drop`属性,可使得表格的`列`可以进行拖拽,  通过在`columns`数组中添加`sort`来进行排序；设置`rows-drop`属性，可使得表格的`行`可以进行拖拽，通过在`data`数组(表格数据)中添加`sort`来进行排序；拖拽表格`row-key`属性一定要设置，默认是`id`，可根据后端返回的唯一值进行修改，或者自定义添加唯一值。


> 拖拽表格要把所有的列都写出来(包括序号,选择框，操作)，并且设置个唯一值，这里以每个列都设置了`prop`为唯一值为例。

<template>
  <div>
    <Drop/>
  </div>
</template>

```html
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
  data () {
    return {
      pageSize: 10, //一页显示几条
      //表格数据
      data: [
        {
          id: 1,
          name: 'John Brown 1',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          id: 2,
          name: 'Jim Green 2',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          id: 3,
          name: 'Joe Black 3',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
      ],

      //表头 prop 对应着表格数据的key，拖拽表格的时候要把所有的列都写出来，并且设置个唯一值，这里以每个列都设置了一个prop为例
      columns: [
        {
          label: '序号',
          prop: 'index',
          type: 'index',
          width: 100,
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
          prop: 'age',
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
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'operate',
          width: 100,
          render: (h, data) => {
            return <span class='eve-table-pagination__button-text'>新增</span>
          }
        },
      ],
    }
  },

  mounted () {
    this.getTableColumns()
    this.getTableData()
  },

  methods: {
    //获取表格列排序数据,回填排序  
    getTableColumns () {
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
    getTableData () {
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
    columnsDrop (columns) {
      console.log(columns, '拖拽后，新的列')
    },

    // 拖拽行数据回调
    rowsDrop (rows) {
      console.log(rows, '拖拽后，新的行')
    }
  }
}
</script>
```

> 当前组件扩展了所有`element-ui的Table组件`的属性,目前文档记录的只是常用的属性和事件,更多的属性和事件请参考`element-ui`官方文档。

### Table Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| data  | 显示的数据 |array| —| — |
| height | 通过设置属性 height, 会自动固定表头。 | string/number  | —   | —   |
| max-height   | Table 的最大高度。  | string/number  | —  | —   |
| stripe   | 是否为斑马纹 table   | boolean  | —   | false  |
| border   | 是否带有纵向边框  | boolean   | —   | false |
| size    | Table 的尺寸   | string  | medium / small / mini | — |
| fit  | 列的宽度是否自撑开   | boolean  | —  | true   |
| show-header   | 是否显示表头      | boolean    | —   | true  |
| highlight-current-row   | 是否要高亮当前行  | boolean     | —   | false   |
| row-class-name    | 给某一行指定一个样式   | Function({row, rowIndex})/String   | —  | — |
| cell-class-name  | 给某一列指定一个样式 | Function({row, column, rowIndex, columnIndex})/String | —  |— |
| header-row-class-name  | 表头行的 className 的回调方法   | Function({row, rowIndex})/String   | — | —  |
| header-cell-class-name  | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。  | Function({row, column, rowIndex, columnIndex})/String   | — | —  |
| empty-text  | 空数据时显示的文本内容，也可以通过 slot="empty" 设置 | string  | —  | 暂无数据  |
| row-key   | 行数据的 Key，用来优化 Table 的渲染--一般传主键值，在使用 reserve-selection 功能与显示树形数据时和行列拖拽时，该属性是必填的   | String, Function | — | id  |
| tree-props   | 渲染嵌套数据(树)的配置选项,hasChildren用来懒加载   | Object | — | { children: 'children', hasChildren: 'hasChildren' }  |
| lazy   | 是否懒加载子节点数据   | Boolean | — | false |
| load   | 加载子节点数据的函数,lazy为true时生效,函数第二个参数包含了节点的层级信息--树懒加载用   | Function | — | — |
| default-sort   | 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序   | Object | order: ascending, descending | 如果只指定了prop, 没有指定order, 则默认顺序是ascending |


###  Table  Attributes (自定义)
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| columns  | 通过给列 columns 设置字段，表格数据渲染，详细参数看下表  | array  | —   | []  |
| button   | 增删改查等，按钮数组，详细参数看下表  | array  | —   | []   |
| id  | 后端返回的数据的 id 的 key, 默认是 id  | string  | —   | id   |
| is-only-get-id-arr  | 当用户 Checkbox 时触发的事件, 是否只返回 id 数组 | boolean | —  | true  |
| is-only-get-id   | 当用户点击按钮的时候触发的事件, 是否只返回 id        | boolean  | —  | false  |
| delete-message-box    | 删除弹出框设置, 该属性较多，看下表  | object | —  | {  message: '此操作将永久删除该条记录, 是否继续?',title: '提示',confirmButtonText: '确定',cancelButtonText: '取消',text: '删除'isCanclePrompt: true,showClose: true,closeOnClickModal: false,closeOnPressEscape: false,center: false } |
| is-show-index  | 是否显示默认的序号 |boolean| — |true|
| is-show-selection  | 是否显示默认多选框/选择框(checkbox) |boolean| — |false|
| is-show-operate  | 是否显示默认的操作(增删改查等按钮) |boolean| — |true|
| z-index | 代表数据在第n层，当传进来的数据是树结构时，并开启了表格数据转换时要配置的一个属性，默认是zIndex | string| — |zIndex|
| is-format-data | 是否开启表格数据转换，主要用于树结构数据添加zIndex时用 | boolean| — |false|
| columns-drop | 是否开启表格列拖拽, 也可在注册组件的时候全局设置`eveTablePagination`，详细参数看下表 | boolean| — |false|
| rows-drop | 是否开启表格行拖拽  | boolean | — | false |
| line-feed |是否可以换行，需`columns`属性中的`showOverflowTooltip`属性配合,哪一行需要换行，哪一行就设置showOverflowTooltip:false|  boolean | — | false |

### columns 
当前值是对象数组,以下key值代表的是每个对象里面的属性值。

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| prop   | 表格要渲染的key值  | string  |— | —  |
| label  | 表头显示的值   | number | — | 24  |
| renderHeader  | 列标题 Label 区域渲染使用的 Function，可自定义表头内容 | Function(h, { column, $index }) | — | — |
| width  | 当前列的宽度   | number | — | —  |
| minWidth  | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列   | string | — | —  |
| fixed  | 列是否固定在左侧或者右侧，true 表示固定在左侧   | string, boolean | true, left, right | — |
| type   | 列的类型 | string |  selection(选择框)、index(序号)、operate(操作)、tree(下拉树)  | 普通内容 |
| showOverflowTooltip  | 当内容过长被隐藏时显示 tooltip   | boolean |  — | true  |
| formatData | 简单改变当前列的文本值,复杂用render或者插槽    | Function(data) |  — | —  |
| render  |  使用render函数自定义内容 |  Function(h,data)  | — | —  |
| sortable  |  对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 |  boolean, string  | true, false, 'custom' | false  |
| filters  |  数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 |  Array[{ text, value }] | — | — |
| filterMethod  |  数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 |  Function(value, row, column) | — | — |
| selectable |  仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 |  Function(row, index) | — | — |
| hidden  | 是否隐藏列 | boolean | — | false |
| align  | 对齐方式 | string |	left/center/right | left |
| headerAlign  | 表头对齐方式，若不设置该项，则使用表格的对齐方式 (`align`属性)| string |	left/center/right | — |

>  表头配置属性, 其中 `formatData` 方法只对`type`是普通内容列有效 ,`render`只对普通内容和操作列有效

### eveTablePagination 
注册组件的时候可以传递参数，进行全局设置。

```js
import eveUi from 'eve-ui'
import 'eve-ui/lib/eve-ui.css'
Vue.use(eveUi, {
  eveTablePagination: {
    layout: 'prev,pager,next,jumper', //分页的上一页，下一页、总页数等布局展示
    jumpText:"前往", //前往的文本修改
    isShowPageCount:true, //是否显示总页数
    columnsDrop:true //是否支持表格列拖拽
  }
})
```
###  Pagination Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| current-page    | 当前页数，支持 .sync 修饰符      | number   | —  | 1  |
| page-sizes    | 每页显示个数选择器的选项设置  | number[]   | —  | [10, 20, 30, 40, 50, 100] |
| page-size    | 每页显示条目个数，支持 .sync 修饰符  | number   | — | 10 |
| total    | 总条目数  | number   | — | — |
| layout   | 组件布局，子组件名用逗号分隔  | string |sizes, prev, pager, next, jumper, ->, total, slot|total,prev,pager,next,sizes,jumper |
| small  | 在空间有限的情况下，可以使用简单的小型分页  | boolean  | —   | false   |
| hide-on-single-page   | 只有一页时是否隐藏   | boolean | — | true  |

> 表格内置删除按钮，解决了删除最后一页最后一条数据展示空数据问题，`current-page`上需添加`.sync`修饰符，如果使用`render`或者`slot`修改了内置的删除按钮，可以使用`backPreviousPage`方法,同时`current-page`上需要添加`.sync`修饰符。

###  Pagination Attributes(自定义)
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| is-show-pagination  | 是否显示分页  | boolean  |— | true |
| top  | 分页距离表格的距离   | number | — | 24  |
| align  | 分页的位置   | string | center、left、right | center  |
| jump-text |  分页前往的文本 | string| — | 跳至 |
| is-show-page-count|  是否显示总页数 | string| — | 共xxx页 |


###  Button  Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| value  | 文本 |string| — | 查看、新增、修改、删除|
| type  |  类型 |string| text、primary、success、info、warning、danger | primary |
| plain  | 是否朴素按钮 |boolean| — | false|
| round  | 是否圆角按钮 |boolean| — | false|
| icon  |  图标类名 |string| — | — |

>  操作列的按钮配置, `type`属性中,除了`text`是文本类型的按钮，其他都是普通按钮类型,不同参数分别代表不同颜色。

###  delete-message-box

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| show  | 是否显示删除提示 |boolean| — | false|
| message  | 提示内容 |string| —| 此操作将永久删除该条记录, 是否继续?|
| title |提示 | string  | —   | 提示 |
| confirmButtonText   | 确认的文字  | string  | —  | 确定  |
| cancelButtonText   | 取消的文字  | string  | —   | 取消  |
| text   | 删除的文字  | string   | —   | 删除 |
| isCanclePrompt    |  是否显示取消操作的提示 | boolean  |  — |true |
| showClose  | 是否显示删除图标   | boolean  | —    |  true   |
| closeOnClickModal  | 点击模态框隐藏对话框   | boolean  | —   | false   |
| closeOnPressEscape   | 点击Esc隐藏对话框 |   boolean | —  | false |
| center  | 居中 | boolean | —  |false |

###  Table Event
| 事件名称 | 说明 | 回调参数 | 
| ----| ----| --- | 
| btn-operate  |按钮的操作事件 | {} (按钮的文本数据、按钮的下标、当前行数据，当前行数据的下标) |
| select  |当用户手动勾选数据行的 Checkbox 时触发的事件 | [] (id数组或者当前行数据的数组) |
| select-all  |当用户手动勾选全选 Checkbox 时触发的事件 | [] (id数组或者当前行数据的数组) |
| current-row-change  | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 |currentRow, oldCurrentRow|
| sort-change  |当表格的排序条件发生变化的时候会触发该事件 |{ column, prop, order }|
| filter-change  |当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 |filters|
| columns-drop |当表格列触发拖动的时候会触发该事件,返回一个新的排序的`columns`数组,排序属性`sort`。 |  [{prop:'index',sort:1,type:"index",width: 60}] 当前只是展示范例数组中其中一个数据某些重要字段，实际返回，以传入的数据为准。|
| rows-drop |当表格行触发拖动的时候会触发该事件,返回一个新的排序的表格数组,排序属性为`sort`。 |  [{id:'1',sort:1}] 当前只是展示范例数组中其中一个数据某些重要字段，实际返回，以传入的数据为准。|


###  Pagination Event
| 事件名称 | 说明 | 回调参数 | 
| ----| ----| --- | 
| current-change  |当前页切换 | 当前页 |
| size-change | 每页显示的条数切换  | 页面切换的条数 |
  

### Table Methods
| 事件名称 | 说明 | 回调参数 | 
| ----| ----| --- | 
| getElTableRef  | 当前方法可获取element-ui的Table组件的ref,可使用table组件的所有方法 | — |
| backPreviousPage | 删除最后一条数据并跳到上一个页面，防止删除后显示空数据 | — |
| reload | 重新刷新组件  | — |


###  Slot
| name                 | 说明                       |
| -------------------- | ---------------------------|
| —                    | Table 的内容                |
| empty                | Table 内容为空时的文本       |

### Scoped Slot
| name                 | 说明                       
| -------------------- | ---------------------------|
| prop                  |表格数据要渲染的key,表头数据的prop,动态的插槽名,参数为 {name,row,data} |
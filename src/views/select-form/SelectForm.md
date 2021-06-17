  # SelectForm 查询表单
   查询条件的集合体,灵活配置查询条件表单，支持自适应收缩/展开等其他自定义操作,常配合TablePagination组件使用。

  # 基础用法

  <template>
  <div>
    <Example/>
  </div>
</template>

<script>

import Example from './Example'
import SlotExample from './SlotExample'
export default {
  components: {
    Example,
    SlotExample
  }
}
</script>

# 演示代码

```html
<template>
  <div>
    <div>
      <eve-select-form
        :model="model"
        :data="data"
        @handle-submit="handleSubmit"
      >
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
            label: '统一社会信用代码：',
            prop: 'name',
            type: 'input', 
            maxlength: 5, //输入长度的限制
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

      //表单双向绑定(prop)--点击查询按钮时获取值-重置验证时也要用到
      model: {
        name: '',
        department: '',
        status: [], //checkbox是多选的时候，声明时一定要写成数组形式，否则会出现选一个全部勾选情况。
        address: '',
        date: '',
        time: ''
      },
    }
  },

  methods: {
    handleSubmit (emit) {
      console.log(emit)
    },
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
```

 # 高级用法
`SelectForm` 提供了很多`slot`，以下就典型的选择几个`slot`做范例。
<template>
  <div>
    <SlotExample/>
  </div>
</template>

# 演示代码

```html
<template>
  <div>
    <div>
      <eve-select-form
        :rules="rules"
        :model="model"
        :data="data"
        @handle-submit="handleSubmit"
      >
        <template #level>
          <eve-drop-down-tree
            :data="treeData"
            :width="288"
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

      //规则
      rules: {
        name: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        date: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
      }
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
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| data  | 表单数据,数据格式、配置详见下表 | array | — | [] | 
| model | 表单双向绑定(prop 点击查询按钮时获取值,重置验证时也要用到 | object | — | {} | 
| rules | 规则验证 |  array | — | [] |
| form-width |  所有右边表单的宽度 |  number | — | 260 |
| label-width |  所有左边label的宽度 |  number | — | 140 |
| filter-param |  当参数为空时是否过滤参数 |  boolean | — | true |
| adaptive-expand |  是否开启自适应收缩展开 |  boolean | — | true |
| left-form-width |  左边表单的宽度,一般减去左边菜单栏的宽度，布局组件的间距 |  number | — | — |
| right-button-width | 右边查询、重置等按钮的宽度；有用right-button-data属性、插槽、样式等方式覆盖了右边查询等按钮，这个宽度就需要手动设置,且需加上按钮离最右边body的偏移量 |  number | — | 230 |
| right-button-data | 右边按钮的数组--当前数组会覆盖默认的按钮,个性化需求用，详细配置见下表| array | — | [] |
| margin-top |右边查询等按钮距离顶部的距离，用于当checkbox和radio有换行的情况下使用| number, string | — | — |

> `SelectForm`组件的`adaptiveExpand`(自适应收缩)会因为 `left-form-width`、`right-button-width`、`right-button-data`、`form-width` 、`label-width` 5个属性值以及插槽所影响，其中`left-form-width`、`right-button-width`属性影响较大，这两个值还会受到插槽和`right-button-data`属性影响，如果默认值无法满足自适应收缩功能，请手动设置这两个值，且务必设置精确。

### Data Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| label  | 表单左边的文本 | string | — | — | 
| prop  |  表单的key值,用来规则校验的,和model、rules里key值保持同步 | string | — | — | 
| type  |  表单类型  | string | input、select、date、time、radio、checkbox | — | 
| pickerType  | type是date类型表单的显示类型  | string | 	year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange | date | 
| placeholder  |  提供可描述输入字段预期值的提示信息（hint）  | string | 	 —  |  —  | 
| valueFormat  | 可选，绑定值的格式。不指定则绑定值为 Date/time 对象  | string | 见日期格式| yyyy-MM-dd   | 
| format  |  可选，显示在输入框中的格式  | string | 见日期格式 | yyyy-MM-dd | 
| pickerOptions  | 当前时间日期选择器特有的选项参考下表  | object | — |  {}  | 
| formWidth  | 表单的宽度  | number | — |   没写默认是跟着全局属性formWidth  | 
| labelWidth  | 表单左边的文本的宽度  | number | — | 没写默认是跟着全局属性labelWidth| 
| maxlength  | input类型的表单的原生属性，最大输入长度  | number | — | 32 | 

### right-button-data
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| value  | 按钮文本 | string | — | — | 
| buttonClassName |按钮的样式名称| string | — | —|
| iconClassName |按钮的icon名称| string | — | —|  
| valueClassName |按钮文本的样式| string | — | —| 
| type |按钮的类型| string| search(查询)、 reset(重置)、pack-up(展开或收起)， 不添加当前属性，默认就是普通的按钮 | — | 

###  日期格式
> 使用format指定输入框的格式；使用value-format指定绑定值的格式。

| 格式   | 含义 | 备注  | 举例 | 
| -----  | ------ | ----- | ----- | - |
| yyyy  | 年 |  — | — | 
| M  | 月 |  不补0 | 1 | 
| MM | 月 |   | 	01 | 
| W | 周 | 仅周选择器的 format 可用；不补0  | 	1 |
| WW | 周 | 仅周选择器的 format 可用 | 	01 | 
| d | 日 | 不补0 | 	2 | 
| dd | 日 | 不补0 | 	02 |
| H | 小时 | 	24小时制；不补0  | 	3 |
| HH | 小时 | 	24小时制；不补0  | 	03 |
| h | 小时 | 	12小时制，须和 A 或 a 使用；不补0  | 	3 |
| hh | 小时 | 	12小时制，须和 A 或 a 使用  | 03 |
| m | 分钟 | 	不补0  | 4 | 
| mm | 分钟 | 	  | 04 | 
| s | 秒 | 不补0	  | 5 | 
| ss | 秒 |  	  | 05 | 
| A | AM/PM |  	仅 format 可用，大写  | AM | 
| a | am/pm |  	仅 format 可用，小写  | am | 
| timestamp | JS时间戳 |  仅 value-format 可用；组件绑定值为number类型  | 1483326245000 | 
| [MM] | 不需要格式化字符 |  使用方括号标识不需要格式化的字符 (如 [A] [MM])  | MM | 

### Events
| 事件名称              | 说明                        | 回调参数 |
| --------------------- | -------------------------  | -------- |
| handle-submit | 查询按钮的回调函数 | 双向绑定{} |
| pack-up      |  展开或收起  |    isHidden |
| right-button-event | 右边按钮事件 | 当前点击按钮的值，如{index:1,value:'重置'} |

### Slot
| name                 | 说明                          |
| -------------------- | ---------------------------- |
| prop                 | 此值是动态的,是data属性中的prop值,可单独覆盖拥有这个prop值的表单|
| input                | 所有input类型表单后追加内容,如果加上动态属性prop，格式为input-prop,表示当前prop值的input类型表单后追加内容   |
| date-picker          | 所有日期类型表单后追加内容 , 如果加上动态属性prop，格式为date-picker-prop,表示当前prop值的input类型表单后追加内容   |
| time-picker          | 所有时间类型表单后追加内容 ，如果加上动态属性prop，格式为time-picker-prop,表示当前prop值的input类型表单后追加内容  |
| select               | 所有下拉菜单类型表单后追加内容，如果加上动态属性prop，格式为select-prop,表示当前prop值的input类型表单后追加内容  |
| radio                | 所有单选类型表单后追加内容，如果加上动态属性prop，格式为radio-prop,表示当前prop值的input类型表单后追加内容      |
| checkbox             | 所有多选类型表单后追加内容 ，如果加上动态属性prop，格式为checkbox-prop,表示当前prop值的input类型表单后追加内容     |
| right-button         | 右边查询、重置等按钮内容覆盖    |

> 使用slot在表单后追加内容有可能会导致表单的自适应收缩、展开功能出现问题,原因是追加内容后变相增加了宽度,使得自适应算法不够精确,可使用css样式position:absolute 让其脱离文档流。

# DropDownTree 下拉树

下拉选择树，用清晰的层级结构展示信息，用下拉菜单来选择信息,并提供了搜索功能

# 基础用法
单选(可搜索)
<template>
  <div>
    <Example/>
  </div>
</template>

<script>

import Example from './Example'
import MultipleExample from './MultipleExample'
import LeftExample from './LeftExample'
import ConverExample from './ConverExample'

export default {
  components: {
    Example,
    MultipleExample,
    LeftExample,
    ConverExample
  }
}
</script>

# 演示代码

``` html
<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="250"
      v-model="value"
      @node-click="nodeClick"
    ></eve-drop-down-tree>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: [
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
```

多选(可搜索)
<template>
  <div>
    <MultipleExample/>
  </div>
</template>

# 演示代码

```html
<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="250"
      v-model="values"
      column-collapse-tags
      multiple
      @check="check"
      @clear="clear"
    >
    </eve-drop-down-tree>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: [
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
      //双向绑定的值
      values: []
    }
  },
  methods: {
    /**@description 当复选框被点击的时候触发
       * @param  {Object}  data  //传递给 data 属性的数组中该节点所对应的对象(当前点击)
       * @param  {Object}  checked //树目前的选中状态对象，包含 checkedNodes、checkedKeys、
       * halfCheckedNodes、halfCheckedKeys 四个属性
      * @author yx
     */
    check (data, checked) {
      console.log(data, checked, 'check')
    },
    clear () {
      console.log('clear')
    }
  }
}
</script>
```

# 只选中叶子节点
only-leaf属性设置为true，会使得除了最底层的节点(叶子节点)可以被选中，其他节点(有三角符号,可展开收缩的节点)无法选中。
<template>
  <div>
    <LeftExample/>
  </div>
</template>

# 演示代码

```html
<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="250"
      v-model="value"
      only-leaf
      @node-click="nodeClick"
    ></eve-drop-down-tree>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: [
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
```

# 普通数据转树

<template>
  <div>
    <ConverExample/>
  </div>
</template>

# 演示代码
```html

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
```

> 当前组件扩展了所有`element-ui的Tree组件`的事件和属性,目前文档记录的只是常用的属性和事件,更多的属性和事件请参考`element-ui`官方文档。

###  Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| data  | 展示数据 | array | — | — |
| value / v-model  | 绑定值|  string / array | — | — |
| only-leaf  | 是否只选中和高亮叶子节点 | boolean | — | true |
| filterable |是否可搜索 | boolean | — |true |
| props  | 配置选项，具体看下表 | object | — |  {children: 'children', label: 'label'} |
| node-key  | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | string | — |  id |
| default-expand-all	  | 是否默认展开所有节点 | boolean | — |  false |
| multiple|  节点是否多选| boolean | — |  false |
| check-strictly|   在显示复选框的情况下，是否严格的遵循父子不互相关联的做法| boolean | — |  false |
| collapse-tags|   多选时是否将选中值按文字的形式展示(是否添加+number)--注意：这个属性设置true会覆盖columnCollapseTags属性| boolean | — |  false |
| column-collapse-tags |(推荐)多选时是否将选中值按文字的形式自适应展示(是否自适应添加+number),可展示多个页签,collapseTag非自适应展示,只展示一个页签后面就跟着一个number。| boolean | — |   false |
| width |select宽度| string/number,字符串类型必须加上单位%、px等，数字类型不需要添加单位默认px | — |  100% |
| height |option高度| string/number | — |   200 |
| accordion |是否每次只打开一个同级树节点| boolean | — |   false |
| auto-expand-parent |展开子节点的时候是否自动展开父节点| boolean | — |   true |
| convert-setting |树形结构数据转换设置,详细参数见下表| object | — |{ convert: false,id: 'id',  pid: 'pid', topmostPid: -1} |



### props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| label | 指定节点标签为节点对象的某个属性值 | string | — | label |
| children | 指定子树为节点对象的某个属性值 | string | — | children |


### convert-setting
`普通数据转树结构数据`必须设置的属性，当前值可以不用全部设置，内部有默认值，可只设置其中一个(要看数据格式是否和当前设置的默认值是否相匹配)。
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| convert |是否开启普通数据转换为树结构数据| boolean | — |  false |
| id |节点的唯一标识键值| string | — | id |
| pid |节点的父id键值| string | — | pid |
| topmostPid |最顶层数据的父id,当前值必须设置正确，否则可能转换不成功。| string,number | — | -1 |

> 注意: `topmostPid`属性值，其中`number`类型和`string`类型的数字是不相等的，比如`-1`和`'-1'`这两个值是不相等的。


###  Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| node-click | 节点被点击时的回调 |  共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 | 
| clear | 清空选择的数据 | — | 
| remove-tag |   多选模式下移除tag时触发 | 返回一个key值 | 


### Function
`DropDownTree` 内部使用了 `Node` 类型的对象来包装用户传入的数据，用来保存目前节点的状态。 `DropDownTree` 拥有如下方法：
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
|getElTreeRef|获取树组件ref,用来调用element-ui的tree组件的所有方法 | — |
| setCurrentKey| 设置当前选中(高亮)的节点，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null | 节点的key一般是id |
| setCheckedKeys| 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性  |(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false |
| getCheckedNodes|若节点可被选择，则返回目前被选中的节点所组成的数组, 通过node获取节点。| (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false|
| getCheckedKeys|若节点可被选择则返回目前被选中的节点的 key 所组成的数组,通过key获取节点| (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false|
| getHalfCheckedNodes|多选--若节点可被选择，则返回目前半选中的节点所组成的数组| —|
| getCurrentKey|获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null| —|
| getCurrentNode|单选--获取当前被选中节点的 data，若没有节点被选中则返回 null| —|
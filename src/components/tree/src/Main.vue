<!--
* @Author: yx
* @Description: 树的封装
* @Date: 2020-10-19
-->
<template>
  <div class="eve-tree" :style="{ width: checkString(width) }">
    <div class="eve-tree__filter" v-if="isShowFilter">
      <el-input :placeholder="placeholder" v-model="filterText" clearable>
      </el-input>
    </div>

    <el-scrollbar :style="{ height: scrollHeight + 'px' }" v-if="scroll">
      <el-tree
        ref="tree"
        class="eve-tree eve-tree__scroll"
        :style="{ width: scrollWidth + 'px' }"
        :class="[!onlyLeaf && 'eve-tree__is-active']"
        :props="props"
        :data="tempData"
        :load="load"
        :lazy="lazy"
        :node-key="nodeKey"
        :show-checkbox="showCheckbox"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        :default-expand-all="defaultExpandAll"
        :expand-on-click-node="expandOnClickNode"
        :filter-node-method="filterNodeMethods"
        :accordion="accordion"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :draggable="draggable"
        :highlight-current="highlightCurrent"
        v-bind="$attrs"
        v-on="new$listeners"
      >
        <div
          class="eve-tree__custom-tree-node"
          :class="[
            onlyLeaf ? 'eve-tree__custom-leaf-tree' : 'eve-tree__custom-tree',
          ]"
          slot-scope="{ node, data }"
        >
          <slot :node="node" :data="data">
            <section>
              <div class="eve-tree__custom-tree-node">
                <span
                  :class="[!showCheckbox && 'eve-tree__custom-tree-label']"
                  >{{ node.label }}</span
                >

                <div class="eve-tree__custom-tree-button" v-show="operate">
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click.stop="append(node, data)"
                    >
                      <el-icon
                        class="el-icon-circle-plus-outline"
                        :style="{ color: operateColor }"
                      ></el-icon>
                    </el-button>

                    <el-button
                      type="text"
                      size="mini"
                      @click.stop="edit(node, data)"
                    >
                      <el-icon
                        class="el-icon-edit"
                        :style="{ color: operateColor }"
                      ></el-icon>
                    </el-button>

                    <el-button
                      type="text"
                      size="mini"
                      @click.stop="remove(node, data)"
                    >
                      <el-icon
                        class="el-icon-remove-outline"
                        :style="{ color: operateColor }"
                      ></el-icon>
                    </el-button>
                  </span>
                </div>
              </div>
            </section>
          </slot>
        </div>
      </el-tree>
    </el-scrollbar>

    <el-tree
      v-else
      ref="tree"
      class="eve-tree"
      :class="[!onlyLeaf && 'eve-tree__is-active']"
      :props="props"
      :data="tempData"
      :load="load"
      :lazy="lazy"
      :node-key="nodeKey"
      :show-checkbox="showCheckbox"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :filter-node-method="filterNodeMethods"
      :accordion="accordion"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :draggable="draggable"
      :highlight-current="highlightCurrent"
      v-bind="$attrs"
      v-on="new$listeners"
    >
      <div
        class="eve-tree__custom-tree-node"
        :class="[
          onlyLeaf ? 'eve-tree__custom-leaf-tree' : 'eve-tree__custom-tree',
        ]"
        slot-scope="{ node, data }"
      >
        <slot :node="node" :data="data">
          <section>
            <div class="eve-tree__custom-tree-node">
              <span :class="[!showCheckbox && 'eve-tree__custom-tree-label']">{{
                node.label
              }}</span>

              <div class="eve-tree__custom-tree-button" v-show="operate">
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="append(node, data)"
                  >
                    <el-icon
                      class="el-icon-circle-plus-outline"
                      :style="{ color: operateColor }"
                    ></el-icon>
                  </el-button>

                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="edit(node, data)"
                  >
                    <el-icon
                      class="el-icon-edit"
                      :style="{ color: operateColor }"
                    ></el-icon>
                  </el-button>

                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="remove(node, data)"
                  >
                    <el-icon
                      class="el-icon-remove-outline"
                      :style="{ color: operateColor }"
                    ></el-icon>
                  </el-button>
                </span>
              </div>
            </div>
          </section>
        </slot>
      </div>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'EveTree',
  inheritAttrs: false,
  props: {
    // 展示数据
    data: {
      type: Array,
      default: () => [],
    },
    //配置选项
    props: {
      type: Object,
      default: () => ({
        label: 'label', //指定节点标签为节点对象的某个属性值--可自定义
        children: 'children', //指定子树为节点对象的某个属性值--可自定义
        isLeaf: 'leaf' //指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效，叶子节点不能再有子节点了
      })
    },

    //节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: false
    },

    //是否懒加载子节点，需与load方法结合使用 --当同时有data和lazy的情况下，lazy优先级更高，会覆盖data的配置
    lazy: {
      type: Boolean,
      default: false
    },

    //加载子树数据的方法，仅当 lazy 属性为true 时生效
    load: {
      type: Function,
      default: (node, resolve) => {
        console.log(node)
        let count = 1
        //第一级别要展示的数据 label对应props中的label
        if (node.level === 0) {
          return resolve([{ id: 1, label: 'region1' }, { id: 2, label: 'region2' }])
        }
        //懒加载最大级别，此处max=3,当达到最大值就没有懒加载的节点了，没有这个判断就没有限制
        if (node.level > 3) return resolve([])

        //是否有孩子
        let hasChild

        //只是个例子--判定是否有孩子
        if (node.data.label === 'region1') {
          hasChild = true
        } else if (node.data.label === 'region2') {
          hasChild = false
        } else {
          hasChild = Math.random() > 0.5
        }

        //懒加载的数据
        setTimeout(() => {
          let data
          //如果有孩子就返回数据
          if (hasChild) {
            data = [
              {
                id: 3 + count++,
                label: 'children' + count++,
                leaf: true, //指定某个孩子是否为叶子节点，
                disabled: true
              },
              {
                id: 3 + count++,
                label: 'children' + count++
              }]
          } else {
            data = []
          }
          resolve(data)
        }, 500)
      }
    },
    //每个树节点用来作为唯一标识的属性，整棵树应该是唯一的(一般是id) ,设置默认展开和默认选中的节点必须设置
    nodeKey: {
      type: String,
      default: 'id'
    },
    //默认展开的节点的key的数组--要设置nodeKey
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    //默认勾选的节点的key的数组--要设置nodeKey
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },

    //是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },

    //是否在点击节点的时候展开或者收缩节点， 默认值为 false，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    expandOnClickNode: {
      type: Boolean,
      default: false
    },

    //是否每次只打开一个同级树节点展开
    accordion: {
      type: Boolean,
      default: false
    },

    //是否可以拖拽
    draggable: {
      type: Boolean,
      default: false
    },

    // 拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
    allowDrop: {
      type: Function,
      default: (draggingNode, dropNode, type) => {
        // if (dropNode.data.label === '二级 2-2') {
        //   console.log(2, type)
        //   return false
        // } else {
        //   return true
        // }
        return true
      }
    },
    //判断节点能否被拖拽
    allowDrag: {
      type: Function,
      default: (draggingNode) => {
        // return draggingNode.data.label.indexOf('二级 2-2') === -1 --节点2-2就不能被放置
        return true
      }
    },
    //是否高亮当前选中节点
    highlightCurrent: {
      type: Boolean,
      default: true
    },

    //对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    filterNodeMethod: {
      type: Function,
      default: (value, data, node, props) => {
        const { label } = props || {}
        if (!value) return true
        return data[label].indexOf(value) !== -1
      }
    },

    /*自定义属性 */
    //整体的宽度(包括搜索框的)，固定宽度有横向滚动条，100%可向外自动扩伸(不出现横向滚动条)
    width: {
      type: [String, Number],
      default: '100%'
    },
    //是否只选中、高亮、编辑叶子节点(最底层的节点)
    onlyLeaf: {
      type: Boolean,
      default: () => false
    },
    //是否显示 添加、删除、编辑等按钮
    operate: {
      type: Boolean,
      default: () => true
    },

    //设置添加、删除、编辑等按钮的颜色
    operateColor: {
      type: String,
      default: () => ''
    },

    //是否开启节点过滤
    isShowFilter: {
      type: Boolean,
      default: () => true
    },

    //树形结构数据转换设置
    convertSetting: {
      type: Object,
      default: () => { }
    },

    //搜索输入框占位文本
    placeholder: {
      type: String,
      default: () => '输入关键字进行过滤'
    },

    //是否开启滚动
    scroll: {
      type: Boolean,
      default: false
    },

    //开启滚动后树的默认的高度(不包含搜索框的)
    scrollHeight: {
      type: [String, Number],
      default: 200
    },

    //开启滚动后树的默认的宽度(不包含搜索框的)
    scrollWidth: {
      type: [String, Number],
      default: ''
    },

    //在onlyLeaf状态下点击非叶子节点时,是否返回参数
    returnParam: {
      type: Boolean,
      default: false
    }
  },

  mounted () { },
  data () {
    return {
      filterText: '', //关键字过滤文本
      id: '', //被选中节点的id或者唯一值
      tempData: [], //树的数据(内部处理逻辑用)
      tempConvertSetting: //树形结构数据转换设置(内部处理逻辑用)
      {
        id: 'id', //节点的唯一标识键值
        pid: 'pid', //节点的父id键值
        topmostPid: -1, //最顶层数据的pid,当前值必须设置正确，否则可能转换不成功。
        convert: false //是否开启普通数据转换为树结构数据
      }
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
      // if (this.showCheckbox) return
      this.setCurrentKey(this.id) //onlyLeaf为true时,在点击父亲爷爷的时候也只高亮叶子节点，
      // 是否只选叶子节点，且当前节点是父节点
      if (this.onlyLeaf && data[this.props.children] && data[this.props.children].length > 0) {
        this.returnParam && this.$emit('node-click', data, node, indeterminate)
        return
      }
      this.id = data[this.nodeKey]
      this.label = data[this.props.label]
      this.tempValue = data[this.nodeKey]
      this.setCurrentKey(this.id)
      this.$emit('node-click', data, node, indeterminate)
    },

    /**@description  通过node获取节点
     * @author yx
     */
    getCheckedNodes (leafOnly = false, includeHalfChecked = false) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    /**@description  通过key获取节点
     * @param  {Boolean}  leafOnly 是否仅返回被选中的叶子节点的 keys
     * @author yx
     *
     */
    getCheckedKeys (leafOnly = false) {
      return this.$refs.tree.getCheckedKeys(leafOnly)
    },

    /**@description  通过node设置节点
     * @param  {Array}  nodes 勾选节点数据的数组
     * @author yx
     */
    setCheckedNodes (nodes = []) {
      this.$refs.tree.setCheckedNodes(nodes)
    },

    /**@description  通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
      * @param  {Array}  keys  勾选节点的 key 的数组
      * @param  {Boolean }  leafOnly 是否仅设置叶子节点的选中状态
      * @author yx
    */
    setCheckedKeys (keys = [], leafOnly = false) {
      this.$refs.tree.setCheckedKeys(keys, leafOnly)
    },


    /**@description  对树节点进行筛选操作
     * @author yx
     * @param  {String}  val 接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数
     */
    filter (val) {
      this.$refs.tree.filter(val)
    },

    /**@description  对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏--根据节点名称
     * @author yx
     * @param  {String}  value 当前查找的值
     * @param  {Object}  data 传递给 data 属性的数组中该节点所对应的对象
     * @param  {Object}  node 节点对应的Node
     */
    filterNodeMethods (value, data, node) {
      return this.filterNodeMethod(value, data, node, this.props)
    },


    /**@description  设置当前选中(高亮)的节点
     * @author yx
     * @param  {mixins}  key //节点的key一般是id
     */
    setCurrentKey (key) {
      this.$refs.tree ? this.$refs.tree.setCurrentKey(key) : this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(key)
      })
    },

    /*自定义的方法 */

    /**@description 判断是否是字符串
    * @author yx
    * @param  {String}  str 高度、宽度、left等类型的值
    */
    checkString (str) {
      return typeof str === 'string' ? str : `${str}px`
    },

    /**@description 点击添加节点图标
        * @author yx
        * @param  {Object}  node 当前节点的 Node 对象
        * @param  {Object}  data 当前节点的数据
      */
    append (node, data) {
      // this.addNode(data)
      this.$emit('append', { node: node, data: data })
    },

    /**@description  删除节点图标
     * @author yx
     * @param  {Object}  node 当前节点的 Node 对象
     * @param  {Object}  data 当前节点的数据
     */
    remove (node, data) {
      this.$confirm('确定要删除该节点吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(item => item.id === data.id)
        children.splice(index, 1)
        this.$emit('remove', { node: node, data: data })
      }).catch(error => { console.log(error) })
    },

    /**@description  修改节点图标
      * @author yx
      * @param  {Object}  node 当前节点的 Node 对象
      * @param  {Object}  data 当前节点的数据
      */
    edit (node, data) {
      this.$emit('edit', { node: node, data: data })
    },

    /**@description 添加节点数据--外部添加节点数据(默认添加孩子节点数据)
       * @author yx
       * @param  {Object}  data 当前节点的数据
       * @param  {Object}  newChild 新的节点数据 格式 {label:'',children:''}
    */
    addNode (data, newChild = '') {
      /*
          label: 指定节点标签为节点对象的某个属性值
          children: 指定子树为节点对象的某个属性值
      */
      const { label, children } = this.props || {}
      newChild = newChild || { [label]: '新增的节点', [children]: [] }
      //初始化孩子数组，防止没有孩子数组无法新增节点
      !data[children] && this.$set(data, [children], [])
      data[children].push(newChild)
    },

    /**@description 清空节点
    * @author yx
   */
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
      // this.$refs.tree.setCheckedNodes([])
    },

    /**@description 普通数据根据pid转树数据
     *  @param  {Array}  data 要转换的数据
     *  @param  {minix}  parentId 父id --最顶层数据的父id，有可能是空、0、-1根据后台数据格式决定,默认是-1,注意:相同值，数字的number和字符串的number不相等
     * @author yx
     */
    convertToTree (data, parentId = this.tempConvertSetting.topmostPid) {
      const itemArr = []
      const length = data.length
      const { children } = this.props
      const { pid, id } = this.tempConvertSetting
      for (let i = 0; i < length; i++) {
        const node = data[i]
        if (node[pid] === parentId) {
          const childrenData = this.convertToTree(data, node[id])
          if (childrenData.length > 0) {
            node[children] = childrenData
          }
          itemArr.push(node)
        }
      }
      return itemArr
    },

    /**@description 获取树组件ref来调用element-ui的tree组件的所有方法
   * @author yx
   */
    getElTreeRef () {
      return this.$refs.tree
    },


    /**@description 清空过滤的文本
         * @author yx
    */
    clearFilterText () {
      this.filterText = ''
    }


  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    convertSetting: {
      handler (newValue) {
        Object.assign(this.tempConvertSetting, newValue)
      },
      immediate: true
    },
    //当前监听内部有用到convertSetting，所以必须让data在convertSetting的后面监听
    data: {
      handler (newValue) {
        const { convert } = this.tempConvertSetting
        if (convert) {
          this.tempData = this.convertToTree(newValue)
          this.$emit('update:data', this.tempData)
        } else {
          this.tempData = newValue
          this.$emit('update:data', this.tempData)
        }
      },
      immediate: true
    },
  },

  computed: {
    new$listeners () {
      return Object.assign(
        {},
        this.$listeners,
        {
          'node-click': this.nodeClick
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-circle-plus-outline:before {
  font-size: 16px;
}
.el-icon-remove-outline:before {
  font-size: 16px;
}
.el-icon-edit:before {
  font-size: 16px;
}
::v-deep .el-tree-node__content:hover {
  cursor: default;
  // background: transparent;
}
</style>

<style lang="scss">
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './tree.scss';
</style>

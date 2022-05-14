<!--
* @Author: yx
* @Description: 下拉选择树
* @Date: 2020-11-19
-->
<template>
  <div class="eve-drop-down-tree">
    <el-select
      v-model="tempValue"
      placeholder="请选择"
      :style="{ width: `${checkString(width)}` }"
      :clearable="clearable"
      :disabled="disabled"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      ref="eveDropDownTreeSelect"
      @clear="clear"
      @visible-change="visibleChange"
      @remove-tag="removeTag"
      :class="[
        `eve-drop-down-tree__select${random}`,
        columnCollapseTags && 'eve-drop-down-tree__column-collapse-tags',
      ]"
      :filterable="filterable"
      :filter-method="filterMethod"
    >
      <el-option
        value="必须写的属性不然报错"
        disabled
        class="eve-drop-down-tree__option"
        :style="{ width: checkString(width), height: checkString(height) }"
      >
        <el-scrollbar style="width: 100%; height: 100%">
          <section class="eve-drop-down-tree__content">
            <el-tree
              :data="tempData"
              :props="tempProps"
              class="eve-drop-down-tree__item"
              :class="[
                !onlyLeaf && 'eve-drop-down-tree__is-active',
                multiple && 'eve-drop-down-tree__multiple',
              ]"
              :node-key="nodeKey"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expand-all="defaultExpandAll"
              :filter-node-method="filterNodeMethod"
              :show-checkbox="showCheckbox"
              :check-strictly="checkStrictly"
              :accordion="accordion"
              :current-node-key="currentNodeKey"
              :auto-expand-parent="autoExpandParent"
              ref="tree"
              v-bind="$attrs"
              v-on="new$listeners"
            ></el-tree>
          </section>
        </el-scrollbar>
      </el-option>
      <!-- 隐藏域 让多选显示名称-->
      <div v-show="false">
        <el-option
          v-for="(item, index) in option"
          :key="index"
          :value="item ? item[nodeKey] : ''"
          :label="item ? item[tempProps.label] : ''"
        >
        </el-option>
      </div>
    </el-select>
    <div
      class="eve-drop-down-tree__number"
      v-show="number"
      :style="{ left: `${numberLeft}px`, marginLeft: `${spacing}px` }"
    >
      {{ `+${this.number}` }}
    </div>
  </div>
</template>
<script>

export default {
  name: 'EveDropDownTree',
  inheritAttrs: false,
  //双向绑定
  model: {
    prop: 'value', //要存在于props
    event: 'change' //当组件的值发生改变时要emit的事件名
  },
  props: {
    //树的数据
    data: {
      type: Array,
      default: () => []
    },

    //绑定的值
    value: {
      default: () => ''
    },

    //是否只选中和高亮叶子节点
    onlyLeaf: {
      type: Boolean,
      default: () => false
    },

    //配置选项
    props: {
      type: Object,
      default: () => { }
    },

    //每个树节点用来作为唯一标识的属性，整棵树应该是唯一的(下拉菜单真实值的key)
    nodeKey: {
      type: String,
      default: () => 'id'
    },

    //是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: () => false
    },

    //节点是否多选
    multiple: {
      type: Boolean,
      default: () => false
    },

    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: () => false
    },

    //多选时是否将选中值按文字的形式展示(是否添加+number)--注意：这个属性设置true会覆盖columnCollapseTags属性
    collapseTags: {
      type: Boolean,
      default: () => false
    },

    //select宽度
    width: {
      type: [String, Number],
      default: () => '100%'
    },

    //option高度
    height: {
      type: [String, Number],
      default: () => 200
    },

    //是否每次只打开一个同级树节点
    accordion: {
      type: Boolean,
      default: () => false
    },

    //展开子节点的时候是否自动展开父节点
    autoExpandParent: {
      type: Boolean,
      default: () => true
    },

    //(推荐)多选时是否将选中值按文字的形式自适应展示(是否自适应添加+number),collapseTag非自适应展示,只展示一个页签后面就跟着一个number
    columnCollapseTags: {
      type: Boolean,
      default: () => false
    },

    //是否可搜索
    filterable: {
      type: Boolean,
      default: () => true
    },

    //树形结构数据转换设置
    convertSetting: {
      type: Object,
      default: () => { }
    },

    //选中的lable和key组合的数组,用来回填用，懒加载必写
    option: {
      type: Array,
      default: () => []
    },

    //是否禁用
    disabled: {
      type: Boolean,
      default: () => false
    },

    clearable: {
      type: Boolean,
      default: () => true
    }
  },

  data () {
    return {
      id: '', //被选中节点的id或者唯一值
      tempValue: this.multiple ? [] : '', //组件内部v-model绑定的值
      showCheckbox: this.multiple, //节点是否可被选择--多选默认可选择
      tagsHeight: '', // 页签列表的高度
      tagsWidth: '', //页签列表的宽度--只修改一次
      number: '', //未在select中显示的tags转换成个数
      numberLeft: '', //数字的偏移量
      spacing: 6, //相邻两个页签的间距
      random: this.getGenerateMixed(32), //随机数防止页面调用多个当前组件样式冲突
      tempData: [], //树的数据(内部处理逻辑用)
      tempConvertSetting: //树形结构数据转换设置(内部处理逻辑用)
      {
        id: 'id', //节点的唯一标识键值
        pid: 'pid', //节点的父id键值
        topmostPid: -1, //最顶层数据的pid,当前值必须设置正确，否则可能转换不成功。
        convert: false //是否开启普通数据转换为树结构数据
      },
      currentNodeKey: '', //当前选中节点
      tempProps: {
        children: 'children', // 指定子树为节点对象的某个属性值
        label: 'label', // 指定节点标签为节点对象的某个属性值(下拉菜单显示值的key)
        isLeaf: 'leaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效，叶子节点不能再有子节点了
      }
    }
  },
  mounted () { },
  methods: {
    /**@description  节点被点击时的回调
      * @author yx
      * @param  {Object}  data 递给 data 属性的数组中该节点所对应的对象
      * @param  {Object}  node 节点对应的 Node
      * @param  {Object}  indeterminate 节点组件本身
     */
    nodeClick (data, node, indeterminate) {
      if (this.multiple) return
      this.id && this.setCurrentKey(this.id) //onlyLeaf为true时,在点击父亲爷爷的时候也只高亮叶子节点
      if (this.onlyLeaf && data[this.tempProps.children]) return
      this.id = data[this.nodeKey]
      this.tempValue = data[this.nodeKey]
      this.setCurrentKey(this.id)
      this.$refs.eveDropDownTreeSelect.blur() //自动收缩
      //回填
      this.option.forEach((item, index) => {
        this.option.splice(index, 1)
      })
      this.option.push({
        [this.tempProps.label]: data[this.tempProps.label],
        [this.nodeKey]: data[this.nodeKey]
      })
      this.$emit('node-click', data, node, indeterminate)
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

    /**@description 设置选中值 
     * @author yx
     * @param  {Array}  keys //节点的key数组一般是id数组
     * @param  {Boolean}  leafOnly //是否仅设置叶子节点的选中状态
     */
    setCheckedKeys (keys, leafOnly = false) {
      this.$refs.tree ? this.$refs.tree.setCheckedKeys(keys, leafOnly) : this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys, leafOnly)
      })
    },

    /**@description  清空选择的数据
      * @author yx
      */
    clear () {
      this.tempValue = '' //清空真实值
      this.id = null
      this.option.splice(0, this.option.length) //清空全部option的值
      this.setCurrentKey(null)
      this.setCheckedKeys([])
      this.$emit('clear')
    },

    /** @description  下拉框出现/隐藏时触发
      * @param  {boolean}  flag // 回调参数 出现则为true，隐藏则为 false
      * @author yx
      */
    visibleChange (flag) {
      this.filterMethod('')
      this.$emit('visible-change', flag)
    },

    /** @description  多选模式下移除tag时触发
      * @author yx
    */
    removeTag (key) {
      this.tempValue.slice(key, 1)
      this.setCheckedKeys(this.tempValue)
      this.option.forEach((item, index) => {
        if (item[this.nodeKey] === key) {
          this.option.splice(index, 1)
        }
      })
      this.$emit('remove-tag', key)
    },

    /**@description 节点过滤
     * @param  {String}  value //过滤的值
     * @param  {Object}  data //节点的值
     * @author yx
    */
    filterNodeMethod (value, data) {
      if (!value) return true
      return data[this.tempProps.label].indexOf(value) !== -1
    },

    /**@description 当复选框被点击的时候触发
       * @param  {Object}  data  //传递给 data 属性的数组中该节点所对应的对象(当前点击)
       * @param  {Object}  checked //树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
      * @author yx
     */
    check (data, checked) {
      this.option.splice(0, this.option.length)
      this.setOption(this.getCheckedNodes(this.onlyLeaf), data)
      this.tempValue = []
      this.option.forEach(item => {
        this.tempValue.push(item[this.nodeKey])
      })
      this.$emit('check', data, checked)
    },

    // 设置option
    setOption (checkedNodes = [], current = '') {
      // 点击复选框是否勾选了节点，未勾选删除
      if (current !== '') {
        let notCheck = true
        checkedNodes.forEach(element => {
          if (element[this.nodeKey] === current[this.nodeKey]) {
            notCheck = false
          }
        })
        notCheck && this.option.forEach((itme, index) => {
          if (itme[this.nodeKey] === current[this.nodeKey]) {
            this.option.splice(index, 1)
          }
        })
      }

      const obj = {}
      this.option.forEach(item => {
        obj[item[this.nodeKey]] = item[this.nodeKey]
      })


      checkedNodes.forEach(element => {
        if (!obj[element[this.nodeKey]]) {
          this.option.push({
            [this.tempProps.label]: element[this.tempProps.label],
            [this.nodeKey]: element[this.nodeKey]
          })
        }
      })
    },


    /**@description 多选--若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组
      * @author yx
      * @param  {Boolean}  leafOnly 是否只是叶子节点
      * @param  {Boolean}  includeHalfChecked 是否包含半选节点
    */
    getCheckedNodes (leafOnly = false, includeHalfChecked = false) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    /**@description 多选--若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
     * @author yx
     * @param  {Boolean}  leafOnly 仅返回被选中的叶子节点的 keys
   */
    getCheckedKeys (leafOnly = false) {
      return this.$refs.tree.getCheckedKeys(leafOnly)
    },

    /**@description 多选--若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组
     * @author yx
    */
    getHalfCheckedNodes () {
      return this.$refs.tree.getHalfCheckedNodes()
    },

    /**@description 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
      * @author yx
     */
    getHalfCheckedKeys () {
      return this.$refs.tree.getHalfCheckedKeys()
    },

    /**@description 单选-- 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
      * @author yx
     */
    getCurrentKey () {
      return this.$refs.tree.getCurrentKey()
    },

    /**@description 单选--获取当前被选中节点的 data，若没有节点被选中则返回 null
      * @author yx
     */
    getCurrentNode () {
      return this.$refs.tree.getCurrentNode()
    },

    /*自定义方法 */

    /**@description 判断是否是字符串
   * @author yx
   * @param  {String}  str 高度、宽度、left等类型的值
   */
    checkString (str) {
      return typeof str === 'string' ? str : `${str}px`
    },
    /**@description  获取随机数
    * @author yx
    * @param  {Number}  num 位数
    */
    getGenerateMixed (num) {
      const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      let res = ''
      for (let i = 0; i < num; i++) {
        const id = Math.ceil(Math.random() * 35)
        res += chars[id]
      }
      return res
    },

    /**@description  自适应的number
     * @author yx
     */
    selfAdaption () {
      this.tagsHeight = this.tagsHeight || document.querySelector(`.eve-drop-down-tree__select${this.random} .el-select__tags`).offsetHeight
      this.tagsWidth = this.tagsWidth || document.querySelector(`.eve-drop-down-tree__select${this.random} .el-select__tags`).offsetWidth - 30
      let itemWidth = 0 //number 宽
      let num = 0
      this.number = 0
      const arr = []
      document.querySelector(`.eve-drop-down-tree__select${this.random} .el-select__tags`).style.height = this.tagsHeight + 'px'
      document.querySelector(`.eve-drop-down-tree__select${this.random} .el-select__tags`).style.maxWidth = this.tagsWidth + 'px'
      Array.from(document.querySelectorAll(`.eve-drop-down-tree__select${this.random} .el-tag`)).some(itme => {
        itemWidth += itme.offsetWidth + this.spacing
        arr.push(itme.offsetWidth + this.spacing)
        if (this.tagsWidth <= itemWidth) {
          this.number = this.tempValue.length - num
          arr.pop()
          this.numberLeft = arr.reduce((prev, curr) => {
            return prev + curr
          })
          // console.log(arr, this.numberLeft, this.tagsWidth, itemWidth, '11')
          return
        } else {
          num++
        }
      })
    },

    /**@description 普通数据根据pid转树数据
     *  @param  {Array}  data 要转换的数据
     *  @param  {minix}  parentId 父id --最顶层数据的父id，有可能是空、0、-1根据后台数据格式决定,默认是-1,注意:相同值，数字的number和字符串的number不相等
     * @author yx
     */
    convertToTree (data, parentId = this.tempConvertSetting.topmostPid) {
      const itemArr = []
      const length = data.length
      const { children } = this.tempProps
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

    /**@description 过滤查找
     * @param  {string}  val  当前select框的输入值
     * @author yx
     */
    filterMethod (val) {
      //清除左边两边的空格
      val = val.replace(/(^\s*)|(\s*$)/g, '')
      this.$refs.tree.filter(val)
    },


    /**@description 获取树组件ref来调用element-ui的tree组件的所有方法
     * @author yx
     */
    getElTreeRef () {
      return this.$refs.tree
    },

  },
  watch: {
    // v-model绑定的值(select)--父修改-子接收
    value: {
      handler (newValue) {
        //单选
        const radio = () => {
          newValue = newValue || null
          this.tempValue = newValue
          this.id = newValue
          this.$nextTick(async () => {
            this.setCurrentKey(newValue)
            //非懒加载的时候 --去掉第一次加载的null
            this.option.forEach((item, index) => {
              this.option.splice(index, 1)
            })

            if (this.option.length <= 0) {
              this.option.push(this.getCurrentNode())
            }
          })
          this.currentNodeKey = newValue //懒加载必须
        }
        //多选
        const checkbox = () => {
          newValue = newValue || []
          this.tempValue = newValue
          this.setCheckedKeys(this.tempValue)
          this.$nextTick(() => {
            this.setOption(this.getCheckedNodes(this.onlyLeaf))
            this.setCheckedKeys(this.tempValue)
          })
          setTimeout(() => { this.columnCollapseTags && this.selfAdaption() }, 200)
        }
        this.multiple ? checkbox() : radio()
      },
      immediate: true
    },

    props: {
      handler (newValue) {
        Object.assign(this.tempProps, newValue)
      },
      immediate: true
    },

    // v-model绑定的值(内部用)--子修改-父接收
    tempValue (newValue) {
      //获取值
      this.$emit('change', newValue)
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
          check: this.check,
          'node-click': this.nodeClick
        }
      )
    }
  },
}
</script>

<style lang='scss'>
@import 'eve-ui/src/assets/style/base.scss';
@import './drop-down-tree.scss';
</style>



<!--
* @Author: yx
* @Description:表格-分页组件
* @Date: 2020-09-24
-->
<template>
  <div
    class="eve-table-pagination"
    :class="[{ 'eve-table-pagination__line-height': lineFeed }]"
  >
    <el-table
      :class="[`eve-table-pagination${tableKey}`]"
      ref="eveTable"
      :key="`eveTable${tableKey}`"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :height="height"
      :max-height="maxHeight"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :header-row-class-name="headerRowClassName"
      :empty-text="emptyText"
      :row-key="rowKey"
      :tree-props="treeProps"
      :lazy="lazy"
      v-bind="$attrs"
      v-on="new$listeners"
    >
      <!--暂无数据 -->
      <template #empty>
        <slot name="empty">暂无数据</slot>
      </template>
      <slot>
        <!--表头 && 内容-->
        <template v-for="(item, index) in columnsData" style="width: 100%">
          <slot :name="item.prop" :row="item" :data="columnsData">
            <!-- 序号-->
            <el-table-column
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :key="`eve-table-pagination${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align"
              :header-align="item.headerAlign"
              :render-header="item.renderHeader"
              v-if="item.type === 'index'"
              :show-overflow-tooltip="
                item.showOverflowTooltip !== undefined
                  ? item.showOverflowTooltip
                  : true
              "
            >
              <template slot-scope="scope">
                <span> {{ indexMethod(scope.$index) }} </span>
              </template>
            </el-table-column>

            <!-- 全选 -->
            <el-table-column
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :key="`eve-table-pagination-check${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align"
              :header-align="item.headerAlign"
              :selectable="item.selectable"
              :render-header="item.renderHeader"
              v-else-if="item.type === 'selection'"
            >
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
              :label="item.label"
              :width="item.width ? item.width : item.minWidth ? 'auto' : 186"
              :min-width="item.minWidth"
              :key="`eve-table-pagination-operate${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align"
              :header-align="item.headerAlign"
              :render-header="item.renderHeader"
              v-else-if="item.type === 'operate'"
            >
              <template slot-scope="scope">
                <template v-if="!item.render">
                  <template
                    v-for="(element, index) in button"
                    class="eve-table-pagination__button"
                  >
                    <!-- 文本 -->
                    <span
                      v-if="element.type === 'text'"
                      :key="`eve-table-pagination-button${index}`"
                      class="eve-table-pagination__button-text"
                      @click.stop="
                        btnOperate({
                          index: index,
                          value: element.value,
                          data: scope.row,
                          curRowIndex: scope.$index,
                        })
                      "
                    >
                      {{ element.value }}
                    </span>

                    <!-- 按钮 -->
                    <el-button
                      v-else
                      :key="`eve-table-pagination-buttons${index}`"
                      :type="element.type ? element.type : 'primary'"
                      :plain="element.plain ? element.plain : false"
                      :round="element.round ? element.round : false"
                      :icon="element.icon"
                      @click.stop="
                        btnOperate({
                          index: index,
                          value: element.value,
                          data: scope.row,
                          curRowIndex: scope.$index,
                        })
                      "
                    >
                      {{ element.value }}</el-button
                    >
                  </template>
                </template>

                <template v-else>
                  <render
                    :item="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="index"
                    :cur-row-index="scope.$index"
                    :data="data"
                  ></render>
                </template>
              </template>
            </el-table-column>

            <!--内容-->
            <el-table-column
              :ref="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :key="`eve-table-pagination-content${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :sortable="item.sortable"
              :filters="item.filters"
              :filter-method="item.filterMethod"
              :align="item.align"
              :header-align="item.headerAlign"
              :render-header="item.renderHeader"
              :show-overflow-tooltip="
                item.showOverflowTooltip !== undefined
                  ? item.showOverflowTooltip
                  : true
              "
              v-else
            >
              <template slot-scope="scope">
                <template v-if="!item.render">
                  <span v-if="item.formatData"
                    >{{ item.formatData(scope.row[item.prop]) }}
                  </span>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
                <template v-else>
                  <render
                    :item="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="index"
                    :cur-row-index="scope.$index"
                    :data="data"
                  ></render>
                </template>
              </template>
            </el-table-column>
          </slot>
        </template>
      </slot>
    </el-table>
    <el-pagination
      background
      :layout="tempLayout"
      :total="total"
      :small="small"
      :page-size="pageSize"
      :current-page="tempCurrentPage"
      :page-sizes="pageSizes"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="sizeChange"
      @current-change="currentChange"
      v-if="isShowPagination"
      :style="{ marginTop: `${top}px`, float: align }"
    >
    </el-pagination>
    <div style="clear: both"></div>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import render from './render.js'
export default {
  name: 'EveTablePagination',
  inheritAttrs: false,
  props: {
    /* --------饿了么自带属性---------- */
    // 表格数据
    data: {
      type: Array,
      default: () => [
        // {
        //   id: 1,
        //   name: 'John Brown',
        //   age: 18,
        //   address: 'New York No. 1 Lake Park',
        //   date: '2016-10-03',
        //   children: [{
        //     id: 31,
        //     name: 'John Brown',
        //     age: 200,
        //     address: 'New York No. 1 Lake Park',
        //     date: '2016-10-03',
        //     children: [{
        //       id: 313333,
        //       name: 'John Brown',
        //       age: 200,
        //       address: 'New York No. 1 Lake Park',
        //       date: '2016-10-03',
        //       children: [{
        //         id: 3133333333,
        //         name: 'John Brown',
        //         age: 200,
        //         address: 'New York No. 1 Lake Park',
        //         date: '2016-10-03',
        //       }, {
        //         id: 2003344333,
        //         name: 'John Brown',
        //         age: 18,
        //         address: 'New York No. 1 Lake Park',
        //         date: '2016-10-03',
        //       }]
        //     }, {
        //       id: 2003344,
        //       name: 'John Brown',
        //       age: 18,
        //       address: 'New York No. 1 Lake Park',
        //       date: '2016-10-03',
        //     }]
        //   }, {
        //     id: 200,
        //     name: 'John Brown',
        //     age: 18,
        //     address: 'New York No. 1 Lake Park',
        //     date: '2016-10-03',
        //   }]
        // },
        // {
        //   id: 2,
        //   name: 'Jim Green',
        //   age: 24,
        //   address: 'London No. 1 Lake Park',
        //   date: '2016-10-01',
        // },
        // {
        //   id: 3,
        //   name: 'Joe Black',
        //   age: 30,
        //   address: 'Sydney No. 1 Lake Park',
        //   date: '2016-10-02'
        // },
        // {
        //   id: 4,
        //   name: 'Jon Snow',
        //   age: 26,
        //   address: 'Ottawa No. 2 Lake Park',
        //   date: '2016-10-04'
        // },
        // {
        //   id: 5,
        //   name: 'Jon Snow',
        //   age: 26,
        //   address: 'Ottawa No. 2 Lake Park',
        //   date: '2016-10-04'
        // },
        // {
        //   id: 6,
        //   name: 'Jon Snow',
        //   age: 26,
        //   address: 'Ottawa No. 2 Lake Park',
        //   date: '2016-10-04',
        //   children: [{
        //     id: 3133,
        //     name: 'John Brown',
        //     age: 200,
        //     address: 'New York No. 1 Lake Park',
        //     date: '2016-10-03',
        //   }, {
        //     id: 20033,
        //     name: 'John Brown',
        //     age: 18,
        //     address: 'New York No. 1 Lake Park',
        //     date: '2016-10-03',
        //   }]
        // },
        // {
        //   id: 7,
        //   name: 'Jon Snow',
        //   age: 26,
        //   address: 'Ottawa No. 2 Lake Park',
        //   date: '2016-10-04'
        // },
        // {
        //   id: 8,
        //   name: 'Jon Snow',
        //   age: 26,
        //   address: 'Ottawa No. 2 Lake Park',
        //   date: '2016-10-04'
        // },
      ]
    },

    // 通过设置属性 height 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用
    height: {
      type: [Number, String]
    },

    // 超过最大高度才显示滚动条
    maxHeight: {
      type: [Number, String]
    },

    // 是否为斑马纹 table
    stripe: {
      type: Boolean,
      default: () => false
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: () => true
    },

    // Table 的尺寸
    size: {
      type: String,
      default: () => 'medium'
    },

    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: () => true
    },

    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: () => true
    },

    // 选择单行数据时使用色块表示
    highlightCurrentRow: {
      type: Boolean,
      default: () => false
    },

    // 传递个方法修改样式 通过属性 row-class-name 可以给某一行指定一个样式。
    rowClassName: {
      type: [Function, String],
      default: ({ row, rowIndex }) => {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    },
    // 传递个方法修改样式 通过属性cell-class-name 可以给某一行的某一列指定一个样式。
    cellClassName: {
      type: [Function, String],
      default: ({ row, column, rowIndex, columnIndex }) => {
        // console.log(row, column, rowIndex, columnIndex)
        if (rowIndex === 4 && columnIndex === 2) {
          // return 'red'
        }
      }
    },
    // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    headerRowClassName: {
      type: [Function, String],
      default: ({ row, rowIndex }) => {
        // console.log(rowIndex)
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
      }
    },

    // 空数据时显示的文本内容，也可以通过 slot="empty" 设置
    emptyText: {
      type: String,
      default: () => '暂无数据'
    },

    // 行数据的 Key，用来优化 Table 的渲染--一般传主键值，在使用 reserve-selection 功能与显示树形数据时，该属性是必填的
    rowKey: {
      type: [String, Function],
      default: () => 'id'
    },

    //渲染嵌套数据(树)的配置选项,hasChildren用来懒加了
    treeProps: {
      type: Object,
      default: () => ({ children: 'children', hasChildren: 'hasChildren' })
    },

    // 是否懒加载子节点数据
    lazy: {
      type: Boolean,
      default: () => false
    },

    // 分页-布局属性
    layout: {
      type: String,
      default: () => ''
    },
    // 分页-总数
    total: {
      type: Number,
      default: () => 0
    },

    // 分页-在空间有限的情况下，可以使用简单的小型分页。
    small: {
      type: Boolean,
      default: () => false
    },

    // 分页-每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => [10, 15, 20, 25, 30, 40, 50, 100]
    },

    // 分页-每页显示条目个数，支持 .sync 修饰符
    pageSize: {
      type: Number,
      default: () => 10
    },

    // 分页-当前页数，支持.sync 修饰符
    currentPage: {
      type: Number,
      default: () => 1
    },

    // 分页-只有一页时是否隐藏
    hideOnSinglePage: {
      type: Boolean,
      default: () => false
    },

    /* ----------自定义属性----------- */
    // 后端返回的数据的id的key,默认是id
    id: {
      type: String,
      default: 'id'
    },

    /* 表格表头，通过给列 columns 设置字段;
    这个字段里值如果有index、selection、operate类型的值,
    会覆盖: isShowIndex、isShowSelection、isShowOperate的判断*/
    columns: {
      type: Array,
      default: () => [
        // {
        //   label: 'Name',
        //   prop: 'name'
        // },
        // {
        //   label: 'Age',
        //   prop: 'age',
        //   sortable: 'custom', // 接受一个Boolean，默认为false,如果需要后端排序，需将sortable设置为custom
        //   filters: [{ text: 18, value: 18 }, { text: 19, value: 19 }, { text: 20, value: 20 }]
        // },
        // {
        //   label: 'Address',
        //   prop: 'address',
        //   formatData: (data) => {
        //     // console.log(data, 11)
        //     return data + '我是被转换的数据'
        //   }
        // },
      ]
    },
    // 当用户Checkbox时触发的事件, 是否只返回id数组
    isOnlyGetIdArr: {
      type: Boolean,
      default: () => true
    },

    // 当用户点击按钮的时候触发的事件, 是否只返回id
    isOnlyGetId: {
      type: Boolean,
      default: () => false
    },

    // 按钮数组 type ：text是文本， 不设置或者primary(等其他参考element-ui的按钮类型)是按钮
    button: {
      type: Array,
      default: () => [
        {
          value: '查看'
          // type: 'primary',
          // plain: false,
          // round: false,
          // icon: ''
        },
        {
          value: '新增'
          // type: 'primary',
          // plain: false,
          // round: false,
          // icon: ''
        },
        {
          value: '修改'
          // type: 'primary',
          // plain: false,
          // round: false,
          // icon: ''
        },
        {
          value: '删除'
          // type: 'primary',
          // plain: false,
          // round: false,
          // icon: ''
        }
      ]
    },

    // 删除弹出框设置
    deleteMessageBox: {
      type: Object,
      default: () => { }
    },

    // 是否显示默认的序号
    isShowIndex: {
      type: Boolean,
      default: true
    },

    // 是否显示默认多选框/选择框(checkbox)
    isShowSelection: {
      type: Boolean,
      default: false
    },

    // 是否显示默认的操作(增删改查等按钮)
    isShowOperate: {
      type: Boolean,
      default: true
    },

    //代表数据在第n层，当传进来的数据是树结构时，并开启了表格数据转换时要配置的一个属性，默认是zIndex
    zIndex: {
      type: String,
      default: 'zIndex'
    },

    //是否开启表格数据转换，主要用于树结构数据添加zIndex时用
    isFormatData: {
      type: Boolean,
      default: false
    },

    //列是否可以拖拽
    columnsDrop: {
      type: Boolean,
      default: false
    },

    //行是否可以拖拽
    rowsDrop: {
      type: Boolean,
      default: false
    },

    //是否可以换行
    lineFeed: {
      type: Boolean,
      default: false
    },

    // 分页-是否显示分页
    isShowPagination: {
      type: Boolean,
      default: true
    },

    // 分页-分页距离表格的距离
    top: {
      type: Number,
      default: 10
    },

    // 分页-分页的位置，center/居中、left/居左、right/居右
    align: {
      type: String,
      default: 'right'
    },

    // 分页-前往的文本
    jumpText: {
      type: String,
      default: ''
    },

    //是否显示总页数
    isShowPageCount: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      tableKey: `${this.getGenerateMixed(20)}`, //防止多个表格key值重复造成错误
      key: 0,
      tempDeleteMessageBox: {
        show: false,
        // 删除的内容文本
        message: '此操作将永久删除该条记录, 是否继续?',
        // 删除的标题文本
        title: '提示',
        // 删除提示框的确定
        confirmButtonText: '确定',
        // 删除提示框的取消
        cancelButtonText: '取消',
        // 删除弹出框的条件
        text: '删除',
        // 是否显示删除取消的提示
        isCanclePrompt: true,
        //  是否显示右上角关闭按钮
        showClose: true,
        //  是否可通过点击遮罩关闭 MessageBox
        closeOnClickModal: false,
        // 是否可通过按下 ESC 键关闭 MessageBox
        closeOnPressEscape: false,
        // 是否居中
        center: false
      },

      tempLayout: 'total,prev,pager,next,sizes,jumper',
      tempJumpText: '前往',
      tempIsShowPageCount: false,
      tempCurrentPage: 1
    }
  },

  mounted () {
    this.setJump()
    this.columnDrop()
    this.rowDrop()
    // this.toggleRowSelection()
  },

  components: {
    render: render
  },

  methods: {
    /* ---------饿了么回调的函数----------- */
    // 选中当前行,饿了么自带方法，自定义包装，防止和下面的分页的方法冲突
    currentRowChange (currentRow, oldCurrentRow) {
      // console.log(val)
      this.$emit('current-row-change', currentRow, oldCurrentRow)
    },

    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    select (emit) {
      emit = this.isOnlyGetIdArr ? this.getIdArr(emit) : emit
      // console.log(emit)
      this.$emit('select', emit)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll (emit) {
      emit = this.isOnlyGetIdArr ? this.getIdArr(emit) : emit
      // console.log(emit)
      this.$emit('select-all', emit)
    },

    /** @description 自定义序号
     * @author yx
     * @param  {Number} index //数组下标
     */
    indexMethod (index) {
      return index + (this.tempCurrentPage - 1) * this.pageSize + 1
    },

    /** @description 分页-每页显示的条数切换
     * @author yx
     * @param  {Number}  val 页面切换的条数
     */

    sizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('size-change', val)
    },

    /** @description 分页-当前页切换
     * @author yx
     * @param  {Number}  val 当前页
     */
    currentChange (val) {
      // console.log(`当前页: ${val}`)
      this.$emit('current-change', val)
    },

    /* ---------自定义的函数----------- */

    /** @description 获取id数组
     * @author yx
     * @param  {Array}  value 从这个数组中获取id
     */
    getIdArr (value) {
      let arr
      if (Array.isArray(value)) {
        arr = []
        value.forEach(item => arr.push(item[this.id]))
      } else {
        arr = value[this.id]
      }
      return arr
    },

    /** @description  按钮的操作
     * @author yx
     * @param  {Object}  param 参数
     */
    btnOperate (param) {
      let { value, data } = param || {}
      param.data = this.isOnlyGetId ? this.getIdArr(data) : param.data
      const {
        message,
        title,
        confirmButtonText,
        cancelButtonText,
        text,
        isCanclePrompt,
        showClose,
        closeOnClickModal,
        closeOnPressEscape,
        center,
        show
      } = this.tempDeleteMessageBox || {}

      const keyMap = {
        [text]: () => {
          if (show) {
            this.$confirm(message, title, {
              confirmButtonText: confirmButtonText,
              cancelButtonText: cancelButtonText,
              type: 'warning',
              showClose: showClose,
              closeOnClickModal: closeOnClickModal,
              closeOnPressEscape: closeOnPressEscape,
              center: center
            })
              .then(() => {
                this.$emit('btn-operate', param)
                this.backPreviousPage()
              })
              .catch(() => {
                isCanclePrompt &&
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  })
              })
          } else {
            this.$emit('btn-operate', param)
            this.backPreviousPage()
          }
        },
        default: () => {
          this.$emit('btn-operate', param)
        }
      }
      value = keyMap[value] && text === value ? value : 'default'
      keyMap[value]()
    },

    /**@description  用来重新格式化传进来的columns字段
     * @author yx
     * @param  {Array}  columns 表头数据
     */
    formatColumns (columns) {
      const arr = []
      let indexFlag = true //是否自动添加序号
      let selectionFlag = true //是否自动添加全选
      let operateFlag = true //是否自动添加操作
      let treeFlag = false //是否有下拉树类型
      columns.forEach(item => {
        indexFlag = item.type === 'index' ? false : indexFlag
        selectionFlag = item.type === 'selection' ? false : selectionFlag
        operateFlag = item.type === 'operate' ? false : operateFlag
        treeFlag = item.type === 'tree' ? true : treeFlag
        //配置hidden属性来隐藏
        if (!item.hidden) {
          arr.push(item)
        }
      })
      // 自动添加默认的多选
      this.isShowSelection &&
        selectionFlag &&
        arr.unshift({
          type: 'selection', // 多选
          width: 55
        })
      // 自动添加默认的序号
      this.isShowIndex &&
        indexFlag &&
        arr.unshift({
          type: 'index', // 序号
          width: 55,
          label: '序号'
        })
      // 自动添加默认的操作
      this.isShowOperate &&
        operateFlag &&
        arr.push({
          label: '操作',
          type: 'operate'
        })
      //下拉树箭头位置不能在操作，序号，全选前
      treeFlag &&
        arr.forEach(item => {
          if (item.type === 'tree') {
            //没有type这个字段，那么tree展开的箭头就会在那列
            delete item.type
          } else if (!item.type) {
            item.type = ''
          }
        })

      if (this.columnsDrop || this.$eveTablePagination.columnsDrop) {
        arr.sort((next, current) => {
          return next.sort - current.sort //升序 从小到大
        })
      }
      return arr
    },

    /**@description  用来重新格式化传进来的data字段
     * @author yx
     * @param  {Array}  data 表格数据
     * @param  {Boolean}  flag 是否添加孩子id--孩子id等于当前行的id，主要用来表示是否是孩子的
     * @param  {Number}  num 层级
     */
    formatData (data, flag = false, num = 1) {
      const { children } = this.treeProps || {}
      this.isFormatData &&
        data.forEach(item => {
          item[this.zIndex] = num
          if (flag) {
            item[this.zIndex] = num
          }
          if (item[children]) {
            this.formatData(item[children], true, ++num)
            --num
          }
        })

      //是否开启行拖拽
      if (this.rowsDrop) {
        data.sort((next, current) => {
          return next.sort - current.sort //升序 从小到大
        })
      }

      return data
    },

    setJump () {
      if (!this.isShowPagination) return
      document.querySelectorAll('.el-pagination__jump').forEach(item => {
        item.childNodes[0].nodeValue = this.tempIsShowPageCount
          ? `共${this.getPageCount}页， ${this.tempJumpText}`
          : this.tempJumpText
      })
    },

    //获取element-ui table的ref
    getElTableRef () {
      return this.$refs.eveTable
    },

    // 删除最后一条数据并跳到上一个页面，防止空数据
    backPreviousPage () {
      this.tempCurrentPage =
        this.tempCurrentPage > this.delPageCount
          ? this.delPageCount
          : this.tempCurrentPage
      this.tempCurrentPage = this.tempCurrentPage < 1 ? 1 : this.tempCurrentPage
      this.$emit('update:currentPage', this.tempCurrentPage)
    },

    //列拖动
    columnDrop () {
      if (!this.columnsDrop && !this.$eveTablePagination.columnsDrop) return
      //拖拽时取消浏览器默认行为，防止火狐浏览器拖拽时打开新的窗口。
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      //防止同个组件出现问题
      const el = `.eve-table-pagination${this.tableKey} > .el-table__header-wrapper tr`
      const wrapperTr = document.querySelector(el)
      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.columnsData[evt.oldIndex]
          this.columnsData.splice(evt.oldIndex, 1)
          this.columnsData.splice(evt.newIndex, 0, oldItem)
          this.columnsData.forEach((item, index) => {
            item.sort = index + 1
          })
          this.reload()
          this.$emit('columns-drop', this.columnsData)
        }
      })
    },

    //行拖拽
    rowDrop () {
      if (!this.rowsDrop) return
      const el = `.eve-table-pagination${this.tableKey} > .el-table__body-wrapper tbody`
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      const tbody = document.querySelector(el)
      Sortable.create(tbody, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const currRow = this.tableData.splice(evt.oldIndex, 1)[0]
          this.tableData.splice(evt.newIndex, 0, currRow)
          this.tableData.forEach((item, index) => {
            item.sort = index + 1
          })
          this.$emit('rows-drop', this.tableData)
        }
      })
    },

    /**@description  获取随机数 组件内部写了key 需要个随机数，否则同一个页面使用两个组件key值相同会互相影响
     * @author yx
     * @param  {Number}  num 位数
     */
    getGenerateMixed (num) {
      const chars = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
      let res = ''
      for (let i = 0; i < num; i++) {
        const id = Math.ceil(Math.random() * 35)
        res += chars[id]
      }
      return res
    },

    /**@description  重新刷新表格组件
     * @author yx
     */
    reload () {
      let num = parseInt(this.tableKey.substr(this.tableKey.length - 1, 1))
      const str = this.tableKey.substr(0, this.tableKey.length - 1)
      //防止key值过大，导致不明错误
      if (num) {
        num++
      } else {
        this.key++
        num = this.key
      }
      this.tableKey = str + num
      //防止刷新开启了拖拽功能的表格再无法拖拽。
      this.$nextTick(() => {
        this.columnDrop()
        this.rowDrop()
      })
    }
  },

  watch: {
    deleteMessageBox: {
      handler (newValue) {
        Object.assign(this.tempDeleteMessageBox, newValue)
      },
      immediate: true
    },

    layout: {
      handler (newValue) {
        this.tempLayout =
          newValue || this.$eveTablePagination.layout || this.tempLayout
      },
      immediate: true
    },

    jumpText: {
      handler (newValue) {
        this.tempJumpText =
          newValue || this.$eveTablePagination.jumpText || this.tempJumpText
      },
      immediate: true
    },

    isShowPageCount: {
      handler (newValue) {
        this.tempIsShowPageCount =
          newValue ||
          this.$eveTablePagination.isShowPageCount ||
          this.tempIsShowPageCount
      },
      immediate: true
    },

    total: {
      handler () {
        this.setJump()
      },
      immediate: true
    },

    currentPage: {
      handler (val) {
        this.tempCurrentPage = val
      },
      immediate: true
    }
  },

  computed: {
    // 新的表格表头, 用来重新格式化传进来的columns字段，
    columnsData () {
      return this.formatColumns(this.columns)
    },
    //新的表格数据，用来重新格式化传进来的Data字段，
    tableData () {
      //用了jSON.parse 会导致toggleRowSelection失效
      // const arr = Array.from(JSON.parse(JSON.stringify(this.data)))
      const arr = this.data
      return this.formatData(arr)
    },

    new$listeners () {
      return Object.assign({}, this.$listeners, {
        'current-change': this.currentRowChange,
        select: this.select,
        'select-all': this.selectAll
      })
    },

    //获取总页数
    getPageCount () {
      return Math.ceil(this.total / this.pageSize)
    },

    //删除完当前页面数据后的总页数
    delPageCount () {
      return Math.ceil(this.total - 1 / this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button {
  padding: 0;
  padding: 10px;
}
::v-deep .el-table .cell.el-tooltip {
  //防止使用插槽或render时tree的箭头会偏移
  // display: flex;
  // align-items: center;
}
// ::v-deep .warning-row {
//   background: oldlace;
// }
//  ::v-deep .success-row {
//   background: #f0f9eb;
// }
//  ::v-deep .red {
//   background: red;
//   color: white;
// }
</style>
<style lang="scss">
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './table-pagination.scss';
</style>

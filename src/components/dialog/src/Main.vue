<!--
* @Author: yx
* @Description: 对话框
* @Date: 2020-09-27
-->
<template>
  <div
    class="eve-dialog"
    :class="{
      'eve-dialog__border-top': borderTop,
      'eve-dialog__border-bottom': borderBottom,
      'eve-dialog__box-shadow': boxShadow,
    }"
  >
    <el-dialog
      v-el-drag-dialog="isDrag"
      class="eve-dialog__scroll"
      :visible.sync="isShow"
      :modal="modal"
      :top="top"
      ref="eve-dialog"
      :show-close="showClose"
      :close-on-press-escape="closeOnPressEscape"
      :close-on-click-modal="closeOnClickModal"
      :width="width"
      :center="center"
      :loading="loading"
      :destroy-on-close="destroyOnClose"
      :fullscreen="fullscreen"
      :append-to-body="appendToBody"
      v-bind="$attrs"
      v-on="new$listeners"
    >
      <template #title>
        <slot name="title">
          <span class="eve-dialog__title" :style="titleStyle">
            {{ title }}
          </span>
        </slot>
      </template>

      <div v-loading="loading">
        <slot>{{ content }}</slot>
      </div>

      <template #footer>
        <div class="eve-dialog__loading">
          <slot name="footer">
            <div class="eve-dialog__footer" v-loading="loading">
              <div>
                <slot name="leftFooter">
                  <el-button
                    v-for="(item, index) in leftButtonData"
                    :key="leftFooter + index"
                    :type="item.type"
                    @click="leftButton({ index: index, value: item.value })"
                  >
                    {{ item.value }}
                  </el-button>
                </slot>
              </div>

              <div>
                <slot name="rightFooter">
                  <el-button
                    v-for="(item, index) in rightButtonData"
                    :key="index"
                    :type="item.type"
                    @click="rightButton({ index: index, value: item.value })"
                  >
                    {{ item.value }}
                  </el-button>
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from './drag.js'
export default {
  name: 'EveDialog',
  inheritAttrs: false,
  directives: {
    elDragDialog
  },
  props: {

    /* 饿了么ui的属性 */

    // 是否显示
    visible: {
      type: Boolean,
      default: () => false
    },
    // 标题
    title: {
      type: String,
      default: () => '这是标题'
    },

    // 宽度
    width: {
      type: String,
      default: () => '50%'
    },

    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: () => false
    },

    //  距离顶部的距离
    top: {
      type: String,
      default: () => '15vh'
    },

    // 是否显示遮罩层
    modal: {
      type: Boolean,
      default: () => true
    },

    // 是否显示删除图标
    showClose: {
      type: Boolean,
      default: () => true
    },

    // 是否可以通过esc按钮关闭
    closeOnPressEscape: {
      type: Boolean,
      default: () => false
    },
    // 是否可以通过点击模态框关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: () => false
    },
    // 是否对头部和底部采用居中布局
    center: {
      type: Boolean,
      default: () => false
    },

    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: () => false
    },

    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    appendToBody: {
      type: Boolean,
      default: () => false
    },

    /* 自定义的属性 */

    // 内容
    content: {
      type: String,
      default: () => '这是内容'
    },

    // 标题样式修改
    titleStyle: {
      type: Object,
      default: () => { }
    },

    // 是否可以拖拽
    isDrag: {
      type: Boolean,
      default: () => false
    },

    // 是否添加loading
    loading: {
      type: Boolean,
      default: () => false
    },

    // 左边按钮数据
    leftButtonData: {
      type: Array,
      default: () => []
    },

    // 右边按钮数据
    rightButtonData: {
      type: Array,
      default: () => [
        {
          value: '取 消'
        },
        {
          type: 'primary',
          value: '确 定'
        }
      ]
    },

    // 点击确定是否关闭Dialog
    isSureClose: {
      type: Boolean,
      default: () => true
    },

    // 在内容的顶部加条线
    borderTop: {
      type: Boolean,
      default: () => true
    },

    // 在内容的底部加条线
    borderBottom: {
      type: Boolean,
      default: () => false
    },

    // 对话框外部添加阴影
    boxShadow: {
      type: Boolean,
      default: () => false
    },

    //对话框最小宽度(自定义)
    minWidth: {
      type: [Number, String],
      default: () => ''
    }

  },

  data () {
    return {
      isShow: false // 是否显示
    }
  },


  computed: {
    new$listeners () {
      return Object.assign(
        {},
        this.$listeners,
        {
          close: this.close,
          closed: this.closed
        }
      )
    }
  },

  watch: {
    visible: {
      handler (newValue) {
        this.isShow = newValue
      },
      immediate: true
    }
  },
  created () { },
  mounted () {
    this.changeWidth()
  },
  methods: {

    /** @description  改变宽度
        * @author yx
        */
    changeWidth () {
      const element = document.querySelector('.eve-dialog__scroll>.el-dialog')
      element.style.minWidth = this.minWidth + 'px'
    },

    /** @description  左边按钮事件
     * @author yx
     * @param  {Object}  param 按钮里参数值 包括 index 按钮下标  value按钮值
     */
    leftButton (param) {
      // console.log(param)
      this.$emit('update:visible', false)
      this.$emit('left-button', param)
    },
    /** @description  右边按钮事件
     * @author yx
    * @param  {Object}  param 按钮里参数值 包括 index 按钮下标  value按钮值
     */
    rightButton (param) {
      let { value } = param || {}
      // console.log(param)
      //  (this.isShow = false)
      value = value.replace(/\s*/g, '')
      if (value === '取消' || this.isSureClose) {
        this.$emit('update:visible', false)
      }
      this.$emit('right-button', param)
    },
    /** @description 关闭模态框前的事件
     * @author yx
     */
    closed () {
      this.$emit('update:visible', false)
      this.$emit('closed')
    },
    /** @description 右边的关闭按钮
     * @author yx
     */
    close () {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  },
}
</script>

<style lang="scss">
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './dialog.scss';
</style>

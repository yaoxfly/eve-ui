<!--
* @Author: yx
* @Description: 头部导航栏
* @Date: 2020-10-09
-->
<template>
  <div>
    <header
      class="eve-header"
      ref="eveHeader"
      :style="{ background: background, height: `${height}px` }"
    >
      <!-- 左边的内容 -->
      <section class="eve-header__flex-column">
        <div class="eve-header__left">
          <slot name="left-before"></slot>
          <slot name="left">
            <div
              class="eve-header__flex-start eve-header__logo-title"
              :style="{ width: `${leftWidth}px` }"
            >
              <img :src="logo" class="eve-header__logo" />
              <div class="eve-header__flex-column eve-header__title">
                <span>{{ title }}</span>
                <span>{{ subTitle }}</span>
              </div>
            </div>
          </slot>
          <slot name="left-after"></slot>
        </div>
      </section>

      <!-- 中间的内容 -->
      <section class="eve-header__flex-column eve-header__center">
        <slot name="center-before"></slot>
        <slot name="center">
          <div class="eve-header__flex-start eve-header__center-content">
            <eve-scroll
              :width="navigationWidth"
              :scroll="scroll"
              :defaultActive="defaultActive"
              :data="navigationButton"
              :slidesPerView="slidesPerView"
              :backgroundColor="backgroundColor"
              :textColor="textColor"
              :activeTextColor="activeTextColor"
              :swiperButtonColor="swiperButtonColor"
              :config="tempConfig"
              @select="navButton"
            ></eve-scroll>
          </div>
        </slot>
        <slot name="center-after"></slot>
      </section>

      <!-- 右边的内容 -->
      <section class="eve-header__flex-column eve-header__right">
        <slot name="right-before"></slot>
        <slot name="right">
          <div class="eve-header__flex-end">
            <template v-for="(item, index) in rightContent">
              <section
                v-if="item.type === 'icon'"
                :key="`${item.value}icon`"
                class="eve-header__icon-item"
                @mouseover="mouseover({ index: index, data: item })"
                @mouseleave="mouseleave({ index: index, data: item })"
                @click="rightContentButton({ index: index, data: item })"
              >
                <img
                  v-if="!item.number"
                  :src="item.value"
                  class="eve-header__icon-img"
                  :style="item.style"
                  :class="item.class"
                />
                <el-badge v-else :value="item.number" :max="99" class="item">
                  <img
                    :style="item.style"
                    :class="item.class"
                    :src="item.value"
                    class="eve-header__icon-img"
                  />
                </el-badge>
              </section>

              <section
                v-else
                :key="`${item.content}icon`"
                @click="rightContentButton({ index: index, data: item })"
                @mouseover="mouseover({ index: index, data: item })"
                @mouseleave="mouseleave({ index: index, data: item })"
                class="eve-header__icon-item"
              >
                <div
                  class="
                    eve-header__icon-item--special eve-header__icon-item-flex
                  "
                  :style="item.style"
                  :class="item.class"
                >
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    class="eve-header__icon-img"
                    :class="[
                      item.value.length > 2 && 'eve-header__icon-img--special',
                    ]"
                  />
                  <span>{{ item.value }} </span>
                  <i
                    class="el-icon-caret-bottom eve-header__icon-img--special"
                    v-if="item.dialog"
                  ></i>
                </div>
              </section>
            </template>
          </div>
        </slot>
        <slot name="right-after"></slot>
      </section>

      <!-- 对话框 -->
      <section
        v-show="visible"
        class="eve-header__dialog-section"
        :style="{
          top: `${dialogTop}px`,
          right: `${dialogRight}px`,
        }"
        @mouseover="dialogMouseover"
        @mouseleave="dialogmouseleave"
      >
        <slot name="dialog">
          <el-dialog
            @mouseover="dialogMouseover"
            @mouseleave="dialogmouseleave"
            class="eve-header__dialog"
            :visible="true"
            :modal="false"
            top="0"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :style="{
              width: `${dialogWidth}px`,
            }"
            :append-to-body="dialogAppendToBody"
          >
            <template #title>
              <span class="eve-header__dialog-title">
                <slot name="dialog-title">
                  {{ dialogTitle }}
                </slot>
              </span>
              <div class="eve-header__dialog-border" v-if="dialogBorder"></div>
            </template>
            <slot name="dialog-content">
              <slot name="dialog-content-before"></slot>
              <div>
                <p class="eve-header__dialog-content-flex">
                  <span class="eve-header__dialog-content-left">所属机构</span>
                  <span class="eve-header__dialog-content-right">
                    福州市鼓楼区市场监督管理局</span
                  >
                </p>
                <p class="eve-header__dialog-content-flex">
                  <span class="eve-header__dialog-content-left">所属部门</span>
                  <span class="eve-header__dialog-content-right"
                    >注册登记科</span
                  >
                </p>
                <div class="eve-header__dialog-content-flex">
                  <span class="eve-header__dialog-content-left">快速入口</span>
                  <div
                    class="eve-header__dialog-content-right"
                    style="margin-top: 2px"
                  >
                    <span
                      @click="
                        dialogPromptAccessBtn({ index: index, date: item })
                      "
                      v-for="(item, index) in dialogPromptAccess"
                      :key="item.text"
                      >{{ item.text }}</span
                    >
                  </div>
                </div>
              </div>
              <slot name="dialog-content-after"></slot>
            </slot>
            <span slot="footer">
              <div class="eve-header__dialog-border" v-if="dialogBorder"></div>
              <div class="eve-header__dialog-footer">
                <slot name="dialog-footer">
                  <span
                    v-for="(item, index) in dialogButton"
                    :key="`dialogButton${index}`"
                    class="eve-header__dialog-footer-button"
                    @click="dialogOperate({ index: index, data: item.text })"
                  >
                    {{ item.text }}
                  </span>
                </slot>
              </div>
            </span>
          </el-dialog>
        </slot>
      </section>
    </header>
  </div>
</template>
<script>
import mixins from '@yaoxfly/eve-ui/src/components/scroll/src/mixins.js'
export default {
  name: 'EveHeader',
  mixins: [mixins],
  provide () {
    return {
      className: 'eve-header__menu-item',
      config: this.tempConfig
    }
  },
  props: {
    //logo
    logo: {
      type: String,
      // default: require('../../../assets/logo.png')
    },

    // 标题
    title: {
      type: String,
      default: 'XXX平台系统'
    },

    //副标题
    subTitle: {
      type: String,
      default: 'XXXXXXXXX子系统'
    },

    // 左边包含logo和系统名的宽度
    leftWidth: {
      type: Number,
      default: 210
    },

    //header 背景
    background: {
      type: String,
      default: ''
    },

    //header高度
    height: {
      type: Number,
      default: 65
    },

    //默认白 swiper-button-white(白)/swiper-button-black(黑)
    swiperButtonColor: {
      type: String,
      default: 'swiper-button-white'
    },

    //是否开启滚动
    scroll: {
      type: Boolean,
      default: false
    },

    //导航按钮的宽度--如果开启滚动必须固定一个宽度，不能使用百分比
    navigationWidth: {
      type: String,
      default: () => '100%'
    },

    // 导航按钮的数据
    navigationButton:
    {
      type: Array,
      default: () => [
        {
          path: 'dialog', //唯一key值
          type: 'item', // 最底层的菜单-没有子菜单的
          text: '主页'// 菜单名
        },
        {
          path: 'dialog1',
          type: 'item',
          text: '行政许可'
        },
        {
          path: 'dialog2',
          type: 'item',
          text: '市场监管'
        },
        {
          path: 'dialog3',
          type: 'item',
          text: '行政执法'
        },
        {
          path: 'dialog4',
          type: 'item',
          text: '知识产权'
        },
        {
          path: 'dialog5',
          type: 'item',
          text: '质量监管'
        },
        {
          path: 'http://www.baidu.com1',
          type: 'item',
          text: '业务应用'
        },
        {
          path: 'http://www.baidu.com测试3',
          type: 'submenu', //有子菜单的
          text: '应用支撑',
          children: [
            {
              path: 'http://www.baidu.com3331',
              type: 'item',
              text: '测试1',

            },
            {
              path: 'http://www.baidu.com3332',
              type: 'item',
              text: '测试2',

            },
            {
              path: 'http://www.baidu.com3333',
              type: 'item',
              text: '测试3',

            }
          ]
        },
      ]
    },

    //字体颜色(中间菜单)
    textColor: {
      type: String,
      default: () => '#fff'
    },

    //当前激活菜单的文字颜色(中间菜单)
    activeTextColor: {
      type: String,
      default: () => ''
    },

    //右边的内容：一般是图标或者是文本 //require这里不能用@会引入调用这个工程的src下的图片,只能用相对路径。
    rightContent: {
      type: Array,
      default: () => [
        // {
        //   type: 'icon',
        //   value: require('../../../assets/image/header/theme.svg'),
        // },
        // {
        //   type: 'icon',
        //   value: require('../../../assets/image/header/zoom.svg'),
        // },
        // {
        //   type: 'icon',
        //   value: require('../../../assets/image/header/head_sculpture.png'),
        // },
        // {
        //   value: '李四',
        //   dialog: true //设置这个属性后,点击这个按钮会弹出对话框,默认是false
        // }
      ]
    },

    //对话框的距离右边的距离
    dialogRight: {
      type: [Number, String],
      default: () => ''
    },

    //对话框的标题
    dialogTitle: {
      type: String,
      default: () => ''
    },

    //对话框的线--默认显示
    dialogBorder: {
      type: Boolean,
      default: () => true
    },

    //对话框的按钮
    dialogButton: {
      type: Array,
      default: () => [
        {
          text: '用户信息'
        },
        {
          text: '安全退出'
        }
      ]
    },

    //对话框的宽度
    dialogWidth: {
      type: Number,
      default: () => 268
    },

    //对话框距离顶部的距离
    dialogTop: {
      type: [Number, String],
      default: () => ''
    },

    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    dialogAppendToBody: {
      type: Boolean,
      default: () => false
    },

    //鼠标移入开启对话框
    dialogIsMouseover: {
      type: Boolean,
      default: () => true
    },

    //对话框快速入口的按钮
    dialogPromptAccess: {
      type: Array,
      default: () => [
        {
          text: '更改密码'
        },
        {
          text: '重新绑定手机'
        },
      ]
    },

    //左边菜单数据：联动页签、左边菜单组件，配置后切换顶部菜单，页面默认跳转左侧菜单的第一个，如果存在二级，则跳转到二级菜单的第一个
    linkageTagMenu: {
      type: Array,
      default: () => []
    },

    // 配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      text: 'text', //文本
      path: 'path', // 路径
      children: 'children' //树结构数据的孩子节点
    },
  },

  data () {
    return {
      visible: false, // 是否显示
      //key默认配置--配置菜单、面包屑数据的text、path、children等key值(内部用可被config覆盖)
      baseLeft: 150, //基准距离，当前对话框宽度减去当前150就是这位移的基础值
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      },
    }
  },
  mounted () { },
  methods: {
    /**@description  中间部分导航按钮点击事件
     * @author yx
     * @param  {Object}  param 包含导航按钮的路径
     */
    navButton (param) {
      this.$emit('nav-button', param)
    },
    /**@description  右边部分icon和用户信息等按钮的点击事件
     * @author yx
     * @param  {Object}  param 包含导航按钮的index和数据
     */
    rightContentButton (param) {
      const { data: { dialog = false } = {} } = param || {}
      //如果有配置dialog:true则可以弹出或隐藏框，否则只能隐藏框
      if (!this.dialogIsMouseover) {
        if (dialog) {
          this.visible = !this.visible
        } else {
          this.visible = false
        }
      }
      this.$emit('right-content-button', param)
    },


    /**@description  右边dialog的按钮的点击事件
    * @author yx
    * @param  {Object}  param 包含dialog按钮的index和数据
    */
    dialogOperate (param) {
      this.visible = false
      this.$emit('dialog-operate', param)
    },

    /**@description  查找最底层的菜单--配合linkageTagMenu联动用
      * @author yx
      * @param  {Aarray}  menu
      */
    findlowestMenu (menu = this.linkageTagMenu) {
      let obj = {}
      menu.some(element => {
        obj = { [this.tempConfig.text]: element[this.tempConfig.text], [this.tempConfig.path]: element[this.tempConfig.path] }
        if (element[this.tempConfig.children]) {
          obj = this.findlowestMenu(element[this.tempConfig.children])
          return true
        } else {
          return true
        }
      })
      return obj
    },

    /**@description  右边部分icon和用户信息等按钮的鼠标移过
     * @author yx
    */
    mouseover (param) {
      if (this.dialogIsMouseover) {
        const { data: { dialog = false } = {} } = param || {}
        if (dialog) {
          this.visible = true
        }
      }
      this.$emit('mouseover', param)
    },

    /**@description  右边部分icon和用户信息等按钮的鼠标离开
     * @author yx
    */
    mouseleave (param) {
      if (this.dialogIsMouseover) {
        const { data: { dialog = false } = {} } = param || {}
        if (dialog) {
          this.visible = false
        }
      }
      this.$emit('mouseleave', param)
    },


    /**@description  对话框鼠标移入
      * @author yx
    */

    dialogMouseover () {
      if (this.dialogIsMouseover) {
        this.visible = true
      }
    },

    /**@description  对话框鼠标离开
      * @author yx
    */
    dialogmouseleave () {
      if (this.dialogIsMouseover) {
        this.visible = false
      }
    },

    /**@description 对话框快速入口按钮的事件
         * @author yx
       */
    dialogPromptAccessBtn (param) {
      this.$emit('dialog-prompt-access-btn', param)
    }
  },

  watch: {
    config: {
      handler (val) {
        Object.assign(this.tempConfig, val)
        // console.log(111, this.tempConfig, val)
      },
      immediate: true,
    },

    //对话框的宽度
    dialogWidth: {
      handler (val) {
        this.baseLeft = val - 150
      },
      immediate: true,
    }
  }
}
</script>
<style lang='scss'>
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './header.scss';
</style>

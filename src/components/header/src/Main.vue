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
              >
                <img
                  v-if="!item.number"
                  :src="item.value"
                  class="eve-header__icon-img"
                  @click="rightContentButton({ index: index, data: item })"
                />
                <el-badge v-else :value="item.number" :max="99" class="item">
                  <img
                    :src="item.value"
                    class="eve-header__icon-img"
                    @click="rightContentButton({ index: index, data: item })"
                  />
                </el-badge>
              </section>

              <section
                v-else
                :key="`${item.content}icon`"
                @click="rightContentButton({ index: index, data: item })"
                class="eve-header__icon-item"
              >
                <div class="eve-header__icon-item--special">
                  <span>{{ item.value }} </span>
                  <i class="el-icon-caret-bottom" v-if="item.dialog"></i>
                </div>
              </section>
            </template>
          </div>
        </slot>
        <slot name="right-after"></slot>
      </section>

      <!-- 对话框 -->
      <section
        v-if="visible"
        class="eve-header__dialog-section"
        :style="{
          top: `${dialogTop}px`,
          right: `${dialogRight}px`,
        }"
      >
        <slot name="dialog">
          <el-dialog
            class="eve-header__dialog"
            :visible.sync="visible"
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
              <span>这里是内容，可以用slot覆盖 ，slot名：dialog-content </span>
            </slot>
            <span slot="footer">
              <div class="eve-header__dialog-border" v-if="dialogBorder"></div>
              <div class="eve-header__dialog-footer">
                <slot name="dialog-footer">
                  <template v-for="(item, index) in dialogButton">
                    <span
                      :key="`dialogButton${index}`"
                      class="eve-header__dialog-footer-button"
                      @click="dialogOperate({ index: index, data: item.text })"
                    >
                      {{ item.text }}
                    </span>
                  </template>
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

import mixins from 'eve-ui/src/components/scroll/src/mixins.js'
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
        //   value: require('../../../assets/image/header/help.png'),
        // },
        // {
        //   type: 'icon',
        //   value: require('../../../assets/image/header/info.png'),
        //   number: 8, //在图标右上方添加number
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
          text: '修改密码'
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
      if (dialog) {
        this.visible = !this.visible
      } else {
        this.visible = false
      }
      this.$emit('right-content-button', param)
    },

    /**@description  右边dialog的按钮的点击事件
    * @author yx
    * @param  {Object}  param 包含dialog按钮的index和数据
    */
    dialogOperate (param) {
      // console.log(param)
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
@import 'eve-ui/src/assets/style/base.scss';
@import './header.scss';
</style>
 
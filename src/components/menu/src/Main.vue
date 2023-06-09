<!--
* @Author: yx
* @Description: 左侧菜单栏封装
* @Date: 2020-10-13
-->
<template>
  <div
    class="eve-menu__main"
    :class="{
      'eve-menu__border-right-none': !borderRight,
    }"
    :style="{ height: `calc(100vh - ${top}px)` }"
  >
    <el-scrollbar style="height: 100%">
      <slot></slot>
      <el-menu
        class="eve-menu"
        :class="{
          'eve-menu__item-border-right-none': !itemBorderRight,
        }"
        :router="router"
        :unique-opened="uniqueOpened"
        :default-active="active"
        :mode="mode"
        :collapse="tempCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :key="key"
        @select="(index, indexPath) => select(index, indexPath, data)"
        :style="{ width: `${tempWidth}px` }"
        :default-openeds="defaultOpeneds"
      >
        <menu-item
          v-for="(item, index) in data"
          :menu-data="item"
          :key="`eve-menu${index}`"
        ></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  name: 'EveMenu',
  provide () {
    return {
      //传一个类名用来改样式，以防和滚动菜单全局污染样式
      className: 'eve-menu__menu-item',
      config: this.tempConfig
    }
  },
  props: {
    /* element-ui的属性 */
    // 模式  horizontal / vertical
    mode: {
      type: String,
      default: 'vertical'
    },

    // 当前激活菜单的标识
    defaultActive: {
      type: String,
      default: ''
    },

    // 是否只保持一个子菜单的展开
    uniqueOpened: {
      type: Boolean,
      default: false
    },

    // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    router: {
      type: Boolean,
      default: true
    },

    // 菜单的背景色
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },

    // 菜单的文字颜色
    textColor: {
      type: String,
      default: '#303133'
    },

    // 当前激活菜单的文字颜色
    activeTextColor: {
      type: String,
      default: ''
    },

    // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    collapse: {
      type: Boolean,
      default: false
    },

    /* 自定义的属性 */

    // 菜单数据
    data: {
      type: Array,
      default: () => [
        // {
        //   path: '',
        //   type: 'submenu',
        //   text: '关于',
        //   children: [
        //     {
        //       path: 'about',
        //       type: 'item', // 子菜单
        //       icon: 'el-icon-location',
        //       text: '测试3',
        //     }
        //   ],
        // },
        // {
        //   path: '/',
        //   type: 'item',
        //   text: '开始'
        // },
      ]
    },
    // 宽度
    width: {
      type: Number,
      default: 256
    },
    /* 距离顶部(header)的距离(原本属性是height现在改完top),设置了box-sizing: border-box后会影响这个值,如果设置当前值还会出现没铺满的bug
    请设置当前值为0并在app.vue中添加样式 body{overflow: hidden;}
    */
    top: {
      type: Number,
      default: 65
    },
    // 配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      type: Object,
      default: () => ({
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children', //树结构数据的孩子节点
        title: 'title', //分组的title
      })
    },

    // 面包屑的收缩按钮，收缩后菜单的宽度,如果有padding、margin也要算进去
    shrinkWidth: {
      type: Number,
      default: () => 64
    },

    //菜单整体右边边框的线
    borderRight: {
      type: Boolean,
      default: () => true
    },

    //菜单选项右边边框的线
    itemBorderRight: {
      type: Boolean,
      default: () => false
    },

    defaultOpeneds: {
      type: Array,
      default: () => []
    }

  },
  data () {
    return {
      // 当前激活菜单的标识(菜单高亮)--可让子组件改父组件传来的值
      active: '',
      // 是否水平折叠收起菜单(内部用)
      tempCollapse: '',
      // 宽度(内部用)
      tempWidth: 200,
      //唯一标识
      key: 0,
      //key默认配置--配置菜单、面包屑数据的text、path、children等key值(内部用可被config覆盖)
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children', //树结构数据的孩子节点
        title: 'title', //分组的title
      },
      //当前路由
      route: ''
    }
  },
  mounted () { },
  methods: {
    /**@description  菜单激活回调
      * @author yx
      * @param  {String}  index path 路径
      * @param  {Array}  indexPath 路径数组
      * @param  {Array}  data 菜单数据
     */
    select (index, indexPath, data) {
      const menu = this.findPath(index, data)
      const value = menu.length > 0 ? menu[0][this.tempConfig.text] : ''
      this.$emit('select', {
        index: index,
        indexPath: indexPath,
        data: data,
        text: value,
        currentData: menu.length > 0 ? menu[0] : [],
      })
      this.$store.commit('SET_TAG_VIEWS_DATA', { [this.tempConfig.path]: index, [this.tempConfig.text]: value })
      // console.log(this.$store.state.menu.tagViewsData, 22222)
    },

    /**@description  根据路由查找菜单数据中匹配路径的数组
       * @author yx
       * @param  {String}  path path 路径
       * @param  {Array}  data 菜单数据
     */
    findPath (path, data) {
      data = Array.from(data)
      let arr = []
      data.some(item => {
        if (item[this.tempConfig.path] === path) {
          arr.push(item)
          return true
        } else if (item[this.tempConfig.children]) {
          arr = this.findPath(path, item[this.tempConfig.children])
          if (arr.length > 0) { //递归退出条件 要不断的退出n个循环递归，否则循环会继续执行，但不会陷入死循环。
            return true
          } else {
            return false
          }
        }
      })
      return arr
    },

    //TODO:这里的联动，目前只是手动的设置，后期改成自动化
    /**@description 更新组件--配合header联动用
      * @author yx
     */
    update () {
      setTimeout(() => {
        this.key++
      }, 200)
    },

    /**@description 设置菜单高亮
     * @author yx
     */
    setActive (path, data) {
      //路由子路由配置中无论是带/还是不带斜杆,路由监听时总是带有斜杆
      const menu = this.findPath(path, data)
      //判断外面传进来的菜单的路径(path)是否有加斜杆,无论路径(path)是否带斜杆都可以找到(path兼容斜杆)。
      this.active = menu.length > 0 ? path : path.split('/')[1]
      this.$emit('updata:defaultActive', this.active)
    }
  },

  components: {
    MenuItem
  },


  watch: {
    defaultActive: {
      handler (val, oldVal) {
        this.active = val
        this.$emit('updata:defaultActive', this.active)
      },
      immediate: true
    },
    config: {
      handler (val) {
        Object.assign(this.tempConfig, val)
        // console.log(111, this.tempConfig, val)
      },
      immediate: true,
    },
    $route: {
      handler (val) {
        this.route = val.path
        //当从外部传入值时不需要根据路由设置
        !this.defaultActive && this.setActive(this.route, this.data) //高亮
      },
      immediate: true,
    },
    //有用到$route变化的值，一定要放在$route后
    data: {
      handler (val) {
        console.log(val, this.route, '菜单')
        // this.route = val.path
        val.length > 0 && !this.defaultActive && this.setActive(this.route, val)
      },
      immediate: true,
    },

    collapse: {
      handler (val) {
        this.tempCollapse = val
      },
      immediate: true,
    },
    width: {
      handler (val) {
        this.tempWidth = val
      },
      immediate: true,
    },

    '$store.state.menu.collapse': {
      handler (newValue) {
        this.tempCollapse = newValue
        this.tempWidth = this.tempCollapse ? this.shrinkWidth : this.width
        this.$emit('update:collapse', this.tempCollapse)
        this.$emit('update:width', this.tempWidth)
      },
    }
  }
}
</script>

<style lang='scss' scoped >
.eve-menu {
  user-select: none;
  &__main {
    background: #fff;
  }
}
//隐藏滚动条的横向滚动条
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-scrollbar__bar.is-vertical > div {
  width: 120%;
}
:v-deep .el-scrollbar__bar.is-horizontal > div {
  height: 120%;
}
//黑色的线条
::v-deep .el-menu {
  border-right: solid 1px transparent !important;
}
</style>

 <style lang="scss" >
@import '@yaoxfly/eve-ui/src/assets/style/base.scss';
@import './menu.scss';
</style>



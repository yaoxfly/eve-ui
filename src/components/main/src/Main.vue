<!--
* @Author: yx
* @Description: 中间区域块
* @Date: 2020-11-17
-->
<template>
  <div
    class="eve-main"
    :class="[border && 'eve-main__border']"
    :style="{
      margin: `${spacing}px`,
      width: `calc(100vw - ${tempLeft + 2 * spacing}px`,
      height: `calc(100vh - ${heightDiffer}px)`,
    }"
  >
    <section class="eve-main__content" :style="{ background: background }">
      <el-scrollbar style="height: 100%" v-if="scroll">
        <div :style="{ padding: padding }">
          <slot> </slot>
        </div>
      </el-scrollbar>
      <div v-else :style="{ padding: padding }">
        <slot></slot>
      </div>
    </section>
  </div>
</template>
<script>

export default {
  name: 'EveMain',
  props: {
    //高度差 顶部导航+面包屑+两个spacing的高度之和
    heightDiffer: {
      type: Number,
      default: 125
    },
    //各个块间的间距
    spacing: {
      type: Number,
      default: 10
    },
    //距离左边的距离(一般是菜单的宽度)
    left: {
      type: Number,
      default: () => 256
    },
    //背景颜色
    background: {
      type: String,
      default: () => '#fff'
    },
    //是否开启滚动
    scroll: {
      type: Boolean,
      default: () => false
    },
    // 面包屑、页签的收缩按钮，收缩后左侧的宽度，如果有padding、margin也要算进去
    shrinkWidth: {
      type: Number,
      default: () => 64
    },

    // 是否带有边框
    border: {
      type: Boolean,
      default: () => false
    },

    // 内间距
    padding: {
      type: String,
      default: () => '0'
    }
  },
  data () {
    return {
      tempLeft: 0 //距离左边的距离(内部用)
    }
  },
  mounted () { },
  methods: {},
  watch: {
    left: {
      handler (newValue) {
        this.tempLeft = newValue
      },
      immediate: true
    },
    '$store.state.menu.collapse': {
      handler (newValue) {
        this.tempLeft = newValue ? this.shrinkWidth : this.left
      },
    }
  }
}
</script>

<style lang='scss' scoped >
.eve-main {
  &__content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &__border {
    border: 1px solid #e2dada;
  }
}
//隐藏element-ui静态滚动条的横向滚动条
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-scrollbar__bar.is-vertical > div {
  width: 120%;
}
::v-deep .el-scrollbar__bar.is-horizontal > div {
  height: 120%;
}
// ::-webkit-scrollbar-track-piece {
//   //滚动条凹槽的颜色，还可以设置边框属性
//   background-color: #f8f8f8;
// }
// ::-webkit-scrollbar {
//   //滚动条的宽度
//   width: 8px;
//   height: 8px;
// }
// ::-webkit-scrollbar-thumb {
//   //滚动条的设置
//   background-color: rgba(144, 147, 153, 0.5);
//   background-clip: padding-box;
//   min-height: 10px;
//   border-radius: 3px;
// }
// ::-webkit-scrollbar-thumb:hover {
//   background-color: rgba(144, 147, 153, 0.5);
// }
</style>

 
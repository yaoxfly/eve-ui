<template>
  <li class="el-menu-item-group">
    <div
      class="el-menu-item-group__title"
      :style="{ paddingLeft: levelPadding + 'px' }"
    >
      <template v-if="!$slots.title">{{ title }}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'ElMenuItemGroup',

  componentName: 'ElMenuItemGroup',

  inject: ['rootMenu'],
  props: {
    title: {
      type: String
    },
    paddingLeft: {
      type: [String, Number],
      default: 20
    },
  },
  data () {
    return {}
  },
  computed: {
    levelPadding () {
      let padding = this.paddingLeft
      let parent = this.$parent
      if (this.rootMenu.collapse) return this.paddingLeft
      while (parent && parent.$options.componentName !== 'ElMenu') {
        if (parent.$options.componentName === 'ElSubmenu') {
          padding += this.paddingLeft
        }
        parent = parent.$parent
      }
      return padding
    }
  }
}
</script>


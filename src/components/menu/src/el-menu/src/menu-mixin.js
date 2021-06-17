export default {
  inject: ['rootMenu'],
  props: {
    paddingLeft: {
      type: [String, Number],
      default: 20
    },
  },
  computed: {
    indexPath () {
      const path = [this.index]
      let parent = this.$parent
      while (parent.$options.componentName !== 'ElMenu') {
        if (parent.index) {
          path.unshift(parent.index)
        }
        parent = parent.$parent
      }
      return path
    },
    parentMenu () {
      let parent = this.$parent
      while (
        parent &&
        ['ElMenu', 'ElSubmenu'].indexOf(parent.$options.componentName) === -1
      ) {
        parent = parent.$parent
      }
      return parent
    },
    paddingStyle () {
      if (this.rootMenu.mode !== 'vertical') return {}

      let padding = this.paddingLeft
      let parent = this.$parent

      if (this.rootMenu.collapse) {
        padding = this.paddingLeft
      } else {
        while (parent && parent.$options.componentName !== 'ElMenu') {
          if (parent.$options.componentName === 'ElSubmenu') {
            padding += this.paddingLeft
          }
          parent = parent.$parent
        }
      }
      return { paddingLeft: padding + 'px' }
    }
  }
}


/**@description  表格设置
 * @author yx
 */
export const setEveTablePagination = (Vue, option) => {
  const {
    eveTablePagination: {
      layout = 'total,prev,pager,next,sizes,jumper',
      jumpText = '跳转到第'
    } = {}
  } = option || {}
  Vue.prototype.$eveTablePagination = {
    layout: layout, //布局
    jumpText: jumpText
  }
}

/**@description  表格设置
 * @author yx
 */
export const setEveTablePagination = (Vue, option) => {
  const {
    eveTablePagination: {
      layout,
      jumpText,
      isShowPageCount,
    } = {}
  } = option || {}
  Vue.prototype.$eveTablePagination = {
    layout: layout, //布局
    jumpText: jumpText, //前往的文本修改
    isShowPageCount: isShowPageCount, //是否显示总页数
  }
}
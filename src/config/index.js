
/**@description  表格设置
 * @author yx
 */
export const setEveTablePagination = (Vue, option) => {
  const {
    eveTablePagination: {
      layout,
      jumpText,
      isShowPageCount,
      columnsDrop,
    } = {}
  } = option || {}
  Vue.prototype.$eveTablePagination = {
    layout, //布局
    jumpText, //前往的文本修改
    isShowPageCount, //是否显示总页数
    columnsDrop //是否支持拖拽
  }
}
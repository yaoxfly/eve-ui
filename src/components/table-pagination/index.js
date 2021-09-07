import TablePagination from './src/Main.vue'
import { setEveTablePagination } from '../../config/index.js'
TablePagination.install = function (Vue, option = {}) {
    Vue.component(TablePagination.name, TablePagination)
    setEveTablePagination(Vue, option)
}
export default TablePagination

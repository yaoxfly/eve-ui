import Upload from './src/Main.vue'
Upload.install = function (Vue) {
    Vue.component(Upload.name, Upload)
}
export default Upload

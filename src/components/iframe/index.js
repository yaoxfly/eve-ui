import iframe from './src/main.vue'
iframe.install = function (Vue) {
    Vue.component(iframe.name, iframe)
}
export default iframe

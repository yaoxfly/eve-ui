import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/Layout.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/install',
    children: [
      {
        path: '/install',
        name: '安装',
        component: () => import('../views/install/Install.vue'),
        meta: { title: '开发指南' }
      },

      {
        path: '/use',
        name: '快速上手',
        component: () => import('../views/use/Use.vue'),
      },

      {
        path: '/cli',
        name: '脚手架',
        component: () => import('../views/eve-cli/EveCli.vue'),
      },

      {
        path: '/custom-theme',
        name: '自定义主题',
        component: () => import('../views/custom-theme/CustomTheme.vue'),
      },


      {
        path: '/request',
        name: 'Request 发起请求',
        component: () => import('../views/request/Request.vue'),
        meta: { title: '网络' }
      },

      {
        path: '/main',
        name: 'Main 简单布局',
        component: () => import('../views/main/Main.vue'),
        meta: { title: '布局组件' }
      },
      {
        path: '/container',
        name: 'Container 容器',
        component: () => import('../views/container/Container.vue')
      },
      {
        path: '/header',
        name: 'Header 头部导航',
        component: () => import('../views/header/Header.vue'),
        meta: { title: '导航组件' }
      },
      {
        path: '/menu',
        name: 'Menu 菜单',
        component: () => import('../views/menu/Menu.vue'),
      },
      {
        path: '/breadcrumb',
        name: 'Breadcrumb 面包屑',
        component: () => import('../views/breadcrumb/Breadcrumb.vue'),
      },
      {
        path: '/tagViews',
        name: 'TagViews 页签',
        component: () => import('../views/tag-views/TagViews.vue'),
      },
      {
        path: '/dialog',
        name: 'Dialog 对话框',
        component: () => import('../views/dialog/Dialog.vue'),
        meta: { title: '常用组件' }
      },

      {
        path: '/tablePagination',
        name: 'TablePagination 表格分页',
        component: () => import('../views/table-pagination/TablePagination.vue')
      },
      {
        path: '/selectForm',
        name: 'SelectForm 查询表单',
        component: () => import('../views/select-form/SelectForm.vue')
      },
      {
        path: '/tree',
        name: 'Tree 树',
        component: () => import('../views/tree/Tree.vue')
      },
      {
        path: '/dropDownTree',
        name: 'DropDownTree 下拉树',
        component: () => import('../views/drop-down-tree/DropDownTree.vue')
      },
      {
        path: '/upload',
        name: 'Upload 上传',
        component: () => import('../views/upload/Upload.vue')
      },

      {
        path: '/richText',
        name: 'RichText 富文本',
        component: () => import('../views/rich-text/RichText.vue'),
        meta: { title: '其他' }
      },
      {
        path: '/scroll',
        name: 'Scroll 滚动',
        component: () => import('../views/scroll/Scroll.vue'),
      },
      {
        path: '/iframe',
        name: 'Iframe 内联框架',
        component: () => import('../views/iframe/Iframe.vue'),
      },
    ]
  },
  {
    path: '/form_design',
    name: 'FormDesign',
    component: () => import('../views/form-design/FormDesign.vue')
  },
  {
    path: '/test_page',
    name: 'coder',
    component: () => import('../views/form-design/test-page.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export { routes }
export default router

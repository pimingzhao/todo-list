import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createDb } from './utils'

import '@/styles/index.scss'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import './components' // 注册全局组件

import './permission'
Vue.use(ViewUI) // 路由拦截

Vue.config.productionTip = false;

(async () => {
  await createDb()
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()

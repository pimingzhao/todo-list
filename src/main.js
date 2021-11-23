import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createDb } from './utils'

import '@/styles/index.scss'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import './permission'
Vue.use(ViewUI)

Vue.config.productionTip = false;

(async () => {
  await createDb()
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import VueMeta from 'vue-meta'
import VConsole from 'vconsole'

import store from '@/store'

import fastclick from 'fastclick'
import axios from '@/api/axios'
import mock from '@/mock'

import './common/js/rem'
import './common/stylus/index.styl'
import './components/_register.js'
import '@/router/permission'

// 引入 Style 加载基础样式
import {
  // eslint-disable-next-line
  Style,
  Loading,
  Toast,
  Scroll,
  Dialog,
  Button,
  Checkbox,
  Input,
  IndexList,
  Form
} from 'cube-ui'

Vue.use(Scroll)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(IndexList)
Vue.use(Form)

// 单独设置页面的title和meta信息
Vue.use(VueMeta)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$mock = mock

fastclick.attach(document.body)

// // 开发环境开启vConsole
// if (process.env.NODE_ENV !== 'production') {
//   const vConsole = new VConsole()
//   console.log(vConsole.version)
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

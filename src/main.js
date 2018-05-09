import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment/moment.js'

import '@/styles/index.scss' // global css
import '@/assets/iconfont/iconfont.css' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import global_ from '@/utils/Global' // 引用模块进来
import '@/utils/permission' // permission control

window.author = 'yangqiong'

Vue.use(ElementUI)
Vue.prototype.moment = moment
Vue.prototype.Global = global_
Vue.config.productionTip = false
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

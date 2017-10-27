import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import '@/common/stylus/index.styl'
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

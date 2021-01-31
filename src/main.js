import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入字图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 全局挂载axios
import axios from 'axios'
// 配值请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

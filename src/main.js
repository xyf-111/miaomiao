import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 由于axios用到的地方比较多，所以可以在main.js文件中统一引入，使用方式:this.axios
import axios from 'axios'
Vue.prototype.axios = axios

// 由于过滤器用到的地方比较多，可以考虑做一个全局的过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace('/w.h/', arg)
})

//mini-ui的统一引入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

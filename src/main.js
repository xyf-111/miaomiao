import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 由于axios用到的地方比较多，所以可以在main.js文件中统一引入，使用方式:this.axios
import axios from 'axios'
Vue.prototype.axios = axios

// 由于图片过滤器用到的地方比较多，可以考虑做一个全局的过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace('/w.h/', arg)
})

//mini-ui的统一引入
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

// 由于页面滚动用到的地方比较多，可以考虑做一个全局的页面滚动组件
import Scroll from '@/components/Scroll'
Vue.component('Scroll', Scroll)

// 使用CSS3做一个全局的Loading动画
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

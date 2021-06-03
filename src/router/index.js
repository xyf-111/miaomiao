import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cimemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

// const routes = [

//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // 这是一种懒加载路由的方式，如果页面没有跳转到相关路由，则不会被加载，对于大项目来说，这种按需加载的方式更好一些
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 这里只配置一级路由
    movieRouter,
    cimemaRouter,
    mineRouter,
    {
      path: '/',
      redirect: '/movie'
    }
  ]
})

export default router

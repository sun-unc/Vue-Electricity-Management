import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/home',
      component: () => import('@/components/Home.vue')
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径离开
  // next() 表示放行，next('/login')强制跳转到指定路由
  const tokenStr = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    return next()
  } else if (!tokenStr) {
    return next('/login')
  } else {
    return next()
  }
})
export default router

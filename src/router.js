import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        type:''
      },
      component: Home
    },
    {
      path: '/pleaseLogin',
      name: 'pleaseLogin',
      meta:{
        type:''
      },
      component: () => import('./views/PleaseLogin.vue')
    }
  ]
})

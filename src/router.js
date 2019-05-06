import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:id',
      name: 'qusetion',
      component: () => import('./views/Question.vue')
    },
    {
      path: '*',
      name:'404',
      component:()=>import('./views/404.vue')
    }
  ]
})

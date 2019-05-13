import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
       needLogin:false,
       breadcrumb:[
         {
           name:'首页',
           path:'/'
         }
       ],
       login:false
      },
      component: () => import('./views/Home.vue')
    },
    {
      path:'/login',
      name:'login',
      meta:{
        needLogin:false,
        breadcrumb:[
          {
            name:'首页',
            path:'/'
          },
          {
            name:'登录',
            path:'#'
          }
        ],
        login:true
      },
      component:() => import('./views/Login.vue')
    },
    {
      path: '/question/:id',
      name: 'qusetion',
      meta:{
        needLogin:true,
        breadcrumb:[
          {
            name:'首页',
            path:'/'
          },
          {
            name:'问题详情',
            path:'#'
          }
        ],
        login:false
      },
      component: () => import('./views/Question.vue')
    },
    {
      path:'/changePwd',
      name:'changePwd',
      meta:{
        needLogin:true,
        breadcrumb:[
          {
            name:'首页',
            path:'/'
          },
          {
            name:'修改密码',
            path:'#'
          }
        ],
        login:false
      },
      component: ()=> import('./views/changePwd.vue')
    },{
      path:'/release',
      name:'release',
      meta:{
        needLogin:false,
        breadcrumb:[
          {
            name:'首页',
            path:'/'
          },
          {
            name:'更新说明',
            path:'#'
          }
        ],
        login:false
      },
      component: ()=> import('./views/Release.vue')
    },
    {
      path:'/favorite',
      name:'favorite',
      meta:{
        needLogin:true,
        breadcrumb:[
          {
            name:'首页',
            path:'/'
          },
          {
            name:'我的收藏',
            path:'#'
          }
        ],
        login:false
      },
      component:() => import('./views/Favorite.vue')
    },
    {
      path:'/star',
      name:'star',
      meta:{
        needLogin:true,
        breadcrumb:[
          {
            name:'首页',
            path:'/'
          },
          {
            name:'我的赞同',
            path:'#'
          }
        ],
        login:false
      },
      component:() => import('./views/Star.vue')
    },
    {
      path: '*',
      name:'404',
      meta:{
        needLogin:false,
        login:false
      },
      component:()=>import('./views/404.vue')
    }
  ]
})

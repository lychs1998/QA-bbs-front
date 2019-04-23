import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import router from './router'
// use
Vue.use(mavonEditor)
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
    if(to.meta.type==='login'){
      if(window.sessionStorage.getItem("uid")){
        next();
      }else{
        next('/PleaseLogin');
      }
    }else{
      next();
    }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

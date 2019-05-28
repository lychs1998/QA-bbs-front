import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueCookie from 'vue-cookie'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import SocketIO from 'socket.io-client'
import vueSnotify from 'vue-snotify'
import "vue-snotify/styles/simple.css";
import MescrollVue from 'mescroll.js/mescroll.vue'
import 'normalize.css'

Vue.config.productionTip = false
Axios.defaults.baseURL = 'api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$axios = Axios;
Vue.use(mavonEditor);
Vue.use(VueCookie);
Vue.use(vueSnotify);
Vue.use(MescrollVue);
var socket=SocketIO('http://10.66.28.177:2333/socket.io');

Vue.prototype.$socket = socket;

router.beforeEach((to, from, next) => {
  if(to.meta.needLogin){
    if(Vue.prototype.$cookie.get('token')!==null){
      next();
    }else{
      next('/login');
    }
  }else{
    if(to.meta.login&&Vue.prototype.$cookie.get('token')!==null){
      next('/');
    }else{
      next();
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

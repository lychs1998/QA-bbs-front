import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import router from './router'
import VueCookie from 'vue-cookie'
import Axios from 'axios'



// use
Vue.use(mavonEditor);
Vue.use(VueCookie);
Vue.config.productionTip = false;
Axios.defaults.baseURL = 'http://localhost/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.proxy={
  host: 'localhost',
  port: 8080
}
Vue.prototype.$axios = Axios;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')

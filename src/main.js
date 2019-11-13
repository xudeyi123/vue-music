import Vue from 'vue'
import App from './App.vue'
import './common/less/index.less'
import fastclick from 'fastclick'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:require('./common/image/default.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './common/less/index.less'
import fastclick from 'fastclick'
import router from './router'

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

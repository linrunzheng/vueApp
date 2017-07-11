import Vue from 'vue'
import App from './App'
import router from './router'
import base from './base/base.js'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

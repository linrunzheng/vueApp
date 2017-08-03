import Vue from 'vue'
import App from './App'
import router from './router'
import  './base/js/base.js'

/*滑动事件*/
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'});

/*ajax请求*/
import axios from 'axios'
Vue.use(axios);
Vue.prototype.$ajax=axios;

/*图片懒加载*/
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require('@/assets/head.jpg'),
    attempt: 1
})

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

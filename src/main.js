/* 
入口js
*/
import Vue from 'vue'
import 'swiper/css/swiper.min.css' 
import App from '@/App'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import './mock/mockServer'
import './validate'
import * as API from '@/api'  
Vue.config.productionTip = false // 去掉不是生产环境的提示
// 让所有组件对象可以直接看到API对象
Vue.prototype.$API = API
// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
// 给Vue原型对象指定事件总线对象(vm对象)
new Vue({
  beforeCreate() {
    // 给Vue原型对象指定事件总线对象(当前vm对象)
    Vue.prototype.$bus = this
  },
  render: h => h(App), 
  router, 
  store, 
}).$mount('#app')

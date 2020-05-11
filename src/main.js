import Vue from "vue";
import "swiper/css/swiper.min.css";
import App from "@/App";
import router from "./router";
import store from "./store";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import "./mock/mockServer";

Vue.config.productionTip = false; // 去掉不是生产环境的提示

// 注册全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App), 
  router, 
  store, 
}).$mount("#app");

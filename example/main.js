import Vue from "vue";
import App from "./App.vue";
// import "./index.less";

Vue.config.productionTip = false;
// console.log(VueMenu);
// Vue.use(VueMenu);
new Vue({
  render: h => h(App)
}).$mount("#app");

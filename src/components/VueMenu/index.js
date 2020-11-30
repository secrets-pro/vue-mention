import "./index.less";

import component from "./index.vue";
component.install = function(Vue) {
  Vue.component(component.name, component);
};
export default component;

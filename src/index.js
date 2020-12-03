import VueMention from "./components/VueMention";
import "./components/style/index.less";
const components = {
  VueMention
};
function install(Vue) {
  Object.keys(components).forEach(key => {
    components[key].install && components[key].install(Vue);
  });
}
if (window && window.Vue) install(window.Vue);
export { VueMention };
export default {
  ...components,
  install
};

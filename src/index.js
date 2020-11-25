import mention from "./components/VueMention";
const components = {
  mention
};
function install(Vue) {
  Object.keys(components).forEach(key => {
    components[key].install && components[key].install(Vue);
  });
}
if (window && window.Vue) install(window.Vue);
export { mention };
export default {
  ...components,
  install
};

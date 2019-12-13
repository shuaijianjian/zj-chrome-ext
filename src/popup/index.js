import Vue from "vue";
import AppComponent from "./App/App.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.component("app-component", AppComponent);
Vue.use(ElementUI, { locale });

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});

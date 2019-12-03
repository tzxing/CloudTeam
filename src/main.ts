import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from "./AxiosPlugin";

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

if (!(window as any).ElementUI) Vue.use(ElementUI);
if (!(window as any).AxiosPlugin) Vue.use(AxiosPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from "./AxiosPlugin";
import VueEcharts from 'vue-echarts-ts';

import ElementUI from 'element-ui';
import ECharts from 'echarts';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$echarts = ECharts

if (!(window as any).ElementUI) Vue.use(ElementUI);
if (!(window as any).AxiosPlugin) Vue.use(AxiosPlugin);
Vue.use(VueEcharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

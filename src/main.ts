import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import AxiosPlugin from "./AxiosPlugin";
import VueEcharts from 'vue-echarts-ts';
import ElementUI from 'element-ui';
import Highcharts from 'highcharts';
import ECharts from 'echarts';
import variablepie from 'highcharts/modules/variable-pie'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
variablepie(Highcharts)
Vue.prototype.$echarts = ECharts


if (!(window as any).ElementUI) Vue.use(ElementUI);
if (!(window as any).AxiosPlugin) Vue.use(AxiosPlugin);
Vue.use(VueEcharts);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

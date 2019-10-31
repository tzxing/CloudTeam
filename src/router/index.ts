import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

import ExternalIndex from '../views/ExternalViews/Index.vue'
import ExternalHome from '../views/ExternalViews/Home.vue'
import ExternalOurGroup from '../views/ExternalViews/OurGroup.vue'
import ExternalAcademic from '../views/ExternalViews/Academic.vue'
import ExternalInternational from '../views/ExternalViews/International.vue'
import ExternalCloudplantform from '../views/ExternalViews/Cloudplantform.vue'
import ExternalConnect from '../views/ExternalViews/Connect.vue'

import Internel from './internal';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: ExternalIndex,
    children: [
      { path: 'home', name: 'home', component: ExternalHome },
      { path: 'ourgroup', name: 'ourgroup', component: ExternalOurGroup },
      { path: 'academic', name: 'academic', component: ExternalAcademic },
      { path: 'international', name: 'international', component: ExternalInternational },
      { path: 'cloudplantform', name: 'cloudplantform', component: ExternalCloudplantform },
      { path: 'connect', name: 'connect', component: ExternalConnect },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  ...Internel
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/logout")
    (store.state as any).user.access_token = "";

  if ((to.path.startsWith('/internal'))
    && (store.state as any).user.access_token === "") {
    // console.warn("强制转跳到登陆页");
    next("/login");
  } else {
    next();
  }
});

export default router

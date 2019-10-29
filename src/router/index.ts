import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';
import Internel from './internal';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    console.warn("强制转跳到登陆页");
    next("/login");
  } else {
    next();
  }
});

export default router

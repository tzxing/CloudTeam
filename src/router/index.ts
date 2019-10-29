import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/")
      (store.state as any).user.access_token = "";

  if ((to.path !== "/" && to.path !== "/register" && to.path !== "/finished")
      && (store.state as any).user.access_token === "") {
      console.warn("强制转跳到根页");
      next("/");
  } else {
      next();
  }
});

export default router

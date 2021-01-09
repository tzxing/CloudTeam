import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import LoginPage from "@/views/Login.vue";

if (!(window as any).VueRouter) Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Workflow/Index.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/Workflow/Dashboard.vue"),
      },
      {
        path: "basetable",
        name: "basetable",
        component: () => import("@/views/Workflow/BaseTable.vue"),
      },
      // { path: 'baseform', name: 'baseform', component: () => import("@/views/InternalViews/Workflow/BaseForm.vue") },
      {
        path: "wflistable",
        name: "wflistable",
        component: () => import("@/views/Workflow/WflistTable.vue"),
      },
      {
        path: "wflistable/wfsdetails",
        name: "wflistable/wfsdetails",
        component: () => import("@/views/Workflow/WFSDetails.vue"),
      },
      {
        path: "wflistable/wfsedit",
        name: "wflistable/wfsedit",
        component: () => import("@/views/Workflow/WFSEdit.vue"),
      },

      {
        path: "userinfo",
        name: "userinfo",
        component: () => import("@/views/Workflow/UserInfo.vue"),
      },
      {
        path: "baseform",
        name: "baseform",
        component: () => import("@/views/Workflow/BaseForm.vue"),
      },
      {
        path: "workflowjoblist",
        name: "workflowjoblist",
        component: () => import("@/views/Workflow/WorkflowJobList.vue"),
      },
      //{ path: 'workflowjoblist', name: 'workflowjoblist', component: () => import("@/views/InternalViews/Workflow/WorkflowJob.vue") },

      {
        path: "workflowjob",
        name: "workflowjob",
        component: () => import("@/views/Workflow/WorkflowJob.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/logout") (store.state as any).user.access_token = "";

  if (to.path !== "/login" && (store.state as any).user.access_token === "") {
    console.warn("强制转跳到登陆页");
    next("/login");
  } else {
    next();
  }
});

//增加一个后置的钩子，用于改变页面的标题
// router.afterEach((to, from) => {
//   store.commit('committitle',to.meta.title) ;
// })

export default router;

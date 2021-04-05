import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import LoginPage from "@/views/Login.vue";

if (!(window as any).VueRouter) Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/Index.vue"),
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
            },
            {
                path: "wflistable",
                name: "wflistable",
                component: () => import("@/views/WflistTable.vue"),
            },
            {
                path: "wflistable/wfsdetails",
                name: "wflistable/wfsdetails",
                component: () => import("@/views/WFSDetails.vue"),
            },
            {
                path: "wflistable/wfsedit",
                name: "wflistable/wfsedit",
                component: () => import("@/views/WFSEdit.vue"),
            },

            {
                path: "userinfo",
                name: "userinfo",
                component: () => import("@/views/UserInfo.vue"),
            },
            {
                path: "workflowjoblist",
                name: "workflowjoblist",
                component: () => import("@/views/WorkflowJobList.vue"),
            },
            {
                path: "workflowjob",
                name: "workflowjob",
                component: () => import("@/views/WorkflowJob.vue"),
            },
        ],
    },
    {
        path: '/prediction', name: 'prediction',
        component: () => import("@/views/Prediction/Index.vue"),
        children: [
            { path: 'dashboard', name: 'dashboard', component: () => import("@/views/Prediction/Dashboard.vue") },
            { path: 'forecast', name: 'forecast', component: () => import("@/views/Prediction/Forecast.vue") },
            { path: 'decompose', name: 'decompose', component: () => import("@/views/Prediction/DecomposeList.vue") },
            { path: 'hard-decompose', name: 'hard-decompose', component: () => import("@/views/Prediction/HardDecomposeList.vue") },
            { path: 'pod-decompose', name: 'pod-decompose', component: () => import("@/views/Prediction/PodDecomposeList.vue") },
            { path: 'metrics', name: 'metrics', component: () => import("@/views/Prediction/Metrics.vue") },
            { path: 'server/:serverName/metrics', name: 'metrics-server', component: () => import("@/views/Prediction/Metrics.vue") },
            { path: 'userinfo', name: 'userinfo', component: () => import("@/views/Prediction/UserInfo.vue") },
            { path: 'server-list', name: 'server-list', component: () => import("@/views/Prediction/ServerList.vue") },
            { path: 'server/:serverName/predict', name: 'server-forecast', component: () => import("@/views/Prediction/Forecast.vue") },
            { path: 'server/:serverName/decompose', name: 'server-decompose', component: () => import("@/views/Prediction/Decompose.vue") },
            { path: 'server/:serverName/hard-decompose', name: 'server-hard-decompose', component: () => import("@/views/Prediction/HardDecompose.vue") },
            { path: 'vm/:vmName/decompose', name: 'vm-decompose', component: () => import("@/views/Prediction/Decompose.vue") },
            { path: 'vm-list/:vmName', name: 'vm-list', component: () => import("@/views/Prediction/VmList.vue") },
            { path: 'pod-list/:podName', name: 'pod-list', component: () => import("@/views/Prediction/PodList.vue") },
            { path: 'pod/:podName/predict', name: 'pod', component: () => import("@/views/Prediction/Forecast.vue") },
            { path: 'pod/:podName/decompose', name: 'pod', component: () => import("@/views/Prediction/PodDecompose.vue") },
        ]
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

    if ((to.path != "/login" && to.path != "/signup") && (store.state as any).user.access_token === "") {
        // console.warn("强制转跳到登陆页");
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

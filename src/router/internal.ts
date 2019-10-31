
export default [{
    path: '/internal',
    name: 'internal',
    component: () => import("@/views/InternalViews/Index.vue"),
    children: [
        {
            path: 'workflow', name: 'workflow',
            component: () => import("@/views/InternalViews/Workflow/Index.vue"),
        },
        {
            path: 'smartcar', name: 'smartcar',
            component: () => import("@/views/InternalViews/SmartCar/Index.vue"),
        },
        {
            path: 'parkinson', name: 'parkinson',
            component: () => import("@/views/InternalViews/ParkinsonMedical/Index.vue"),
        },
        {
            path: 'deep_space', name: 'deep_space',
            component: () => import("@/views/InternalViews/DeepSpace/Index.vue"),
        },
    ],
}]
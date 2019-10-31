
export default [
    {
        path: '/internal', name: 'internal',
        component: () => import("@/views/InternalViews/Index.vue"),
    },
    {
        path: '/internal/workflow', name: 'workflow',
        component: () => import("@/views/InternalViews/Workflow/Index.vue"),
    },
    {
        path: '/internal/smartcar', name: 'smartcar',
        component: () => import("@/views/InternalViews/SmartCar/Index.vue"),
    },
    {
        path: '/internal/parkinson', name: 'parkinson',
        component: () => import("@/views/InternalViews/ParkinsonMedical/Index.vue"),
    },
    {
        path: '/internal/deep_space', name: 'deep_space',
        component: () => import("@/views/InternalViews/DeepSpace/Index.vue"),
    },
]
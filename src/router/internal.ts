
export default [{
    path: '/internal',
    name: 'internal',
    component: () => import("@/views/InternalViews/Index.vue"),
    children: [
        {
            path: 'workflow', name: 'workflow',
            component: () => import("@/views/InternalViews/Workflow/Index.vue"),
        },
    ],
}]
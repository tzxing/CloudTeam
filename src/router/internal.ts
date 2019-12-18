
export default [
    {
        path: '/internal', name: 'internal',
        component: () => import("@/views/InternalViews/Index.vue"),
    },
    {
        path: '/internal/workflow', name: 'workflow',
        component: () => import("@/views/InternalViews/Workflow/Index.vue"),
        children: [
            { path: 'dashboard', name: 'dashboard', component: () => import("@/views/InternalViews/Workflow/Dashboard.vue") },
            { path: 'basetable', name: 'basetable', component: () => import("@/views/InternalViews/Workflow/BaseTable.vue") },
            // { path: 'baseform', name: 'baseform', component: () => import("@/views/InternalViews/Workflow/BaseForm.vue") },
            { path: 'wflistable', name: 'wflistable', component: () => import("@/views/InternalViews/Workflow/WflistTable.vue") },
            { path:'wflistable/wfsdetails',name:'wflistable/wfsdetails',component:() => import("@/views/InternalViews/Workflow/WFSDetails.vue")},

            { path: 'userinfo', name: 'userinfo', component: () => import("@/views/InternalViews/Workflow/UserInfo.vue") },
            { path: 'baseform', name: 'baseform', component: () => import("@/views/InternalViews/Workflow/BaseForm.vue") }
        ]
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
    {
        path: '/internal/general_computing', name: 'general_computing',
        component: () => import("@/views/InternalViews/GeneralComputing/Index.vue"),
        children: [
            { path: 'addtask', name: 'addtask', component: () => import("@/views/InternalViews/GeneralComputing/AddTaskView.vue") },
            { path: 'tasklist', name: 'tasklist', component: () => import("@/views/InternalViews/GeneralComputing/TaskListView.vue") }
        ]
    }
]
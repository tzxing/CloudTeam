
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
            { path:'wflistable/wfsedit',name:'wflistable/wfsedit',component:() => import("@/views/InternalViews/Workflow/WFSEdit.vue")},

            { path: 'userinfo', name: 'userinfo', component: () => import("@/views/InternalViews/Workflow/UserInfo.vue") },
            { path: 'baseform', name: 'baseform', component: () => import("@/views/InternalViews/Workflow/BaseForm.vue") },
            { path: 'workflowjoblist', name: 'workflowjoblist', component: () => import("@/views/InternalViews/Workflow/WorkflowJobList.vue") },
            //{ path: 'workflowjoblist', name: 'workflowjoblist', component: () => import("@/views/InternalViews/Workflow/WorkflowJob.vue") },

            { path: 'workflowjob', name: 'workflowjob', component: () => import("@/views/InternalViews/Workflow/WorkflowJob.vue") }
        ]
    },
    {
        path: '/internal/smartcar', name: 'smartcar',
        component: () => import("@/views/InternalViews/SmartCar/Index.vue"),
    },
    {
        path: '/internal/parkinson', name: 'parkinson', redirect: '/internal/parkinson/dashboard',
        component: () => import("@/views/InternalViews/ParkinsonMedical/Index.vue"),
        children: [
            { path: 'dashboard', component: () => import("@/views/InternalViews/ParkinsonMedical/dashboard.vue"), meta:{title:"首页"} },
            { path: 'data', name: 'data', component: () => import("@/views/InternalViews/ParkinsonMedical/data.vue"), meta:{title:"个人资料管理"}},
            { path: 'password', name: 'password', component: () => import("@/views/InternalViews/ParkinsonMedical/password.vue"), meta:{title:"密码管理"} },
            { path: 'pardata', name: 'pardata', component: () => import("@/views/InternalViews/ParkinsonMedical/pardata.vue"), meta:{title:"数据查看"} },
            { path: 'data_detail', name: 'data_detail', component: () => import("@/views/InternalViews/ParkinsonMedical/data_detail.vue") },
            { path: 'prescription', name: 'prescription', component: () => import("@/views/InternalViews/ParkinsonMedical/prescription.vue"), meta:{title:"处方"} }
        ]
    },
    {
        path: '/internal/parkinsonsignup', name: 'parkinsonsignup',
        component: () => import("@/views/InternalViews/ParkinsonMedical/datainput.vue")
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
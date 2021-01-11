import axios from "axios";
import store from "./store";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
    interface Vue {
        $axios: AxiosInstance;
    }
}

export const Axios = axios.create({ baseURL: "/api", timeout: 10000 });


//mock 模拟数据
 const MockAdapter = require("axios-mock-adapter");
 const mock = new MockAdapter(Axios);
 //模拟工作流列表
 mock.onGet("/api/wfs/workflow_list/WFFInfo").reply(200,[{'wf_id':"a", 'date':"2020-9-1",'name':"zc"}]);
 mock.onGet("/api/wfs/workflow_list/WFTInfo").reply(200,[{'wf_id':"b", 'date':"2020-9-1",'name':"zc1"}]);
 mock.onPost("/api/wfs/workflows/a/execute").reply(200,"zc");
 mock.onGet("/api/wfs/workflowJobs/zc").reply(200,"[{name: 'A', dependencies: [], id: '1', template: 'alpine: 3.7', style_type: 'success'}, {name: 'B', dependencies: ['A'], id: '2', template: 'alpine: 3.7', style_type: 'normal'}, {name: 'C', dependencies: ['A'], id: '3', template: 'alpine: 3.7', style_type: 'disable'}, {name: 'D', dependencies: ['B', 'C'], id: '4', template: 'alpine: 3.7', style_type: 'success'}]");
//模拟登录
mock.onPost("/api/users/login").reply(200,{access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMyIsInVzZXJuYW1lIjoiaGFoYSIsImVtYWlsIjoiMTIzIiwicm9sZSI6MX0.SPjFd-QZ9TG9QHdA0_3Dz4hclw0PRUOBOqP401IlXQI"
,username:"管理员",stuid:"3220191001",role:"admin"});
// 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
    if ((store.state as any).user.access_token !== "") {
        config.headers.Authorization = "Bearer " + (store.state as any).user.access_token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 返回状态判断(添加响应拦截器)
/* Axios.interceptors.response.use(res => { //对响应数据做些事
    if (!res.data.success) {
        alert(res.error_msg)
        return Promise.reject(res)
    }
    return res
}, error => {
    if (error.response.status === 401) {
        // 401 说明 token 验证失败
        // 可以直接跳转到登录页面，重新登录获取 token
        location.href = '/login'
    } else if (error.response.status === 500) {
        // 服务器错误
        // do something
        return Promise.reject(error.response.data)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
})
//*/

export default {
    install(vue: any) {
        Object.defineProperty(vue.prototype, "$axios", { value: Axios });
    }
};

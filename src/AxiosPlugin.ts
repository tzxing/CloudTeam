import axios from "axios";
import store from "./store";
import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
    interface Vue {
        $axios: AxiosInstance;
    }
}

export const Axios = axios.create({ baseURL: "/api", timeout: 10000 });

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

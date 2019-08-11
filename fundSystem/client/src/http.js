import axios from 'axios';
import {Loading,Message} from 'element-ui';
import router from './router'


let loading;
function startLoading(){
    loading = Loading.service({
        lock:true,
        text:"拼命加载中",
        background:"rgba(0,0,0,0.7)"
    });
}

function endLoading(){
    loading.close();
}
//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画效果
    startLoading();
    if (lalStorage.eleToken){
        config.hoceaders.Authorization = localStorage.eleToken}
    return config;
}),error=>{
    return Promise.reject(error);
};
//响应拦截
axios.interceptors.response.use(response=>{
    //结束加载动画
    endLoading();
    return response;
}),error=>{
    endLoading();
    Message.error(error.response.data);
    const { status } = error.response
    if (status == 401) {
        Message.error('token值无效，请重新登录')
        // 清除token
        localStorage.removeItem('eleToken')

        // 页面跳转
        router.push('/login')
    }
    return Promise.reject(error);
}
export default axios;
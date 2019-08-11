import axios from 'axios';
import {Loading} from 'element-ui';

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
//响应拦截
export default axios;
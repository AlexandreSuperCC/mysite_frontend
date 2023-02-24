import axios from "axios";
import {baseURL} from "@/network/api";
import {ElMessageBox} from "element-plus";
import store from "@/store"

export function request(config){
    const instance1 = axios.create({
        baseURL:baseURL,
        timeout:60000//change this variable to avoid frequent bad response
    })

    //add by ycao 1101 : request handler
    instance1.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    instance1.interceptors.request.use(config=>{
        if(config.method==='post'){
            config.data = JSON.stringify(config.data)//这样发送请求，虽然是可以发送，但是携带的参数，是一个json字符串，会出现问题。所以我们在用post发送请求的时候，需要这样
            // config.headers= { 'content-type': 'application/x-www-form-urlencoded' };
        };
        //verify if token is existed, if yes, add token to each http header
        if(sessionStorage.getItem("token")){
            config.headers.Authorization = `{token: ${sessionStorage.getItem('token')}}"`
            // console.log("for test: Authorization: "+config.headers.Authorization)
        }
        return config;
    },
        error => {
            console.log(error);
            return Promise.reject(error)
        })

    //interceptors:only take the data out
    /*
    instance1.interceptors.response.use(res=>{
        return res.data;
    },error => {
        interceptorHandler(error)
        return Promise.reject(error)
    })
    */
    instance1.interceptors.response.use(
        response=>{
            const adminPages = store.getters.constants.adminPages

            if(adminPages.indexOf(response.config.url)===-1&&response.config.url!=='/login'){//coming from the pages not authorized
                return response.data;
            }else{
                //下面我是进行一个时间的一个对比；如果前台进行一个三十分钟没有操作的话会进行一个重新登入状态；重新登入时候后台会重新生成一个新token；从而不要担心后端token的一个刷新导致前端token不相同问题。
                let today = new Date().getTime();
                if(sessionStorage.getItem("nowTime")!=null){
                    if(today-sessionStorage.getItem("nowTime")>1000*60*30){
                        //add by ycao resolve the problem : after 30m, it should login twice
                        ElMessageBox.alert("Your session is about to expire. Do you want to extend the duration of the current session?","No activity recently",{
                            confirmButtonText:'Extend session duration',
                            showCancelButton: true,
                            callback:(action)=>{
                                if(action!='confirm') {//不延长session
                                    sessionStorage.removeItem('token');
                                    sessionStorage.removeItem('nowTime');
                                    window.location.replace("/login")
                                }else{
                                    sessionStorage.removeItem('nowTime');
                                    store.commit('set_time',today);//延长session。
                                }
                            }
                        }).catch(r => console.log(r))
                        // location.reload()
                        return;
                    }else{
                        sessionStorage.removeItem('nowTime');
                        store.commit('set_time',today);//每一次请求都会添加新的一个时间从而进行保存。
                        return response.data;
                    }
                }else{
                    //如果是今天第一次请求的话那就把时间添加进去
                    store.commit('set_time',today)////退出登入后再一次登入会进行添加这一次登入时间。
                    return response.data;
                }
            }
        },error => {
            interceptorHandler(error)
        }
    )
    return instance1(config)
}

/**
 * used for handling the response for backend-api
 * @param axios error response
 * @return
 */
function interceptorHandler(error){
    let alertMes = "error!"
    if(error.response){//防止长时间未响应 status变undefined
        switch (error.response.status) {
            case 401:
                ElMessageBox.alert("No token yet, please login", "Attention!", {
                    confirmButtonText: 'OK',
                    callback: () => {
                        const redirect= JSON.stringify({
                            'url':window.location.pathname,
                          })
                        window.location.replace("/login"+"?redirect="+redirect)
                    }
                }).catch(r => console.log(r))
                break;
            case 402:
                //add by ycao 20220313
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('nowTime');
                ElMessageBox.alert("Invalid token, please re-login", "Attention!", {
                    confirmButtonText: 'OK',
                    callback: () => {
                        const redirect= JSON.stringify({
                            'url':window.location.pathname,
                          })
                        window.location.replace("/login"+"?redirect="+redirect)
                    }
                }).catch(r => console.log(r))
                break;
            case 404:
                ElMessageBox.alert("Resource not found, please try again", "Attention!", {
                    confirmButtonText: 'OK',
                    callback: () => {
                        const redirect= JSON.stringify({
                            'url':window.location.pathname,
                          })
                        window.location.replace("/login"+"?redirect="+redirect)
                    }
                }).catch(r => console.log(r))
                break;
            default:
                console.log(error);
                ElMessageBox.alert("Unknown error, please try again", "Attention!", {
                    confirmButtonText: 'OK',
                    callback: () => {
                        window.location.replace("/")
                    }
                }).catch(r => console.log(r))
                break;
        }
    }else{
        ElMessageBox.alert("No response from server, please try again", "Attention!", {
            confirmButtonText: 'OK',
            callback: () => {}
        }).catch(r => console.log(r))
    }

}
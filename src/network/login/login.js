import {request} from "@/network/request";

export function login(username,password,rememberMe){
    return request({
        url:'/login',
        method:'post',
        data:{
            username,
            password,
            rememberMe,
        }
    })
}
export function logout(){
    return request({
        url:'/logout',
        method:'get'
    })
}
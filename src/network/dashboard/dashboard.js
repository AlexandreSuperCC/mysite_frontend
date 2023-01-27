import {request} from "@/network/request";

export function getAllLogs (){
    return new Promise((resolve,reject) => {
        request({
            url:'/db/allLogs',
            method:'get',
        }).then(data=>resolve(data))
            .catch(err=>reject(err))
    })
}
export function getLoginLogs (){
    return new Promise((resolve,reject) => {
        request({
            url:'/db/loginLogs',
            method:'get',
        }).then(data=>resolve(data))
            .catch(err=>reject(err))
    })
}
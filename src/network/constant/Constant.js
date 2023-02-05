import {request} from "@/network/request";

export function getConstant(userId,domain){
    return new Promise((resolve,reject)=>{
        request({
            url:'/baseData',
            method:'get',
            params:{//we should use params in GET
                userId:userId,
                domain:domain
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
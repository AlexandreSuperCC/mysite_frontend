import {request} from "@/network/request";
import axios from "axios";
import {baseURL} from "@/network/api";

export function uploadFile(params){
    //use raw axios
    return axios.post(baseURL+'/home/uploadFile',params,{
        headers:{"content-type":"multipart/form-data"}
    })

    // request({
    //     url:'/home/uploadFile',
    //     method:'post',
    //     data:{
    //         params,
    //     },
    //     headers:{"content-type":"multipart/form-data"},
    // })
}
export function getAllUploadFile(param){
    return new Promise((resolve,reject) => {
        request({
            url:'/home/getUploadFiles',
            method:'post',
            // headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data:{
                param
            }
        }).then(data=>resolve(data))
            .catch(err=>reject(err))
    })
}
export function deleteOneFile(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/home/deleteOneFile',
            method:'post',
            data:{
                param
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}

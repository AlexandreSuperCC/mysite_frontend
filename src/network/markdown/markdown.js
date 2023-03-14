import {request} from "@/network/request";
/**
 * used for save the markdown file synchronously
 * @param
 * @return
 */
export function saveMarkdown(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/home/saveMarkdown',
            method:'post',
            data:{
                param
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function getAllCategory(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/home/getAllCategory',
            // dataType: 'jsonp',//后期加上的safari访问报错：...is not allowed by Access-Control-Allow-Origin.=》实际上是safari开发工具里停用跨域限制
            method:'get',
            params:{//we should use params in GET
                userId:param
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function getOneMd(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/home/getOneFile',
            method:'get',
            params:{
                mid:param,
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
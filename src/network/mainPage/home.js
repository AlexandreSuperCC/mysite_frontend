import {request} from "@/network/request";

//i was stuck here because in home.vue i use [then] without Promise here => Promise must be used
export function getHomeData (){
    return new Promise((resolve,reject) => {
        request({
            url:'/index/article',
            method:'get',
        }).then(data=>resolve(data))
            .catch(err=>reject(err))
    })

}
export function deleteOneFile(fid){
    return new Promise((resolve,reject)=>{
        request({
            url:'/home/deleteOneFile',
            method:'get',
            params:{
                mid:fid,
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function deleteCatFilesIn(cname,curUserId){
    return new Promise((resolve,reject)=>{
        request({
            url:'/home/deleteCatFiles',
            method:'get',
            params:{
                cname:cname,
                userId:curUserId
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
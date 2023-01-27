import {getAllLogs,getLoginLogs} from "@/network/dashboard/dashboard";

const dashboard = {
    actions:{
        GetAllLogs(context,params){
            return new Promise((resolve,reject)=>{
                getAllLogs(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetLoginLogs(context,params){
            return new Promise((resolve,reject)=>{
                getLoginLogs(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
    }
}

export default dashboard
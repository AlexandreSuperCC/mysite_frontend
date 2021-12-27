import {deleteOneFile, getAllUploadFile, uploadFile} from "@/network/upload/upload";

const upload = {
    actions:{
        UploadFile(context,params){
            return new Promise((resolve,reject)=>{
                uploadFile(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetAllUploadFile(context,params){
            return new Promise((resolve,reject)=>{
                getAllUploadFile(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        DeleteOneFile(context,params){
            return new Promise((resolve,reject)=>{
                deleteOneFile(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        }
    }
}

export default upload
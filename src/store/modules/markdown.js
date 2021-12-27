import {getAllCategory, saveMarkdown} from "@/network/markdown/markdown";

const markdown = {
    actions:{
        SaveMarkdownRealTime(context,params){
            return new Promise((resolve,reject)=>{
                saveMarkdown(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetAllCategory(context,param){
            return new Promise((resolve,reject)=>{
                getAllCategory(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        }
    }
}

export default markdown
import {getConstant} from "@/network/constant/Constant";
import store from "@/store"

export function isArrayToArray(str){
    if(str){
        if(str.startsWith('[')&&str.endsWith(']')){
            str = str.substring(1,str.length-1).replace(/'/g, '')//remove the [] and the '' in the string
            return str.split(',')
        }else{
            return str
        }
    }else{
        return ""
    }
}

export function setConstants(id,domain,successFallback,failFallback){
    getConstant(id,domain).then(data=>{
        data.data.forEach(constant => {
          store.commit('set_constants',{name:constant.name,value: isArrayToArray(constant.content)})//把sign放入vuex，后续MyStory也会用到
        });
        successFallback&&successFallback()
    }).catch(err=>{
        console.log(err)
        failFallback&&failFallback()
    })
}
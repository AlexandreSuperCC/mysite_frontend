import {getConstant} from "@/network/constant/Constant";
import store from "@/store"
import {ElMessageBox} from "element-plus";

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
        data.data&&data.data.forEach(constant => {
          store.commit('set_constants',{name:constant.name,value: isArrayToArray(constant.content)})//把sign放入vuex，后续MyStory也会用到
        });
        successFallback&&successFallback()
    }).catch(err=>{
        console.log(err)
        failFallback&&failFallback()
    })
}

export function loginRequiredMethodsCheck(){
    if(!sessionStorage.getItem('token')||store.getters.userRole!==0){
        ElMessageBox.alert("Not authorized! Please login!","Sorry!",{
          confirmButtonText:'OK'
        })
        return true;
    }
    return false;
}
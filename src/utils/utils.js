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
    if(!sessionStorage.getItem('token')
    &&!localStorage.getItem('token')
    // ||store.getters.userRole!==0
    ){
        ElMessageBox.alert("Not authorized! Please login!","Sorry!",{
          confirmButtonText:'OK'
        })
        return true;
    }else{
        return false;
    }
}

export function isLoginCheck(){
    if(!sessionStorage.getItem('token')
    &&!localStorage.getItem('token')
    // ||store.getters.userRole!==0
    ){
        return false;
    }else{
        return true;
    }
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }

export function copyToClipboard(content){
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      unsecuredCopyToClipboard(content);
    }
};
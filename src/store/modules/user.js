import {login, logout} from "@/network/login/login";

const user={
    actions:{
        //login
        Login(context,userInfo){
            const username = userInfo.username.trim();
            return new Promise((resolve,reject)=>{
                login(username,userInfo.password).then(response=>{
                    // context.commit('')
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        LogOut(context){
            return new Promise((resolve,reject) => {
                logout().then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}

export default user;
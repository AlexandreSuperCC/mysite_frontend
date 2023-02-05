/**
 * thanks to     window.addEventListener('unload',this.saveStateToken)
                 window.addEventListener('load',this.clearStateToken)
   in UploadFile.vue
   we can prevent loss of data after refreshing
   在vue项目中用vuex来做全局的状态管理， 发现当刷新网页后，保存在vuex实例store里的数据会丢失。
   原因：因为store里的数据是保存在运行内存中的,当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值初始化

   因为加了上述防止数据将丢失的方法这个token.js不止局限于存储token等方面的参数
   该充当了比如存储sign等数据角色的作用
 * module for saving token in vuex
 * @param
 * @return
 */
const token={
    //to prevent the lost of data after refreshing
    state: sessionStorage.getItem('stateToken')?JSON.parse(sessionStorage.getItem('stateToken'))
        :{
        token:'',
        userId:'',
        userRole:'',
        nowTime:'',
        constants:{
            adminPages:[]
        },
        cacheEnable:true,
        // curIndex:'1',//used widely: store the current index of the page so that the related icon of the mainFrame will be selected after refreshing
    },
    getters:{
        userRole:state=>state.userRole,
        constants:state=>state.constants,
        cacheEnable:state=>state.cacheEnable,
    },
    mutations:{
        set_constants(state,object){
            state.constants[object.name] = object.value
        },
        set_cacheEnable(state,object){
            state.cacheEnable = object.cacheEnable
        },
        set_token(state,object){
            state.token = object.token
            state.userId = object.userId
            state.userRole = object.userRole
            sessionStorage.token = object.token
        },
        del_token(state){
            state.token = ''
            state.userId = ''
            state.userRole = ''
            sessionStorage.removeItem('token')
        },
        //the time of saving
        set_time(state,nowTime){
            state.nowTime=nowTime;
            sessionStorage.nowTime=nowTime
        },
        del_time(state){
            state.nowTime='';
            sessionStorage.removeItem('nowTime')
        }
    },
    actions:{

    }
}

export default token;
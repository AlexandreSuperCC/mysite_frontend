/**
 * thanks to     window.addEventListener('unload',this.saveStateToken)
                 window.addEventListener('load',this.clearStateToken)
   in UploadFile.vue
   we can prevent loss of data after refreshing

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
        nowTime:'',
        // curIndex:'1',//used widely: store the current index of the page so that the related icon of the mainFrame will be selected after refreshing
    },
    mutations:{
        set_token(state,object){
            state.token = object.token
            state.userId = object.userId
            sessionStorage.token = object.token
        },
        del_token(state){
            state.token = ''
            state.userId = ''
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
<template>
  <Slide width="200" v-if="$route.path!=='/home/aboutme'">
    <a id="love-create">
      <span id="show-text">
        CKLOVERY
      </span>
    </a>
    <a id="my-article" href="/home/article">
      <span>Home</span>
    </a>
    <a id="my-info" href="/home/aboutme">
      <span>About Me</span>
    </a>
    <a id="my-story" href="/home/myStory">
      <span>My Story</span>
    </a>
    <a id="my-project" href="/home/myProject">
      <span>My Project</span>
    </a>
    <a id="markdown-editor-menu" href="/home/markdown" v-if="role===0">
      <span>Markdown Editor</span>
    </a>
    <a id="upload-file" href="/home/uploadFile" v-if="role===0">
      <span>Upload File</span>
    </a>
    <a id="logout" href="#" @click="exitEvent">
      <span style="font-size: medium">
         <el-icon size="24"><SwitchButton /></el-icon>
        Exit
      </span>
    </a>
    <a id="site-git" href="https://github.com/AlexandreSuperCC/mysite_frontend_public" target="_blank">
      <span style="font-family: STLiti;font-size: medium;font-weight: normal">Code Source<br>See me on github ^_^</span>
    </a>
  </Slide>
</template>

<script>

import {ElMessageBox} from "element-plus";
import { Slide } from 'vue3-burger-menu'

export default {
  name: "MainFrame",
  components:{
    Slide
  },
  mounted() {
  },
  watch:{
  },
  data(){
    return {
      // activeIndex:this.$store.state.token.curIndex,
      // activeIndex2:'2',
      disableUpload:false,
      role:this.$store.getters.userRole,
    }
  },
  methods:{
    handleSelect(){

    },
    exitEvent(){
      //tell the backend to clear session
      this.$store
          .dispatch("LogOut")
          .then(res=>{
            this.$store.commit("del_token");
            this.$store.commit("del_time");
            if(res&&res.code&&res.code==='success'){//normal case
              ElMessageBox.alert(res.msg+", click 'OK' to return to the login page",{
                confirmButtonText:'OK',
                callback:()=>{
                  //pay attention to the order of the three phrases, sync action will come before async
                  //so token is null when execute Logout
                  this.$router.replace('/login');
                }
              })
            }else{//not normal case, perhaps due to unknown error or long-time no interaction
              if(res&&res.msg){
                ElMessageBox.alert(res.msg+", error1!","Attention!",{
                  confirmButtonText:'OK',
                  callback:()=>{
                    this.$router.replace('/login')
                  }
                })
              }
              this.$router.replace('/login')//long time no interaction, 'no res.msg' error occurs
            }
          })
          .catch(err=>{//rare case
            console.log(err);
            ElMessageBox.alert(err+", error!","Attention!",{
              confirmButtonText:'OK'
            })
      });
    },

    ignoreEvent(){

    },
  }
}
</script>
<style scoped>
@import '../../assets/style/menu-bar.css';
#show-text{
  font-family: Castellar;
  font-size: 18px;
  color: antiquewhite;
}
.exit-btn{
  /*不会随着下滑往下动*/
  position: absolute;
  margin-top: 18px;
  right: 5px
}
</style>
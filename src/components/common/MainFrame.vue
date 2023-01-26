<template>
  <Slide width="200" v-if="$route.path!=='/home/aboutme'">
    <a id="love-create">
      <span id="show-text">
        CKLOVERY
      </span>
    </a>
    <a id="my-article" href="#" @click.native.prevent="getRoute('article')">
      <span>Home</span>
    </a>
    <a id="my-info" href="#" @click.native.prevent="getRoute('aboutme')">
      <span>About Me</span>
    </a>
    <a id="my-story" href="#" @click.native.prevent="getRoute('myStory')">
      <span>My Story</span>
    </a>
    <a id="my-project" href="#" @click.native.prevent="getRoute('myProject')">
      <span>My Project</span>
    </a>
    <a id="markdown-editor-menu" href="#" @click.native.prevent="getRoute('markdown')" v-if="role===0">
      <span>Markdown Editor</span>
    </a>
    <a id="upload-file" href="#" @click.native.prevent="getRoute('uploadFile')" v-if="role===0">
      <span>Upload File</span>
    </a>
    <a id="admin-login" href="#" @click.native.prevent="smallExitEvent">
      <span>Admin Login</span>
    </a>
    <a id="logout" href="#" @click.native.prevent="exitEvent">
      <span style="font-size: medium">
         <el-icon size="24"><SwitchButton /></el-icon>
        Exit
      </span>
    </a>
    <el-checkbox v-model="enableCache">Enable Cache</el-checkbox>
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
  data(){
    return {
      // activeIndex:this.$store.state.token.curIndex,
      // activeIndex2:'2',
      disableUpload:false,
      role:this.$store.getters.userRole,
      enableCache:this.$store.getters.cacheEnable,
    }
  },
  methods:{
    handleSelect(){

    },
    getRoute(cpn){
      if(this.enableCache){
        switch (cpn) {
        case 'article':
          return this.$router.push('/home/article')
        case 'aboutme':
          return this.$router.push('/home/aboutme')
        case 'myStory':
          return this.$router.push('/home/myStory')
        case 'myProject':
          return this.$router.push('/home/myProject')
        case 'markdown':
          return this.$router.push('/home/markdown')
        case 'uploadFile':
          return this.$router.push('/home/uploadFile')
        default:
          break;
      }
      }else{
        switch (cpn) {
        case 'article':
          return window.location.replace('/home/article')
        case 'aboutme':
          return window.location.replace('/home/aboutme')
        case 'myStory':
          return window.location.replace('/home/myStory')
        case 'myProject':
          return window.location.replace('/home/myProject')
        case 'markdown':
          return window.location.replace('/home/markdown')
        case 'uploadFile':
          return window.location.replace('/home/uploadFile')
        default:
          break;
      }
      }
    },
    smallExitEvent(){
      const token = sessionStorage.getItem('token')
      if (token) {//when it is already logged in
        this.exitEvent()
      }else{
        this.$router.push('/login');
      }
    },
    exitEvent(){
      //tell the backend to clear session
      this.$store
          .dispatch("LogOut")
          .then(res=>{
            this.$store.commit("del_token");
            this.$store.commit("del_time");
            if(res&&res.code&&res.code==='success'){//normal case
              window.location.replace('/');
            }else{//not normal case, perhaps due to unknown error or long-time no interaction
              if(res&&res.msg){
                ElMessageBox.alert(res.msg+", error!","Attention!",{
                  confirmButtonText:'OK',
                  callback:()=>{
                    window.location.replace('/')
                  }
                })
              }
              window.location.replace('/')//long time no interaction, 'no res.msg' error occurs
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
  },
  watch: {
    enableCache: {
      handler: function (val) {
        this.$store.commit('set_cacheEnable',{cacheEnable:val})
        this.$emit('changeCacheOptions',val)
      },
      immediate: true,
    },
  },
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
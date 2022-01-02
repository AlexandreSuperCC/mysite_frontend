<template>
  <div class="line"></div>
  <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      :router="true"
  >
    <el-menu-item index="/home/article">my articles</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="/home/uploadFile" :disabled="disableUpload">upload your file</el-menu-item>
      <el-menu-item index="/home/markdown">write your markdown</el-menu-item>
      <el-menu-item index="/home/searchEngine" disabled>using your searching engine</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="home/myInfo">
      <template #title>my Info</template>
      <el-menu-item index="/home/aboutme">About me</el-menu-item>
      <el-menu-item index="/home/myStory">My story</el-menu-item>
    </el-sub-menu>
    <div class="exit-btn">
      <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" icon="el-icon-info" icon-color="red"
        title="Are you sure to exit?" @confirm="exitEvent" @cancel="ignoreEvent">
        <template #reference>
          <el-button size="mini" round>Exit</el-button>
        </template>
      </el-popconfirm>
    </div>
  </el-menu>
</template>

<script>

import {ElMessageBox} from "element-plus";

export default {
  name: "MainFrame",
  mounted() {
  },
  watch:{
  },
  data(){
    return {
      // activeIndex:this.$store.state.token.curIndex,
      // activeIndex2:'2',
      disableUpload:false
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
                ElMessageBox.alert(res.msg+", error!","Attention!",{
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
.exit-btn{
  position: fixed;
  margin-top: 18px;
  right: 5px
}

</style>
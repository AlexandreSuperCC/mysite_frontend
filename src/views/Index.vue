<template>
    <div class="first-page">
      <el-container>
        <el-header></el-header>
        <el-main v-if="!toLogin">
          <div class="container">
            <div class="avatar">
              <a href="#" @click.native.prevent="this.$router.push('/home/myStory')" >
                <img src="~assets/index/images/my-sea-big.jpg" alt="YCAO" />
              </a>
            </div>
            <div class="content">
              <social-button></social-button>
            </div>
          </div>
        </el-main>
        <el-footer height="90px">
          <div class="beian-cpn">
            <beian :font-color=beianFontColor></beian>
          </div>
        </el-footer>
      </el-container>
    </div>
  </template>
  
  <script>
  import Beian from "@/components/common/Beian";
  import {httpOrHttps} from "@/utils/const/const";
  import SocialButton from "@/components/common/SocialButton";
  
  export default {
    name:'Index',
    components:{
      Beian,
      SocialButton,
    },
    created() {
      /**
       * 使用ngrok遇到的问题，输入域名自动跳转到使用https的主页，访问资源会出现问题
       * @return
       * @time 2022-03-02 21:08:57
       */
      let isHttps = 'https:' === document.location.protocol ? true: false;
      if (isHttps){
        window.location.replace(httpOrHttps+document.location.host);
      }
    },
    data(){
      return {
        beianFontColor: '#000000',
      }
    },
  }
  
  </script>
  <style lang="scss" scoped>
  /*container full screen*/
  .first-page{
    height: 100%;
    width: 100%;
    background: rgb(26, 188, 156);
    background: -moz-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    background: -webkit-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    background: linear-gradient(135deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    // background: url('../../assets/index/images/China.jpg') no-repeat;
    // background-size: 100% 100%;
    opacity: 1.0;
  }
  .container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 150px;
  height: 150px;
  box-sizing: border-box;
  border: 5px white solid;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
  img { width: 100%; height: 100%; }
}
  </style>
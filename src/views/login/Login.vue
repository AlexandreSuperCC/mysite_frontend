<template>
  <div class="login">
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-card class="login-form-layout">
          <div class="login-jt">
            <jumping-text></jumping-text>
          </div>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username"
                        autocomplete="on" placeholder="Please input your name"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :type="pwdType" v-model="loginForm.password"
                        autocomplete="on" placeholder="Please input password" show-password />
            </el-form-item>
            <el-form-item style="margin-bottom: 20px">
              <el-button type="primary" :loading="loading" @click.native.prevent="handlerLogin">login</el-button>
              <el-button type="primary" @click="this.$router.back()">back to previous page</el-button>
            </el-form-item>
            <div class="login-tips">
            </div>
          </el-form>
        </el-card>
      </el-main>
      <el-footer height="90px">
        <div class="beian-cpn">
          <beian/>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {ElMessageBox} from "element-plus";
import Beian from "@/components/common/Beian";
import {httpOrHttps} from "@/utils/const/const";
import JumpingText from "@/components/common/JumpingText";

export default {
  name:'Login',

  // watch: {
  //   '$route' (to, from) {
  //     //add by ycao 20211229 路由跳转后刷新，为了清除星星特效，跳转回来的时候因为是alive所以本来就有特效
  //     window.location.reload();
  //   }
  // },
  components:{
    JumpingText,
    Beian
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
      loading:false,
      loginForm:{
        username:'',
        password:''
      },
      rules:{
        username:[//here the name must be the same as the object in model strictly
          {
            required:true,
            message:'Please input your name',
            trigger:'blur'
          }
        ],
        password: [
          {
            required:true,
            message:'Please input your password',
            trigger:'blur'
          }
        ]
      },
      pwdType:"password"
    }
  },
  methods:{
    handlerLogin(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          this.loading = true;
          this.$store
              . dispatch('Login',this.loginForm)
              .then(res=>{
                this.loading=false;
                if(res){//有结果返回 406情况就没有结果
                  if(res&&res.code==='success'){
                    //if login succeeds, save the token into Vuex
                    this.$store.commit('set_token',{token:res.token,userId:res.userId,userRole:res.userRole})
                    // window.location.replace('/home')
                      
                    /**
                     * judge if it should be redirected
                     */
                     if(!this.$route.query.redirect){
                      this.$router.push('/home');
                     }else{
                      const obj = JSON.parse(this.$route.query.redirect);
                      this.$router.push(obj['url']);
                     }

                    // console.log('login success, your userId: '+this.$store.state.token.userId)
                    return true;//一定要记得返回true
                  }else {
                    ElMessageBox.alert(res.msg+", please re-login","Attention!",{
                      confirmButtonText:'OK'
                    })
                    console.log('login fails');
                  }
                }else {
                  console.log("response is null");
                }
                return true;//一定要记得返回true
              })
              .catch((err)=>{
                console.log('login error:'+err);
                this.loading=false;
                return true;//一定要记得返回true
          })
        }else{
          console.log('parameters are not all legal')
          return false;
        }
      })
    },
  }
}

</script>
<style scoped>
/*container full screen*/
.login-tips{
  color: red;
}
.login{
  height: 100%;
  width: 100%;
  background: url('../../assets/index/images/China.jpg') no-repeat;
  background-size: 100% 100%;
  opacity: 1.0;
}

.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 100px auto;
  border-top: 10px solid #409eff;
  opacity: 0.8;
}
.login-jt{
  text-align: center;
  vertical-align: center;
  padding-bottom: 20px;
  margin-top: 0;
}
</style>
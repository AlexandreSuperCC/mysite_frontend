<template>
  <div class="login">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-card class="login-form-layout">
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
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import {ElMessageBox} from "element-plus";

export default {
  name:'Login',
  data(){
    return {
      loading:false,
      loginForm:{
        username:'ycao',
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
                    this.$store.commit('set_token',{token:res.token,userId:res.userId})
                    // window.location.replace('/home')
                    this.$router.replace('/home');
                    console.log('login success, your userId: '+this.$store.state.token.userId)
                  }else {
                    ElMessageBox.alert(res.msg+", please re-login","Attention!",{
                      confirmButtonText:'OK'
                    })
                    console.log('login fails');
                  }
                }else {
                  console.log("response is null");
                }
              })
              .catch((err)=>{
                console.log(err);
                this.loading=false;
          })
        }else{
          console.log('parameters are not all legal')
          return false;
        }
      })
    }
  }
}

</script>

<style scoped>
/*container full screen*/
.login{
  height: calc(100vh);
}

.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}
</style>
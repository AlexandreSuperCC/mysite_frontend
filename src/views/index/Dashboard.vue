<!--只传单个文件-->
<template>
<div class="dashboard" style="padding-top: 8px;">
    <el-row>
      <el-col class="db-ctl" :xl="{span:6}" :lg="{span:8}" :md="{span:10}" :sm="{span:12}" :xs="{span:24}">
        <el-card shadow="hover">
          <div class="user-info">
              <img src="~assets/index/images/director.png" class="user-avator" alt />
              <div class="user-info-cont">
                  <div class="user-info-name">{{ myPwdObj.name }}</div>
                  <div @click="changeDate">{{ role }}</div>
              </div>
          </div>
          <div class="update-pwd">
            <div class="old-pwd">
              <el-input
                  size="small"
                  class="cctl-input"
                  v-model="myPwdObj.oldPassword"
                  type="password"
                  placeholder="Input the old password"
                  show-password
              />
            </div>
            <div class="new-pwd">
              <el-input
                  size="small"
                  class="cctl-input"
                  v-model="myPwdObj.newPassword"
                  type="password"
                  placeholder="Input the new password"
                  show-password
              />
            </div>
            <div class="update-pwd-btn">
              <el-button :disabled="!isFilled" type="primary" size="small" @click="updatePwd">Update your password</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col class="db-ctl" :xl="{span:6}" :lg="{span:8}" :md="{span:10}" :sm="{span:12}" :xs="{span:24}">
        <el-card shadow="hover">
          <template #header>
            Mini Moments  
          </template>
          <div class="value-control">
            <div class="constant-ctl">
                <el-input class="cctl-input" size="small" v-model="constantContent" placeholder="Enter your current status"/>
                <el-button @click="updateConstant" type="primary" size="small">Update your status</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>      
    <el-row>
      <el-col class="db-ctl" :xl="{span:8}" :lg="{span:8}" :md="{span:8}" :sm="{span:16}">
        <el-card shadow="hover">
          <template #header>
            Admin Login Logs  
          </template>
          <div class="login-log-table">
            <el-table       
                :data="
                loginLogData.filter(
                    (data) =>
                    !searchLoginLogs || data.loginTime.toLowerCase().includes(searchLoginLogs.toLowerCase())
                )"
                v-loading="getLoginLogsLoading"
                element-loading-text="getting login logs..." max-height="500" border>
                <el-table-column prop="lgid" label="ID" width="60" />
                <el-table-column prop="userId" label="UserId" width="70" />
                <el-table-column prop="loginIp" label="Login IP" />
                <el-table-column prop="loginTime" label="Login time">
                    <template #header>
                        <el-input v-model="searchLoginLogs" size="small" placeholder="Search in login time" />
                    </template>
                </el-table-column>
            </el-table>
        
          </div>
        </el-card>
      </el-col>
      <el-col class="db-ctl" :xl="{span:6}" :lg="{span:6}" :md="{span:6}" :sm="{span:8}">
        <el-card shadow="hover">
          <template #header>
            Website Visit Logs  
          </template>
          <div class="visit-log-table">
            <el-table       
                :data="
                visitLogData.filter(
                    (data) =>
                    !searchVisitLogs || data.info.toLowerCase().includes(searchVisitLogs.toLowerCase())
                )"
                v-loading="getVisitLogsLoading"
                element-loading-text="getting visit logs..." max-height="500" border>
                <el-table-column prop="id" label="ID" width="60" />
                <el-table-column prop="info" label="Visit Info">
                    <template #header>
                        <el-input v-model="searchVisitLogs" size="small" placeholder="Search in visit info" />
                    </template>
                </el-table-column>
            </el-table>
          </div>
        </el-card> 
      </el-col>
      <el-col class="db-ctl" :xl="{span:10}" :lg="{span:10}" :md="{span:10}" :sm="{span:24}">
        <el-card shadow="hover">
          <template #header>
            Autotask Execution Logs  
          </template>
          <div class="all-log-table">
          <el-table       
              :data="
              logData.filter(
                  (data) =>
                  !searchAllLogs || data.content.toLowerCase().includes(searchAllLogs.toLowerCase())
              )"
              v-loading="getAllLogsLoading"
              element-loading-text="getting logs..." max-height="500" border>
              <el-table-column prop="id" label="ID" width="60" />
              <el-table-column prop="component" label="Component" />
              <el-table-column prop="content" label="Details" >
                  <template #header>
                      <el-input v-model="searchAllLogs" size="small" placeholder="Search in details" />
                  </template>
              </el-table-column>
              <el-table-column prop="userId" label="UserId" width="70"/>
              <el-table-column prop="ts" label="Execution Time" width="150"/>
          </el-table>
          </div>
        </el-card> 
      </el-col>
    </el-row>
</div>

</template>
<script>
import { ycaoId,ycaoStatusId } from '../../utils/const/const'
import {ElMessageBox} from "element-plus";

export default {
  name: "Dashboard",
  data(){
    return {
        logData:[],
        loginLogData:[],
        visitLogData:[],
        searchAllLogs:'',
        searchVisitLogs:'',
        searchLoginLogs:'',
        getAllLogsLoading: true,
        getLoginLogsLoading: true,
        getVisitLogsLoading: true,
        constantContent:'',
        myPwdObj:{
            id:this.$store.getters.userId,
            name:this.$store.getters.userName,
            oldPassword:'',
            newPassword:''
        },
    }
  },
  mounted(){
    this.init()
  },
  computed:{
    role() {
      return this.$store.getters.userRole === 0 ? "Director" : "Staff";
    },
    getConstantUpdateObj(){
      return {
        id: ycaoStatusId,
        cid: ycaoId,
        content:this.constantContent,
      }
    },
    isFilled() {
        return this.myPwdObj.oldPassword && this.myPwdObj.newPassword;
    },
  },
  methods:{
    init(){
        this.getTwoLogs()
    },
    updateConstant(){
        this.$store.dispatch('UpdateConstant', this.getConstantUpdateObj).then(data=>{
        if(data.code==='success'){//保存成功
             ElMessageBox.alert("Update has been saved！ ",{
                confirmButtonText:'OK'
            })}
        else{ElMessageBox.alert("some problems happen while saving: <br/>"+data.msg,{confirmButtonText:'OK',dangerouslyUseHTMLString:true})}})
      .catch(err=>{console.log(err)})    
    },
    getTwoLogs(){
        this.getAllLogsLoading=true;
        this.getLoginLogsLoading=true;
        this.getVisitLogsLoading=true;
        this.$store.dispatch('GetAllLogs').then(data=>{
            if(data&&data.data){//保证拿到数据
                data.data.forEach((object)=>{
                    this.logData.push(object)
                })
            }
            this.getAllLogsLoading=false;
        }).catch(err=>{
            console.log(err)
            this.getAllLogsLoading=false;
        })
        this.$store.dispatch('GetVisitLogs').then(data=>{
            if(data&&data.data){//保证拿到数据
                for(let i=data.data.length-1;i>=0;i--){
                    this.visitLogData.push({
                            id:i,
                            info:JSON.stringify(data.data[i]).slice(1,-1)
                        })
                }
            }
            this.getVisitLogsLoading=false;
        }).catch(err=>{
            console.log(err)
            this.getVisitLogsLoading=false;
        })
        this.$store.dispatch('GetLoginLogs').then(data=>{
            if(data&&data.data){//保证拿到数据
                data.data.forEach((object)=>{
                    this.loginLogData.push(object)
                })
            }
            this.getLoginLogsLoading=false;
        }).catch(err=>{
            console.log(err)
            this.getLoginLogsLoading=false;
        })
    },
    updatePwd(){
        this.$store.dispatch('UpdatePwd', this.myPwdObj).then(res => {
          if(res){
            if (res.code === 'success') {
              ElMessageBox.alert("Updating the password succeeds",{
                confirmButtonText:'OK',
                callback:()=>{
                }
              })
            } else {
              ElMessageBox.alert("Updating the password fails: "+res.msg,{
                confirmButtonText:'OK',
                callback:()=>{
                }
              })
            }
          }else{
            console.log('server response error');
          }
        }).catch(err => {
          console.log(err)
        })
      },
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
    height: 100%;
    width: 100%;
    overflow: scroll;
    &>div{
        width: 90%;
        margin:0 auto;
    }
    
}
.constant-ctl{
    width: 300px;
}
.cctl-input{
    margin-bottom: 4px;
}
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}
.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}
.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.db-ctl{
  padding: 4px 4px;
}
</style>
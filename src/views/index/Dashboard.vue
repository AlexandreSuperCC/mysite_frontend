<!--只传单个文件-->
<template>
<div class="dashboard">
    <div class="db-log">
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
    </div>
</div>

</template>
<script>
export default {
  name: "UploadFile",
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
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
        this.getTwoLogs()
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
    }
  }
}
</script>

<style scoped>
.dashboard{
    height: 100%;
    width: 100%;
    overflow: scroll;
    text-align: center;
}
.db-log{
    width: 90%;
    margin:0 auto;
    text-align: center;
}
.login-log-table,.visit-log-table{
    width: 500px;
    padding: 8px 8px;
    margin: 0 auto;
}
.all-log-table{
    padding: 8px 8px;
    margin: 0 auto;
}
</style>
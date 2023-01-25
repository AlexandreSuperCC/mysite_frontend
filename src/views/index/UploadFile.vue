<!--只传单个文件-->
<template>

    <el-upload
        class="upload-demo"
        drag
        action="ignore"
        :http-request="uploadFileAccAction"
        :on-error="uploadRes"
        v-loading="uploadLoading"
        element-loading-text="uploading..."
    >
      <img class="upload-img" src="~assets/index/images/upload.svg" alt="upload">
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          file with a size less than 100MB
        </div>
      </template>
    </el-upload>
    <div class="upload-msg">
      <el-input v-model="uploadReturnMsg" placeholder="Uploaded File URL">
      </el-input>
      <el-button style="margin-top: 8px" type="primary" @click="copyText">Copy</el-button>
      <el-button style="margin-top: 8px" type="primary" @click="clearText">Clear</el-button>
    </div>
    <div class="list-container" v-if="showUploadedFileList">
      <div class="list-title">All uploaded files</div>
      <uploaded-file-list :curUserId="curUserId"
                          :uploaded-file-list-height="getWindowHeightToFileList"
                          @doRefreshFileList="doRefresh"
                          :key="childTimer" ref="ufl"></uploaded-file-list>
    </div>
  </template>
<script>
import { UploadFilled } from '@element-plus/icons'
import {Const} from "@/utils";
import {ElMessageBox} from "element-plus";
import UploadedFileList from "@/views/index/uploadFile/UploadedFileList";
import { httpOrHttps } from '../../utils/const/const';
export default {
  name: "UploadFile",
  data(){
    return {
      maxUploadFileSize:Const.maxUploadFileSize,
       uploadAddress:Const.uploadAddress,
      curUserId:this.$store.state.token.userId,
      uploadLoading:false,
      childTimer:'',
      uploadReturnMsg:'',
      httpOrHttpsIn:httpOrHttps
    }
  },
  props: {
    showUploadedFileList: { 
      type: Boolean,       
      default(){
        return true
      } 
    }
  },
  computed:{
    getWindowHeightToFileList(){
      let width = document.body.clientHeight
      if(width>999){
        return 550;
      } else if(width>649){
        return 350;
      }else{
        return 200;
      }
    },
  },
  methods:{
    copyText() {
      navigator.clipboard.writeText(this.uploadReturnMsg);
    },
    clearText() {
      this.uploadReturnMsg="";
    },
    uploadFileAccAction(params){
      this.uploadLoading=true;//使页面处于加载中
      const file = params.file,
          fileType = file.type,
          isImage = fileType.indexOf("image") != -1,
          isLt2M = file.size /1024/1024<this.maxUploadFileSize;//文件大小是否小于限制
      if(!isLt2M){
        ElMessageBox.alert("The size of the file must less than "+this.maxUploadFileSize+"M",{
          confirmButtonText:'OK',
        })
      }
      //start the encapsulation
      const form = new FormData();
      //file object
      form.append("file",file);
      // form.append("curUserId","10")
      form.append("curUserId",this.curUserId)
      this.$store.dispatch('UploadFile',form).then(res=>{
        let resJson = JSON.parse(res.request.response);//解析返回的json字符串
        if(resJson&&resJson.code==='fail'){
          ElMessageBox.alert("upload fails: "+resJson.msg+", please try again...",{
            confirmButtonText:'OK',
            callback:()=>{
              //pay attention to the order of the three phrases, sync action will come before async
              //so token is null when execute Logout
            }
          })
        }else{
          this.uploadReturnMsg=resJson.msg
        };
        this.uploadLoading=false//停止加载
        this.childTimer = new Date().getTime()//force refresh file list
          }).catch(err=>{console.log(err);this.uploadLoading=false;})
    },
    uploadRes(err){
      console.log(err)
    },

    //refresh the file list, emitted by the son
    doRefresh(newTime){
      this.childTimer = newTime;
    }
  },
  mounted() {

  },
  created() {
  },
  components:{
    UploadFilled,
    UploadedFileList,
  }
}
</script>

<style scoped>
.upload-msg{
  width: 360px;  
  margin: 10px auto;
  display: block;
}
.list-container{
  margin-top: 50px;
}
.list-title{
  font-size: 20px;
  text-align: center;
  color: blue;
  margin-bottom: 20px;
}
.upload-demo{
  text-align: center;
  padding-top: 40px;
}
.upload-img{
  height: 150px;
  width: 150px;
}
</style>
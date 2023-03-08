<template>
  <div class="md-container" v-loading="saveFileLoading" >
    <div class="md-info">
      <div class="md-uniqueMdFileId">
        <div class="md-uniqueMdFileId-div"><el-input class="md-uniqueMdFileId-input" onkeyup="value=value.replace(/[^\d]/g,'')"
                                                     v-model="uniqueMdFileId" placeholder="fid"/></div>
        <div class="md-ifCreate">
          <span class="md-ifCreate-switch">
            modify<el-switch class="md-switch" v-model="ifCreate" active-color="#13ce66" inactive-color="#ff4949" />create
          </span>
          <span class="clear-btn">
            <el-popconfirm title="Are you sure to clear all?" @confirm="clearAll">
              <template #reference>
                <el-button class="clear-btn-in" type="danger" round size="mini">clear</el-button>
              </template>
            </el-popconfirm>
          </span>
          <span class="md-ifCreate-switch">
            private<el-switch class="md-switch" v-model="ifPublic" active-color="#13ce66" inactive-color="#ff4949" />public
          </span>
        </div>
        <div class="md-rate-div"><el-rate class="md-rate" v-model="fileStar" allow-half /></div>
      </div>
      <div class="md-name-cat">
        <div class="md-name"><el-input class="md-name-input" v-model="fileName" placeholder="filename"/></div>
        <div class="md-cat">
            <el-select class="md-select" v-model="fileCategory" placeholder="select/create category" v-loading="getCategoryLoading"
            filterable allow-create ref="editMdCat">
              <el-option
                  v-for="category in categoryOption"
                  :key="category"
                  :value="category"
              >
              </el-option>
            </el-select>
        </div>
      </div>
    </div>
    <el-row >
      <el-col :span="11" class="left-md">
        <el-row>
          <el-input ref="rawText" id="markdown-editor" type="textarea" v-model="content" :autosize="{ minRows: 20, maxRows: 80}" placeholder="type your markdown and use CTRL+S to save it!" >
          </el-input>
        </el-row>
        <el-row>
          <div class="upload-file-in-md">
            <upload-file :show-uploaded-file-list="false"></upload-file>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12" class="right-md">
        <div ref="htmlText" id="show-content" class="text-left">
          <div v-if="!this.$refs.htmlText">
            <h3>Type something to see your markdown</h3>
            <h3>You can press CTRL+S to save it!</h3>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="executeBtn" @click="doSaveInComponent">
      <el-button type="primary" size="small">
        Save<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script>
import {surpportTab, supportSave, sendThisOut, vm} from '@/assets/js/textarea_extend.js'
import {ElMessageBox} from "element-plus";
import {Upload} from '@element-plus/icons';
import UploadFile from "@/views/index/UploadFile";

export default {
  name:"Markdown",
  components:{
    UploadFile,
    Upload
  },
  data () {
    return {
      'converter':null,
      ifCreate:true,
      ifPublic:true,
      saveFileLoading:false,
      getCategoryLoading:false,
      'content':'',
      uniqueMdFileId:'',
      fileStar:0,
      fileName:'',
      fileCategory:'',
      curUserId:this.$store.state.token.userId,
      categoryOption: [

      ]
    }
  },
  watch:{
    'content':'contentChanged'
  },
  activated() {
    /**
     * because of the keep alive, each time we change the article to edit, the content will not be changed
     * so before going to this page, we check if it is from route-changing, if is, reassigning the value
     * @return
     * @time 2021-12-12 15:53:13
     */
    this.reassigningValueIfRoute();
  },
  mounted(){
    this.init();
    this.getCategoryLoading=true;
    this.$store.dispatch('GetAllCategory', this.curUserId).then(data=>{
      if(data&&data.data){//保证拿到数据
        data.data.forEach((object)=>{
          this.categoryOption.push(object.cname)
        })
      }
      this.getCategoryLoading=false;
    })
        .catch(err=>{
          this.getCategoryLoading=false
          console.log(err)
        })

    },
  computed:{
    getSendObj(){
      return {
        ifCreate:this.ifCreate,
        pv:this.ifPublic?0:1,
        uniqueMdFileId:this.uniqueMdFileId,
        userId:this.curUserId,
        content:this.content,
        fileStar:this.fileStar,
        fileName:this.fileName,
        fileCategory:this.fileCategory,
        htmlText:this.$refs.htmlText.innerHTML
      }
    }
  },
  methods: {
    init(){

      sendThisOut(this);//获取组件实例vm;href:https://www.cnblogs.com/taohuaya/p/10765731.html

      var showdown  = require('showdown');
      var converter = new showdown.Converter();
      this.converter = converter;
      surpportTab('markdown-editor');
      supportSave('markdown-editor',function(){
            vm.saveFileLoading=true;//test propose
            let sendObj=vm.getSendObj
        // console.log(sendObj);
            //check
            if(sendObj.fileName===''||(sendObj.fileCategory==='')||!vm.testIfInteger(sendObj.uniqueMdFileId)){ElMessageBox.alert("fid/category/filename not valid", "Attention!", {confirmButtonText: 'OK', callback: () => {vm.saveFileLoading=false;}}).catch(r =>{ console.log(r);vm.saveFileLoading=false;});return;}
            //go save

            vm.$store.dispatch('SaveMarkdownRealTime', sendObj).then(data=>{
              if(data.code==='success'){//保存成功
                   ElMessageBox.alert("your markdown has been saved！",{confirmButtonText:'OK', callback:()=>{vm.saveFileLoading=false;}})}
              else{ElMessageBox.alert("some problems happen while saving: <br/>"+data.msg,{confirmButtonText:'OK',dangerouslyUseHTMLString:true,callback:()=>{vm.saveFileLoading=false;}})}})
            .catch(err=>{vm.saveFileLoading=false;console.log(err)})
      })
    },
    contentChanged(){
      var html = this.converter.makeHtml(this.content);
      document.getElementById('show-content').innerHTML = html;
    },
    doSaveInComponent(){
      this.saveFileLoading=true;//test propose
      let sendObj=this.getSendObj;
      // console.log(sendObj);
      //check
      if(sendObj.fileName===''||(sendObj.fileCategory===''||!this.testIfInteger(sendObj.uniqueMdFileId))){ElMessageBox.alert("fid/category/filename not valid", "Attention!", {confirmButtonText: 'OK', callback: () => {this.saveFileLoading=false;}}).catch(r =>{ console.log(r);this.saveFileLoading=false;});return;}
      //go save

      this.$store.dispatch('SaveMarkdownRealTime', sendObj).then(data=>{
        if(data.code==='success'){//保存成功
             ElMessageBox.alert("your markdown has been saved！",{confirmButtonText:'OK', callback:()=>{this.saveFileLoading=false;}})}
        else{ElMessageBox.alert("some problems happen while saving: <br/>"+data.msg,{confirmButtonText:'OK',dangerouslyUseHTMLString:true,callback:()=>{this.saveFileLoading=false;}})}})
      .catch(err=>{this.saveFileLoading=false;console.log(err)})
    },

    //判断是否是空值或整数
    testIfInteger(toTest){
      const numReg = /^[0-9]*$/
      let numRe = new RegExp(numReg)
      // console.log(toTest != '' && numReg.test(toTest));
      return toTest!=''&&numReg.test(toTest);
    },
    /**
     * serve for route changing, when the passing(query) parameter is an object
     * @return
     * @time 2021-12-12 13:11:10
     */
    doParseRouteObjOrBlank(attrName){
      if(!this.$route.query.arr) return '';//no route parameter
      const obj = JSON.parse(this.$route.query.arr);
      this[`${"attrName"}`] = obj[attrName];
      return obj[attrName];
    },
    /**
     * clear all
     * @return
     * @time 2021-12-12 14:09:32
     */
    clearAll(){
      this.ifCreate=true;
      this.ifPublic=true;
      this.uniqueMdFileId='';
      this.fileStar=0;
      this.fileName='';
      this.fileCategory='';
      this.content='';
      this.$refs.htmlText.innerHTML='';
    },
    //see comment where used
    reassigningValueIfRoute(){
      if(!this.$route.query.arr) return;
      this.content=this.doParseRouteObjOrBlank('rawContent')
      this.uniqueMdFileId=this.doParseRouteObjOrBlank('fid')
      this.fileStar=this.doParseRouteObjOrBlank('rate')
      this.fileName=this.doParseRouteObjOrBlank('fname')
      this.fileCategory=this.doParseRouteObjOrBlank('fcat')
      this.ifPublic=this.doParseRouteObjOrBlank('pb')
      // this.$refs.htmlText.innerHTML='';
    },
    rateToInt(str){
      if (str==='') return 0;
      return parseInt(str);
    }
  },
  /**
   * activated只在replace/push到该页面时执行，所以ifCreated不能每次都变更，使用路由守卫
   * beforeRouteEnter → created → mounted →beforeRouteEnter的next。通过给next传一个回调，就可以获取像this一样操作data中的数据
  */
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(to.query.arr){
        // this.ifCreate=false;
        vm.ifCreate=false;
      }
    })
  }
}
</script>
<style>
.md-container{
margin: 10px 40px;
}
.left-md{
  /*margin-left: 13px;*/
  padding-right: 8px;
}
.right-md{
  /*margin-left: 5px;*/
  border-style: solid;
  border-color: #f5d6f8;
  overflow: auto;
}
#show-content{
  padding:0px 25px;
}
.md-info::-webkit-scrollbar{
  display:none
}
.md-info{
  display: flex;
  margin: 20px 0px;
  overflow-y: scroll;
}
.md-uniqueMdFileId,.md-name,.md-cat{
  flex: 1;
  margin: 0px 5px;
}

.md-uniqueMdFileId{
  display: flex;
}
.md-uniqueMdFileId-div {
  width: 70px;
  flex-grow: 0;
}
/*.md-ifCreate{*/
/*  flex-grow: 1;*/
/*}*/
.md-switch{
  padding: 0px 5px;
}
.md-ifCreate{
  flex-grow: 1;
  margin-left: 10px;
  text-align: left;
  padding-top: 2px;
}
.md-rate-div{
  flex-grow: 0;
  padding-top: 10px;
}

.md-cat{
  padding-right: 25px;
  text-align: left;
}
.md-name{
  text-align: right;
}
.md-select{
  margin-right: 10px;
  width: 200px;
}
.md-name-input{
  width: 200px;
}
.md-name-cat{
  display: flex;
}
.executeBtn{
  margin-top: 10px;
}
.md-ifCreate-switch{
  width: 3px;
  padding-top: 8px;
  overflow: scroll;
}
.clear-btn{
  overflow: scroll;
  padding-left: 2px;
  padding-top: 4px;
}
.clear-btn-in{
  font-size: 14px;
}
</style>
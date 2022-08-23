/**
 * @description: the component for the page where all the articles are
 * @author ycao
 * @date 2021-12-28 13:37:01
 * @version 1.0
 */
<template>
  <div id="articles-all">
    <div id="articles-welcome">My Articles</div>
    <div :style="isHidden" v-loading="getAllFiles">
      <div class="md-items" >
        <button class="refresh-md-btn" @click="getFiles"></button>
        <span v-if="allCatFile.length===0">no category</span>
        <span v-for="(cat,index) in allCatFile"
              @contextmenu.prevent.native="deleteCatAction(cat)"
              :key="cat" class="file-cat" @click="changeCategory(cat,index)" :style="isSelected(index)">{{cat}}</span>
        <span class="cat-inform-text">right-click to delete a category</span>
      </div>
      <div class="allFiles">
        <el-space wrap class="file-space" size="medium">
          <el-card v-for="file in curCatData" :key="file" class="box-card" style="width: 250px">
            <template #header>
              <div class="card-header">
                <div class="file-name">{{file.mname}}</div>
                <div class="md-action">
                  <el-button class="md-view" type="text" @click="doShowModel(file.htmlText)">View</el-button>
                  <el-button class="md-edit" type="text" @click="toEditPage(file)">Edit</el-button>
                  <el-popconfirm title="Are you sure to delete this file?" @confirm="deleteFile">
                    <template #reference>
                      <el-button class="md-delete" type="text" @click="assignFidForDelete(file.mid)">Delete</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
            <div class="text-container">
              <div class="text-item" v-html="file.htmlText">
              </div>
            </div>
          </el-card>
        </el-space>
      </div>
      <el-backtop target="#articles-all"/>

    </div>
    <view-file v-show="showModal"
               :transfer-view-status-change-flag="viewStatusChangeFlag"
               :text-html="toSendShowModelText"
               @hiddenView="showModal=false"></view-file>
  </div>
</template>

<script>
import {getHomeData, deleteOneFile, deleteCatFilesIn} from "@/network/mainPage/home";
import ViewFile from "@/views/index/ViewMd/ViewFile";
import {ElMessageBox} from "element-plus";
export default {
  name: "Article",
  components:{
    ViewFile
  },
  data(){
    return {
      tempMidForPopCDelete:'',
      curCatName:'',
      viewStatusChangeFlag:false,
      toSendShowModelText:'',
      showModal:false,
      getAllFiles:false,
      curUserId:this.$store.state.token.userId,
      allCatFile:[],
      myData:[],
      curIndex:-1,
      selectedStyle:{
        'box-shadow':'0 2px rgba(80,40,84,0.48)'
      },
      hiddenForViewStyle:{
        'background-color' : '#000',
        'opacity' : '0.3',
        'z-index' : '1',
      }
    }
  },
  computed:{
    /**
     * serve for the 'view button' for markdown file
     * it works only if is is put in the 'computed'
     * @return
     * @time 2021-12-11 23:48:37
     */
    isHidden(){
      return this.showModal===true?this.hiddenForViewStyle:{'z-index' : '1'}
    },
    curCatData(){
      return this.myData&&this.myData.filter((data)=>this.curCatName.length===0||data.pkCategory===this.curCatName)
    }
  },
  methods:{
    // changeStatusView(){
    //   if(this.showModal===true){
    //     this.showModal=false
    //     console.log("do");
    //   }
    // },
    doShowModel(text){
      this.showModal=true;
      this.toSendShowModelText=text;
      this.viewStatusChangeFlag=!this.viewStatusChangeFlag;//continue to change so when pass it to the son, the 'watch' will work
    },
    getFiles(){
      this.getAllFiles=true
      getHomeData(this.curUserId).then(data=>{
        if(data.code==='success'){//获得数据成功
          this.myData=data&&data.data;
          let temCatFile=[];
          data&&data.data.forEach(file=>{temCatFile.push(file.pkCategory)});
          this.allCatFile = temCatFile.filter((cat,index,temCatFile)=>temCatFile.indexOf(cat,0)===index)//过滤掉重复数据
        }else{//获得数据失败，优化了后端抛异常的部分，前台相应增加显示异常的逻辑
          ElMessageBox.alert('Error occurs: ['+data.msg + "]", "Attention!", {
            confirmButtonText: 'OK',
            callback: () => {
              window.location.replace("/login")
            }
          }).catch(r => console.log(r))
        }
        this.getAllFiles=false;
      }).catch((err)=>{
        this.getAllFiles=false;
        console.log(err);
      })
    },
    changeCategory(item,index){
      if(this.curIndex===index){//double-click to see all the files
        this.curIndex='';
        this.curCatName='';
      }else{
        this.curIndex=index;
        this.curCatName=item;
      }
    },
    isSelected(index){
      return index===this.curIndex?this.selectedStyle:{}
    },
    /**
     * route to new page with params
     * @return
     * @time 2021-12-12 12:30:55
     */
    toEditPage(file){
      let sendEditPageObj={
        'fid':file.mid,
        'rate': this.rateToInt(file.rate),
        'fname':file.mname,
        'fcat':file.pkCategory,
        'rawContent':file.content,
      }
      // this.keyTimer=new Date().getTime()//force refresh file list
      const arr = JSON.stringify(sendEditPageObj);
      this.$router.push({
        path:'/home/markdown',
        query:{
          arr
        }
      })
    },
    deleteFile(){
      if(this.$store.getters.userRole!==0){
        ElMessageBox.alert("Not authorized","Sorry!",{
          confirmButtonText:'OK'
        })
        return;
      }
      deleteOneFile(this.tempMidForPopCDelete).then((data)=>{
        ElMessageBox.alert("deleting one file succeeds",{
          confirmButtonText:'OK',
          callback:()=>{
            this.getFiles();//refresh data after deleting
          }
        })
        }).catch(err=>console.log(err))
    },
    deleteCat(cat,curUserId){
      deleteCatFilesIn(cat,curUserId).then((data)=>{
        ElMessageBox.alert("deleting one category and all its files succeeds",{
          confirmButtonText:'OK',
          callback:()=>{
            this.getFiles();//refresh data after deleting
          }
        })
      }).catch(err=>console.log(err))
    },
    /**
     * because the pop confirm can not pass the parameter so
     * @return
     * @time 2021-12-12 16:59:57
     */
    assignFidForDelete(mid){
      this.tempMidForPopCDelete=mid;
    },
    // 刷新当前页面，在修改数据之后 this.reload 一下就可以完成刷新当前这个指定标签的刷新
    // reload () {
    //   this.isReloadAfterDelOneFile = false;
    //   this.$nextTick(() => {
    //     this.isReloadAfterDelOneFile = true;
    //   })
    // }
    deleteCatAction(cat) {
      if(this.$store.getters.userRole!==0){
        ElMessageBox.alert("Not authorized","Sorry!",{
          confirmButtonText:'OK'
        })
        return;
      }
      ElMessageBox.alert("Are you sure to delete this category and all the files in it?",{
        confirmButtonText:'OK',
        showCancelButton: true,
        callback:(action)=>{
          if(action!='confirm') return;
          this.deleteCat(cat,this.curUserId);
        }
      })
    },
    /**
     * used for sending rate to edit page
     * to avoid Invalid prop: type check failed for prop "modelValue"...
     * @return
     * @time 2021-12-12 18:02:13
     */
    rateToInt(str){
      if (str==='') return 0;
      return parseInt(str);
    },
    /**
     * 为aboutme里面的背景图提前做好缓存
     * 在前面定义，因为用缓存直接加载没来得及定义上
     * @return
     * @time 2022-03-11 18:49:24
     */
    doCacheForBgMS(){
      let bgImg = new Image()
      bgImg.onerror = ()=>{
        console.log('background photo of Aboutme error')
      }
      bgImg.src = require('../../assets/index/images/myPhoto.jpeg')
    }

  },
  mounted() {
    this.getFiles();
    this.doCacheForBgMS();
  }
}
</script>

<style scoped>
#articles-all{
  height: 100%;
  width: 100%;
  background-size: cover;
  background: url('../../assets/index/images/article/article-back.jpeg') no-repeat fixed;
  overflow-y: scroll;
}
#articles-welcome{
  font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
  text-align: center;
  padding-top: 8px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(60, 63, 65);
}
.md-items{
  height: 22px;
  margin: 2px 2px 10px;
  border-style: hidden;
  /*border-width: 2px;*/
  /*border-color: #3c1018;*/
  padding: 9px;
  overflow: auto;
}
.cat-inform-text{
  opacity: 0.8;
  font-size: small;
  margin-left: 4px;
}
@media (max-width: 520px) {
  .cat-inform-text{
    display: none;
  }
}
.file-cat{
  border-style: solid;
  border-color: #3c0a08;
  border-radius: 4px;
  border-width: 1px;
  padding: 4px 4px;
  margin: 0px 3px;
  background-color: #bed5ee;
  cursor: pointer;
}
.box-card{
  height: 400px;
}
.allFiles{
  margin: 10px 15px;
}
.card-header{
  display: flex;
}
/*隐藏滚动条*/
.file-name::-webkit-scrollbar{
  display:none
}
.file-name{
  font-size: large;
  padding-top: 6px;/*更改【隐藏滚动条】后需要更改这个因为滚动条本身有长度，有滚动条时值：10*/
  flex: 1px;
  overflow: scroll;
  white-space:nowrap
}
.md-action{
  flex: 2px;
  padding-left: 20px;
  display: flex;
}
.md-view,.md-edit,.md-delete{
  flex: 1;
}
.text-container{
  white-space: nowrap;
  overflow: auto;
  font-size: 10px;
}
.refresh-md-btn{
  margin-right: 9px;
  /*font-size: 10px;*/
  /*font-weight: lighter;*/
  /*background-color: #e1e6ef;*/
  /*color: #032d55;*/
  /*!*圆形有无边框*!*/
  border-radius: 50%;
  border: none;
  /*鼠标变小手*/
  cursor: pointer;
  /*border-style: solid;*/
  /*border-width: 1px;*/
  width: 16px;
  height: 16px;
  position: relative;
  top: 1px;
  background: url('../../assets/index/images/refresh.png')  no-repeat;
}
.view-model{
/*the style here does not work, do it in the component 'ViewFile'*/
}
</style>
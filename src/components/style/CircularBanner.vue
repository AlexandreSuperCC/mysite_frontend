/**
 * @description: 自我介绍轮播图
                 只在浏览器不支持carousel时使用，因为element-plus有封装好的更好的
                 在created时期判断浏览器类型，然后判断使用哪个
 * @author ycao
 * @date 2021-12-29 17:30:35
 * @version 1.0
 */
<template>
  <div class="cb-container">
    <div class="cb-left"><slot name="swiper-left"></slot></div>
    <div class="photo-container" @mouseenter="enterClear" @mouseleave="leaveRestore">
      <div class="swiper-left-before">
        <img class="swiper-arrow" @click="decreasePhoto" alt="before"
             src="~assets/index/images/swiper/before.svg">
      </div>
      <img class="my-photo-side" :src="getPhoto1" alt="me">
      <img class="my-photo-center" :src="getPhoto2" alt="me">
      <img class="my-photo-side" :src="getPhoto3" alt="me">
      <div class="swiper-right-after">
        <img class="swiper-arrow" @click="increasePhoto" alt="after"
             src="~assets/index/images/swiper/after.svg">
      </div>
    </div>
    <div class="cb-right"><slot name="swiper-right"></slot></div>
  </div>
</template>

<script>

//得到文件夹里所有文件数量
const fileNum = require.context('@/assets/index/images/myInfo',true,/\.jpeg$/).keys().length
// console.log(fileNum);

export default {
  name: "CircularBanner",
  data(){
    return {
      curImage:1,
      counter:null//计时器
    }
  },
  mounted() {
  },
  props:{
    photoChangeInterval:{
      type: Number,
      default(){
        return 3000
      }
    }
  },
  methods:{
    decreasePhoto(){
      if(this.curImage===1){
        this.curImage=fileNum;
      }else{
        this.curImage--;
      }
    },
    increasePhoto(){
      if(this.curImage===fileNum){
        this.curImage=1
      }else{
        this.curImage++
      }
    },
    enterClear(){
      clearInterval(this.timer)
    },
    leaveRestore(){
      //setTimeout里面的this是指向window,所以不bind拿不到这个组件里的curImage
      this.timer=setInterval(function (){
        this.curImage++;
      }.bind(this),this.photoChangeInterval)
    }
  },
  computed:{
    getPhoto1(){
      //使用这种方式拼接src得到图片
      if(this.curImage>fileNum){
        this.curImage=1;
      }
      return require("@/assets/index/images/myInfo/"+this.curImage+".jpeg");
    },
    getPhoto2(){
      let tmp = this.curImage;
      tmp++;
      if(tmp>fileNum){
        tmp=1;
      }
      // console.log(this.curImage);
      return require("@/assets/index/images/myInfo/"+tmp+".jpeg");
    },
    getPhoto3(){
      let tmp = this.curImage;
      tmp+=2;
      tmp = tmp-fileNum>0?tmp-fileNum:tmp
      return require("@/assets/index/images/myInfo/"+tmp+".jpeg");
    },
  },
  created() {
    this.timer = setInterval(()=>{
      this.curImage++;
    },this.photoChangeInterval)
  }
}
</script>

<style scoped>
@media (min-width: 2000px) {
  .my-photo-side{
    height: 250px;
  }
  .my-photo-center{
    height: 300px;
  }
}
@media (min-width: 950px) and (max-width: 1999px) {
  .my-photo-side{
    width: 180px;
  }
  .my-photo-center{
    width: 200px;
  }
}
@media (min-width: 450px) and (max-width: 949px) {
  .my-photo-side{
    width: 130px;
  }
  .my-photo-center{
    width: 150px;
  }
}
  
@media (max-width: 449px) {
  .my-photo-side{
    height: 120px;
  }
  .my-photo-center{
    height: 140px;
  }
}
.cb-container{
  display: flex;
  width: 100%;
  height: 100%;
}
.cb-left{
  /*background-color: #422727;*/
  flex: 1
}
.cb-right{
  /*background-color: #d91111;*/
  flex: 1
}
.photo-container{
  flex: 1;
  /*在外层div加上下面两个实现图片竖直居中*/
  display: flex;
  align-items: center;
}
.my-photo-side{
  border-style: solid;
  border-color: #0b1e57;
  border-width: 1px;
  flex: 2;
}
.my-photo-center{
  margin: 0 1px;
  border-style: solid;
  border-color: #0b1e57;
  border-width: 2px;
  flex: 3;
}
.swiper-left-before{
  position: relative;
  left: 30px;
}
.swiper-right-after{
  position: relative;
  right: 30px;
}
.swiper-arrow{
  width: 30px;
  opacity: 0.9;
  cursor: pointer;
}
</style>
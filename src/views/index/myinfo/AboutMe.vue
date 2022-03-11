<template>
  <div v-show="!loadingFin"><loading></loading></div>
  <div class="my-info" v-show="loadingFin">
    <div class="background-photo">
      <div class="next-page">
        <img class="next-page-icon" src="~assets/index/images/nextPage.png"
             @click="goDetails" alt="next page">
      </div>
    </div>
    <div class="content" >
      <div class="box-up">
        <div class='box' id='box1'></div>
        <div class='box' id='box-mid-up'></div>
        <div class='box' id='box2'> </div>
      </div>
      <p class="sign-content" ref="signContent">{{sign}}</p>
      <div class="box-down">
        <div class='box' id='box3'></div>
        <div class='box' id='box-mid-down'></div>
        <div class='box' id='box4'></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getConstant} from "@/network/constant/Constant";
import {aboutMeIntroductionConstant} from "@/utils/const/const";
import SquareJumping from "@/components/common/SquareJumping";
import Loading from "@/components/common/Loading";

export default {
  name: "AboutMe",
  data(){
    return {
      sign:'',
      sign_parameter: aboutMeIntroductionConstant,
      curUserId:this.$store.state.token.userId,
      domain:this.$options.name,//当前组件名字
      /*
      * add by ycao 20220311
      * 图片加载太慢所以在article组建里使用require先加载进行缓存
      * 跳到该页面后会向后台请求签名，在请求期间使用loading组件实现加载等待效果
      * 多次试验发现先加载完已经缓存的图片后签名才会出现
      * */
      loadingFin:false,
    }
  },
  methods:{
    //赋值data里sign
    doAssignSign(){
      //aboutMe和contactMe组件哪一个先渲染后，就不用再次取请求值了
      if(this.sign===''&&this.$store.state.token.signForAboutMe===''){
        this.assignConstant(aboutMeIntroductionConstant)
      }else{
        this.sign=this.$store.state.token.signForAboutMe;
        this.loadingFin=true;
      }
    },
    /**
     * 通过过滤的方法得到需要的签名文字
     * @return
     * @time 2021-12-26 13:13:11
     */
    assignConstant(name){
      getConstant(this.curUserId,this.domain).then(data=>{
        const curConstantObj= data.data.filter(
            (constantObj)=>{
              return constantObj.name===name}
        )
        this.sign = (curConstantObj&&curConstantObj.length>0) && curConstantObj[0].content;
        this.$store.commit('set_signOfMe',{sign:this.sign})//把sign放入vuex，后续MyStory也会用到
        this.loadingFin=true;
      }).catch(err=> {
        console.log(err);
        this.loadingFin=true;
      })
    },
    /**
     * 去往myStory组件
     * @return
     * @time 2022-01-02 00:10:26
     */
    goDetails(){
      this.$router.push('/home/myStory')
    },
    /**
     * 当背景图片没有完全加载完之前，使用加载动画 用在首页提前加载代替
     * 在前面定义，因为用缓存直接加载没来得及定义上
     * @return
     * @time 2022-03-11 17:56:12
     */
    // executeLoading(){
    //   let bgImg = new Image()
    //   bgImg.onerror = ()=>{
    //     console.log('background img error')}
    //   bgImg.onload = ()=>{
    //     this.loadingFin=true;
    //   }
    //   bgImg.src = require('../../../assets/index/images/myPhoto.jpeg')
    // }
  },
  created() {
    /*使用的是vue-router，切换子路由的时候，因为子路由的页面一整块都是v-show值是0或者1判断的页面显示，
      v-show的值在created时赋值1，加载时v-show的值为=0*/
    // this.ifCreated=true;
  },
  mounted() {
    this.doAssignSign();
    // this.signLength = this.$refs.signContent.offsetWidth;
    // this.executeLoading();
  },
  components:{
    SquareJumping,
    Loading
  }
}
</script>

<style scoped>
.background-photo{
  position: fixed;/*脱离文档流*/
  height: 100%;
  width: 100%;
  background: url('../../../assets/index/images/myPhoto.jpeg') no-repeat;
  background-size: 100% 100%;
  opacity: 0.9;
  animation: bg infinite 40s linear alternate;/*动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。*/
}
@keyframes bg {
  /*因为有background-position，所以动起来更有目的性！！！，也因此动起来更快*/
  0% {background-size: 100% 140%; }
  10% {background-size: 101% 141%; }
  20% {background-size: 102% 142%; background-position: bottom;}
  30% {background-size: 103% 143%; }
  40% {background-size: 104% 144%;}
  50% {background-size: 105% 145%;background-position: left;}
  60% {background-size: 106% 146%;}
  70% {background-size: 107% 147%;}
  80% {background-size: 108% 148%;background-position: right;}
  90% {background-size: 109% 149%;}
  100% {background-size: 110% 150%;}
}
.my-info{
  text-align: center;
}
.content{
  /*vertical-align: middle;*/
  margin-top: 230px;
  display: inline-block;
  position: relative;/* offset relative to itself */
}
.sign-content{
  text-shadow: 0px 0px 10px rgba(255,255,255,0.5);
  letter-spacing: 10px;
  color: white;
  padding: 0px 50px;
}
.box{
  text-align: center;
  width: 100px;
  height: 20px;
  flex: 1;
}
.box-up{
  display: flex;
}
#box1{
  border-left:4px solid white;
  border-top: 4px solid white;
  margin-right: 0px;
}
#box-mid-up{
  flex: 5;
}
#box2{
  border-top: 4px solid white;
  border-right: 4px solid white;
  margin-left: 0px;
}
.box-down{
  display: flex;
}
#box3{
  border-left: 4px solid white;
  border-bottom: 4px solid white;
  margin-right: 0px;
}
#box-mid-down{
  flex: 5;
}
#box4 {
  border-right: 4px solid white;
  border-bottom: 4px solid white;
  margin-left: 0px;
}
.next-page{
  text-align: right;
}
.next-page-icon{
  margin: 10px 10px;
  cursor: pointer;
}
</style>
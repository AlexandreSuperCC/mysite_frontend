<template>
  <div class="container">
    <div class="introduction">
      <div class="intro-text">
        <h2>
          <span class="text-hi">Hi!</span><br>
          My name is Yuan Cao.<br>
          I'm {{sign}}
        </h2>
      </div>
    </div>
    <div class="slideshow-photo">
      <div class="c b-cpn">
        <carousel>
          <template v-slot:swiper-left>
            <timeline :drawer-size=drawerSizeFather></timeline>
          </template>
          <template v-slot:swiper-right>
            <div class="cr-text-detailIntro">
              <p>
                Results-driven and motivated Junior Software Engineer
                <br>with extensive knowledge of Java, Javascript,
                <br>experienced in improving software performance,
                <br>testing and updating existing software,
                <br>and developing new software
                functionalities.
                <br>
                <br>Offers proven track record of extraordinary achievements,
                <br>strong attention to detail, and ability to
                <br>finish projects on schedule and within budget.
              </p>
            </div>
          </template>
        </carousel>
      </div>
    </div>
    <div class="contact">
      <contact-me :map-size=mapSizeFather>
      </contact-me>
    </div>
  </div>
</template>

<script>
import CircularBanner from "@/components/style/CircularBanner";
import Carousel from "@/components/element-pp/Carousel";
import Timeline from "@/components/element-pp/Timeline";
import ContactMe from "@/components/element-pp/ContactMe";
import {aboutMeIntroductionConstant} from "@/utils/const/const";
import {setConstants} from "../../../utils/utils";
import { ycaoId } from "../../../utils/const/const";



export default {
  name: "MyStory",
  components:{
    CircularBanner,
    Carousel,
    Timeline,
    ContactMe,
  },
  data(){
    return {
      drawerSizeFather:"35%",
      mapSizeFather:"35%",
      sign:'',
      curUserId:this.$store.state.token.userId,
      domain:'AboutMe',//当前组件名字
      screenWidth: document.body.clientWidth,
    }
  },
  mounted() {
    this.doAssignSign();
    this.doCacheForBgMS();
  },
  activated() {
    this.getWindowWidth();
  },
  methods:{
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
      bgImg.src = require('../../../assets/index/images/myPhoto.jpeg')
    },
    getWindowWidth(){
      this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
        this.screenWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
      };
    },
    //赋值data里sign
    doAssignSign(){
      //aboutMe和contactMe组件哪一个先渲染后，就不用再次取请求值了
      if(this.sign===''&&!this.$store.getters.constants[aboutMeIntroductionConstant]){
        setConstants(ycaoId,this.domain,()=>{
          this.sign=this.$store.getters.constants[aboutMeIntroductionConstant]
        })
      }else{
        this.sign=this.$store.getters.constants[aboutMeIntroductionConstant];
      }
    },
  },
  watch: {
    screenWidth: {
      handler: function (val) {
        if(val<=978){
          this.drawerSizeFather="85%"
          this.mapSizeFather="85%"
        }else{
          this.drawerSizeFather="35%"
          this.mapSizeFather="35%"
        }
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.container{
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  /*height: 100%;*/
  height: 100%;
  /*渐变不支持时的颜色*/
  background-color: #3d8690;
  /*线性渐变*/
  background-image: linear-gradient(to right, #18545A, #F1F2B5);
}
.introduction {
  flex: 0 0 0;
  margin: 0;
}
.slideshow-photo {
  flex: 0 0 0;
}
.cb-cpn{
  /*通过观察盒子模型发现高度/宽度为0，因此一定要指定高度和宽度！！！*/
  width: 100%;
  height: 100%;
  /*width: 420px;*/
}
.intro-text{
  /*实现div居中 外层div margin: 0*/
  width: 300px;
  margin: 40px auto;/*auto是关键*/

}
.text-hi{
  font-size: 50px;
  color: #1b555a;
}
.cr-text-detailIntro{
  margin: 15px;
  color: rgba(255,255,255,0.9);
  /*font-weight: 100 ;*/
  /*text-shadow: 0px 0px 10px rgba(255,255,255,0.5);*/
  letter-spacing: 1px;
  /*font-family: Arial;*/
}

</style>
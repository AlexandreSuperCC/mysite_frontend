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
      <div class="cb-cpn">
        <carousel>
          <template v-slot:swiper-left>
            <div class="timeline-title">
              Formation
            </div>
            <timeline></timeline>
          </template>
          <template v-slot:swiper-right>
            <div class="cr-text-detailIntro">
              <p>
                In my free time I enjoy coding, cycling, and badminton.<br>
                I am the vice president of Shanghai University Cycling Association.
              </p>
              <p>
                Pendant mon temps libre, j'aime coder, faire du vélo et jouer au badminton.<br>
                Je suis Vice - Président de l'Association Cycliste de l'Université de Shanghai.
              </p>
            </div>
          </template>
        </carousel>
      </div>
    </div>
    <div class="contact">
      <contact-me>
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
import {getConstant} from "@/network/constant/Constant";



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
      sign:'',
      curUserId:this.$store.state.token.userId,
      domain:'AboutMe',//当前组件名字
    }
  },
  mounted() {
    this.doAssignSign();

  },

  methods:{
    //赋值data里sign
    doAssignSign(){
      if(this.sign===''&&this.$store.state.token.signForAboutMe===''){
        this.assignConstant(aboutMeIntroductionConstant)
      }else{
        this.sign=this.$store.state.token.signForAboutMe;
      }
    },
    /**
     * 通过过滤的方法得到需要的签名文字
     * @return
     * @time 2022-01-01 11:41:15
     */
    assignConstant(name){
      getConstant(this.curUserId,this.domain).then(data=>{
        const curConstantObj= data.data.filter(
            (constantObj)=>{
              return constantObj.name===name}
        )
        this.sign = (curConstantObj&&curConstantObj.length>0) && curConstantObj[0].content;
        this.$store.commit('set_signOfMe',{sign:this.sign})//把sign放入vuex，后续MyStory也会用到
      }).catch(err=>console.log(err))
    },
  }

}
</script>

<style scoped>
.container{
  /*position: fixed;*/
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  /*height: 100%;*/
  height: calc(100% - 61px);
  /*渐变不支持时的颜色*/
  background-color: #3d8690;
  /*线性渐变*/
  background-image: linear-gradient(to right, #18545A, #F1F2B5);
}
.introduction {
  /*background-color: #a75151;*/
  flex: 3;
  margin: 0;
  /*height: 0;*/
}
.slideshow-photo {
  flex: 5;
  /*height: 0;*/
}
.contact {
  /*background-color: #bed5ee;*/
  flex: 4;
  /*height: 0;*/
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
  color: #f8f0f0;
  /*font-weight: 100 ;*/
  /*text-shadow: 0px 0px 10px rgba(255,255,255,0.5);*/
  letter-spacing: 1px;
  font-family: Arial;
}
.timeline-title{
  color: #f8f0f0;
  padding-left: 40px;
  margin-bottom: 15px;
}

</style>
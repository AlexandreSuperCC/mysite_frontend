<template>
  <div class="container">
    <div class="introduction">
      <div class="intro-text">
        <h2><span class="text-hi">Hi! </span><br> My name is ycao.</h2>
        <p>I’m a Java Developer</p>
      </div>
    </div>
    <div class="slideshow-photo">
      <div class="cb-cpn">
<!--        <circular-banner :photo-change-interval="4000"></circular-banner>-->
        <carousel>
          <template v-slot:swiper-right>
            <div class="cr-text-detailIntro">
              <p>In my free time I enjoy coding, cycling, and badminton.</p>
              <p>Pendant mon temps libre, j'aime coder, faire du vélo et jouer au badminton</p>
            </div>
          </template>
        </carousel>
      </div>
    </div>
    <div class="contact">contact</div>
  </div>
</template>

<script>
import CircularBanner from "@/components/style/CircularBanner";
import Carousel from "@/components/style/Carousel";

export default {
  name: "MyStory",
  components:{
    CircularBanner,
    Carousel,
  },
  data(){
    return {

    }
  },
  mounted() {

  },
  methods:{

  }

}
</script>

<style scoped>
.container{
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /*渐变不支持时的颜色*/
  background-color: #3d8690;
  /*线性渐变*/
  background-image: linear-gradient(to right, #18545A, #F1F2B5);
}
.introduction {
  /*background-color: #a75151;*/
  flex: 3;
  margin: 0;
}
.slideshow-photo {
  flex: 5;
}
.contact {
  /*background-color: #bed5ee;*/
  flex: 4;
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
  margin: 0 auto;/*auto是关键*/

}
.text-hi{
  font-size: 50px;
  color: #f35858;
}
.cr-text-detailIntro{
  margin: 10px 10px;
  color: white;
  font-weight: 100 ;
  /*text-shadow: 0px 0px 10px rgba(255,255,255,0.5);*/
  letter-spacing: 1px;
}
</style>
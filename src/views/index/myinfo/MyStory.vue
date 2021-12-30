<template>
  <div class="container">
    <div class="introduction">introduction</div>
    <div class="slideshow-photo">
      <div class="cb-cpn">
        <circular-banner>
          <template v-slot:swiper-left>

          </template>
          <template v-slot:swiper-right>

          </template>
        </circular-banner>
      </div>
    </div>
    <div class="contact">contact</div>
  </div>
</template>

<script>
import CircularBanner from "@/components/style/CircularBanner";

export default {
  name: "MyStory",
  components:{
    CircularBanner
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
  background-image: linear-gradient(to top, #011744, #829abc);
}
.introduction {
  /*background-color: #a75151;*/
  flex: 3;
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
}
</style>
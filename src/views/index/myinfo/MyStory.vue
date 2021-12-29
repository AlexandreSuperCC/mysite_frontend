<template>
  <div class="container">
    <div class="introduction">introduction</div>
    <div class="slideshow-photo">
    <circular-banner></circular-banner>


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
}
.introduction {
  background-color: #a75151;
  flex: 4;
}
.slideshow-photo {
  background-color: blue;
  flex: 6;
}
.contact {
  background-color: #bed5ee;
  flex: 4;
}
</style>
/**
 * @description: 自我介绍轮播图
 * @author ycao
 * @date 2021-12-29 17:30:35
 * @version 1.0
 */
<template>
  <div class="photo-container">
    <img class="my-photo" :src="getPhoto1" alt="me">
  </div>
</template>

<script>
export default {
  name: "CircularBanner",
  data(){
    return {
      curImage:1
    }
  },
  computed:{
    getPhoto1(){
      return "~assets/index/images/myInfo/"+this.curImage+".jpeg"
    }
  }
}
</script>

<style scoped>

</style>
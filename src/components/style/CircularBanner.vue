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

//得到文件夹里所有文件数量
const fileNum = require.context('@/assets/index/images/myInfo',true,/\.jpeg$/).keys().length
// console.log(fileNum);

export default {
  name: "CircularBanner",
  data(){
    return {
      curImage:1,
    }
  },
  mounted() {
  },
  methods:{

  },
  computed:{
    getPhoto1(){
      //使用这种方式拼接src得到图片
      return  require("@/assets/index/images/myInfo/"+this.curImage+".jpeg");
    },
    getPhoto2(){
      let curIndex = this.curImage++;
      return  require("@/assets/index/images/myInfo/"+this.curImage+".jpeg");
    },
    getPhoto3(){
      return  require("@/assets/index/images/myInfo/"+this.curImage+".jpeg");
    },
  }
}
</script>

<style scoped>
.my-photo{
  width: 200px;
}
</style>
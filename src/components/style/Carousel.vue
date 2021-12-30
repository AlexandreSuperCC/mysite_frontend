<template>
  <div class="cr-container">
    <div class="cr-left"><slot name="swiper-left"></slot></div>
    <div class="cr-center">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in photosUrl" :key="item">
          <img class="my-photo" :src="item" alt="photo">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="cr-right"><slot name="swiper-right"></slot></div>
  </div>
</template>

<script>
import {myPhotoPath} from "@/utils/const/const";

export default {
  name: "Carousel",
  data(){
    return {
      photosUrl:[]
    }
  },
  methods:{
    getPhotosUrls(){
      this.photosUrl.push(myPhotoPath+'/1.jpeg')
      this.photosUrl.push(myPhotoPath+'/2.jpeg')
      this.photosUrl.push(myPhotoPath+'/3.jpeg')
      this.photosUrl.push(myPhotoPath+'/4.jpeg')
      this.photosUrl.push(myPhotoPath+'/5.jpeg')
      this.photosUrl.push(myPhotoPath+'/6.jpeg')
      this.photosUrl.push(myPhotoPath+'/7.jpeg')
    }
  },
  mounted() {
    this.getPhotosUrls()
  }
}
</script>

<style scoped>
/*模版里的*/
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/*自己加的*/
.my-photo{
  width: 100%;
  height: 100%;
}
.cr-container{
  display: flex;
}
.cr-left{
  flex: 1;
  /*background-color: #e87272;*/
}
.cr-right{
  flex: 1;
  background-color: #f35858;
  margin-left: 50px;
  margin-right: 50px;
}
.cr-center{
  flex: 1;
}
</style>
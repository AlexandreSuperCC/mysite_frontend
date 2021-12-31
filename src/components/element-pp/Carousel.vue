/**
 * @description: 基于element-plus的一个轮播图组件，加了两个插槽设计，分别位于左右两侧
 * @author ycao
 * @date 2021-12-31 09:29:35
 * @version 1.0
 */
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
  flex: 5;
  margin-left: 18px;
  margin-right: 18px;
}
.cr-right{
  flex: 5;
  background-color: #f35858;
  margin-left: 18px;
  margin-right: 18px;
}
.cr-center{
  flex: 6;
}
</style>
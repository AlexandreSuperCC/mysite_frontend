/**
 * @description: 基于element-plus的一个轮播图组件，加了两个插槽设计，分别位于左右两侧
 * @author ycao
 * @date 2021-12-31 09:29:35
 * @version 1.0
 */
<template>
  <div class="cr-container">
    <el-row>
      <el-col :xl="{span:1}" :lg="{span:1}" :md="{span:0}" :sm="{span:0}"/>
      <el-col :xl="{span:8}" :lg="{span:7}" :md="{span:7}" :sm="{span:6}">
        <div class="cr-left"><slot name="swiper-left"></slot></div>
      </el-col>
      <el-col :xl="{span:6}" :lg="{span:8}" :md="{span:10}" :sm="{span:12}">
        <div class="cr-center">
          <div class="not-safari" v-if="!usingSafari">
            <el-carousel :interval="4000" type="card" height="300px">
              <el-carousel-item v-for="item in photosUrl" :key="item">
                <img class="my-photo" :src="item" alt="photo">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="is-safari" v-if="usingSafari">
            <circular-banner/>
          </div>
        </div>
      </el-col>
      <el-col :xl="{span:1}" :lg="{span:1}" :md="{span:0}" :sm="{span:0}"/>
      <el-col :xl="{span:7}" :lg="{span:7}" :md="{span:7}" :sm="{span:6}">
        <div class="cr-right"><slot name="swiper-right"></slot></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {myPhotoPath} from "@/utils/const/const";
import {myBrowser} from "@/utils/browser/browser";
import CircularBanner from "@/components/style/CircularBanner";

export default {
  name: "Carousel",
  data(){
    return {
      photosUrl:[],
      usingSafari:false,
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
    },
    /**
     * 因为safari浏览器不支持element-plus的carousel因此如果是safari就放我自己写的
     * @return
     * @time 2022-01-01 12:18:20
     */
    checkBrowser(){
      const mb = myBrowser();
      if(mb==='Safari'){
        this.usingSafari=true;
      }
    }
  },
  mounted() {
    this.getPhotosUrls()

  },
  created() {
    this.checkBrowser();
  },
  components:{
    CircularBanner,
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
  height: 100%;
  /*margin: 0;*/
  /*padding: 0;*/
}
.cr-left{
}
.cr-right{
  padding: 8px 8px;
  background-color: #1c5359;
  margin-right: 88px;
}
.cr-center{
  padding: 0 20px;
  justify-content: center;
}
</style>
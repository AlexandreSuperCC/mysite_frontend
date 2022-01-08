/**
* @description: 使用GoogleMap组件
  使用手册：https://www.npmjs.com/package/googlemaps-vue3
  平台：https://developers.google.com/maps/documentation/javascript/usage-and-billing?hl=fr
  费用：1000次大约50块
  注意：【Modifier la limite de quota】这里可以更改每天访问的次数，20220108修改为100次
* @author ycao
* @date 2022-01-08 22:08:27
* @version 1.0
/
<template>
  <div class="google-map-container">
    <GoogleMap :init="initializeGoogleMap"
               :markers="locationList"
               :getUserLocation="true"
               @clicked="customCoordinates = $event"
    />
  </div>
</template>

<script>
import {reactive} from "@vue/reactivity";

export default {
  name: "GoogleMapAPI",
  data(){
    return {
      //当前用户位置参数对象
      curPosObj:{
        lng:0,
        lat:0
      },
      cityBelfortPosObj:{
        lat: 47.6397,
        lng: 6.8638
      },
      customCoordinates:null
    }
  },
  created() {
  },
  mounted() {

  },
  methods:{

  },
  components:{
    //改过GoogleMap.js的源码里组件的地址
  },
  computed:{
    initializeGoogleMap(){
      return {
        streetViewControl: false,//收费
        scaleControl: true,
        center: this.cityBelfortPosObj,
        zoom: 2,
      }
    },
    locationList(){
      return reactive([
        {
          lat: 48.8566,
          lng: 2.3522,
          content: { content: `Paris: Capital of <b>France</b>` },
          icon: require("@/assets/index/images/gmap/ParisEffel.png")
        },
        {
          lat: 47.6397,
          lng: 6.8638,
          content: { content: `My location: <b>Belfort</b>` },
          icon: require("@/assets/index/images/gmap/home.png"),
        },
          //上海这边的没有显示出来，原因暂时不清楚
        {
          lat: 121.4737,
          lng: 31.2304,
          content: { content: `My hometown: <b>Shanghai</b>`},
          icon: require("@/assets/index/images/gmap/SHOTower.png")
        },
      ]);
    },
  }
}
</script>

<style scoped>
.google-map-container{
}
</style>
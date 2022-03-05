/**
* @description: 使用GoogleMap组件
  使用手册：https://vue-map.netlify.app/docs/#install
  平台：https://developers.google.com/maps/documentation/javascript/usage-and-billing?hl=fr
  费用：1000次大约50块
  注意：【Modifier la limite de quota】这里可以更改每天访问的次数，20220108修改为100次
* @author ycao
* @date 2022-01-08 22:08:27
* @version 1.0
/
<template>
  <div class="google-map-container">
    <GMapMap
        :center="center"
        :zoom="10"
        map-type-id="terrain"
        style="width: 100vw; height: 20rem"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<script>

export default {
  name: "GoogleMapAPI",
  data(){
    return {
      center: {
        lat: 47.6397,
        lng: 6.8638
      },
      markers: [
      ],
    }
  },
  components:{
    //改过GoogleMap.js的源码里组件的地址
  },
  /*
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
      return ([
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
  }*/
}
</script>

<style scoped>
.google-map-container{
  height: 100%;
  width: 100%;
}
</style>
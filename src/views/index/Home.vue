<template>
<div class="home-container">
<main-frame @changeCacheOptions="changeCacheArr"></main-frame>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheArr">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</div>
</template>

<script>
import MainFrame from "@/components/common/MainFrame";
import { cacheArrRoute } from "../../utils/const/const";

export default {
  name: "Home",
  components: {MainFrame},
  data(){
    return {
      cacheArr:[]
    }
  },
  methods:{
    changeCacheArr(opt){
      if(opt){
        this.cacheArr=cacheArrRoute
      }else{
        this.cacheArr=[]
      }
    }
  }
}
</script>

<style scoped>
.home-container{
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
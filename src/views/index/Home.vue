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

export default {
  name: "Home",
  components: {MainFrame},
  created() {
    // console.log("home created");
  },
  mounted() {
    window.addEventListener('unload',this.saveStateToken)
    window.addEventListener('load',this.clearStateToken)

  },
  data(){
    return {
      cacheArr:[]
    }
  },
  methods:{
    saveStateToken(){
      sessionStorage.setItem('stateToken',JSON.stringify(this.$store.state.token))
    },
    clearStateToken(){
      sessionStorage.removeItem('stateToken')
    },
    changeCacheArr(opt){
      if(opt){
        this.cacheArr=['UploadFile','Markdown','Article','AboutMe','MyStory']
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
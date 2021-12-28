<template>
<div>
<main-frame></main-frame>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['UploadFile','Markdown','Article','AboutMe','MyStory']">
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

    }
  },
  methods:{
    saveStateToken(){
      sessionStorage.setItem('stateToken',JSON.stringify(this.$store.state.token))
    },
    clearStateToken(){
      sessionStorage.removeItem('stateToken')
    },
  }
}
</script>

<style scoped>

</style>
<template>
  <div id="app">
    <!-- 使用路由缓存 -->
    <router-view class="box" v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
    <!-- 使用路由缓存 -->
  </div>
</template>
<script>
  export default {
    name:'app',
    components:{

    },
    computed:{

    }
  }
</script>
<style>
/*container full screen*/
html,body,#app,.el-container{
  margin: 0;
  padding: 0;
  height:100%;
}

</style>

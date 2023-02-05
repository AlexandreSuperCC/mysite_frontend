<template>
  <div id="app">
    <!-- 使用路由缓存 -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="[]">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- 使用路由缓存 -->
  </div>
</template>
<script>
import { ycaoId } from './utils/const/const'
import {setConstants} from './utils/utils'

  export default {
    name:'app',
    data(){
    return {
      domain:this.$options.name,//当前组件名字
    }
  },
    mounted() {
      setConstants(ycaoId,this.domain)
    },
    methods: {
    },
    components:{

    },
    computed:{

    }
  }
</script>
<style lang="scss">
@use "@/assets/style/cklovery.scss";

/*container full screen*/
html,body,#app,.el-container{
  margin: 0;
  padding: 0;
  height:100%;
}
</style>

/**
 * @description: 组件化思想，可以通过v-if 在DOM中生成或移除一个元素。
 * @author ycao
 * @date 2021-12-29 15:57:07
 * @version 1.0
 */
<template>
<div ref="starsEffect">

</div>
</template>

<script>
import {mouseEffectPath} from "@/utils/const/const";

export default {
name: "MouseStars",
  mounted() {
    this.makeEffect();
  },
  methods:{
    makeEffect(){
      const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.src = mouseEffectPath+'/mouseStarsOld.js';
      oScript.id = 'mymouse';
      let div = this.$refs.starsEffect
      div.appendChild(oScript);
    }
  }
}
</script>

<style scoped>

</style>
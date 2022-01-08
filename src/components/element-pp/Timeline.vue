<template>
  <div class="block" @click="infoDrawer = true">
    <el-timeline>
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
      >
        <div class="timeline-content">
          {{ activity.content }}
        </div>
      </el-timeline-item>
    </el-timeline>
    <div class="formation-click">
      <img class="formation-click-icon" src="~assets/index/images/click_32.png" alt="click-me">
    </div>
  </div>
  <el-drawer v-model="infoDrawer" direction="ltr" title="I am the title" :with-header="true">
    <span>Hi there!</span>
  </el-drawer>
</template>

<script>
import { MoreFilled } from '@element-plus/icons-vue'
import {markRaw} from "@vue/reactivity";
export default {
  name: "Timeline",
  data() {
    return {
      infoDrawer:false,
      activities: [
        {
          content: 'Etudiant en Ingénierie Informatique à l\'Université de Technologie de Belfort-Montbéliard, FR',
          timestamp: '2020-09-01 à 2023-01-31',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },
        {
          content: 'Licence en Génie Informatique à l\'U.T.S.E.U.S. de l\'Université de Shanghai, CN',
          timestamp: '2017-09-01 à 2020-06-30',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },
        {
          content: 'Bac au Lycée rattaché à Fudan Université, Pudong Campus, Shanghai, CN',
          timestamp: '2014-09-01 à 2017-06-30',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },

      ],
    }
  }
}
</script>

<style scoped>
.block{
  cursor: pointer;
}
.timeline-content{
  color: #f8f0f0;
  letter-spacing: 1px;
  font-family: Arial;
  font-size: small;
}
.formation-click{
  width: 100%;
  height: 100%;
  position: relative;
  left: 39px;
  bottom: 38px;
}
.formation-click-icon{
  width: 15px;
  /*opacity: 0.9;*/
  /*transform: rotateX(180deg);*/
}
</style>
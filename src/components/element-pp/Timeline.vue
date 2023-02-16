<template>
  <div class="block" @click="infoDrawer = true">
      <div class="timeline-title">
      Education
    </div>
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
      <div class="timeline-title">
      Intern Experience
      </div>
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in experiences"
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
  <el-drawer :size="drawerSize" v-model="infoDrawer" direction="ltr" title="Internship 2021-2022 Developer at Yonyou and Diapason" :with-header="true">
    <div>
      <a href="https://www.yonyou.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/rapport.png" style="width: 50%;height: 38%"
             alt="Youyou">
      </a>  
      <a href="https://www.yonyou.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/UML.png" style="width: 50%;height: 38%"
             alt="Youyou">
      </a>
      <br><br>
      During these 6 months as a Backend Developer at Yonyou in Shanghai, I mainly participated in 4 projects that each took me between a week and 2 months concerning improvements and developments of ERP software of different series. I also did a lot of corrective maintenance to these systems by solving problems frequently posed by the application maintenance developers. These projects are mainly in the Supply Chain and Financial Affairs sectors.
      <br><br>
      <a href="https://www.mydiapason.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/report.png" style="width: 50%;height: 38%"
             alt="Diapason">
      </a>  
      <a href="https://www.mydiapason.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/bundle.png" style="width: 50%;height: 38%"
             alt="Diapason">
      </a>
      <br><br>
      During these 6 months as a Fullstack Developer at Diapason in Paris, I realized the Webpack migration, updated our frontend framework and added new Diapason themes. As our group is specialized in financial solutions, I have the chance to acquire a lot of professional knowledge such as treasury, payments except programming techniques. After having done all my work as a Fullstack developer, I know well the techniques that are used in our company, especially in a software in the areas of treasury and also the necessary tools to facilitate my work such as Putty, Veracrypt.
      <br><br>
      <h4><span style="color: red">Mots clefs :</span> ERP, Supply Chain, Finance, Documentation, Algorithmes, Javascript, Java, Oracle</h4>

    </div>
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
          content: 'Master\'s degree, Software Engineering in UTBM, Belfort, FR',
          timestamp: '2020-09-01 - 2023-01-31',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },
        {
          content: 'Bachelor\'s degree, Computer Science in SHU, Shanghai, CN',
          timestamp: '2017-09-01 - 2020-06-30',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },
      ],
      experiences: [
        {
          content: 'ERP Backend Developer in Yonyou, Shanghai, CN',
          timestamp: '2021-08-01 - 2022-01-31',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },
        {
          content: 'Fullstack Developer in Diapason, Paris, FR',
          timestamp: '2022-07-01 - 2022-12-31',
          size: 'large',
          type: 'primary',
          icon: markRaw(MoreFilled),
        },
      ],
    }
  },
  props: {
    drawerSize: { type: String, default: "35%" }
  },
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
.timeline-title{
  color: #f8f0f0;
  padding-left: 40px;
  margin-bottom: 15px;
}
</style>
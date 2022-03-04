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
  <el-drawer v-model="infoDrawer" direction="ltr" title="Stage 2021 - Développeur Backend chez Yonyou" :with-header="true">
    <span>
      Yonyou Network Technology Co., Ltd. a son siège social à Beijing. Fondée en 1988, Yonyou, (en chinois : 用友) est devenue le principal fournisseur de logiciels de gestion d'entreprise, de solutions et de services en nuage en Chine et en Asie - Pacifique.
      <br><br>
      <a href="https://www.yonyou.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/yonyou.jpg" style="width: 100%"
              alt="Youyou">
      </a>
      <br><br>
      Pendant ces 6 mois, j’ai principalement participé à 4 projets qui m’ont pris chacun le temps entre une semaine et 2 mois concernant les améliorations et développements des logiciels ERP de séries différents. J’ai également fait beaucoup de maintenances correctives à ces systèmes en résolvant de problèmes posés fréquemment par les développeurs maintenances applicatives. Ces projets concernent essentiellement les secteurs Supply Chain et affaires financières.
      <br><br>
      <a href="https://www.yonyou.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/rapport.png" style="width: 50%;height: 38%"
             alt="Youyou">
      </a>
      <a href="https://www.yonyou.com" target="_blank">
        <img class="next-page-icon" src="~assets/index/images/stage/UML.png" style="width: 50%;height: 38%"
             alt="Youyou">
      </a>
      <h4><span style="color: red">Mots clefs :</span> Algorithmes, Java, Oracle, ERP, Supply Chain, Finance</h4>

    </span>
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
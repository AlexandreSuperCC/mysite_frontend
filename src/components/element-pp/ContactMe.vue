<template>
  <div class="cm-container">
    <div class="cm-left"></div>
    <div class="cm-middle">
      <el-steps :active="curActive">
        <el-step title="phone number" @click="changeActive(0)">
          <template v-slot:icon>
            <img class="smartphone-icon" src="~assets/index/images/contact/smartphone.png" alt="phone">
          </template>
          <template v-slot:description>
            <a class="my-telephone" href="tel:0668252048">+(33) 06 68 25 20 48</a>
          </template>
        </el-step>
        <el-step title="e-mail" @click="changeActive(1)">
          <template v-slot:icon>
            <img class="email-icon" src="~assets/index/images/contact/email.png" alt="email">
          </template>
          <template v-slot:description>
            <a class="my-email" target="_blank" href="mailto:yuan.cao@utbm.fr">yuan.cao@utbm.fr</a>
          </template>
        </el-step>
        <el-step title="linkedin" @click="changeActive(2)">
          <template v-slot:icon>
            <img class="linkedin-icon" src="~assets/index/images/contact/linkedin.png" alt="linkedin">
          </template>
          <template v-slot:description>
            <a class="my-linkedin" target="_blank" href="https://www.linkedin.com/in/yuan-cao-75b112208">linkedin.com/in/yuan-cao-75b112208</a>
          </template>
        </el-step>
        <el-step title="location" description="Belfort, France" @click="changeActive(3)">
          <template v-slot:icon>
            <img class="location-icon" src="~assets/index/images/contact/location.png" alt="location">
          </template>
        </el-step>
      </el-steps>
    </div>
    <div class="cm-right"></div>
  </div>
</template>

<script>
import {markRaw} from "@vue/reactivity";
import {LocationInformation, Message, Phone} from "@element-plus/icons-vue";

export default {
  name: "ContactMe",
  data(){
    return {
      Message: markRaw(Message),
      Phone: markRaw(Phone),
      LocationInformation: markRaw(LocationInformation),
      curActive:4,
    }
  },
  methods:{
    changeActive(ind){
      this.curActive=this.curActive===ind?4:ind;
    }
  },
  computed:{
    getIcon1(){
      return require("@/assets/index/images/contact/linkedin.png")
    }
  }
}
</script>

<style scoped>
.cm-container{
  display: flex;
  margin-top: 30px;
}
.cm-left,.cm-right{
  flex: 1;
}
.cm-middle{
  flex: 2;
  padding: 20px;
  margin-top: 20px;
  background-color: #e8e9af;
;
}
a{
  color: #0022ff;
}
/*a:link{*/
/*  color: #0022ff*/

/*}*/
/*a:visited{*/
/*  color: #5469f1*/
/*}*/
</style>
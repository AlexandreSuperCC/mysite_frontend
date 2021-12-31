<template>
  <div class="cm-container">
    <div class="cm-left"></div>
    <div class="cm-middle">
      <el-steps :active="1">
        <el-step title="Step 1" :description="new Date().getTime()">
<!--          <template v-slot="icon">-->
<!--            <img class="linkedin-img" src="~assets/index/images/contact/linkedin.png" alt="linkedin">-->
<!--          </template>-->
          <template slot="description">
            ycao
          </template>
        </el-step>
        <el-step title="Step 2" icon="email"></el-step>
        <el-step title="Step 3" icon="phone"></el-step>
      </el-steps>
    </div>
    <div class="cm-right"></div>
  </div>
</template>

<script>
import { Edit, Upload, Picture } from '@element-plus/icons'

export default {
  name: "ContactMe",
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
  margin-top: 10px;
}
.cm-left,.cm-right{
  flex: 1;
}
.cm-middle{
  flex: 2;
  padding: 30px;
}
</style>
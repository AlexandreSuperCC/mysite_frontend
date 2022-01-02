<template>
  <div class="beian-container">
    <div class="right-reserved">
      Copyright © 2021 YCAO. All rights reserved.
    </div>
    <a class="beian-id" target="_blank" href="https://beian.miit.gov.cn/">
      <p class="beian-id-text">
        沪ICP备2021023791号-1
      </p>
    </a>
    <a class="hudongwanganbei" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010902003276">
      <img src="~assets/index/images/beianIcon.png" style="float:left;"/>
      <p class="gongan-text">
        沪公网安备 31010902003276号
      </p>
    </a>
  </div>
</template>

<script>
export default {
  name: "Beian"
}
</script>

<style scoped>
.beian-container{
  height: 100%;
  width:500px;
  margin:15px auto;
  /*padding:20px 0;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
.right-reserved{
  color: #939393;
}
.beian-id,.hudongwanganbei,.right-reserved{
  flex: 1;
  text-decoration:none;
  /*line-height:20px;*/
  margin: 1px;
  cursor: pointer;
}
.beian-id-text,.gongan-text{
  float:left;
  margin: 0px 0px 0px 5px;
  color:#939393;
}
</style>
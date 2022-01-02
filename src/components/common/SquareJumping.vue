/**
 * 方块跳动特效
 * https://www.jq22.com/webqd4104
 * Created by ycao on 2022-01-01 23:38:58
 */
<template>
<div class="square-jumping">

</div>
</template>

<script>
export default {
  name: "SquareJumping"
}
</script>

<style scoped>
.square-jumping{
  height: 50px;
  width: 50px;
  /*margin: 40px auto;*/
}
.square-jumping::before{
  content: '';
  height: 8px; width: 50px; background: #000; opacity: .2; border-radius: 50%;
  position: absolute;
  top: 67px;
  left: 0;
  animation: shadow .5s linear infinite;
}
.square-jumping::after{
  border-radius: 5px;
  background: #fff;
  animation: rotate .5s linear infinite;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
}
@keyframes shadow {
  0%, 100% {transform: scaleX(1);}
  50% {transform: scaleX(1.2);}
}

@keyframes rotate {
  0% {
    transform: translateY(0) ;
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px) scale(1.1, 0.9);

  }
  75% {
    ransform: translateY(10px) ;
  }
  100% {
    transform: translateY(0) ;
  }
}
</style>
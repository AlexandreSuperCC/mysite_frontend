<template>
<div class="BackupFrame">
  <div class="head">
    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
  <div class="body">
    <slot name="main-content"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "BackupFrame"
}
</script>

<style scoped>
.BackupFrame{
}
.head{
  display: flex;
  text-align: center;
}
.left,.right,.middle{
  flex: 1;
}

</style>
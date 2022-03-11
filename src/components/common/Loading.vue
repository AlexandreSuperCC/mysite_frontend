<template>
  <div class="load-container">
    <div class="load"></div>
    <div class="text">loading...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped >
.load-container .load {
  width: 60px;
  height: 60px;
  background-color: #1e8fc6;
  margin: 50px auto;
  animation: rotateplane 1.2s infinite ease-in-out;
}

.load-container .text {
  text-align: center;
}

@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    } 100% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
}
</style>


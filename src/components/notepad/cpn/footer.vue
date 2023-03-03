<template>
  <footer class="footer">
    路漫漫其修远兮，吾将上下而求索！
    <el-button type="primary" size="small" @click="saveNotes">
        Save<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data(){
    return {
    }
  },
  methods:{
    saveNotes(){
      
    }
  },
}
</script>
<style>
  .footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #f8f8f8;
      text-align: center;
      font-size: 14px;
      color: #666;
      border-top: 1px solid #ddd;
  }
  .footer a{
      color: #666;
  }
</style>
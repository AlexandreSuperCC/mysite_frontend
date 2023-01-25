<template>
  <el-table
      :data="
      allFiles.filter(
        (data) =>
          !search || data.fname.toLowerCase().includes(search.toLowerCase())
      )"
      v-loading="getFilesLoading"
      element-loading-text="getting files..."
      size="medium"
      :height="uploadedFileListHeight"
      style="width: 100%"
  >
    <el-table-column label="Date" prop="created" width="150"/>
    <el-table-column label="Name" prop="fname" />
    <el-table-column label="Location" prop="fkey" @click=""/>
    <el-table-column label="Type" prop="ftype" width="100"/>
    <el-table-column align="right" width="200">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search name" />
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleView(scope.$index, scope.row)"
        >View</el-button
        >
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import {ElMessageBox} from "element-plus";

export default {
  name: "UploadedFileList",
  created() {
  },
  mounted() {
    this.getFilesLoading=true;
    this.$store.dispatch('GetAllUploadFile', {userid:this.curUserId}).then(data=>{
      if(data&&data.data){//保证拿到数据
        this.allFiles=data.data;
      }
      this.getFilesLoading=false;
    })
        .catch(err=>{
          this.getFilesLoading=false
          console.log(err)
        })
  },
  props:{
    curUserId:{
      type:String,
      default(){
        return ''
      }
    },
    uploadedFileListHeight:{
      type: Number,
      default(){
        return 300
      }
    }
  },
  data() {
    return {
      allFiles: [],
      search: '',
      getFilesLoading:false,
      fileTimer:''
    }
  },
  computed:{

  },
  methods: {
    handleView(index, row) {
      window.open(row.fkey)
    },
    handleDelete(index, row) {
      this.$store.dispatch("DeleteOneFile",{fname:row.fname}).then(res=>{
        if(res.code==='fail'){
          ElMessageBox.alert("deleting file fails: "+res.msg,{
            confirmButtonText:'OK',
          })
        }
        this.refreshFileList()//force refresh file list
      }).catch(err=>{
        this.refreshFileList()//force refresh file list
        console.log(err)
      })
    },
    refreshFileList(){
      this.$emit('doRefreshFileList',new Date().getTime())
    }
  },

}
</script>

<style scoped>

</style>
<template>
  <footer class="footer">
    <el-button type="primary" size="small" @click="saveNotes">
        Save to database<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
      <el-popconfirm title="Are you sure to overwrite local changes?" @confirm="getNotes">
        <template #reference>
          <el-button type="primary" size="small">
            Download from database<el-icon class="el-icon--right"><Download /></el-icon>
          </el-button>
        </template>
      </el-popconfirm>
  </footer>
</template>
<script>
import { myNotesId, ycaoId } from '../../../utils/const/const';
import {ElMessageBox} from "element-plus";
import { setConstants } from '../../../utils/utils';

export default {
  name: "Footer",
  data(){
    return {
    }
  },
  computed:{
    getConstantUpdateObj(){
      return {
        id: myNotesId,
        cid: ycaoId,
        content:JSON.stringify(this.$store.state.notepadEvent),
      }
    }
  },
  methods:{
    getNotes(){
      setConstants(ycaoId,'Notepad',()=>{
        this.$store.getters.constants.myNotes&&this.$store.dispatch('uploadevent',this.$store.getters.constants.myNotes);
      })
    },
    saveNotes(){
        this.$store.dispatch('UpdateConstant', this.getConstantUpdateObj).then(data=>{
        if(data.code==='success'){//保存成功
             ElMessageBox.alert("Update has been saved！ ",{
                confirmButtonText:'OK'
            })}
        else{ElMessageBox.alert("some problems happen while saving: <br/>"+data.msg,{confirmButtonText:'OK',dangerouslyUseHTMLString:true})}})
      .catch(err=>{console.log(err)})    
    },
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
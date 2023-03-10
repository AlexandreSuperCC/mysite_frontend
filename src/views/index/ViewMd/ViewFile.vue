<template>
  <div class="pop">
    <p class="view-btn"><el-button type="success" plain @click="hiddenTellFather">click me or anywhere outside to close</el-button></p>
    <div class="html-content">
      <p v-html="textHtml"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewFile",
  watch:{
    'transferViewStatusChangeFlag':'doChangeStatusFlag'
  },
  mounted() {
    /**
     * click the outside of the view, the view closes, how it works:
     * two flags important:
     * 1.showModal: tell the father to close the view
     * 2.viewStatusChangeFlag: because of the fast data transfer, the view can not be open when click 'view', so use a counter,
     *                         we use 'watch' to monitor the change of value incoming from father to active the counter
     *                         after 0.1s the flag becomes true, so before that time the code 'this.realViewCloseFlag=false;' cannot be reached
     *                         and after that we can click the outside to close the view
     *                         make sure to make return this flag after closing the view
     * others:
     * 'this.$el' only works in 'mounted'
     * difference:
     * $el 获取Vue实例关联的DOM元素；
     * $ref 获取页面中所有含有ref属性的DOM元素
     * @return
     * @time 2021-12-12 11:23:42
     */
    document.addEventListener('click',e => {
      if(this.viewStatusChangeFlag){
        if(this.$el.contains(e.target)){}
        else{
          this.viewStatusChangeFlag=false;
          this.$emit("hiddenView");//点击其他区域关闭
        }
      }
    })
  },
  data() {
    return {
      viewStatusChangeFlag:false
    };
  },
  methods:{
    hiddenTellFather(){
      this.viewStatusChangeFlag=false;
      this.$emit("hiddenView");
    },
    doChangeStatusFlag(){
      setTimeout(()=>{
        this.viewStatusChangeFlag=true
      },100)
    }
  },
  props:{
    textHtml:{
      type:String,
      default(){
        return ''
      }
    },
    transferViewStatusChangeFlag:{
      type:Boolean,
      default() {
        return false;
      }
    }

  },
}
</script>

<style scoped>
.pop {
  background-color: #fff;

  position: fixed;
  top: 50px;
  right: 50px;
  left: 50px;
  height:calc(100% - 100px);
  z-index: 2;
  overflow: auto;

  border-radius: 4px;
  border: 1px solid blue;
}
.view-btn{
  text-align: center;
}
.html-content{
  padding: 0px 20px;
  margin: 0px 0px;
}
</style>
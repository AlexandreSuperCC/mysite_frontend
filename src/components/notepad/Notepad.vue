<template>
    <div id="notepad" :class="[getTheme]">
        <n-header @tools="changePages"></n-header>
        <section class="container" :class="{'hide': table}">
            <n-add></n-add>
            <n-list></n-list>
            <n-sidebar :is-show="tools"
                       @cleardialog="clearData"
                       @uploadData="uploadData"
                       @opentable="table = true;tools = false"
                       @opentheme="theme = true;tools = false"
            ></n-sidebar>
        </section >
        <transition name="dialog">
            <!-- <n-dialog :is-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog> -->
            <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
        </transition>
        
        <n-table @deldialog="delData" :is-show="table" @close="table = false"></n-table>
        <n-theme :is-show="theme" @close="theme = false"></n-theme>
        <n-footer></n-footer>
    </div>
</template>

<script>
    import nHeader from './cpn/header.vue';
    import nFooter from './cpn/footer.vue';
    import nAdd from './cpn/event_add.vue';
    import nTable from './cpn/event_table.vue';
    import nList from './cpn/event_list.vue';
    import nSidebar from './cpn/sidebar.vue';
    import nDialog from './cpn/dialog.vue';
    import nTheme from './cpn/theme.vue';
    import {ElMessageBox} from "element-plus";

    import { ycaoId,myNotesId } from '../../utils/const/const';

    export default {
        data(){
            return {
                tools:false,
                dialog: false,
                table: false,
                theme: false,
                dialog_type: '',
                tips: '',
                del_info: {
                    index: 0,
                    id: 0
                },
            }
        },
        components: {
            nHeader, nAdd, nSidebar, nDialog, nTable, nList, nTheme, nFooter
        },
        computed:{
            getTheme(){             // 获取主题色
                return this.$store.getters.getTheme;
            },
            getConstantUpdateObj(){
                return {
                    id: myNotesId,
                    cid: ycaoId,
                    content:JSON.stringify(this.$store.state.notepadEvent),
                }
            },
            getDefaultNotesObj(){
                return {
                    id: myNotesId,
                    cid: ycaoId,
                    content:JSON.stringify({event: [],count: 0}),
                }
            }
        },
        methods: {
            clearData(){
                this.tools = false;
                this.dialog = true;
                this.dialog_type = 'clear';
                this.tips = "Can't recover after emptying, confirm emptying?";
            },
            delData(index,id){
                this.dialog = true;
                this.dialog_type = 'del';
                this.tips = "Can't recover after deletion, confirm deletion?";
                this.del_info = {
                    index: index,
                    id : id
                }
            },
            uploadData(){
                this.tools = false;
                this.dialog = true;
                this.dialog_type = 'upload';
                this.tips = 'upload';
            },
            sureDialog(){
                const self = this;
                switch (self.dialog_type){
                    case 'clear':
                        self.$store.dispatch('clearevent');
                        ElMessageBox.alert("Clearing data succeeds！ ",{
                            confirmButtonText:'OK'
                        })
                        break;
                    case 'del':
                        self.$store.dispatch('delevent',self.del_info);
                        ElMessageBox.alert("Deleting succeeds! ",{
                            confirmButtonText:'OK'
                        })
                        break;
                }
                this.dialog = false;
            },
            changePages(){
                if(this.table){
                    this.table = !this.table;
                }else if(this.theme){
                    this.theme = !this.theme;
                }else{
                    this.tools = !this.tools
                }
            }
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="../../assets/style/notepadTheme.scss"></style>
<style lang="scss" rel="stylesheet/scss">
    #notepad {
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        .container{
            width:100%;
            padding: 0 10px;
            max-width:800px;
            margin:auto;
            box-sizing: border-box;
            &.hide{
                display: none;
            }
        }
        .dialog-enter-active, .dialog-leave-active {
            transition: opacity .3s;
        }
        .dialog-enter, .dialog-leave-to{
            opacity: 0;
        }
    }
    ul,li,input,p{
        margin:0;
        padding:0;
    }
    input,button{
        -webkit-tap-highlight-color: transparent;
    }
    input[type=text]{
        -webkit-appearance: none;
    }
    button{
        padding:7px 0;
        outline: none;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;
        font:{
            size:inherit;
            family: inherit;
        }
        cursor: pointer;
    }
    ::-webkit-scrollbar{
        width: 0;
    }
    ul{
        list-style: none;
    }
</style>
<template>
    <div class="event-tools" :class="{'show-event-tools':isShow}">
        <ul class="tools-sidebar">
            <li>
                <button class="tools-btn" @click="openTheme">New Theme</button>
            </li>
            <li>
                <button class="tools-btn" @click="downloadData('notepad.txt',getDate)">Download</button>
            </li>
            <li>
                <button class="tools-btn" @click="uploadData()">Import</button>
            </li>
            <li>
                <button class="tools-btn" @click="openTable">Edit</button>
            </li>
            <li>
                <button class="tools-btn" @click="showDialog">Clear</button>
            </li>            
            <li>
                <button class="tools-btn" @click="this.$router.back()">Go Back</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props:['isShow'],
        computed:{
            getDate(){
                const self = this;
                return JSON.stringify(self.$store.state.notepadEvent);
            }
        },
        methods: {
            showDialog(){
                this.$emit('cleardialog');
            },
            openTable(){
                this.$emit('opentable');
            },
            openTheme(){
                this.$emit('opentheme');
            },
            downloadData(fileName, content){
                let aTag = document.createElement('a');
                let blob = new Blob([content]);
                aTag.download = fileName;
                aTag.href = URL.createObjectURL(blob);
                aTag.click();
                URL.revokeObjectURL(blob);
            },
            uploadData(){
                this.$emit('uploadData');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .event-tools{
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        width:250px;
        padding:100px 20px 30px;
        box-sizing: border-box;
        transform: translateX(-250px);
        transition: transform .3s;
        text-align: center;
        background: rgba(0,0,0,.5);
        font-size: 16px;
        z-index:9;
        &.show-event-tools{
            transform: translateX(0);
        }
        .tools-sidebar{
            & > li{
                line-height: 60px;
            }
        }
        .tools-btn{
            width:100px;
            height:40px;
            line-height: 26px;
            color: #fff;
            transition: background .3s ease-in;
        }
        pre{
            white-space: pre-wrap;
            font:{
                size: 14px;
                family:  arial,"microsoft yahei";
            }
            line-height: 20px;
        }
    }

</style>

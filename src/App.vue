<style>
/* 滚动槽 */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0,0,0,0.06);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0,0,0,0.12);
}
</style>

<template>
<div id="app" ref="homePage">
    <MyHead>Header</MyHead>
    <Row type="flex" justify="center" class="code-row-bg" style="height:calc(100%-60px)">
        <Col :xs="24" :sm="24" :md="22" :lg="18" >
            <Row type="flex" class="code-row-bg" >
                <Col :xs="0" :sm="0" :md="5" :lg="4" >
                    <MySide></MySide>
                </Col>
                <Col :xs="24" :sm="24" :md="14" :lg="16" >
                    <router-view/>
                </Col>
                <Col :xs="0" :sm="0" :md="5" :lg="4" >
                    <RightSide></RightSide>
                </Col>
            </Row>
        </Col>
    </Row>
</div>
</template>
<script>
    import MySide from "@/components/MySide.vue";
    import MyHead from "@/components/MyHead.vue";
    import RightSide from "@/components/RightSide.vue";
    
    export default {
        name: 'app',
        data(){
            return{
                clientHeight:''
            }
        },
        components: {
            MySide,
            MyHead,
            RightSide
        },
        mounted(){
            // 获取浏览器可视区域高度
            this.clientHeight = `${document.documentElement.clientHeight}`
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`;
            };
        },
        watch: {
            clientHeight: function () {
                this.changeFixed(this.clientHeight)
            }
        },
        methods:{
            changeFixed(clientHeight){
                this.$refs.homePage.style.height = clientHeight+'px';
            }
        }
    }
</script>
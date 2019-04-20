<style>
/* 滚动槽 */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0,0,0,0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0,0,0,0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
}
</style>

<template>
<div id="app" ref="homePage">
    <MyHead>Header</MyHead>
    <Row type="flex" justify="center" class="code-row-bg" style="height:calc(100%-60px)">
        <Col :xs="24" :sm="24" :md="18" :lg="16" style="height:100%">
            <Row type="flex" class="code-row-bg" style="height:100%">
                <Col :xs="0" :sm="0" :md="8" :lg="4" style="height:100%">
                    <MySide></MySide>
                </Col>
                <Col :xs="24" :sm="24" :md="8" :lg="16" style="height:100%">
                    <router-view/>
                </Col>
                <Col :xs="0" :sm="0" :md="8" :lg="4" style="height:100%">
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
            // 如果 `clientHeight` 发生改变，这个函数就会运行
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
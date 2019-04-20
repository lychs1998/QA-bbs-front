<template>
    <div style="height:100%">
    <Scroll :on-reach-bottom="handleReachBottom" :height="clientHeight2">
        <Card dis-hover v-for="(item, index) in ques" :title="item.question" :key="index" style="margin: 32px 0;margin-left:20px;margin-right:20px">
            {{ item.detail }}
        </Card>
    </Scroll>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                ques: [
                    {
                        question:'问题1',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题2',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题3',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题4',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题5',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题6',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题7',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题8',
                        detail:'这里是问题描述'
                    },                   
                    {
                        question:'问题9',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题10',
                        detail:'这里是问题描述'
                    },

                ],
                clientHeight2:''
            }
        },
        methods: {
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.ques[this.ques.length - 1];
                        for (let i = 1; i < 11; i++) {
                            let q={
                                question:'问题',
                                detail:'这里是问题描述'
                            }
                            this.ques.push(q);
                        }
                        resolve();
                    }, 1000);
                });
            }
        },        
        mounted(){
            // 获取浏览器可视区域高度
            this.clientHeight2 = `${document.documentElement.clientHeight}`-60
            window.onresize = function temp() {
                this.clientHeight2 = `${document.documentElement.clientHeight}`;
            };
        }
    }
</script>

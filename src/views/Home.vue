<template>
    <div style="height:100%">
    <Scroll :on-reach-bottom="handleReachBottom" :height="clientHeight2">
        <h1 v-if="isNone" style="text-align:center;margin:100px 0">还没有人提问</h1>
        <Card dis-hover  v-for="(item, index) in ques" :key="index" style="margin: 32px 0;margin-left:20px;margin-right:20px" >
            <CellGroup slot="title">
                <Cell :title="item.question"  :to="handlegoTo(item.questionID)" />
            </CellGroup>
            <div v-html="mdtoHtml(item.detail)"></div>
        </Card>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Scroll>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'

    export default {
        name: 'home',
        data () {
            return {
                ques: [],
                clientHeight2:'',
                step:10,
                page:1,
                spinShow:true,
                isNone:false
            }
        },
        created(){
            this.getQues();
        }
        ,
        methods: {
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.getQues();
                        resolve();
                    }, 1000);
                });
            },
            mdtoHtml(detail){
                var md=mavonEditor.getMarkdownIt();
                return md.render(detail.toString());
            },
            handlegoTo:function(id){
                return `/question/${id}`
            },
            getQues(){
                this.$axios.post("question/questionList",{p:this.page,num:this.step})
                .then(function(response){
                    if(response.data.length===0){
                        this.$Message.info('已经到底了');
                        return;
                    }
                    response.data.forEach(q => {
                        const que={};
                        que.question=q.question;
                        que.detail=q.detail;
                        que.questionID=q.questionID;
                        this.ques.push(que);
                    });
                    if(this.ques.length===0){
                        this.isNone=true;
                    }else{
                        this.page=this.page+1;
                    }
                    this.spinShow=false;
                }.bind(this));
            }
        },        
        mounted(){
            this.clientHeight2 = `${document.documentElement.clientHeight}`-60
            window.onresize = function temp() {
                this.clientHeight2 = `${document.documentElement.clientHeight}`;
            };
        }
    }
    
</script>

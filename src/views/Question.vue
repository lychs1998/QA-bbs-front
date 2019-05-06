<template>
    <div style="margin: 32px 0;margin-left:20px;margin-right:20px;">
        <Card dis-hover>
            <h3 slot="title">{{question}}</h3>
            <div v-html="mdtoHtml(detail)"></div>
            <Divider />
            <p style="text-align:right"><b>By&nbsp;{{username}}&nbsp;&nbsp;{{createtime}}</b></p>
        </Card>
        <Card style="margin:20px 0" dis-hover>
            <div v-for="(ans,index) in answers" :key="index">
                <Divider orientation="left"><b>{{ans.username}}&nbsp;&nbsp;{{ans.createtime}}</b></Divider>
                <div v-html="mdtoHtml(ans.answer)"></div>
            </div>
            <Divider orientation="left"><b>我要回答</b></Divider>
            <div>
                <Form v-if="!isNotLogin">
                    <FormItem label="" label-position="top" >
                        <mavon-editor :toolbars="toolbars" style="height:300px;width:100%;z-index:0"  v-model="reply"></mavon-editor>
                    </FormItem>
                    <FormItem>
                        <Button style="margin-right: 8px" @click="openEdit = false">取消</Button>
                        <Button type="primary" @click="handlerRe(reply)">提交</Button>
                    </FormItem>
                </Form>
                <h3 v-else style="text-align:center">
                    请先登录
                </h3>
            </div>
        </Card>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'


export default {
    data(){
        return  {
            isNotLogin:true,
            spinShow:true,
            questionID:'',
            username:'',
            userID:'',
            question:'',
            detail:'',
            createtime:'',
            answers:[],
            reply:'',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: false, // 图片链接
                code: true, // code
                table: true, // 表格
                help: true, // 帮助
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                subfield: true, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    created(){
        this.initData();
    },
    methods:{
        mdtoHtml(detail){
            var md=mavonEditor.getMarkdownIt();
            return md.render(detail.toString());
        },
        initData(){
            this.questionID=this.$route.params.id;
            if(this.$cookie.get('token')!==null){
                this.isNotLogin=false;
            }
            this.$axios.post("question/questionDetail",{questionID:this.questionID})
            .then(function(response){
                this.question=response.data.question;
                this.detail=response.data.detail;
                this.userID=response.data.userID;
                this.username=response.data.userName;
                this.createtime=response.data.showTime;
                response.data.answers.forEach(e => {
                    var ans={};
                    ans.answerID=e.answerID;
                    ans.userID=e.userID;
                    ans.username=e.userName;
                    ans.answer=e.answer;
                    ans.createtime=e.showTime;
                    this.answers.push(ans);
                });
                this.spinShow=false;
            }.bind(this));
        },
        handlerRe(){
            if(this.reply===''){
                this.$Message.warning('回答内容不能为空！');
                return;
            }
            this.$axios.post("answer/addAnswer",{token:this.$cookie.get('token'),questionID:parseInt(this.questionID),answer:this.reply})
            .then(function(response){
                if(response.data.code===0){
                    this.$Message.success('回答成功！');
                }else{
                    this.$Message.error('回答失败！')
                }
                this.$router.go(0);
            }.bind(this));
        }
    }
}
</script>

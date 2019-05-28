<template>
    <v-container
    fill-height
    fluid
    grid-list-xl
    >
        <v-layout wrap row>
            <v-flex
            md10
            sm12
            xs12
            lg8
            offset-lg2
            offset-md1
            >
                <v-card dense>
                    <v-card dense flat color="blue lighten-2" height="100px"></v-card>
                    <v-card-text>
                        <v-avatar color="orange lighten-2" style="margin-top:-70px" :size="100">
                            <span class="white--text headline">{{username}}</span>
                        </v-avatar>
                        <v-layout row wrap>
                        <v-flex md3 sm6 xs6>
                            <v-card>
                                <v-card-title>
                                    <span><v-icon color="red">favorite</v-icon>
                                    {{favorite}}
                                    </span>
                                </v-card-title>
                            </v-card>
                        </v-flex>
                        <v-flex md3 sm6 xs6>
                            <v-card>
                                <v-card-title>
                                    <span><v-icon color="amber">star</v-icon>
                                    {{star}}
                                    </span>
                                </v-card-title>
                            </v-card>
                        </v-flex>
                        <v-flex md3 sm6 xs6>
                            <v-card>
                                <v-card-title>
                                    <span><v-icon color="blue-grey">contact_support</v-icon>
                                    {{question}}
                                    </span>
                                </v-card-title>
                            </v-card>
                        </v-flex>
                        <v-flex md3 sm6 xs6>
                            <v-card>
                            <v-card>
                            <v-card-title>
                                <span><v-icon color="black">question_answer</v-icon>
                                {{answer}}
                                </span>
                            </v-card-title>
                            </v-card>
                            </v-card>
                        </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-toolbar dense flat color="white">
                        <v-btn-toggle
                            v-model="type"
                            mandatory
                        >
                        <v-btn flat value="0">
                            Ta的问题
                        </v-btn>
                        <v-btn flat value="1">
                            Ta的回答
                        </v-btn>
                        </v-btn-toggle>
                    </v-toolbar>
                    <v-divider/>
                    <v-card v-if="data.length===0" height="200px" flat dense style="text-align:center;line-height:200px">
                        <h2 v-if="type==='0'">Ta还没有提问</h2>
                        <h2 v-if="type==='1'">Ta还没有回答过问题</h2>
                    </v-card>
                    <v-card
                    color="#fff"
                    v-for="(item,index) in data"
                    :key="index+1"
                    @click="quesGoTo(item.questionID)"
                    style="cursor: pointer;"
                    dense
                    flat
                    >
                        <v-card-title style="background-color:#E3F2FD" v-if="item.title!==''">
                            <span class="title font-weight-bold" >{{item.title}}</span>
                        </v-card-title>
                        <v-card-text class="font-weight-light" v-html="mdtoHtml(item.detail)"/>
                        <v-toolbar flat dense color="white">
                            <div class="font-weight-light">{{item.showtime}}</div>
                            <v-spacer></v-spacer>
                            <v-icon v-if="type==='0'" color="red">favorite</v-icon><v-icon v-if="type==='1'" color="amber">star</v-icon>&nbsp;
                            <span>{{item.star}}</span>&nbsp;
                        </v-toolbar>
                        <v-divider/>
                    </v-card>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
export default {
    data(){
        return {
            star:0,
            favorite:0,
            question:0,
            answer:0,
            type:'0',
            data:[],
            questions:[],
            answers:[],
            userID:'',
            username:'',
        }
    },
    watch:{
        'type':'initData',
        '$route' (to, from) {
            if(to.params.id!==from.params.id){
                this.star=0;
                this.favorite=0;
                this.answer=0;
                this.question=0;
                this.answers=[];
                this.questions=[];
                this.initQuestionData();
                this.initAnswerData();
                this.initData();
            }
        }
    },
    created(){
        this.initQuestionData();
        this.initAnswerData();
    },
    methods:{
        initQuestionData(){
            this.userID=this.$route.params.id;
            this.$axios.post("user/home",{userID:this.userID,type:0})
            .then(function(response){
                this.username=response.data.userName;
                response.data.questions.forEach(q => {
                    const que={};
                    que.title=q.question;
                    que.detail=q.detail;
                    que.questionID=q.questionID;
                    que.showtime=q.showTime;
                    que.username=q.userName;
                    que.star=q.star;
                    this.favorite+=q.star;
                    this.question++;
                    this.questions.push(que);
                });
                this.initData();
            }.bind(this));
        },
        initAnswerData(){
            this.userID=this.$route.params.id;
            this.$axios.post("user/home",{userID:this.userID,type:1})
            .then(function(response){
                response.data.answers.forEach(q => {
                    const que={};
                    que.title='';
                    que.detail=q.answer;
                    que.questionID=q.questionID;
                    que.showtime=q.showTime;
                    que.username=q.userName;
                    que.star=q.star;
                    this.star+=q.star;
                    this.answer++;
                    this.answers.push(que);
                });
                this.initData();
            }.bind(this));
        },
        initData(){
            if(this.type==='0'){
                this.data=this.questions;
            }else{
                this.data=this.answers;
            }
        },
        mdtoHtml(detail){
            var md=mavonEditor.getMarkdownIt();
            return md.render(String(detail));
        },
        quesGoTo(id){
            this.$router.push(`/question/${id}`);
        },
    }
}
</script>

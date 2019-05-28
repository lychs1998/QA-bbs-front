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
                我的问题
              </v-btn>
              <v-btn flat value="1">
                我的回答
              </v-btn>
              </v-btn-toggle>
          </v-toolbar>
          <v-divider/>
          <v-card v-if="data.length===0" height="200px" flat dense style="text-align:center;line-height:200px">
            <h2 v-if="type==='0'">你还没有提问</h2>
            <h2 v-if="type==='1'">你还没有回答过问题</h2>
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
        pagelength:10,
        type:'0',
        data:[],
        questions:[],
        answers:[],
        username:this.$cookie.get("name"),
      }
    },
    watch:{
      'type':'initData'
    },
    created(){
      this.initQuestionData();
      this.initAnswerData();
    },
    methods:{
      initQuestionData(){
        this.$axios.post("user/home",{token:this.$cookie.get('token'),type:0})
        .then(function(response){
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
        this.$axios.post("user/home",{token:this.$cookie.get('token'),type:1})
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

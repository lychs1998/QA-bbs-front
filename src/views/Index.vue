<template>
<v-container fluid fill-height>
  <v-layout
    justify-left
    v-scroll="onScroll"
    column
    >
    <v-flex>
    <v-btn-toggle v-model="type" mandatory>
      <v-btn value='0' flat small>
        时间排序
      </v-btn>
      <v-btn value='1' flat small>
        收藏排序
      </v-btn>
    </v-btn-toggle>
    </v-flex>
    <br>
    <v-timeline dense clipped style="width:100%">
      <v-slide-x-reverse-transition
        group
      >
        <v-timeline-item
          v-for="(item,index) in ques"
          :key="index+1"
          :color="itemColor(item.userID)"
          large
          fill-dot
        >
          <template v-slot:icon>
            <v-avatar style="cursor: pointer;color:#fff" @click="userGoTo(item.userID)" >
              {{item.username}}
            </v-avatar>
          </template>
          <v-card
            color="#fff"
            @click="quesGoTo(item.questionID)"
            style="cursor: pointer;"
          >
            <v-card-title style="background-color:#E3F2FD">
              <span class="title font-weight-bold" >{{item.question}}</span>
            </v-card-title>
            <v-card-text class="font-weight-light" v-html="mdtoHtml(item.detail)"/>
            <v-divider/>
            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-content class="hidden-sm-and-down">
                  <v-list-tile-title>{{item.showtime}}</v-list-tile-title>
                </v-list-tile-content>
                <v-layout
                  align-center
                  justify-end
                >
                  <v-icon color="red">favorite</v-icon>&nbsp;
                  <span>{{item.star}}</span>&nbsp;
                  <v-icon color="black">remove_red_eye</v-icon>&nbsp;
                  <span>{{item.pageviews}}</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-slide-x-reverse-transition>
    </v-timeline>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      top
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
  import {mavonEditor} from 'mavon-editor';
  export default {
    data:()=>({
      type:'0',
      page:1,
      step:10,
      snackbar:false,
      scroll:false,
      text:'',
      ques:[],
      colors:['red','pink','indigo','cyan','teal','lime','green','orange','brown','blue-grey']
    }),
    created(){
      this.getQues();
    },
    methods:{
      mdtoHtml(detail){
        var md=mavonEditor.getMarkdownIt();
        return md.render(String(detail));
      },
      quesGoTo(id){
        this.$router.push(`/question/${id}`);
      },
      getQues(){
          const mem = require('mem');
          return mem(function() {
          this.$axios.post("question/questionList",{p:this.page,num:this.step,type:parseInt(this.type)})
          .then(function(response){
              if(response.data.length===0){
                  this.scroll=false;
                  this.text='已经到底了';
                  this.snackbar=true;
                  return;
              }
              response.data.questions.forEach(q => {
                  const que={};
                  que.question=q.question;
                  que.detail=q.detail;
                  que.questionID=q.questionID;
                  que.showtime=q.showTime;
                  que.username=q.userName;
                  que.star=q.star;
                  que.pageviews=q.pageviews;
                  que.userID=q.userID;
                  this.ques.push(que);
              });
              if(this.ques.length===0){
                this.scroll=false;
              }else{
                this.page=this.page+1;
                this.scroll=true;
              }
          }.bind(this));
          }.bind(this), {maxAge: 5000})();
      },
      onScroll () {
        if(this.scroll&&window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight){
          this.getQues();
        }
      },
      itemColor(i){
        var index=parseInt(i);
        if(isNaN(index)){
          index=0;
        }
        return this.colors[index%10]+' lighten-3';
      },
      overload(){
        this.ques=[];
        this.page=1;
        this.getQues();
      },
      userGoTo(id){
        this.$router.push(`/home/${id}`);
      },
    },
    watch:{
      'type':'overload'
    }
  }
</script>

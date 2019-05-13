<template>
  <v-layout
    justify-left
    v-scroll="onScroll"
    >
    <v-timeline dense clipped style="width:100%" >
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
            <v-avatar style="color:#fff" >
              {{item.username}}
            </v-avatar>
          </template>
          <v-card
            color="#fff"
            @click="quesGoTo(item.questionID)"
            style="cursor: pointer;"
          >
            <v-card-title style="background-color:#E3F2FD">
              <span class="title font-weight-light" >{{item.question}}</span>
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
</template>

<script>
  import {mavonEditor} from 'mavon-editor';
  export default {
    data:()=>({
      page:1,
      step:10,
      snackbar:false,
      scroll:false,
      text:'',
      ques:[],
      colors:['red','pink','indigo','cyan','teal','lime','green','orange','brown','grey']
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
        this.$axios.post("question/questionList",{p:this.page,num:this.step})
        .then(function(response){
            if(response.data.length===0){
                this.scroll=false;
                this.text='已经到底了';
                this.snackbar=true;
                return;
            }
            response.data.forEach(q => {
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
            this.page=this.page+1;
            if(this.ques.length===0){
              this.scroll=false;
            }else{
              this.scroll=true;
            }
        }.bind(this));
      },
      onScroll () {
        if(window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight &&this.scroll){
          this.getQues();
        }
      },
      itemColor(i){
        var index=parseInt(i);
        if(isNaN(index)){
          index=0;
        }
        return this.colors[index%10]+' lighten-3';
      }
    }
  }
</script>

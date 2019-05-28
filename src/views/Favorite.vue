<template>
  <v-layout
    justify-left
    v-scroll="onScroll"
    column
    ref="scrollDiv"
    >
    <v-toolbar flat dense color="white">
      <v-btn icon  @click="goBack()" small style="margin:0px;">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-breadcrumbs style="padding:10px" divider=">" v-if="this.$route.path!=='/'" :items="breadcrumb"/>
    </v-toolbar>
      <v-divider/>
    <div style="padding:10px">
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
            <v-avatar  style="cursor: pointer;color:#fff" @click="userGoTo(item.userID)" >
              {{item.username}}
            </v-avatar>
          </template>
          <v-card
            color="#fff"
            @click="quesGoTo(item.questionID)"
            style="cursor: pointer;"
          >
            <v-card-title style="background-color:#E3F2FD">
              <span class="title font-weight-bold">{{item.question}}</span>
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
    </div>
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
        this.$axios.post("starQuestion/sqlist",{p:this.page,num:this.step,token:this.$cookie.get('token')})
        .then(function(response){
            if(response.data.starQuestions.length===0){
                this.scroll=false;
                this.text='已经到底了';
                this.snackbar=true;
                return;
            }
            response.data.starQuestions.forEach(q => {
                const que={};
                que.question=q.question.question;
                que.detail=q.question.detail;
                que.questionID=q.question.questionID;
                que.showtime=q.question.showTime;
                que.username=q.question.userName;
                que.star=q.question.star;
                que.pageviews=q.question.pageviews;
                que.userID=q.question.userID;
                this.ques.push(que);
            });
            if(this.ques.length===0){
              this.scroll=false;
            }else{
              this.page=this.page+1;
              this.scroll=true;
            }
        }.bind(this));
      },
      onScroll () {
        var scrollDiv=this.$refs.scrollDiv;
        let bottomOfWindow = (scrollDiv.offsetHeight - document.documentElement.scrollTop -window.innerHeight <= 0)
        if(this.scroll && bottomOfWindow){
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
      goBack(){
        this.$router.go(-1)
      },
      userGoTo(id){
        this.$router.push(`/home/${id}`);
      },
    },
    computed:{
      breadcrumb(){
        var res=[];
        const data=this.$route.meta.breadcrumb;
        data.forEach(e => {
          const item={};
          item.text=e.name;
          item.to=e.path;
          item.disabled=(e.path==='#');
          res.push(item);
        });
        return res;
      }
    }
  }
</script>

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
          v-for="(item,index) in answers"
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
            <v-card-text class="font-weight-light" v-html="mdtoHtml(item.answer)"/>
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
                  <v-icon color="amber">star</v-icon>&nbsp;
                  <span>{{item.star}}</span>
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
      answers:[],
      colors:['red','pink','indigo','cyan','teal','lime','green','orange','brown','grey']
    }),
    created(){
      this.getAns();
    },
    methods:{
      mdtoHtml(detail){
        var md=mavonEditor.getMarkdownIt();
        return md.render(String(detail));
      },
      quesGoTo(id){
        this.$router.push(`/question/${id}`);
      },
      getAns(){
        this.$axios.post("star_answer/salist",{p:this.page,num:this.step,token:this.$cookie.get('token')})
        .then(function(response){
            if(response.data.length===0){
                this.scroll=false;
                this.text='已经到底了';
                this.snackbar=true;
                return;
            }
            response.data.forEach(q => {
                const ans={};
                ans.answer=q.answer.answer;
                ans.detail=q.answer.detail;
                ans.questionID=q.answer.questionID;
                ans.answerID=q.answer.answerID;
                ans.showtime=q.answer.showTime;
                ans.username=q.answer.userName;
                ans.star=q.answer.star;
                ans.userID=q.answer.userID;
                this.answers.push(ans);
            });
            this.page=this.page+1;
            if(this.answers.length===0){
              this.scroll=false;
            }else{
              this.scroll=true;
            }
        }.bind(this));
      },
      onScroll () {
        if(window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight && this.scroll){
          this.getAns();
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

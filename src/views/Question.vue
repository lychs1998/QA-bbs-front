<template>
  <v-layout
    justify-left
    column
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
        hide-dot
        key="ques"
        >
        <span>问题</span>
        </v-timeline-item>
        <v-timeline-item
          color="blue lighten-2"
          large
          fill-dot
          key="question"
        >
          <template v-slot:icon>
            <v-avatar  style="cursor: pointer;color:#fff" @click="userGoTo(userID)" >
              {{username}}
            </v-avatar>
          </template>
          <v-card
            color="#fff"
          >
            <v-card-title style="background-color:#E3F2FD">
              <span class="title font-weight-bold">{{question}}</span>
            </v-card-title>
            <v-card-text v-html="mdtoHtml(detail)"/>
            <v-divider/>
            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-content class="hidden-sm-and-down">
                  <v-list-tile-title>{{showtime}}</v-list-tile-title>
                </v-list-tile-content>
                <v-layout
                  align-center
                  justify-end
                >
                <v-btn icon @click="changeType(-1)">
                  <v-icon color="red">{{starType}}</v-icon>
                </v-btn>
                <span>{{star}}</span>
                  &nbsp;
                  <v-icon color="black">remove_red_eye</v-icon>
                  &nbsp;
                  <span>{{pageviews}}</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
        hide-dot
        key="ans"
        v-if="answers.length>0"
        >
        <span>回答</span>
        </v-timeline-item>
        <v-timeline-item
          v-for="(item,index) in answers"
          :key="index+1"
          :color="itemColor(index)"
          fill-dot
          large
        >
          <template v-slot:icon>
            <v-avatar  style="cursor: pointer;color:#fff" @click="userGoTo(item.userID)"  >
              {{item.username}}
            </v-avatar>
          </template>
          <v-card
            color="#fff"
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
                  <v-btn icon @click="changeType(index)">
                    <v-icon color="amber">{{item.starType}}</v-icon>
                  </v-btn>
                  <span>{{item.star}}</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
        <v-timeline-item
          color="purple lighten-2"
          fill-dot
          large
          key="reply"
        >
          <template v-slot:icon>
            <v-avatar style="color:#fff" >
              回答
            </v-avatar>
          </template>
          <v-card color="#fff">
            <v-form>
              <mavon-editor ref=md class="hidden-sm-and-down" @imgAdd="$imgAdd" :boxShadow="false" :externalLink="false" :toolbars="toolbars" style="width:100%;z-index:3"  v-model="reply"></mavon-editor>
              <mavon-editor ref=md class="hidden-md-and-up" @imgAdd="$imgAdd" defaultOpen="edit" :boxShadow="false" :subfield="false" :externalLink="false"  :toolbars="{imagelink: true,preview: true}"  style="width:100%;z-index:3;min-width:0px"  v-model="reply"></mavon-editor>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" style="margin-right: 8px"  @click="replyQues(reply)">提交</v-btn>
              </v-card-actions>
              </v-form>
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
import {mavonEditor} from 'mavon-editor'
export default {
    data(){
        return  {
            snackbar:false,
            text:'',
            isNotLogin:true,
            questionID:'',
            username:'',
            userID:'',
            question:'',
            pageviews:0,
            detail:'',
            star:'',
            showtime:'',
            answers:[],
            reply:'',
            isStar:0,
            starType:'md-heart-outline',
            screenWidth:document.documentElement.clientWidth,
            colors:['red','pink','indigo','cyan','teal','lime','green','orange','brown','blue-grey']
        }
    },
    created(){
        this.initData();
    },
    watch: {
      '$route' (to, from) {
        if(to.params.id!==from.params.id){
          this.answers=[];
          this.initData();
        }
      }
    },
    methods:{
        mdtoHtml(detail){
            var md=mavonEditor.getMarkdownIt();
            return md.render(String(detail));
        },
        initData(){
          this.questionID=this.$route.params.id;
          if(this.$cookie.get('token')!==null){
              this.isNotLogin=false;
          }
          this.$axios.post("question/questionDetail",{questionID:parseInt(this.questionID),token:this.$cookie.get('token')})
          .then(function(response){
              this.question=response.data.question.question;
              this.detail=response.data.question.detail;
              this.pageviews=response.data.question.pageviews;
              this.userID=response.data.question.userID;
              this.username=response.data.question.userName;
              this.showtime=response.data.question.showTime;
              this.star=response.data.question.star;
              this.starType=(response.data.question.starOrNot===1)?'favorite':'favorite_border';
              this.isStar=(response.data.question.starOrNot===1)
              response.data.question.answers.forEach(e => {
                  var ans={};
                  ans.answerID=e.answerID;
                  ans.userID=e.userID;
                  ans.username=e.userName;
                  ans.answer=e.answer;
                  ans.showtime=e.showTime;
                  ans.star=e.star;
                  ans.isStar=(e.starOrNot===1);
                  ans.starType=(e.starOrNot===1) ? 'star':'star_border';
                  this.answers.push(ans);
              });
          }.bind(this));
        },
        replyQues(){
            if(this.isNotLogin){
              this.text="请先登录";
              this.snackbar=true;
              return;
            }
            if(this.reply===''){
              this.text="请输入回答内容";
              this.snackbar=true;
              return;
            }
            this.$axios.post("answer/addAnswer",{token:this.$cookie.get('token'),questionID:parseInt(this.questionID),answer:String(this.reply)})
            .then(function(response){
                if(response.data.code===0){
                  this.text="回答成功！";
                  this.snackbar=true;
                }else{
                  this.text="回答失败！";
                  this.snackbar=true;
                }
                this.answers=[];
                this.reply='';
                this.initData();
            }.bind(this));
        },
        changeType(flag){
            if(flag===-1){
                if(this.isStar){
                    //post收藏问题接口
                    this.$axios.post("question/qstar",{token:this.$cookie.get('token'),questionID:parseInt(this.questionID)})
                    .then(function(response){
                      if(response.data.code===1){
                        this.isStar=!this.isStar;
                        this.starType='favorite_border';
                        this.star--;
                      }
                    }.bind(this));
                }else{
                    //post取消收藏问题接口
                    this.$axios.post("question/qstar",{token:this.$cookie.get('token'),questionID:parseInt(this.questionID)})
                    .then(function(response){
                      if(response.data.code===1){
                        this.isStar=!this.isStar;
                        this.starType='favorite';
                        this.star++;
                      }
                    }.bind(this));
                }
            }else{
                if(this.answers[flag].isStar){
                    //post支持回答接口
                    this.$axios.post("answer/astar",{token:this.$cookie.get('token'),answerID:parseInt(this.answers[flag].answerID)})
                    .then(function(response){
                      if(response.data.code===1){
                        this.answers[flag].isStar=!this.answers[flag].isStar;
                        this.answers[flag].starType='star_border';
                        this.answers[flag].star--;
                      }
                    }.bind(this));
                }else{
                    //post取消支持回答接口
                    this.$axios.post("answer/astar",{token:this.$cookie.get('token'),answerID:parseInt(this.answers[flag].answerID)})
                    .then(function(response){
                      if(response.data.code===1){
                        this.answers[flag].isStar=!this.answers[flag].isStar;
                        this.answers[flag].starType='star';
                        this.answers[flag].star++;
                      }
                    }.bind(this));
                    
                }
            }
        },
        itemColor(i){
          var index=parseInt(i);
          if(isNaN(index)){
            index=0;
          }
          return this.colors[index%10]+' lighten-3';
        },
        $imgAdd(pos,$file){
          if(this.$cookie.get('token')===null){
              this.text='请先登录！';
              this.snackbar=true;
              return;
          }
          var formdata = new FormData();
          formdata.append('file', $file);
          formdata.append('token',this.$cookie.get('token'));
          this.$axios.post('img/addPhoto',formdata,{headers: { 'Content-Type': 'multipart/form-data' }})
          .then(function(response){
              if(response.data.code===0){
                const url='api/images/'+response.data.url;
                this.$refs.md.$img2Url(pos,url);
              }
          }.bind(this))
        },
        goBack(){
          this.$router.go(-1)
        },
        userGoTo(id){
          this.$router.push(`/home/${id}`);
        },
    },
    computed:{
      toolbars(){
        return this.$store.state.toolbars;
      },
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
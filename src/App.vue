<template>
  <v-app>
    <vue-snotify></vue-snotify>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <div style="text-align:center">
        <img style="width:80%" src="./assets/logo.png"/>
      </div>
      <v-divider/>
      <v-list dense>
        <v-list-tile v-for="item in menu" :key="item.name" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/question/35'}">
          <v-list-tile-action>
            <v-icon>class</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>BUG反馈</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/question/97'}">
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>经验分享</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title  class="hidden-md-and-down">ZUCC问答论坛</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="搜索一下~"
        v-on:keyup.enter="doSearch()"
        v-model="keyword"
        style="margin-right:20px;max-width:500px"
      ></v-text-field>
      <div v-if="isLogin">
      <v-menu 
        offset-y
        bottom
      >
        <template v-slot:activator="{on}">
          <v-btn
            icon large
            v-on="on"
          >
            <v-avatar size="32px" tile>
              {{username}}
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="goTo('changePwd')">
            <v-list-tile-title>修改密码</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-list-tile-title>退出登录</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      </div>
      <v-btn @click="goTo('login')" v-if="!isLogin" icon large>
        <v-avatar size="32px" tile>
          {{username}}
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-bottom-sheet v-model="sheet" v-if="this.$route.path==='/'">
        <v-card>
          <v-container>
            <v-form :model="formData">
              <v-text-field
                v-model="formData.question"
                counter="255"
                label="问题"
                required
              ></v-text-field>
                <v-subheader>问题描述</v-subheader>
                <mavon-editor ref=md class="hidden-sm-and-down" @imgAdd="$imgAdd"  :boxShadow="false" :externalLink="false" :toolbars="toolbars" style="height:300px;width:100%;"  v-model="formData.detail"></mavon-editor>
                <mavon-editor ref=md class="hidden-md-and-up" @imgAdd="$imgAdd" defaultOpen="edit" :boxShadow="false" :subfield="false" :externalLink="false"  :toolbars="{imagelink: true,preview: true}"  style="width:100%;min-width:0px;height:300px;"  v-model="formData.detail"></mavon-editor>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn style="margin-right: 8px" @click="sheet = false">取消</v-btn>
                  <v-btn color="primary" style="margin-right: 8px"  @click="submitQues(formData)">提交</v-btn>
                </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-bottom-sheet>
        <router-view/>
        <v-fab-transition v-if="this.$route.path==='/'">
        <v-btn
          style="margin: 0 0 40px 16px;"
          color="blue"
          dark
          fab
          fixed
          bottom
          right
          @click="sheet=true"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </v-fab-transition>
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
    </v-content>
    <v-footer color="blue lighten-2" app>
      <a @click="goTo('release')"><span class="white--text">&nbsp;&copy; 2019 v0.1.3 beta版</span></a>
    </v-footer>
  </v-app>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
export default {
    data() {
      return {
        drawer: null,
        username:'登录',
        sheet:false,
        snackbar:false,
        text:'',
        isLogin:false,
        formData: {
          question:'',
          detail:'',
          tags:''
        },
        keyword:'',
        menu:[
          {icon:'home',path:{path:'/'},text:'首页'},
          {icon:'favorite',path:{path:'/favorite'},text:'收藏问题'},
          {icon:'star',path:{path:'/star'},text:'赞同回答'},
          {icon:'account_circle',path:{path:'/me'},text:'我的主页'},
        ]
      } 
    },
    created(){
      this.checkCookie();
    },
    watch: {
      '$route': 'checkCookie'
    },
    methods:{
      goTo(itemname){
        this.$router.push({name:itemname});
      },
      submitQues:function(form){
        if(this.$cookie.get('token')===null){
            this.text='请先登录！';
            this.snackbar=true;
            return;
        }
        if(form.question!==''&&form.detail!==''){
            this.$axios.post("question/addQuestion",{token:this.$cookie.get('token'),question:String(form.question),detail:String(form.detail)})
                .then(function(response){
                    if(response.data.code==0){
                        this.text='提问成功！';
                        this.snackbar=true;
                    }
                    this.$router.go(0);
                }.bind(this));
            this.sheet=false;
        }else{
            this.text='请填写完整的问题信息！';
            this.snackbar=true;
            return;
        }
      },
      newSnotify(data){
        const body=this.mdtoHtml(String(data.answer).substring(0,255));
        const html=`<a href="#/question/${data.questionID}" style="text-decoration:none;"><div class="snotifyToast__title">有新的回答</div>
        <div class="snotifyToast__body">${body}</div></a>`;
        this.$snotify.html(html,{
          timeout:5000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
      },
      checkCookie(){
          if(this.$cookie.get('token')!==null){
            this.username=this.$cookie.get('name');
            this.isLogin=true;
            this.$socket.removeAllListeners() 
            this.$socket.emit('login',String(this.$cookie.get('token')));
            this.$socket.on('reply',function(msg) {
              console.log(msg);
              if(msg.length>0){
                msg.forEach(data => {
                  this.newSnotify(data);
                });
              }
            }.bind(this))
          }else{
            this.username='登录';
            this.isLogin=false;
          }
      },
      logout(){
        this.$cookie.delete('token');
        this.$cookie.delete('name');
        this.username='登录';
        this.isLogin=false;
        this.$router.push('/');
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
      mdtoHtml(detail){
        var md=mavonEditor.getMarkdownIt();
        return md.render(String(detail));
      },
      doSearch(){
        if(this.keyword!==''){
          this.$router.push('/search/'+this.keyword);
          this.keyword='';
        }
      }
    },
    computed:{
      toolbars(){
        return this.$store.state.toolbars;
      }
    }
}
</script>

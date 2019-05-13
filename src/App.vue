<template>
  <v-app>
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
      <v-text-field
        hide-details
        single-line
        append-icon="search"
        disabled
      >
      </v-text-field>
      <v-list dense>
        <v-list-tile v-for="item in menu" @click="goTo(item.name)">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-btn icon v-if="this.$route.path!=='/'" @click="goBack()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="hidden-md-and-down">ZUCC问答论坛</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLogin">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon large v-on="on">
              <v-icon tile>
                notifications
              </v-icon>
            </v-btn>
          </template>
          <span>该功能暂未开放</span>
        </v-tooltip>
      <v-menu 
        offset-y
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon large
            v-on="on"
          >
            <v-avatar size="32px"  tile>
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
      <v-breadcrumbs style="padding:15px" divider="/">
        <v-breadcrumbs-item style="color:#eee" :to="{ path: p.path }" v-for="p in breadcrumb" :disabled="p.path==='#'">{{p.name}}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-divider/>
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
                <mavon-editor ref=md class="hidden-sm-and-up" @imgAdd="$imgAdd" defaultOpen="edit" :boxShadow="false" :subfield="false" :externalLink="false"  :toolbars="{imagelink: true,preview: true}"  style="width:100%;min-width:0px;height:300px;"  v-model="formData.detail"></mavon-editor>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn style="margin-right: 8px" @click="sheet = false">取消</v-btn>
                  <v-btn color="primary" style="margin-right: 8px"  @click="submitQues(formData)">提交</v-btn>
                </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-bottom-sheet>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
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
      <a @click="goTo('release')"><span class="white--text">&nbsp;&copy; 2019 v0.1.1 beta版</span></a>
    </v-footer>
  </v-app>
</template>
<script>
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
        menu:[
          {icon:'home',name:'home',text:'首页'},
          {icon:'favorite',name:'favorite',text:'我的收藏'},
          {icon:'star',name:'star',text:'我的赞同'}
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
            this.$axios.post("question/addQuestion",{token:this.$cookie.get('token'),question:form.question,detail:form.detail})
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
      goBack(){
        this.$router.go(-1)
      },
      checkCookie(){
          if(this.$cookie.get('token')!==null){
              this.username=this.$cookie.get('name');
              this.isLogin=true;
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
      }
    },
    computed:{
      toolbars(){
        return this.$store.state.toolbars;
      },
      breadcrumb(){
        return this.$route.meta.breadcrumb;
      }
    }
}
</script>

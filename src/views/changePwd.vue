<template>
    <v-layout style="height:100%;" align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar color="blue" dark>
                <v-toolbar-title>修改密码</v-toolbar-title>
            </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field :rules="pwdRules" :conter="30" prepend-icon="lock" v-model="pwd" label="原密码" type="password"></v-text-field>
                    <v-text-field :rules="pwdRules" :conter="30" prepend-icon="lock" v-model="newpwd" label="新密码" type="password"></v-text-field>
                    <v-text-field :rules="pwdRules" :conter="30" v-on:keyup.enter="changePwd" prepend-icon="lock" v-model="newpwd2" label="重复密码" type="password"></v-text-field>
                </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="(pwd.length<6||newpwd.length<6||newpwd2.length<6)" color="primary" dark @click="changePwd()">修改密码</v-btn>
                </v-card-actions>
        </v-card>
        </v-flex>
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
export default {
    data: () => ({
        pwd:'',
        newpwd:'',
        newpwd2:'',
        snackbar:false,
        text:'',
        pwdRules:[
            v => !!v || '密码不能为空！',
            v => (v.length >= 6&&v.length<=30) || '密码长度为6~30位'
        ]
    }),
    methods:{
        changePwd(){
            if (this.pwd.length>=6&&this.newpwd.length>=6) {
                if(this.newpwd===this.newpwd2){
                    this.$axios.post("user/changePwd",{token:this.$cookie.get('token'),pwd:this.pwd,newPwd:this.newpwd})
                    .then(function(response){
                        if(response.data.code===0){
                            this.text='修改成功!';
                            this.snackbar=true;
                            this.$router.push('/')
                        }else{
                            this.text='修改失败!';
                            this.snackbar=true;
                        }
                    }.bind(this));
                }else{
                    this.text="两次输入的密码不一致！"
                    this.snackbar=true;
                }
            } else {
                this.text='修改失败!';
                this.snackbar=true;
            }
        }
    }
}
</script>

<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar color="blue" dark>
                <v-toolbar-title>修改密码</v-toolbar-title>
                <v-spacer></v-spacer>
                    <v-avatar
                    color="white"
                    class="subheading black--text"
                    size="24"
                    v-text="step"
                    ></v-avatar>
            </v-toolbar>
            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-card-text>
                    <v-form>
                        <v-text-field :rules="pwdRules" :conter="30" prepend-icon="lock" v-model="pwd" label="原密码" type="password"></v-text-field>
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="pwd.length<6" color="primary" dark @click="step++">下一步</v-btn>
                    </v-card-actions>
                </v-window-item>
                <v-window-item :value="2">
                    <v-card-text>
                    <v-form>
                        <v-text-field :rules="pwdRules" :conter="30" prepend-icon="lock" v-model="newpwd" label="新密码" type="password"></v-text-field>
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="step--">上一步</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="(pwd.length<6||newpwd.length<6)" color="primary" dark @click="changePwd()">修改密码</v-btn>
                    </v-card-actions>
                </v-window-item>
            </v-window>
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
import { setTimeout } from 'timers';
export default {
    data: () => ({
        pwd:'',
        newpwd:'',
        step:1,
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
                this.$axios.post("user/changePwd",{token:this.$cookie.get('token'),pwd:this.pwd,newpwd:this.newpwd})
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
            } else {
                this.text='修改失败!';
                this.snackbar=true;
            }
        }
    }
}
</script>

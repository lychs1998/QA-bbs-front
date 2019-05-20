<template>
    <v-layout style="height:100%;"  align-center justify-center>
        <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
            <v-toolbar color="blue" dark>
                <v-toolbar-title>登录</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
            <v-form>
                <v-text-field :rules="userRules"  prepend-icon="person" v-model="username" label="学号/工号" type="text"></v-text-field>
                <v-text-field :rules="pwdRules" v-on:keyup.enter="login" :conter="30" prepend-icon="lock" v-model="password" label="密码" type="password"></v-text-field>
            </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="(username.length<5||password.length<6)" color="primary" depressed  @click="login()">登录</v-btn>
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
        username:'',
        password:'',
        snackbar:false,
        text:'',
        userRules: [
            v => !!v || '学号/工号不能为空！'
        ],
        pwdRules:[
            v => !!v || '密码不能为空！',
            v => (v.length >= 6&&v.length<=30) || '密码长度为6~30位'
        ]
    }),
    methods:{
        login() {
            if(this.password.length>=6&&this.user!==''){
                this.$axios.post("user/login",{userID:this.username,pwd:this.password})
                    .then(function(response){
                        if(response.data.code===0){
                            const token=response.data.token;
                            const name=response.data.name;
                            this.$cookie.set('token', token, { expires: 1 });
                            this.$cookie.set('name', name, { expires: 1 });
                            this.text='登录成功!';
                            this.snackbar=true;
                            this.$router.push('/');
                        }else{
                            this.text='登录失败!';
                            this.snackbar=true;
                        }
                    }.bind(this))
            } else {
                this.text='登录失败!';
                this.snackbar=true;
            }
        }
    }
}
</script>

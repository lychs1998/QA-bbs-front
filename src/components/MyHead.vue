<style scoped>
.layout{
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 160px;
    height: 60px;
    background:no-repeat url("../assets/logo.png");
    background-size:100% 100%;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 2px;
    left: 20px;
}
.layout-nav{
    width: 20px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col :xs="24" :sm="24" :md="22" :lg="18">           
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                    <Dropdown v-if="isLogin">
                        <a>
                            <Avatar :style="{background: handleColor}" size="large">{{ user }}</Avatar>
                        </a>
                        <DropdownMenu slot="list">
                            <a @click="handleLogout()"><DropdownItem name="logout">注销</DropdownItem></a>
                            <a @click="pwdModal=true"><DropdownItem >修改密码</DropdownItem></a>
                        </DropdownMenu>
                    </Dropdown>
                        <a v-if="!isLogin" @click="loginModal = true"><Avatar :style="{background: handleColor}" size="large">{{ user }}</Avatar></a>  
                    </div>
                </Col>
            </Row>
            <Modal v-if="!isLogin" title="登录" okText="登录" @on-ok="handleSubmit('formInline')" v-model="loginModal">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
            </Modal>
            <Modal v-if="isLogin" title="修改密码" okText="修改密码" @on-ok="handleChangePwd('formPwd')" v-model="pwdModal">
                <Form ref="formPwd" :model="formPwd" :rules="rulePwd" inline>
                    <FormItem prop="pwd">
                        <Input type="password" v-model="formPwd.pwd" placeholder="原密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="newpwd">
                        <Input type="password" v-model="formPwd.newpwd" placeholder="新密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
            </Modal>
    </Menu>
</template>
<script>
    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

    export default {
        data () {
            return {
                theme1: 'light',
                user:'登录',
                login:'login',
                isLogin:false,
                pwdModal:false,
                loginModal: false,
                formPwd:{
                    pwd:'',
                    newpwd:''
                },
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入学号/工号！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码！', trigger: 'blur' },
                        { type: 'string', min: 6,max:20, message: '密码长度为6~20位！', trigger: 'blur' }
                    ]
                },
                rulePwd: {
                    pwd: [
                        { required: true, message: '请输入原密码！', trigger: 'blur' },
                        { type: 'string', min: 6,max:20, message: '密码长度为6~20位！', trigger: 'blur' }
                    ],
                    newpwd: [
                        { required: true, message: '请输入新密码！', trigger: 'blur' },
                        { type: 'string', min: 6,max:20, message: '密码长度为6~20位！', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.checkCookie();
        },
        computed:{
            handleColor(){
                return ColorList[Math.floor(Math.random()*ColorList.length)];
            }
        },
        methods: {
            handleSubmit(p) {
                this.$refs[p].validate((valid) => {
                    if (valid) {
                        this.$axios.post("user/login",{userID:this.formInline.user,pwd:this.formInline.password})
                        .then(function(response){
                            if(response.data.code===0){
                                const token=response.data.token;
                                const name=response.data.name;
                                this.$cookie.set('token', token, { expires: 7 });
                                this.$cookie.set('name', name, { expires: 7 });
                                this.$Message.success('登录成功!');
                                this.user=name;
                            }else{
                                this.$Message.error('登录失败!');
                            }
                            this.$router.go(0);
                        }.bind(this))
                    } else {
                        this.$Message.error('登录失败!');
                    }
                })
            },
            checkCookie(){
                if(this.$cookie.get('token')!==null){
                    this.user=this.$cookie.get('name');
                    this.isLogin=true;
                }
            },
            handleLogout(){
                this.$cookie.delete('token');
                this.$cookie.delete('name');
                this.user='登录';
                this.isLogin=false;
                this.$router.go(0);
            },
            handleChangePwd(p){
                 this.$refs[p].validate((valid) => {
                    if (valid) {
                        this.$axios.post("user/changePwd",{token:this.$cookie.get('token'),pwd:this.formPwd.pwd,newpwd:this.formPwd.newpwd})
                        .then(function(response){
                            if(response.data.code===0){
                                this.$Message.success('修改成功!');
                                this.handleLogout();
                            }else{
                                this.$Message.error('修改失败!');
                            }
                            this.$router.go(0);
                        }.bind(this));
                    } else {
                        this.$Message.error('修改失败!');
                    }
                })
            }
        }
    }
</script>

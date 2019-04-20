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
                <Col :xs="24" :sm="24" :md="18" :lg="16">           
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <a @click="loginModal = true"><Avatar :style="{background: handleColor}" size="large">{{ user }}</Avatar></a>  
                    </div>
                </Col>
            </Row>
            <Modal  title="登录" okText="登录" @on-ok="handleSubmit('formInline')" v-model="loginModal">
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
                loginModal: false,
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
                }
            }
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
                        //表单发送后端
                        const isLogin=true;
                        //session存入uid
                        const uid="1";
                        window.sessionStorage.setItem("uid",uid);
                        if(isLogin){
                            this.$Message.success('登录成功!');
                        }else{
                            this.$Message.success('登录失败!');
                        }
                    } else {
                        this.$Message.error('登录失败!');
                    }
                })
            }
        }
    }
</script>

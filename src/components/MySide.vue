<template>
    <Menu style="width:100%;height:100%">
        <div style="text-align:center">
            <Input v-model="value" icon="ios-search" placeholder="搜索你想要的答案" style="align:center;width:90%;margin-top:10px;margin-bottom:10px"/>
            <Button type="primary" style="width:90%;margin-top:10px;margin-bottom:10px" @click="openEdit = true">我要提问</Button>
        </div>
        <MenuItem name="1" >
            <Icon type="ios-home" />
            首页
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            课堂
        </MenuItem>
        <MenuItem name="3">
            <Icon type="ios-star" />
            收藏
        </MenuItem>
    <div>
        <Drawer
            title="创建问题"
            v-model="openEdit"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <FormItem label="问题" label-position="top">
                    <Input v-model="formData.question" placeholder="不妨先搜索一下？" />
                </FormItem>
                <FormItem label="问题描述" label-position="top">
                    <Input type="textarea" v-model="formData.detail" :rows="20" placeholder="问题的描述" />
                </FormItem>
                <FormItem label="标签" label-position="top">
                    <Input v-model="formData.tags" placeholder="话题与话题之间使用英文逗号隔开" />
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="openEdit = false">取消</Button>
                <Button type="primary" @click="handlerQues('formData')">提交</Button>
            </div>
        </Drawer>
    </div>         
    </Menu>
</template>
<script>
    export default {
        data () {
            return {
                openEdit: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    name: '',
                    url: '',
                    owner: '',
                    type: '',
                    approver: '',
                    date: '',
                    desc: ''
                },
                value: ''
            }
        },
        methods:{
            handlerQues:function(form){
                if(form.question!==''&&form.detail!==''){
                    //新建问题
                    this.$Message.success('问题已创建！');
                    this.openEdit=false;
                }
            }
        }
    }
</script>
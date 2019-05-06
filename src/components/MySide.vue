<template>
    <Menu style="width:100%;height:100%" :active-name="activeName">
        <div style="text-align:center">
            <Input v-model="search" icon="ios-search" placeholder="搜索功能暂未开放" style="align:center;width:90%;margin-top:10px;margin-bottom:10px" disabled/>
            <Button type="primary" style="width:90%;margin-top:10px;margin-bottom:10px" @click="openEdit = true">我要提问</Button>
        </div>
        <MenuItem name="/" to="/">
            <Icon type="ios-home" />
            首页
        </MenuItem>
        <MenuItem name="2" disabled>
            <Icon type="ios-people" />
            课堂（未开放）
        </MenuItem>
        <MenuItem name="3" disabled>
            <Icon type="ios-star" />
            收藏（未开放）
        </MenuItem>
    <div>
        <Drawer
            title="创建问题"
            v-model="openEdit"
            width="40%"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <FormItem label="问题" label-position="top">
                    <Input v-model="formData.question" placeholder="不妨先搜索一下？" />
                </FormItem>
                <FormItem label="问题描述" label-position="top" >
                    <mavon-editor :toolbars="toolbars" style="height:600px;width:100%;z-index:"  v-model="formData.detail"></mavon-editor>
                </FormItem>
                <FormItem v-if="false" label="标签" label-position="top">
                    <Input v-model="formData.tags" placeholder="话题与话题之间使用英文逗号隔开" />
                </FormItem>
                <FormItem>
                    <Button style="margin-right: 8px" @click="openEdit = false">取消</Button>
                    <Button type="primary" @click="handlerQues(formData)">提交</Button>
                </FormItem>
            </Form>
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
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    question:'',
                    detail:'',
                    tags:''
                },
                search: '',
                activeName:this.$route.path,
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: false, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    help: true, // 帮助
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        methods:{
            handlerQues:function(form){
                if(this.$cookie.get('token')===null){
                    this.$Message.error('请先登录！');
                    return;
                }
                if(form.question!==''&&form.detail!==''){
                    this.$axios.post("question/addQuestion",{token:this.$cookie.get('token'),question:form.question,detail:form.detail})
                        .then(function(response){
                            if(response.data.code==0){
                                this.$Message.success('提问成功！');
                            }
                            this.$router.go(0);
                        }.bind(this));
                    this.openEdit=false;
                }
            }
        },
        watch:{
            '$route'(){
                this.activeName=this.$route.path;
            }
        }
    }
</script>
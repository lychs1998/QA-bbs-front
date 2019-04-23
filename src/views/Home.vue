<template>
    <div style="height:100%">
    <Scroll :on-reach-bottom="handleReachBottom" :height="clientHeight2">
        <a style="color:#333" v-for="(item, index) in ques" :key="index" :href="item.href">
            <Card :title="item.question"  style="margin: 32px 0;margin-left:20px;margin-right:20px" >
                <div v-html="mdtoHtml(item.detail)"></div>
            </Card>
        </a>
    </Scroll>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'

    export default {
        name: 'home',
        data () {
            return {
                ques: [
                    {
                        question:'问题1',
                        detail:'### 主要特性\n- 支持“标准”Markdown / CommonMark和Github风格的语法，也可变身为代码编辑器；\n- 支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；\n- 支持ToC（Table of Contents）、Emoji表情、Task lists、@链接等Markdown扩展语法；\n- 支持TeX科学公式（基于KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;\n- 支持识别和解析HTML标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；\n- 支持 AMD / CMD 模块化加载（支持 Require.js & Sea.js），并且支持自定义扩展插件；\n- 兼容主流的浏览器（IE8+）和Zepto.js，且支持iPad等平板设备；\n- 支持自定义主题样式；'
                    },                    
                    {
                        question:'问题2',
                        detail:'`这里是问题描述`'
                    },                    
                    {
                        question:'问题3',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题4',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题5',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题6',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题7',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题8',
                        detail:'这里是问题描述'
                    },                   
                    {
                        question:'问题9',
                        detail:'这里是问题描述'
                    },                    
                    {
                        question:'问题10',
                        detail:'这里是问题描述'
                    },

                ],
                clientHeight2:''
            }
        },
        methods: {
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.ques[this.ques.length - 1];
                        for (let i = 1; i < 11; i++) {
                            let q={
                                question:'问题',
                                detail:'这里是问题描述'
                            }
                            this.ques.push(q);
                        }
                        resolve();
                    }, 1000);
                });
            },
            mdtoHtml(detail){
                var md=mavonEditor.getMarkdownIt();
                return md.render(detail.toString());
            }
            
        },        
        mounted(){
            // 获取浏览器可视区域高度
            this.clientHeight2 = `${document.documentElement.clientHeight}`-60
            window.onresize = function temp() {
                this.clientHeight2 = `${document.documentElement.clientHeight}`;
            };
        }
    }
    
</script>

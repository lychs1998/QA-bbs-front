<template>
  <v-layout
    justify-left
    >
        <v-timeline
        align-top
        dense
        style="width:100%"
      > 
              <v-timeline-item
          color="pink"
          small
        >
          <v-layout row wrap pt-3>
            <v-flex xs12 lg4>
              <strong>v0.1.3 Beta版 2019-5-26</strong>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>版本说明</strong>
              <div class="caption">
                <li>增加搜索功能</li>
                <li>修复与优化滚动加载判定</li>
                <li>自己的问题有新的回答会有实时通知</li>
              </div>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>Team</strong>
              <div class="caption">
                <li>陈胡数、潘皓、陈达</li>
              </div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-layout row wrap pt-3>
            <v-flex xs12 lg4>
              <strong>v0.1.2 Beta版 2019-5-20</strong>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>版本说明</strong>
              <div class="caption">
                <li>添加用户主页，可点击用户头像进入他人主页</li>
                <li>后端重构，修复重复创建连接池的错误</li>
                <li>首页可以按收藏数进行排序了</li>
                <li>修复时间显示异常的问题</li>
                <li>优化修改密码和登录的交互体验</li>
                <li>侧边栏添加开发经验分享和BUG反馈快捷入口</li>
                <li>修复了问题详情与问题详情间无法转跳的问题</li>
              </div>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>Team</strong>
              <div class="caption">
                <li>陈胡数、潘皓、陈达</li>
              </div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
        <v-timeline-item
          color="pink"
          small
        >
          <v-layout row wrap pt-3>
            <v-flex xs12 lg4>
              <strong>v0.1.1 Beta版 2019-5-13</strong>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>版本说明</strong>
              <div class="caption">
                <li>重构前端界面，实现全局响应式，遵循Material Design设计规范</li>
                <li>添加收藏、点赞与访问统计功能</li>
                <li>添加版本说明页面</li>
                <li>添加返回按钮</li>
                <li>添加编辑器图片上传功能</li>
                <li>优化Markdown编辑器在手机端的使用</li>
                <li>部署至校内服务器测试</li>
              </div>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>Team</strong>
              <div class="caption">
                <li>陈胡数、潘皓、陈达</li>
              </div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-layout row wrap pt-3>
            <v-flex xs12 lg4>
              <strong>v0.1.0 Beta版 2019-5-7</strong>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>版本说明</strong>
              <div class="caption">
                <li>实现首页问题列表动态加载</li>
                <li>实现登录/注销功能</li>
                <li>实现Markdown编辑与渲染</li>
                <li>实现提问与回答功能</li>
                <li>实现问题详情页的渲染</li>
                <li>实现token鉴权、存储与过期</li>
                <li>实现修改密码功能</li>
              </div>
            </v-flex>
            <v-flex xs12 lg4>
              <strong>Team</strong>
              <div class="caption">
                <li>陈胡数、潘皓、陈达</li>
              </div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
  </v-layout>
</template>
<script>
export default {
}
</script>

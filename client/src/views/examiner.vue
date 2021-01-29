<template>
  <div class="examiner">
    <el-container>
      <el-header>
        <el-menu :default-active="$route.path" mode="horizontal" :router='true'>
          <el-menu-item index="/examiner">试卷配置</el-menu-item>
          <el-menu-item index="/list">我的试卷</el-menu-item>
          <el-menu-item index="/statistics">成绩统计</el-menu-item>
          <el-submenu index="1" style="float: right">
            <template slot="title">{{ userName }}</template>
            <el-menu-item index="2-1" @click="signOut">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'examiner',
  data() {
    return {
      activeIndex: '/',
      userName: GetLocalStorage('userData').name
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    signOut() {
      localStorage.removeItem('userData')
      this.$router.push('/')
    }
  }
}
</script>

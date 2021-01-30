<template>
  <div class="student">
    <el-container>
      <el-header>
        <el-menu :default-active="$route.path" mode="horizontal" :router='true'>
          <el-menu-item index="/student">我的考试</el-menu-item>
          <el-menu-item index="/s2">我的成绩</el-menu-item>
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
import { GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'student',
  data() {
    return {
      userName: GetLocalStorage('userData').name
    };
  },
  created() {

  },
  methods: {
    signOut() {
      localStorage.removeItem('userData')
      this.$router.push('/')
    }
  }
}
</script>

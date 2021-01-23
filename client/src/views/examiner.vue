<template>
  <div class="examiner">
    <el-container>
      <el-header>
        <el-menu :default-active="$route.path" mode="horizontal" :router='true'>
          <el-menu-item index="/examiner">试卷配置</el-menu-item>
          <el-menu-item index="/statistics">成绩统计</el-menu-item>
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
      activeIndex: '/'
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

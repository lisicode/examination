<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu :default-active="$route.path" mode="horizontal" :router='true'>
          <el-menu-item index="/">考生录入</el-menu-item>
          <el-menu-item index="/b">试卷配置</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      activeIndex: '/'
    };
  },
  mounted() {

  },
  methods: {

  }
}
</script>

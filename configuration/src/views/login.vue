<template>
    <div class="login">
        <el-menu
                :default-active="$route.path"
                background-color="#F7F7F7"
                mode="horizontal"
                :router='true'
        >
            <el-menu-item index="/">登录</el-menu-item>
            <el-menu-item index="/s2">注册</el-menu-item>
        </el-menu>
        <el-row type="flex" justify="center">
            <el-col :xs="20" :md="6">
                <el-card shadow="never">
                    <h1>问卷宝管理系统</h1>
                    <router-view></router-view>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100vh;
        background-color: #F7F7F7;

        .el-menu {
            box-sizing: border-box;
            padding-left: 20px;
            padding-right: 20px;
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 1;
            border: none;
        }

        .el-row {
            width: 100%;

            .el-col {
                margin-top: 150px;

                .el-card {
                    border: none;
                    background-color: #F7F7F7;

                    h1 {
                        color: #303133;
                        letter-spacing: 5px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>


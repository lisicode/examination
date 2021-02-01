<template>
    <div class="s1">
        <el-form :model="signInData" status-icon :rules="rules" ref="signInData">
            <el-form-item prop="account">
                <el-input v-model="signInData.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="signInData.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="signIn('signInData')">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {Request, ApiConfig, SetLocalStorage} from '@/assets/js/config'

  export default {
    name: 's1',
    data() {
      return {
        signInData: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      signIn(signInData) {
        this.$refs[signInData].validate((valid) => {
          if (valid) {
            Request({
              method: 'post',
              data: {
                api: ApiConfig.signIn,
                signInData: this.signInData
              }
            }).then(res => {
              if (res.status === '0000') {
                SetLocalStorage(res.userData, 'userData');
                this.$router.push('/home')
              } else {
                this.$notify.error({
                  message: res.msg
                });
              }
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
    .s1 {
        width: 100%;

        .el-form {
            margin-top: 50px;

            .el-button {
                width: 100%;
                margin-top: 30px;
            }
        }
    }
</style>


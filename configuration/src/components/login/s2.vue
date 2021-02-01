<template>
    <div class="s2">
        <el-form :model="signUpData" status-icon :rules="rules" ref="signUpData">
            <el-form-item prop="name">
                <el-input v-model="signUpData.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item prop="account">
                <el-input v-model="signUpData.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="signUpData.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="department">
                <el-select v-model="signUpData.department" placeholder="请选择部门">
                    <el-option label="互联网金融业务部" value="01"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="signUp('signUpData')">注 册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {Request, ApiConfig, SetLocalStorage} from '@/assets/js/config'

  export default {
    name: 's2',
    data() {
      return {
        signUpData: {
          name: '',
          account: '',
          password: '',
          department: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          department: [
            {required: true, message: '请选择部门', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      signUp(signUpData) {
        this.$refs[signUpData].validate((valid) => {
          if (valid) {
            Request({
              method: 'post',
              data: {
                api: ApiConfig.signUp,
                signUpData: this.signUpData
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
    .s2 {
        width: 100%;

        .el-form {
            margin-top: 50px;

            .el-select {
                width: 100%;
            }

            .el-button {
                width: 100%;
                margin-top: 30px;
            }
        }
    }
</style>


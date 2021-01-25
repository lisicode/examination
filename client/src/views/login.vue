<template>
  <div class="login">
    <el-form :model="signInData" status-icon :rules="rules" ref="signInData">
      <el-form-item prop="account">
        <el-input v-model="signInData.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="signInData.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn('signInData')">登录</el-button>
      </el-form-item>
    </el-form>

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
      <el-form-item prop="role">
        <el-select v-model="signUpData.role" placeholder="请选择角色">
          <el-option label="考官" value="01"></el-option>
          <el-option label="考生" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signUp('signUpData')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'

export default {
  name: 'login',
  data() {
    return {
      signInData: {
        account: '',
        password: ''
      },
      signUpData: {
        name: '',
        account: '',
        password: '',
        department: '',
        role: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
      }
    }
  },
  mounted() {

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
              if (res.userData.role === '01') {
                this.$router.push('/examiner')
              } else if (res.userData.role === '02') {
                this.$router.push('/home')
              }
            }
          })
        } else {
          return false;
        }
      });
    },
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
                if (res.userData.role === '01') {
                  this.$router.push('/examiner')
                } else if (res.userData.role === '02') {
                  this.$router.push('/')
                }
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

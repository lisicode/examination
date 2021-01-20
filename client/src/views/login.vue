<template>
  <div class="login">
    <el-form :model="signInData">
      <el-form-item>
        <el-input v-model="signInData.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="signInData.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="signUpData">
      <el-form-item>
        <el-input v-model="signUpData.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="signUpData.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="signUpData.department" placeholder="请选择部门">
          <el-option label="互联网金融业务部" value="01"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="signUpData.role" placeholder="请选择角色">
          <el-option label="考官" value="01"></el-option>
          <el-option label="考生" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signUp">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Request, ApiConfig } from '@/assets/js/config'

export default {
  name: 'login',
  data() {
    return {
      signInData: {
        account: '',
        password: ''
      },

      signUpData: {
        account: '',
        password: '',
        department: '',
        role: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    signUp() {
      Request({
        method: 'post',
        data: {
          api: ApiConfig.signUp,
          signUpData: this.signUpData
        }
      }).then(res => {
        console.log(res)
      })
    }

  }
}
</script>

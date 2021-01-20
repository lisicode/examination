<template>
  <div class="entering">
    <el-form :inline="true" :model="userData" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="userData.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userData.department" placeholder="部门"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userData.phone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">录入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Request, InterfaceCode } from '@/assets/js/config'

export default {
  name: 'entering',
  data() {
    return {
      userData: {
        name: '',
        department: '',
        phone: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      Request({
        method: 'post',
        data: {
          code: InterfaceCode.UserLogin,
          demo: 1
        }
      }).then(res => {
        console.log(res)
      })



    }
  }
}
</script>

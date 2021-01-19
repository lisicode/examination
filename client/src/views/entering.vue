<template>
  <div class="entering">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="部门">
          <el-option label="客服中心" value="a"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">录入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'entering',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.axios({
        url: '/api',
        method: 'POST',
        data: {
          demo: '2',
        }
      }).then( res => {
        console.info(res)
      }).catch( e => {
        console.info(e)
      })



    }
  }
}
</script>

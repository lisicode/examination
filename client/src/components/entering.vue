<template>
  <div class="entering">
    <el-form :model="formInline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="题目"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="属性">
          <el-option label="单项选择" value="01"></el-option>
          <el-option label="多项选择" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true" plain>配 置</el-button>
        <el-button type="primary" @click="onSubmit">提 交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="备选项配置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入备选项内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add">增 加</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'entering',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },


      dialogFormVisible: false,
      form: {
        name: '',
      },

    }
  },
  created() {
    // localStorage.removeItem('userData')
    console.log(GetLocalStorage('userData'))
  },
  methods: {
    add() {

    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

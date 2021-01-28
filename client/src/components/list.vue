<template>
  <div class="list">
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="account"
          label="账号">
      </el-table-column>
      <el-table-column
          prop="title"
          label="试卷名">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button type="success" v-if="!scope.answer" @click="handleClick(scope.row)" size="small">完善答案</el-button>
          <el-tag v-if="scope.answer">已发布</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-form v-if="form.length">
      <p>{{ title }}</p>
      <el-form-item v-for="i in form" v-if="i.type === '01'">
        <p>{{ i.topic }}</p>
        <el-radio-group v-model="i.values">
          <el-radio v-for="(o, index) in i.list" :label="index">{{o.option}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="i in form" v-if="i.type === '02'">
        <p>{{ i.topic }}</p>
        <el-checkbox-group v-model="i.values">
          <el-checkbox v-for="(o, index) in i.list" :label="index">{{o.option}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Request, ApiConfig, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'list',
  data() {
    return {
      tableData: [],
      title: '',
      form: [],
      answer: []
    };
  },
  created() {
    Request({
      method: 'post',
      data: {
        api: ApiConfig.queryExaminationPaper,
        account: GetLocalStorage('userData').account,
      }
    }).then(res => {
      this.tableData = res.examinationPaperData;
    })
  },
  methods: {
    handleClick(row) {
      this.title = row.title;
      this.form = JSON.parse(row.questions);
    },
    onSubmit() {
      for (let i in this.form) {
        this.answer.push(this.form[i].values)
      }
      console.log(this.answer)
    }
  }
}
</script>

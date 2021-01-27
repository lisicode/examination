<template>
  <div class="entering">
    <el-form :model="question" status-icon :rules="rules" ref="question">
      <el-form-item prop="type">
        <el-select v-model="question.type" placeholder="题目类型">
          <el-option label="单项选择" value="01"></el-option>
          <el-option label="多项选择" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="topic">
        <el-input v-model="question.topic" placeholder="请输入题目"></el-input>
      </el-form-item>
      <el-form-item v-for="(i, index) in question.list" :prop="'list.' + index + '.option'" :rules="{required: true, message: '请输入题目', trigger: 'blur'}">
        <el-input placeholder="请输入备选项" v-model="i.option">
          <el-button slot="append" :disabled="index < 2" @click="removeQuestion(index)">删除</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add" plain>增加备选项</el-button>
        <el-button type="primary" @click="submitQuestion('question')">生成题目</el-button>
      </el-form-item>
    </el-form>
    <el-row v-if="examination.length">
      <el-card class="box-card" v-for="(i, index) in examination" shadow="never">
        <div slot="header">
          <span>{{ i.topic }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="removeExamination(index)">删除</el-button>
        </div>
        <div class="text item">
          <el-radio v-if="i.type === '01'" v-for="(o, index) in i.list" disabled>{{ o.option }}</el-radio>
          <el-checkbox v-if="i.type === '02'" v-for="(o, index) in i.list" disabled>{{ o.option }}</el-checkbox>
        </div>
      </el-card>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="dialogVisible = true">生成试卷</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form :model="examinationData" :rules="rules" ref="examinationData">
        <el-form-item prop="title">
          <el-input v-model="examinationData.title" placeholder="请为试卷命名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitExamination('examinationData')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Request, ApiConfig, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'entering',
  data() {
    return {
      question: {
        type: '',
        topic: '',
        values: [],
        list: [{option: ''},{option: ''}],
      },
      rules: {
        type: [{ required: true, message: '请选择题目类型', trigger: 'change' },],
        topic: [{ required: true, message: '请输入题目', trigger: 'blur' },],
        title: [{ required: true, message: '请为试卷命名', trigger: 'blur' },],
      },
      dialogVisible: false,
      examination: [],
      examinationData: {
        title: ''
      },
    }
  },
  created() {
    // localStorage.removeItem('userData')
    console.log(GetLocalStorage('userData'))
  },
  methods: {
    add() {
      this.question.list.push({option: ''})
    },
    removeQuestion(e) {
      this.question.list.splice(e,1)
    },
    submitQuestion(question) {
      this.$refs[question].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.question));
          this.examination.push(obj);
          console.log(this.examination)
        } else {
          return false;
        }
      });
    },
    removeExamination(e) {
      this.examination.splice(e,1)
    },
    submitExamination(examinationData) {
      this.$refs[examinationData].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          Request({
            method: 'post',
            data: {
              api: ApiConfig.examinationPaper,
              account: GetLocalStorage('userData').account,
              title: this.examinationData.title,
              examination: this.examination
            }
          }).then(res => {
            console.log(res)
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
  .el-select {
    width: 100%;
  }
  .box-card {
    margin-top: 10px;
    margin-bottom: 10px;
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
  }

</style>

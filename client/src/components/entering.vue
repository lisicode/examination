<template>
  <div class="entering">
    <el-form :model="question">
      <el-form-item>
        <el-select v-model="question.type" placeholder="题目类型">
          <el-option label="单项选择" value="01"></el-option>
          <el-option label="多项选择" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="question.topic" placeholder="请输入题目"></el-input>
      </el-form-item>
      <el-form-item v-for="(i, index) in question.list">
        <el-input placeholder="请输入备选项" v-model="i.option">
          <el-button slot="append" @click="removeQuestion(index)">删除</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add" plain>增加备选项</el-button>
        <el-button type="primary" @click="submitQuestion">生成题目</el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card" v-for="(i, index) in examination" shadow="never">
      <div slot="header">
        <span>{{ i.topic }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="removeExamination(index)">删除</el-button>
      </div>
      <div class="text item">
        <el-radio v-if="i.type === '01'" disabled v-for="(o, index) in i.list">{{ o.option }}</el-radio>
        <el-checkbox v-if="i.type === '02'" disabled v-for="(o, index) in i.list">{{ o.option }}</el-checkbox>
      </div>
    </el-card>
    <footer>
      <el-button type="primary" @click="submitExamination">生成试卷</el-button>
      <el-button type="primary" @click="preview">预览</el-button>
    </footer>

  </div>
</template>

<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'entering',
  data() {
    return {
      question: {
        type: '',
        topic: '',
        list: [],
      },
      examination: []
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
    submitQuestion() {
      let obj = JSON.parse(JSON.stringify(this.question));
      this.examination.push(obj);
      console.log(this.examination)
    },
    removeExamination(e) {
      this.examination.splice(e,1)
    },
    submitExamination() {
      Request({
        method: 'post',
        data: {
          api: ApiConfig.examinationPaper,
          account: GetLocalStorage('userData').account,
          examination: this.examination
        }
      }).then(res => {
        console.log(res)
      })
    },
    preview() {
      Request({
        method: 'post',
        data: {
          api: ApiConfig.queryExaminationPaper,
          account: GetLocalStorage('userData').account,
        }
      }).then(res => {
        console.log(JSON.parse(res.examinationPaperData[0].questions))
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    margin-top: 10px;
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }
  }
  footer {
    display: block;
    width: 100%;
    margin-top: 10px;
  }

</style>

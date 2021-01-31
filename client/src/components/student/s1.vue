<template>
  <div class="s1">
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="id"
              label="试卷编号">
      </el-table-column>
      <el-table-column
              prop="title"
              label="试卷名">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="begin(scope.row)" size="small">开始答题</el-button>
        </template>
      </el-table-column>
    </el-table>


      <el-form>
          <h1>{{ title }}</h1>
          <el-form-item v-for="i in questions" v-if="i.type === '01'">
              <h3>{{ i.topic }}</h3>
              <el-radio-group v-model="i.values">
                  <el-radio v-for="(o, index) in i.list" :label="index">{{o.option}}</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item v-for="i in questions" v-if="i.type === '02'">
              <h3>{{ i.topic }}</h3>
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
    name: 's1',
    data() {
      return {
        tableData: [],
        title: '',
        questions: [],
        answer: [],
        id: 0


      };
    },
    created() {
      console.log(GetLocalStorage('userData'));

      Request({
        method: 'post',
        data: {
          api: ApiConfig.queryExaminationPaper,
          role: GetLocalStorage('userData').role,
          department: GetLocalStorage('userData').department,
        }
      }).then(res => {
        this.tableData = res.examinationPaperData;
      })

    },
    methods: {
      begin(row) {
        this.questions = JSON.parse(row.questions);
        this.title = row.title;
        this.id = row.id;
      },
      onSubmit() {
        for (let i in this.questions) {
          if (JSON.stringify(this.questions[i].values) === '[]') {
            return false
          }
          this.answer.push(this.questions[i].values)
        }

        console.log( this.id)
        console.log( this.answer)
      },

    }
  }
</script>

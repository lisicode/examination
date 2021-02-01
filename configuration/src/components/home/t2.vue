<template>
    <div class="t2">
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
                    <el-button type="primary" @click="configAnswer(scope.row)" size="small">完善答案</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogFormVisible">
            <el-form>
                <h1>{{ title }}</h1>
                <el-form-item v-for="i in form" v-if="i.type === '01'">
                    <h3>{{ i.topic }}</h3>
                    <el-radio-group v-model="i.values">
                        <el-radio v-for="(o, index) in i.list" :label="index">{{o.option}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-for="i in form" v-if="i.type === '02'">
                    <h3>{{ i.topic }}</h3>
                    <el-checkbox-group v-model="i.values">
                        <el-checkbox v-for="(o, index) in i.list" :label="index">{{o.option}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">发布</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
  import {Request, ApiConfig, GetLocalStorage} from '@/assets/js/config'

  export default {
    name: 't2',
    data() {
      return {
        tableData: [],
        title: '',
        form: [],
        answer: [],
        id: 0,
        dialogFormVisible: false
      };
    },
    created() {
      Request({
        method: 'post',
        data: {
          api: ApiConfig.queryExaminationPaper,
          role: GetLocalStorage('userData').role,
          account: GetLocalStorage('userData').account,
        }
      }).then(res => {
        this.tableData = res.examinationPaperData;
      })
    },
    methods: {
      configAnswer(row) {
        this.dialogFormVisible = true;
        this.id = row.id;
        this.title = row.title;
        this.form = JSON.parse(row.questions);
      },
      onSubmit() {
        for (let i in this.form) {
          if (JSON.stringify(this.form[i].values) === '[]') {
            return false
          }
          this.answer.push(this.form[i].values)
        }
        Request({
          method: 'post',
          data: {
            api: ApiConfig.EditTheAnswer,
            id: this.id,
            account: GetLocalStorage('userData').account,
            answer: this.answer
          }
        }).then(res => {
          this.answer = [];
          this.dialogFormVisible = false;
          console.log(res)
        })

      }
    }
  }
</script>

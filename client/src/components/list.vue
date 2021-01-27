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
          prop="name"
          label="试卷名">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">完善答案</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-form>
      <p>{{ name }}</p>

      <el-form-item v-for="i in this.answer" v-if="i.type === '01'">
        <p>{{ i.topic }}</p>
        <el-radio-group v-model="i.ra">
          <el-radio v-for="o in i.list" :label="o.option"></el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item v-for="(i, fIndex) in this.answer" v-if="i.type === '02'">
        <p>{{ i.topic }}</p>
        <el-checkbox v-for="(o, cIndex) in i.list" :label="o.option" @change="ch(fIndex, cIndex)"></el-checkbox>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'list',
  data() {
    return {
      tableData: [],
      name: '',

      answer: [],
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
      this.name = row.name;
      this.answer = JSON.parse(row.questions);
      console.log(this.answer)
    },


    ch(fIndex, cIndex) {
      console.log('第' + fIndex + '题')
      console.log('选择第' + cIndex)
    },

    onSubmit() {
      console.log(this.answer)
    }
  }
}
</script>

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
          <el-button @click="handleClick(scope.row)" type="text" size="small">完善答案</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form>
      <p>{{ title }}</p>
    </el-form>


    <el-checkbox-group v-for="i in form" v-model="i.values">
      <el-checkbox v-for="city in i.cityList" :label="city.value">{{city.label}}</el-checkbox>
    </el-checkbox-group>

    <el-button @click="onSubmit">提交</el-button>



  </div>
</template>
<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'list',
  data() {
    return {
      tableData: [],
      title: '',

      form: [
        {
          values: [],
          cityList: [
            {
              label: '广州',
              value: 1
            },
            {
              label: '北京',
              value: 2
            }
          ]
        },
        {
          values: [],
          cityList: [
            {
              label: '杭州',
              value: 1
            },
            {
              label: '南京',
              value: 2
            }
          ]
        }

      ]



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
      console.log(JSON.parse(row.questions))
    },

    onSubmit() {
      console.log(this.form);
    }
  }
}
</script>

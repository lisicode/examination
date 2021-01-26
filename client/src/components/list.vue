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
          label="姓名">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Request, ApiConfig, SetLocalStorage, GetLocalStorage } from '@/assets/js/config'
export default {
  name: 'examiner',
  data() {
    return {
      tableData: []
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
      console.log(res.examinationPaperData)
      this.tableData = res.examinationPaperData;
    })
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>

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
  </div>
</template>

<script>
  import { Request, ApiConfig, GetLocalStorage } from '@/assets/js/config'
  export default {
    name: 's1',
    data() {
      return {
        tableData: []
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
        console.log(row)
      }
    }
  }
</script>

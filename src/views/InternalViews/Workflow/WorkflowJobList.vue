<template>
  <div class="container">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="名称" width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.workflow_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="执行日期" width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.creation_timestamp }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="180">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.phase }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row.workflow_name)">详情</el-button>
        <el-button size="mini" type="danger" @click="selectWorkflow(scope.row.workflow_name)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <span>删除后无法恢复，确认删除吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleDelete()">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class WorkflowJobListView extends Vue {
  tableData = [];
  dialogVisible = false;
  workflowName = "";
  created() {
    this.getData();
  }
  async getData() {
    try {
      const { data } = await this.$axios.get("wfs/workflowJobs");
      this.tableData = JSON.parse(data);
    } catch (e) {
      this.$message.error("请求用户数据失败，请稍后再试！");
    }
  }

  selectWorkflow(row: string) {
    this.workflowName = row;
    this.dialogVisible = true;
  }

  handleEdit(row: string) {
    console.log(row)
    this.$router.push({
      name: "workflowjob",
      query: {"data": row}
    });
  }

  async handleDelete() {
    console.log(this.workflowName)
    try {
      const { data } = await this.$axios.delete("wfs/workflowJobs/" + this.workflowName,);
      this.tableData = this.tableData.filter(
        item => item["workflow_name"] != this.workflowName
      );
    } catch (e) {
      this.$message.error("请求用户数据失败，请稍后再试！");
    }
    this.dialogVisible = false
  }
}
</script>
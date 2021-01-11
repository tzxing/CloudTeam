<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/wflistable'}">工作流列表</el-breadcrumb-item>
        <el-breadcrumb-item>工作流详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <span>工作流名称：{{wfsname}}</span>
      </div>
    </el-header>
    <el-main>
      <div>
        <WorkflowChart :chart_data="chart_data"></WorkflowChart>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FunctionBlock from "./components/FunctionBlock.vue";
import WorkflowChart from "./Components/WorkflowChart.vue";

@Component({
  components: { WorkflowChart }
})
export default class wfsedit extends Vue {
  private wfsname: any = "";
  private chart_data = "[]";
  private chart: any = null;
  private wf_id: any;
  created() {
    // alert(this.$route.query.name)
    this.wfsname = this.$route.query.name;
    this.wf_id = this.$route.query.wf_id;
    this.getDetailsInfo();

    // this.chart = this.$refs.workflow_chart_alter as WorkflowChartAlter;
  }

  async getDetailsInfo() {
    try {
      const { data } = await this.$axios.get("wfs/workflow_list/" + this.wf_id);
      if (data) {
        this.chart_data = JSON.stringify(data);
        //  alert(this.chart_data)
      } else {
        this.$message.error("没有数据");
      }
    } catch (e) {
      this.$message.error("失败，请稍后再试！");
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

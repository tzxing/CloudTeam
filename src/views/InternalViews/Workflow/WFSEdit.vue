<template>
  <div class="container">
    <!-- <el-page-header @back="goBack" content="详情页面">
    </el-page-header>-->
    <div v-if="flag==='1'">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/internal/workflow'}">工作流管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/internal/workflow/wflistable'}">工作流列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="height: 100%">
      <!-- <el-aside> -->
      <div class="list">
        <!-- <input placeholder={{wfsname}}> -->
        <!-- <span>工作流名称：{{wfsname}}</span> -->
        <div class="input1">
          <el-input v-model="input" placeholder="工作流名称" maxlength="100"></el-input>
        </div>
        <div class="buttons">
          <el-button type="primary" >新增节点</el-button>
          <el-button type="primary" >自动布局</el-button>
        </div>
      </div>
      <!-- </el-aside> -->


      <el-main style="height: 100%">
        <div style="height: 90%">
          <WorkflowChartAlter :chart_data="chart_data" ref="workflow_chart"></WorkflowChartAlter>
        </div>
        <div style="margin-left: 50%">
          <el-button type="primary" @click="saveWfsInfo()">保存</el-button>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FunctionBlock from "./components/FunctionBlock.vue";
import WorkflowChartAlter from "./Components/WorkflowChartAlter.vue";

@Component({
  components: { WorkflowChartAlter }
})
export default class wfsdetails extends Vue {
  private wfsname: any = "";
  private chart_data = "[]";
  private chart: any = null;
  private wf_id: any;
  private flag: any = "0";
  private input: any = "";

  mounted() {
    // alert(this.$route.query.name)
    this.wfsname = this.$route.query.name;
    this.wf_id = this.$route.query.wf_id;
    this.flag = this.$route.query.flag;
    this.input = this.$route.query.name;
    if (this.flag == "1") {
      this.getDetailsInfo();
    }

    this.chart = this.$refs.workflow_chart as WorkflowChartAlter;
  }

  wfs_data: any;
  a: [] = [];
  async saveWfsInfo() {
    try {
      if (this.flag == "1") {
        // this.wfs_data = this.chart.get_chartjson()
        this.wfs_data = JSON.parse(this.chart.get_chartjson());

        const { data } = await this.$axios.patch(
          "wfs/workflows/" + this.wf_id,
          {
            workflow_name: this.input,
            topology: this.wfs_data
          }
        );
        if (data) {
          this.$message.info("保存成功");
        }
      } else {
        //新增
        this.wfs_data = JSON.parse(this.chart.get_chartjson());
        const { data } = await this.$axios.post("wfs/workflows", {
          workflow_name: this.input,
          topology: this.wfs_data
        });
        if (data) {
          this.$message.info("保存成功");
        }
      }
    } catch (e) {
      alert(this.wfs_data);
      this.$message.error("保存失败，请稍后再试！");
    }
  }

  async getDetailsInfo() {
    try {
      const { data } = await this.$axios.get("wfs/workflow_info/" + this.wf_id);

      if (data) {
        this.chart_data = JSON.stringify(data);
        // alert(this.chart_data);
      } else {
        this.$message.error("没有数据");
      }
    } catch (e) {
      this.$message.error("失败，请稍后再试！");
    }
  }
}
</script>

<style>
.list {
  display: flex;
  flex-direction: row;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
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

body,
html,
#app {
  height: 100%;
}
.container {
  height: 90%;
}
.buttons {
  position: relative;
  /* padding-left: 10%; */
}
.input1 {
  width: 300px;
  margin-right: 10px;
}
</style>

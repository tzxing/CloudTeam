<template>
  <div class="container">
    <div v-if="flag === '1'">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/wflistable' }"
          >工作流列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="height: 100%">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="工作流模版名称">
          <el-input
            style="width: 31em;"
            v-model="wf_template_name"
            placeholder="名称由字母，数字和横线构成，不允许包含下划线或特殊字符等"
            maxlength="100"
          ></el-input>
         <el-select v-model="wf_template_style" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_node">新增节点</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="auto_layout">自动布局</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveWfsInfo">保存</el-button>
        </el-form-item>
      </el-form>
      <el-main style="height: 100%">
        <div style="height: 90%">
          <WorkflowChartAlter
            :chart_data="chart_data"
            ref="workflow_chart"
          ></WorkflowChartAlter>
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
  components: { WorkflowChartAlter },
})
export default class WFSEdit extends Vue {
  private wfsname: string = "";
  private chart_data = "[]";
  private chart: any = null;
  private wf_id: any;
  private flag: any = "0";
  private wf_template_name: any = "";
  private wf_template_style: any = "";
  wfs_data: any;
  a: [] = [];

  options = [
    {
      value: "普通工作流",
      label: "普通工作流"
    },
    {
      value: "控制任务",
      label: "控制任务"
    }
  ];

  mounted() {
    // alert(this.$route.query.name)
    this.wfsname = this.$route.query.name as string;
    this.wf_id = this.$route.query.wf_id;
    this.flag = this.$route.query.flag;
    this.wf_template_name = this.$route.query.name;
    if (this.flag == "1") {
      this.getDetailsInfo();
    }

    this.chart = this.$refs.workflow_chart as WorkflowChartAlter;
  }
  public add_node() {
    this.chart.dialogFormVisible = true;
  }
  public auto_layout() {
    this.chart.auto_layout();
  }
  
  
  async saveWfsInfo() {
    if (this.flag == "1") {
      try {
        if (this.wf_template_name == null || this.wf_template_name == "") {
          alert("请输入工作流名称");
        } else if(this.wf_template_style==null || this.wf_template_style == ""){
          alert("请选择类型");
        }
        else {
          this.wfs_data = JSON.parse(this.chart.get_chartjson());

          const { data } = await this.$axios.patch(
            "wfs/workflows/" + this.wf_id,
            {
              workflow_name: this.wf_template_name,
              style :this.wf_template_style,
              topology: this.wfs_data,
            }
          );
          if (data) {
            this.$message.info("保存成功");
            this.$router.push({
              //跳转到工作流列表界面
              name: "wflistable",
            });
          }
        }
        // this.wfs_data = this.chart.get_chartjson()
      } catch (e) {
        // alert(this.wfs_data);
        this.$message.error("保存失败，请稍后再试！");
      }
    } else {
      //新增
      try {
        if (this.wf_template_name == null || this.wf_template_name == "") {
          alert("请输入工作流名称");
        } else if(this.wf_template_style==null || this.wf_template_style == ""){
          alert("请选择类型");
        }
        else {
          this.wfs_data = JSON.parse(this.chart.get_chartjson());

          const { data } = await this.$axios.post("wfs/workflows", {
            workflow_name: this.wf_template_name,
            style:this.wf_template_style,
            topology: this.wfs_data,
          });
          if (data) {
            this.$message.info("保存成功");
            this.$router.push({
              //跳转到工作流列表界面
              name: "wflistable",
            });
          }
        }
      } catch (e) {
        this.$message.error("保存失败，请稍后再试！");
      }
    }
  }

  async getDetailsInfo() {
    try {
      const { data } = await this.$axios.get("wfs/workflow_list/" + this.wf_id);

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
</style>

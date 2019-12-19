<template>
  <div class="container">
    <!-- <el-page-header @back="goBack" content="详情页面">
    </el-page-header> -->

  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{path:'/internal/workflow'}">工作流管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{path:'/internal/workflow/wflistable'}">工作流列表</el-breadcrumb-item>
  <el-breadcrumb-item >修改</el-breadcrumb-item>
  </el-breadcrumb>
      
    <el-aside>
      <div>
        <!-- <input placeholder={{wfsname}}> -->
        <span>工作流名称：{{wfsname}}</span>
      </div>
    </el-aside>

    <el-main>
      <div>
          <WorkflowChartAlter :chart_data="chart_data" ref = "workflow_chart"></WorkflowChartAlter>
      </div>
      <div style="margin-left: 700px;">
        <el-button type="primary" @click="saveWfsInfo()">保存</el-button>
      </div>
    </el-main>

  </div>
        
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import FunctionBlock from "./components/FunctionBlock.vue";
    import WorkflowChartAlter from "./Components/WorkflowChartAlter.vue";

@Component({
  components: { WorkflowChartAlter}
})

    export default class wfsdetails extends Vue {
      
      private wfsname:any="";
      private chart_data="[]";
      private chart:any = null;
      private wf_id:any;
      mounted(){
        // alert(this.$route.query.name)
        this.wfsname = this.$route.query.name;
        this.wf_id = this.$route.query.wf_id ;

        this.getDetailsInfo()
        
        this.chart = this.$refs.workflow_chart as WorkflowChartAlter;
      
      }

    wfs_data:any
    async saveWfsInfo(){
      try {
        // this.wfs_data = this.chart.get_chartjson()
        this.wfs_data = JSON.parse(this.chart.get_chartjson())
        
      
        const { data } = await this.$axios.patch("wfs/workflow_list/"+this.wf_id+"/update/", {
        wfs_name:this.wfsname,
        topology:this.wfs_data
      });
      if(data){
        this.$message.info("保存成功")
      }
      } catch (e) {
        alert(this.wfs_data)
        this.$message.error("保存失败，请稍后再试！");
      }
    }

    async getDetailsInfo() {
      try {
        const { data } = await this.$axios.get("wfs/workflow_info/"+this.wf_id);
        
        if (data) {
          this.chart_data = JSON.stringify(data);
          alert(this.chart_data)
        }
        else{
           this.$message.error("没有数据")
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
</style>

<template>
  <div class="container">
    <!-- <el-page-header @back="goBack" content="详情页面">
    </el-page-header> -->

  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{path:'/internal/workflow'}">工作流管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{path:'/internal/workflow/wflistable'}">工作流列表</el-breadcrumb-item>
  <el-breadcrumb-item >工作流详情</el-breadcrumb-item>
  </el-breadcrumb>
      
    <el-aside>
      <div>
        <span>工作流名称：{{wfsname}}</span>
      </div>
    </el-aside>

    <el-main>
      <div>
          <WorkflowChartAlter :chart_data="chart_data"></WorkflowChartAlter>
      </div>
    </el-main>

  </div>
        
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import FunctionBlock from "./components/FunctionBlock.vue";
    import WorkflowChartAlter from "./Components/WrokflowChartAlter.vue";

@Component({
  components: { WorkflowChartAlter }
})

    export default class wfsdetails extends Vue {
      
      private wfsname:any="";
      private chart_data="[]";
      private chart:any = null;
      created(){
        // alert(this.$route.query.name)
        this.wfsname = this.$route.query.name

        this.getDetailsInfo()
        
        // this.chart = this.$refs.workflow_chart_alter as WorkflowChartAlter;

      }

      workf_id= "5df1b1a91e618e930e7e20e9";
    async getDetailsInfo() {
      try {
        const { data } = await this.$axios.get("wfs/workflow_details/"+this.workf_id);
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

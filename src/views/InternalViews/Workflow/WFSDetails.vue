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
          <WorkflowChartAlter :chart_data="char_data" ref="WorkflowChartAlter"></WorkflowChartAlter>
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


    @Component({})
    export default class wfsdetails extends Vue {
      
      private wfsname:any="";
      // this.wfsname = this.$route.params.name
      mounted(){
        // alert(this.$route.query.name)
        this.wfsname = this.$route.query.name
      }


      public char_data =
    '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","style_type":"success"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","style_type":"normal"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","style_type":"disable"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","style_type":"success"}]';
  public chart = new WorkflowChartAlter(this.char_data);
  public str: string = "";

  created() {
    this.str = this.chart.get_chartjson();
    console.log(this.str + "%%%%%");
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

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
          暂定为空
      </div>
    </el-main>

  </div>
        
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import FunctionBlock from "./components/FunctionBlock.vue";




    @Component({})
    export default class wfsdetails extends Vue {


      
      private wfsname:string = "";
      // this.wfsname = this.$route.params.name

    goBack() {
        console.log('go back');
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

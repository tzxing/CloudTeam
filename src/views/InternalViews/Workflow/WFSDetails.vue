<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header">
        <span>工作流详情页</span>
      </div>
      <div>
          <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="username" placeholder="workflow_id"></el-input>
                    </div>
                </el-col>
                <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </div>
        
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import FunctionBlock from "./components/FunctionBlock.vue";

    export


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

<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="activeIndex" background-color="#122938" text-color="#fff" unique-opened router>
      <el-menu-item index="/internal/workflow/dashboard">
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <span>工作流管理</span>
        </template>
        <!-- <el-menu-item index="/internal/workflow/basetable">工作流列表</el-menu-item> -->
        <!-- <el-menu-item index="/internal/workflow/baseform">工作流上传</el-menu-item> -->
        <el-menu-item index="/internal/workflow/wflistable">工作流列表</el-menu-item>
        <!-- <el-menu-item index="/internal/workflow/wflistable/wfsedit">新增工作流</el-menu-item> -->
        <!-- <el-menu-item index="/internal/workflow/wfsdetails">工作流详情-bzx</el-menu-item> -->
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <span>用户管理</span>
        </template>
        <el-menu-item index="/internal/workflow/userinfo">用户列表</el-menu-item>
      </el-submenu>
      

      <el-submenu index="3">
        <template slot="title">
          <span>工作流实例管理</span>
        </template>
        <el-menu-item index="/internal/workflow/workflowjoblist">工作流实例列表</el-menu-item>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class TheSidebarView extends Vue {
  collapse = false;
  activeIndex = "";
}
</script>

<style  scoped >
.sidebar {
  display: block;
  position: absolute;
  left: 20px;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  z-index: 1;
  background:  #122938;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.5);
}

.sidebar::-webkit-scrollbar {
  width: 0;
  background: #122938;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 180px;
  background: #122938;
}


</style>

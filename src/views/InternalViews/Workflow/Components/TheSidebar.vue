<template>
  <div class="sidebar">
    <!-- <el-menu class="sidebar-el-menu" :default-active="activeIndex" unique-opened router> -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="activeIndex"
      unique-opened
      router
      background-color="#7D8096"
      text-color="#fff"
      active-text-color="#7BC980"
    >
      <el-menu-item index="/internal/workflow/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-more"></i>
          <span>工作流管理</span>
        </template>
        <!-- <el-menu-item index="/internal/workflow/wflistable/wfsedit">新增工作流</el-menu-item> -->
        <!-- <el-menu-item index="/internal/workflow/wfsdetails">工作流详情-bzx</el-menu-item> -->
        <el-menu-item index="/internal/workflow/basetable">
          <i class="el-icon-s-operation"></i>
          <span slot="title">工作流列表</span>
        </el-menu-item>
        <el-menu-item index="/internal/workflow/baseform">
          <i class="el-icon-upload2"></i>
          <span slot="title">工作流上传</span>
        </el-menu-item>
        <el-menu-item index="/internal/workflow/wflistable">
          <i class="el-icon-s-order"></i>
          <span slot="title">工作流列表-xy</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/internal/workflow/userinfo">
          <i class="el-icon-s-check"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>工作流实例管理</span>
        </template>
        <el-menu-item index="/internal/workflow/workflowjoblist">
          <i class="el-icon-discover"></i>
          工作流实例列表
        </el-menu-item>
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

<style lang="scss" scoped>
.el-icon-menu,
.el-icon-more,
.el-icon-s-operation,
.el-icon-upload2,
.el-icon-s-order,
.el-icon-user-solid,
.el-icon-s-data,
.el-icon-discover,
.el-icon-s-check {
  color: #fff;
}
</style>

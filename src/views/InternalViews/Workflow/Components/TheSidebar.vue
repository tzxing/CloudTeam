<template>
  <div class="sidebar">

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


        <el-menu-item index="/internal/workflow/wflistable">
          <i class="el-icon-s-order"></i>
          <span slot="title">工作流列表</span>
        </el-menu-item>



        <el-menu-item index="/internal/workflow/userinfo">
          <i class="el-icon-s-check"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>



        <el-menu-item index="/internal/workflow/workflowjoblist">
          <i class="el-icon-discover"></i>
          工作流实例列表
        </el-menu-item>

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

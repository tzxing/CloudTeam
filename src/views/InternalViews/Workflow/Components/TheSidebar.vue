<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="activeIndex" unique-opened router>
      <el-menu-item index="/internal/workflow/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <span>工作流管理</span>
        </template>
        <el-menu-item index="/internal/workflow/basetable">工作流列表</el-menu-item>
        <el-menu-item index="/internal/workflow/baseform">工作流上传</el-menu-item>
        <el-menu-item index="/internal/workflow/wflistable">工作流列表-xy</el-menu-item>
        <!-- <el-menu-item index="/internal/workflow/wfsdetails">工作流详情-bzx</el-menu-item> -->
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



</style>

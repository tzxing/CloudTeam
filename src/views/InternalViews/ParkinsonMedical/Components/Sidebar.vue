<template>
  <div class="sidebar">
    <p style="color:#ff9955; text-align: center; font-size: 18px;">
      <span>帕金森检测系统</span>
    </p>
    <!-- <el-menu class="sidebar-el-menu" :default-active="activeIndex" unique-opened router> -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="activeIndex"
      :collapse="false"
      unique-opened
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/internal/parkinson/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-more"></i>
          <span>资料管理</span>
        </template>
        <el-menu-item index="/internal/parkinson/data">
          <i class="el-icon-s-order"></i>
          <span slot="title">个人信息管理</span>
        </el-menu-item>
        <el-menu-item v-show=c1 index="/internal/parkinson/password">
          <i class="el-icon-lock"></i>
          <span slot="title">密码管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item  v-show=c2 index="/internal/parkinson/pardata">
        <i class="el-icon-s-check"></i>
        <span slot="title">数据查看</span>
      </el-menu-item>
      <el-menu-item v-show=c2 index="/internal/parkinson/prescription">
        <i class="el-icon-s-check"></i>
        <span slot="title">处方</span>
      </el-menu-item>
<!-- 
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
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class SidebarView extends Vue {
  collapse = false;
  activeIndex = "";
  c1=false;
  c2=false;
  created () {
    if (this.$store.state.user.role=="admin"){
      this.c1=true;
      this.c2=true;
    } 
    else if (this.$store.state.user.role=="user")
    {
      this.c1=true;
      this.c2=false;
    }
    }
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

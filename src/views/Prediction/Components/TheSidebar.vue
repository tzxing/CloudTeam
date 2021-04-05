<template>
  <div class="sidebar" style="width: 13em">

    <el-menu
      class="sidebar-el-menu"
      router
      :default-active="$route.path"
      unique-opened
      background-color="#303439"
      text-color="#B0B3C0"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/prediction/dashboard">
        <span slot="title">首页</span>
      </el-menu-item>


        <el-menu-item index="/prediction/forecast">
          <i class="el-icon-s-order"></i>
          <span slot="title">能耗预测</span>
        </el-menu-item>


        <el-submenu index="">
          <template slot="title"><i class="el-icon-s-data"></i>能耗评估</template>
          <el-menu-item index="/prediction/decompose"
          >虚拟机能耗分解</el-menu-item>
          <el-menu-item index="/prediction/hard-decompose">物理机硬件能耗分解</el-menu-item>
        </el-submenu>


        <el-menu-item v-show=showuserinfo index="/prediction/metrics">
          <i class="el-icon-data-line"></i>
          <span slot="title">指标评估</span>
        </el-menu-item>


        <el-menu-item v-show=showuserinfo index="/prediction/server-list">
          <i class="el-icon-s-platform"></i>
          <span slot="title">物理机列表</span>
        </el-menu-item>


        <el-menu-item v-show=showuserinfo index="/prediction/userinfo">
          <i class="el-icon-s-check"></i>
          <span slot="title">用户列表</span>
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
  showuserinfo = false;
  created() {
    if(this.$store.state.user.role == "admin")
    {
      this.showuserinfo= true
    }
  }
}
</script>

<style lang="scss" scoped>

.el-menu-item{
  width: 208px;
}

.el-submenu {
  width: 208px !important;
}

</style>

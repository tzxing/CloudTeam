<template>
  <div class="sidebar">

    <el-menu
      class="sidebar-el-menu"
      :default-active="activeIndex"
      unique-opened
      router
      background-color="#303439"
      text-color="#B0B3C0"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/dashboard">
        <span slot="title">首页</span>
      </el-menu-item>


        <el-menu-item index="/wflistable">
          <i class="el-icon-s-order"></i>
          <span slot="title">工作流列表</span>
        </el-menu-item>



        <el-menu-item v-show=showuserinfo index="/userinfo">
          <i class="el-icon-s-check"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>



        <el-menu-item index="/workflowjoblist">
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

</style>

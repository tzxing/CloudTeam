<template>
  <div class="sidebar" style="width: 13em">

    <el-menu
      class="sidebar-el-menu"
      :default-active="activeIndex"
      unique-opened
      router
      background-color="#303439"
      text-color="#B0B3C0"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/serverstatus/master">
        <span slot="title">首页</span>
      </el-menu-item>


        <el-menu-item index="/serverstatus/master">
          <i class="el-icon-s-order"></i>
          <span slot="title">主节点</span>
        </el-menu-item>

        <el-menu-item index="/serverstatus/snapshot">
          <i class="el-icon-s-order"></i>
          <span slot="title">历史快照</span>
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

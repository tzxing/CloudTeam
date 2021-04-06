<template>
  <div class="header">
    <!-- 按钮 -->
    <div class="collapse-btn">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">云数据中心服务器监控子系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-name">{{name}}</div>
        <div class="user-logout curp" @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class TheHeadView extends Vue {
  collapse = false;
  name = this.$store.state.user.username;

  logout() {
    this.$store.state.user.access_token = "";
    this.$router.replace("/internal");
  }
}
</script>

<style lang="scss" scoped>

.header {
  position: relative;
  box-sizing: border-box;
  left: 0;
  width: 100%;
  font-size: 1.2em;
  /* color: rgb(7, 6, 6); */
  color: #fff;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.5);
}

.collapse-btn {
  float: left;
  width: 63px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  line-height: 2.5em;
}

.header .logo {
  float: left;
  margin-left: 7px;
  line-height: 2.5em;
}

.header-right {
  float: right;
  padding-right: 0;
}

.header-user-con {
  display: flex;
  height: 3em;
  align-items: center;
  font-size: 16px;
}

.user-name {
  margin: 0 20px 0 10px;
}

.user-logout {
  border: 1px solid #fff;
  border-radius: 18px;
  padding: 3px 18px;
  font-size: 14px;
}

.collapse-btn:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>

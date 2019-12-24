<template>
  <div class="header">
    <!-- 按钮 -->
    <div class="collapse-btn">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">后台管理系统</div>
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
  name = "管理员";

  logout() {
    this.$router.push("/internal");
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  left: 0px;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.5);
}

.collapse-btn {
  float: left;
  width: 63px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  margin-left: 0;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 0;
}

.header-user-con {
  display: flex;
  height: 70px;
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

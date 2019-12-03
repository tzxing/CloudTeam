<template>
  <div class="header">
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
  name = "";

  logout() {
    (this.$store as any).user.access_token="";
    this.$router.push("/internal");
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-size: 22px;
  color: #fff;
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
  margin-left: 20px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 20px;
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

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
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

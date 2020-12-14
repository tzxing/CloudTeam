<template>
  <div class="navbar">
    <!-- 按钮 -->
    <div class="logo">
      {{shouyeming}}
      <span :hidden="button_state"> <!-- 患者的详情页面显示内容（包括患者的姓名和弹回上层路由的链接按钮），在其他页面通过hidden属性隐藏 -->
        ：{{patient_name}}
        <el-button type="text" icon="el-icon-arrow-left" @click="goBack">返回上层</el-button>
      </span>
    </div>
    <div class="navbar-right">
      <div class="navbar-user-con">
        <!-- 用户名称 -->
        <div class="user-name">您好{{name}}</div>
        <div class="user-logout curp" @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})

export default class NavbarView extends Vue {
  // collapse = false;
  // path = this.$route.path;
  // rootpath = "/internal/parkinson/dashboard";
  name="";
  button_state:boolean = true;
  logout() {
    this.$router.push("/internal");
  }
  get shouyeming () {
     return this.$store.state.title
  }

  get patient_name () {
    if(this.$route.path == "/internal/parkinson/data_detail") {
      this.button_state = false;
    }
    else {
      this.button_state = true;
    }
    return this.$store.state.patient_name;
  }

  goBack() { //按下返回按钮时路由跳转
    this.$router.push({
      path:`pardata`
    })
  }

  created() {
    this.name=this.$store.state.user.username
  }
  
}
</script>

<style scoped>
.navbar {
  position: relative;
  box-sizing: border-box;
  left: 0px;
  width: 100%;
  height: 70px;
  font-size: 16px;
  /* color: rgb(7, 6, 6); */
  color: rgb(0, 0, 0);
}

.collapse-btn {
  float: left;
  width: 63px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  line-height: 70px;
}

.navbar .logo {
  float: left;
  margin-left: 7px;
  line-height: 65px;
}

.navbar-right {
  float: right;
  padding-right: 0;
}

.navbar-user-con {
  display: flex;
  height: 65px;
  align-items: center;
  font-size: 16px;
}

.user-name {
  margin: 0 20px 0 10px;
}

.user-logout {
  border: 1px solid rgb(0, 0, 0);
  border-radius: 18px;
  padding: 3px 18px;
  font-size: 14px;
}

.collapse-btn:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>

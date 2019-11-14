<template>
  <div class="login-container">
    <div id="login-components">
      <el-input v-model="username" placeholder="用户名"></el-input>
      <el-input v-model="password" placeholder="密码" show-password></el-input>
      <el-checkbox v-model="remember_me" style="align-self: flex-start;">记住登陆</el-checkbox>
      <div id="buttons">
        <el-button type="primary" @click="do_login">登陆</el-button>
        <el-button>注册</el-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoginView extends Vue {
  private username: string = "";
  private password: string = "";
  private remember_me: boolean = false;

  public async do_login() {
    if(this.username === "" || this.password==="") {
      this.$message.warning("用户名和密码不能为空");
      return;
    }
    
    try {
      const access_token = await this.$axios.post("users/login", {
        id: this.username,
        passwd: this.password
      });
      this.$store.state.user.access_token = access_token;
      this.$router.replace("/internal");
    } catch (e) {
      this.$message.error("登陆失败，请检查用户名和密码后再试！");
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  background-image: url("../assets/login-background.jpg");
  background-size: 100% 100%;

  #login-components {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 4vw;
    width: 290px;
    padding: 40px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-input,
    .el-checkbox {
      margin-bottom: 15px;
    }

    .el-checkbox {
      align-self: flex-start;
    }

    #buttons {
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
    }
  }
}
</style>
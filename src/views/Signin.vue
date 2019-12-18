<template>
  <div class="login-container">
    <div id="login-components">
      <el-input v-model="form.email" placeholder="邮箱"></el-input>
      <el-input v-model="form.nickname" placeholder="昵称"></el-input>
      <el-input v-model="form.password" placeholder="密码" show-password></el-input>
      <el-input v-model="form.name" placeholder="真实姓名"></el-input>
      <el-input v-model="form.phone" placeholder="电话号码"></el-input>
      <el-input v-model="form.idcard" placeholder="身份证号"></el-input>
      <el-input v-model="form.stuid" placeholder="学生证号"></el-input>
      <el-button type="primary" @click="do_signup">注册</el-button>
      <router-link to="/login">已有账号？马上登录</router-link>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class SoginView extends Vue {
    form = {
    email:"",
    password:"",
    nickname:"",
    name: "",
    phone:"",
    stuid:"",
    idcard: "",
  };

  public async do_signup() {
     if (this.form.email=== "" || this.form.password === "") {
      this.$message.warning("各项信息不能为空");
      return;
    }
    try {
               
      const {data} = await this.$axios.post("users/signup", this.form);
      if(data== "success"){
        this.$message.success("注册成功");
      }
    } catch (e) {
      this.$message.error("注册失败，请检查用户名和密码后再试！");
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
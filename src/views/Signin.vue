<template>
  <div class="login-container">
    <div id="login-components">
      <el-form ref="form" :rules="formRule" :model="form">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="form.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" placeholder="重复输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item prop="idcard">
          <el-input v-model="form.idcard" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="stuid">
          <el-input v-model="form.stuid" placeholder="学生证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="do_signup">注册</el-button>
        </el-form-item>
        <router-link to="/login">已有账号？马上登录</router-link>
      </el-form>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class SoginView extends Vue {
  form = {
    email: "",
    password: "",
    repassword: "",
    nickname: "",
    username: "",
    phone: "",
    stuid: "",
    idcard: ""
  };
  formRule = {
    email: [{ validator: this.checkemail, trigger: "blur" }],
    password: [{ validator: this.checkpassword, trigger: "blur" }],
    repassword: [{ validator: this.checkrepassword, trigger: "blur" }],
    nickname: [{ validator: this.checknickname, trigger: "blur" }],
    username: [{ validator: this.checkusername, trigger: "blur" }],
    phone: [{ validator: this.checkPhone, trigger: "blur" }],
    stuid: [
      {
        required: true,
        message: "学生证件号码是必填的",
        trigger: "blur"
      }
    ],
    idcard: [
      {
        required: true,
        message: "身份证号码是必填的",
        trigger: "blur"
      }
    ]
  };
    checkemail(rule: any, value: any, callback: any) {
    const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
    if (value === "") {
      callback(new Error("邮箱为必填项"));
    } else if (!pattern.test(value)) {
      callback(new Error("请检查要输入的邮箱是否合法"));
    }
    callback();
  }

  checkpassword(rule: any, value: any, callback: any) {
    const pattern = /^\S{6,20}$/g;
    if (value === "") {
      callback(new Error("请输入密码"));
    } else if (!pattern.test(value)) {
      callback(new Error("请输入6-20个非空白字符"));
    }
    callback();
  }
  checkrepassword(rule: any, value: any, callback: any) {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.form.password) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  }
  checkPhone(rule: any, value: any, callback: any) {
    const pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (value === "") {
      callback(new Error("手机号码为必填项"));
    } else if (!pattern.test(value)) {
      callback(new Error("请检查要输入的手机号码是否合法"));
    }
    callback();
  }

  checknickname(rule: any, value: any, callback: any) {
    const pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g;
    if (value === "") {
      callback(new Error("请输入昵称"));
    } else if (!pattern.test(value)) {
      callback(new Error("请输入3-10个字母/汉字/数字/下划线"));
    } else {
      callback();
    }
  }
  checkusername(rule: any, value: any, callback: any) {
    const pattern = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+){2,10}$/g;
    if (value === "") {
      callback(new Error("请输入真实姓名"));
    } else if (!pattern.test(value)) {
      callback(new Error("请输入2-10个汉字"));
    } else {
      callback();
    }
  }

  public async do_signup() {
    if (
      this.form.email === "" ||
      this.form.password === "" ||
      this.form.nickname === "" ||
      this.form.username === "" ||
      this.form.phone === "" ||
      this.form.stuid === "" ||
      this.form.idcard === ""
    ) {
      this.$message.warning("各项信息不能为空");
      return;
    }
    try {
      const { data } = await this.$axios.post("users/signup", this.form);
      if (data == "success") {
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
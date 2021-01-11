<template>
  <div class="register-container">
    <div id="register-components">
      <el-form ref="form" :rules="formRule" :model="form" label-position="left" label-width="auto">
        <el-form-item prop="nickname" label="昵称" required>
          <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" required>
          <el-input v-model="form.email" placeholder="请输入有效的邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" required>
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="再次输入密码" required>
          <el-input v-model="form.repassword" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名" required>
          <el-input v-model="form.username" placeholder="请输入用于登陆的用户名"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话" required>
          <el-input v-model="form.phone" placeholder="请输入您的11位电话号码"></el-input>
        </el-form-item>
        <el-form-item prop="idcard" label="身份证号码" required>
          <el-input v-model="form.idcard" placeholder="请输入您的身份证号码"></el-input>
        </el-form-item>
        <el-form-item prop="stuid" label="学生证号" required>
          <el-input v-model="form.stuid" placeholder="请输入您的学生证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="4">
              <el-button type="primary" @click="do_signup">注册</el-button>
            </el-col>
            <el-col :span="6">
              <router-link to="/login">已有账号？马上登录</router-link>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";

@Component({})
export default class SignupView extends Vue {
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
    email: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
          if (value === "") {
            callback(new Error("邮箱为必填项"));
          } else if (!pattern.test(value)) {
            callback(new Error("请检查要输入的邮箱是否合法"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    password: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^\S{6,20}$/g;
          if (value === "") {
            callback(new Error("请输入密码"));
          } else if (!pattern.test(value)) {
            callback(new Error("请输入6-20个非空白字符"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    repassword: [
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value === "") {
            callback(new Error("请再次输入密码"));
          } else if (value !== this.form.password) {
            callback(new Error("两次输入密码不一致!"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ],
    nickname: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g;
          if (value === "") {
            callback(new Error("请输入昵称"));
          } else if (!pattern.test(value)) {
            callback(new Error("请输入3-10个字母/汉字/数字/下划线"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ],
    username: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g;
          if (value === "") {
            callback(new Error("请输入用户名"));
          } else if (!pattern.test(value)) {
            callback(new Error("请输入3-10个字母/汉字/数字/下划线"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ],
    phone: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (value === "") {
            callback(new Error("手机号码为必填项"));
          } else if (!pattern.test(value)) {
            callback(new Error("请检查要输入的手机号码是否合法"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    stuid: [
      {
        required: true,
        message: "学生证件号码是必填项",
        trigger: "blur"
      }
    ],
    idcard: [
      {
        required: true,
        message: "身份证号码是必填项",
        trigger: "blur"
      }
    ]
  };

  public async do_signup() {
    if (await (this.$refs["form"] as Form).validate()) {
      try {
        console.log("123")
        const { data } = await this.$axios.post("users/signup", this.form);
        if (data == "success") {
          this.$message.success("注册成功，请登录！");
          this.$router.replace("/login");
        }
      } catch (e) {
        this.$message.error("注册失败，请检查用户名和密码后再试！");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #register-components {
    width: 60%;
    padding: 40px 20px;

    #buttons {
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
    }
  }
}
</style>
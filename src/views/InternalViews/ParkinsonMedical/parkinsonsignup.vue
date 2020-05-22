<template>
  <div class="register-container">
    <div id="register-components">
      <el-form ref="form" :rules="formRule" :model="form" label-position="left" label-width="auto">
        <el-form-item prop="name" label="姓名" required>
          <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄" required>
          <el-input v-model="form.age" placeholder="请输入您的年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别"  required>
        <el-select
          v-model="form.gender"
          placeholder="选择您的性别"
        >
          <el-option
            label="男性"
            value="男性"
          />
          <el-option
            label="女性"
            value="女性"
          />
        </el-select>
        </el-form-item>
        <el-form-item prop="address" label="地址" required>
          <el-input v-model="form.address" placeholder="请输您的地址" ></el-input>
        </el-form-item>
        <!-- <el-form-item prop="repassword" label="再次输入密码" required>
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
        </el-form-item> -->
        <el-form-item>
          <el-row>
            <el-col :span="4">
              <el-button type="primary" @click="medical_signup">注册</el-button>
            </el-col>
            <!-- <el-col :span="6">
              <router-link to="/login">已有账号？马上登录</router-link>
            </el-col> -->
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
export default class MedicalSignupView extends Vue {
  form = {
    name: '',
    age: '',
    gender: '男性',
    address: ''
  };
  formRule = {
    name: [
      {
        required: true,
        message: "请输入您的姓名",
        trigger: "blur"
      }
    ],
    age: [
      {
        required: true,
        message: "请输入您的年龄",
        trigger: "blur"
      }
    ],
    address: [
      {
        required: true,
        message: "请输入您的地址",
        trigger: "blur"
      }
    ],
  };

  public async medical_signup() {
    if (await (this.$refs["form"] as Form).validate()) {
      try {
        const { data } = await this.$axios.post("medical/medical_signup", this.form);
        if (data == "success") {
          this.$message.success("个人信息填写成功！");
          this.$store.state.user.medicalsignup="Y";
          this.$router.replace("/internal/parkinson/dashboard");
        }
      } catch (e) {
        this.$message.error("个人信息填写失败，请您稍后再试！");
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
<template>
  <div class="app-container">
    <el-form
      ref="form"
      :rules="formRule"
      :model="form"
      label-width="120px"
    >
      <el-form-item prop="name" label="姓名" required>
        <el-col :span="6">
          <el-input v-model="form.name"  />
        </el-col>
      </el-form-item>
      <el-form-item label="年龄">
        <el-col :span="6">
          <el-input v-model="form.age"  />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
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
      <el-form-item label="地址">
        <el-col :span="6">
          <el-input v-model="form.address" />
        </el-col>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" required>
        <el-col :span="6">
          <el-input v-model="form.email" />
        </el-col>
      </el-form-item>
      <el-form-item prop="phone" label="电话" required>
        <el-col :span="6">
          <el-input v-model="form.phone" />
        </el-col>
      </el-form-item>
      <el-form-item prop="idcard" label="身份证号" required>
        <el-col :span="6">
          <el-input v-model="form.idcard" />
        </el-col>
      </el-form-item>
      <el-form-item v-show=c1 label="所在单位">
        <el-col :span="6">
          <el-input v-model="form.company" />
        </el-col>
      </el-form-item>
        <el-form-item v-show=c1 label="职称">
        <el-col :span="6">
          <el-input v-model="form.professionalranks" />
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="测试组别">
        <el-radio-group v-model="form.group" :disabled="form.status">
          <el-radio label="帕金森患者" />
          <el-radio label="非帕金森患者" />
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button
          type="primary"
          @click="onChange"
        >
          修改
        </el-button> -->
        <el-button @click="onFinish">
          完成
        </el-button>
      </el-form-item>
      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col
          :span="2"
          class="line"
        >
          -
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox
            label="Online activities"
            name="type"
          />
          <el-checkbox
            label="Promotion activities"
            name="type"
          />
          <el-checkbox
            label="Offline activities"
            name="type"
          />
          <el-checkbox
            label="Simple brand exposure"
            name="type"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input
          v-model="form.desc"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Create
        </el-button>
        <el-button @click="onCancel">
          Cancel
        </el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from "element-ui";
@Component({
  name: 'Form'
})
export default class extends Vue {
  private form = {
    name: '',
    age: '',
    gender: '男性',
    address: '',
    email: '',
    phone: '',
    idcard: '',
    company:"",
    professionalranks:""
    // delivery: false,
    // type: [],
    // resource: '',
    // status: true
  };
  // roles="patience";
  c1=false;
  senddata={};
  created() {
    this.getData();
    if (this.$store.state.user.role=="user"){
      this.c1=false
    } else{this.c1=true}
  }
    //得到用户数据
  async getData() {
    try {
      if (this.$store.state.user.role=="user"){
      const { data } = await this.$axios.get("medical/finduserinformation/"+ "patience");
      this.form={
        name:data.name,
        age:data.age,
        gender:data.gender,
        address:data.address,
        email:data.email,
        phone:data.phone,
        idcard:data.idcard,
        company:"",
        professionalranks:""
      }
      }
      else if(this.$store.state.user.role=="admin"){
      const { data } = await this.$axios.get("medical/finduserinformation/"+ "doctor");
      this.form={
        name:data.name,
        age:data.age,
        gender:data.gender,
        address:data.address,
        email:data.email,
        phone:data.phone,
        idcard:data.idcard,
        company:data.company,
        professionalranks:data.professionalranks
      }
      }
      // username: this.$store.state.user.username
    } catch (e) {
      this.$message.error("请求用户数据失败，请稍后再试！");
    }
  }
  // private onChange() {
  //   this.form.status = false
  // }
 formRule = {
    email: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
          if (value === "") {
            callback(new Error("邮箱不能为空"));
          } else if (!pattern.test(value)) {
            callback(new Error("请检查要输入的邮箱是否合法"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],   
    phone: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (value === "") {
            callback(new Error("手机号码不能为空"));
          } else if (!pattern.test(value)) {
            callback(new Error("请检查要输入的手机号码是否合法"));
          }
          callback();
        },
        trigger: "blur"
      }
    ],
    idcard: [
      {
        required: true,
        message: "身份证号码不能为空",
        trigger: "blur"
      }
    ],
    name: [
      {
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
      }
    ],

    }

  async onFinish() { //测试推送
    if (await (this.$refs["form"] as Form).validate()) {
    try {
      if (this.$store.state.user.role=="user"){
        this.senddata={
        name:this.form.name,
        age:this.form.age,
        gender:this.form.gender,
        address:this.form.address,
        email:this.form.email,
        phone:this.form.phone,
        idcard:this.form.idcard,
        }
      } else {
        this.senddata={
        name:this.form.name,
        age:this.form.age,
        gender:this.form.gender,
        address:this.form.address,
        email:this.form.email,
        phone:this.form.phone,
        idcard:this.form.idcard,
        company:this.form.company,
        professionalranks:this.form.professionalranks
        }
      }
      const { data } = await this.$axios.post(
        "medical/change_userinfo",
        this.senddata
      );
      if (data == "success") {
        this.$message.success("更改成功");
      }
    } catch (e) {
      this.$message.error("更改失败，请稍后再试！");
    }
    }
  }


  // private onSubmit() {
  //   this.$message('submit!')
  // }

  // private onCancel() {
  //   this.$message({
  //     message: 'cancel!',
  //     type: 'warning'
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>

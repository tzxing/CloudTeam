<template>
  <div>
    <div style="display: flex;justify-content: center"> <!-- 放页面中间 -->
      <el-card shadow="hover" style="width: 800px">
        <div slot="header" class="clearfix">
          <span>个人信息补全</span>
        </div>
        
        <el-form ref="form" :model="form" label-width="120px">
            <el-divider>个人信息</el-divider>
            <!-- <el-form-item label="用户昵称">
                <el-col :span="8">
                <el-input v-model="form.user.nickname" :disabled="false" placeholder="请输入用户昵称" />
                </el-col>
            </el-form-item> -->
            <el-form-item label="身份">
              <el-radio-group v-model="form.identity" @change="change($event)">
                <el-radio :label="true" >测试人员</el-radio>
                <el-radio :label="false" >医疗人员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item  label="姓名" >
                <el-col :span="8">
                <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
                </el-col>
            </el-form-item>
            <!-- <el-form-item label="手机号">
                <el-col :span="8">
                <el-input v-model="form.user.phone" :disabled="false" placeholder="请输入手机号" />
                </el-col>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-col :span="8">
                <el-input v-model="form.user.idcard" :disabled="false" placeholder="请补全身份证信息" />
                </el-col>
            </el-form-item>
            <el-form-item label="省份">
                <el-col :span="8">
                <el-input v-model="form.user.province" :disabled="false" placeholder="请输入居住省份" />
                </el-col>
            </el-form-item>
            <el-form-item label="城市">
                <el-col :span="8">
                <el-input v-model="form.user.city" :disabled="false" placeholder="请输入居住城市" />
                </el-col>
            </el-form-item> -->
            <el-form-item label="性别" >
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
            <el-form-item  label="地址" >
                <el-col :span="12">
                <el-input v-model="form.address" :disabled="false" placeholder="请输入您的具体地址" />
                </el-col>
            </el-form-item>
             <el-form-item label="年龄">
                <el-col :span="12">
                <el-input v-model="form.age" :disabled="false" placeholder="请输入您的年龄" />
                </el-col>
            </el-form-item>
            <!-- <el-divider>身份信息</el-divider> -->
            <el-form-item label="验证码">
                <el-col :span="8">
                <el-input v-model="form.vericode" :disabled="form.identity" :placeholder="messages.vericode" />
                </el-col>
            </el-form-item>
            <el-form-item label="单位">
                <el-col :span="8">
                <el-input v-model="form.company" :disabled="form.identity" :placeholder="messages.company" />
                </el-col>
            </el-form-item>
            <el-form-item  label="职务" >
                <el-col :span="8">
                <el-input v-model="form.professionalranks" :disabled="form.identity" :placeholder="messages.professionalranks" />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doLogin">
                完成
                </el-button>
            </el-form-item>
            </el-form >
              <!-- <el-button type="primary" @click="doLogin" style="float:right; margin-right:350px" >
                  完成
              </el-button> -->
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Form } from "element-ui";
@Component({})

export default class datainput extends Vue {
  form= {
        name:'',
        address:'',
        identity: true,
        vericode:'',
        gender: '男性',
        company:'',
        professionalranks:'',
        age:''
  };
  messages={
      vericode:"无需输入验证码",
      company:'无需输入单位',
      professionalranks:'无需输入职务'
    };
  postdata={};
  webofsignup='';
  role="";
  // formRule = {
  //   name: [
  //     {
  //       required: true,
  //       message: "请输入您的姓名",
  //       trigger: "blur"
  //     }
  //   ],
  //   age: [
  //     {
  //       required: true,
  //       message: "请输入您的年龄",
  //       trigger: "blur"
  //     }
  //   ],
  //   address: [
  //     {
  //       required: true,
  //       message: "请输入您的地址",
  //       trigger: "blur"
  //     }
  //   ],
  //   ranks:[
  //     {
  //       required:true,
  //       message:'请输入您的职称',
  //       trigger:"blur"
  //     }
  //   ]
  // };

  public change(e:any) {
    if (this.form.identity == true){
      this.messages.vericode = '无需输入验证码';
      this.messages.company='无需输入单位';
      this.messages.professionalranks='无需输入职务';
    }
    else {
      this.messages.vericode = '请输入验证码';
      this.messages.company='请输入您的单位';
      this.messages.professionalranks='请输入您的职务';
    }
    
  }
  async doLogin() {
    if(this.form.identity == true){
      this.postdata={
        name:this.form.name,
        age:this.form.age,
        gender: this.form.gender,
        address:this.form.address
      }        
      this.webofsignup='medical/medical_patiencesignup'
      this.role="user"
      }
    else {
      this.postdata={
        name:this.form.name,
        age:this.form.age,
        gender: this.form.gender,
        address:this.form.address,
        company:this.form.company,
        professionalranks:this.form.professionalranks,
        vericode:this.form.vericode,
      }
      this.webofsignup='medical/medical_doctorsignup'
      this.role="admin"
    }
    try {
      const { data } = await this.$axios.post(
        this.webofsignup,
        this.postdata
      );
      if (data == "success") {
          this.$message.success("个人信息填写成功！");
          this.$store.commit("medicalsignup",this.role);
          this.$router.replace("/internal/parkinson/dashboard");
      }
    } catch (e) {
      this.$message.error("个人信息填写失败，请您稍后再试！");
    }
  }

}
</script>
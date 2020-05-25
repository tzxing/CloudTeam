<template>
  <div>
    <div style="display: flex;justify-content: center"> <!-- 放页面中间 -->
      <el-card shadow="hover" style="width: 800px">
        <div slot="header" class="clearfix">
          <span>个人信息补全</span>
        </div>
        
        <el-form
            ref="form"
            :model="form.user"
            label-width="120px"
            >
            <el-divider>个人信息</el-divider>
            <el-form-item label="用户昵称">
                <el-col :span="8">
                <el-input v-model="form.user.nickname" :disabled="false" placeholder="请输入用户昵称" />
                </el-col>
            </el-form-item>
            <el-form-item label="姓名">
                <el-col :span="8">
                <el-input v-model="form.user.name" :disabled="false" placeholder="请输入姓名" />
                </el-col>
            </el-form-item>
            <el-form-item label="手机号">
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
            </el-form-item>
            <el-form-item label="地址">
                <el-col :span="12">
                <el-input v-model="form.user.address" :disabled="false" placeholder="请输入居住的具体地址" />
                </el-col>
            </el-form-item>
            <el-divider>身份信息</el-divider>
            <el-form-item label="身份">
              <el-radio-group v-model="form.user.identity" @change="change($event)">
                <el-radio :label="true" >测试人员</el-radio>
                <el-radio :label="false" >医疗人员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="验证码">
                <el-col :span="8">
                <el-input v-model="form.user.vericode" :disabled="form.user.identity" :placeholder="form.message" />
                </el-col>
            </el-form-item>
            

            <el-form-item>
                <el-button type="primary" @click="doLogin">
                完成
                </el-button>
            </el-form-item>
            </el-form >
              <el-button type="primary" @click="doLogin" style="float:right; margin-right:350px" >
                  完成
              </el-button>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class datainput extends Vue {
  private form= {
    user:{
        nickname:'aaaayyyy',
        phone:'',
        idcard:'',
        date:'',
        name:'',
        province:'',
        city:'',
        address:'',
        identity:true,
        vericode:'',
    },
    message:'无需输入验证码'
  };

  public change(e:any) {
    if (this.form.user.identity == true){
      this.form.user.vericode = '';
      this.form.message = '无需输入验证码';
    }
    else this.form.message = '请输入验证码';
  }
  public doLogin() {
    //需要与后端交互
  }
}
</script>
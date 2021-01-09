<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="工作流名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="选择" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item label="上传文件">
        <el-upload
          ref="uploadExcel"
          :limit="limitNum"
          :auto-upload="false"
          accept=".xlsx"
          :before-upload="beforeUploadFile"
          :on-exceed="exceedFile"
        >
          <el-button size="small" plain>选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xlsx(Excel2007)文件，且不超过10M</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// import axios from "axios";
// import * as Api from "@/api/api";

import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class BaseFormView extends Vue {
  limitNum = 1;
  //  formLabelWidth: '80px',
  ruleForm = {
    name: "",
    file: "",
    // fileName: '',
    delivery: false,
    //fileType: '',
    desc: ""
  };
  rules = {
    name: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
    ],
    desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
  };

  // 文件超出个数限制时的钩子
  exceedFile() {
    this.$notify.warning({
      title: "警告",
      message: `只能选择 ${this.limitNum} 个文件`
    });
  }
  // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
  beforeUploadFile(file: any) {
    //console.log('before upload')
    //console.log(file)
    let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
    let size = file.size / 1024 / 1024;
    if (extension !== "xlsx") {
      this.$notify.warning({
        title: "警告",
        message: `只能上传Excel2017（即后缀是.xlsx）的文件`
      });
    }
    if (size > 10) {
      this.$notify.warning({
        title: "警告",
        message: `文件大小不得超过10M`
      });
    }
  }

  uploadFile() {
    // console.log(this.ruleForm.file);
    //这里是重点，将文件转化为formdata数据上传
    // Api.Upload(this.ruleForm).then(res => {
    //   if (res == "success") {
    //     this.$message.success("注册成功");
    //   } else {
    //     this.$message.error("注册失败");
    //   }
    // });
    // this.$refs.uploadExcel.submit()
    /*
      let formData = new FormData()
      formData.append('file', this.form.file)
      axios.post('https://jsonplaceholder.typicode.com/posts/', 
        formData,
        { "Content-Type": "multipart/form-data" }
      )
      .then(res => {
        console.log('res')
        console.log(res)
      })
      .catch(err => {

      })
      */
  }
}
</script>

<style lang="scss" scoped>
</style>
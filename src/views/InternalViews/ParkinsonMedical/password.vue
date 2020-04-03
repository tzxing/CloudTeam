<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="原密码：">
        <el-col :span="3">
          <el-input v-model="form.pwdInput" show-password />
        </el-col>
      </el-form-item>
      <el-form-item label="新密码：">
        <el-col :span="3">
          <el-input v-model="form.pwdNew" show-password />
        </el-col>
      </el-form-item>
      <el-form-item label="重复新密码：">
        <el-col :span="3">
          <el-input v-model="form.pwdNew2" show-password />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onChange"
        >
          修改
        </el-button>
      </el-form-item>
      <!-- <el-form-item>
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

@Component({
  name: 'Form'
})
export default class extends Vue {
  private form = {
    password: '123456',
    pwdInput: '',
    pwdNew: '',
    pwdNew2: ''
  };

  private onChange() {
    if (this.form.password !== this.form.pwdInput) {
      this.$message({
        message: '原密码输入有误',
        type: 'warning'
      })
      return
    }
    if (this.form.pwdNew !== this.form.pwdNew2) {
      this.$message({
        message: '两次新密码输入不正确',
        type: 'warning'
      })
      return
    }
    this.form.password = this.form.pwdNew
    this.$message('修改密码成功')
  }

  private onSubmit() {
    this.$message('submit!')
  }

  private onCancel() {
    this.$message({
      message: 'cancel!',
      type: 'warning'
    })
  }
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>

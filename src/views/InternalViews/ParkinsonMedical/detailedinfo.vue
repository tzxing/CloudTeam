<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="姓名">
        <el-col :span="3">
          <el-input v-model="form.name" :disabled="form.status" />
        </el-col>
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          @click="onChange"
        >
          修改
        </el-button>
        <el-button @click="onFinish">
          完成
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'detailedinfo'
})
export default class extends Vue {
  private form = {
    name: '张大壮',
    age: '21',
    gender: '1',
    group: '帕金森患者',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    status: true
  };

  private onChange() {
    this.form.status = false
  }

  private onFinish() {
    this.form.status = true
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

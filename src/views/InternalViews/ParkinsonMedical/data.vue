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
      <el-form-item label="年龄">
        <el-col :span="3">
          <el-input v-model="form.age" :disabled="form.status" />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="form.gender"
          placeholder="选择您的性别"
          :disabled="form.status"
        >
          <el-option
            label="男性"
            value="1"
          />
          <el-option
            label="女性"
            value="2"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="测试组别">
        <el-radio-group v-model="form.group" :disabled="form.status">
          <el-radio label="帕金森患者" />
          <el-radio label="非帕金森患者" />
        </el-radio-group>
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

@Component({
  name: 'Form'
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

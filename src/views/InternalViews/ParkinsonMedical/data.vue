<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="姓名">
        <el-col :span="3">
          <el-input v-model="form.name"  />
        </el-col>
      </el-form-item>
      <el-form-item label="年龄">
        <el-col :span="3">
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
        <el-col :span="3">
          <el-input v-model="form.address" />
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

@Component({
  name: 'Form'
})
export default class extends Vue {
  private form = {
    name: '',
    age: '',
    gender: '男性',
    address: ''
    // group: '帕金森患者',
    // date1: '',
    // date2: '',
    // delivery: false,
    // type: [],
    // resource: '',
    // status: true
  };
  created() {
    this.getData();
  }
    //得到用户数据
  async getData() {
    try {
      const { data } = await this.$axios.get("medical/finduserinformation/");
      this.form = {
      name:data.name,
      age: data.age,
      gender: data.gender,
      address: data.address
      // username: this.$store.state.user.username
      };
    } catch (e) {
      this.$message.error("请求用户数据失败，请稍后再试！");
    }
  }
  // private onChange() {
  //   this.form.status = false
  // }


  async onFinish() {
    try {
      const { data } = await this.$axios.post(
        "medical/change_userinfo",
        this.form
      );
      if (data == "success") {
        this.$message.success("更改成功");
      }
    } catch (e) {
      this.$message.error("更改失败，请稍后再试！");
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

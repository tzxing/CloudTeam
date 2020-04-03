<template>
  <div class="dashboard-container">
    <p style="font-size:35px;">欢迎使用帕金森慢病数字化管理平台！</p>
    <p style="font-size:30px;">帕金森病是一种常见的神经系统变性疾病。本系统旨在为医生和测试人
      <br />
      员提供病情数据的记录、查看与管理的平台，并为帕金森疾病的研究提
      <br />
      供支持。</p>
    <!-- <el-button type="primary" @click="getString">测试</el-button>
    <p>{{datarev}}</p>
    <el-input v-model="id" placeholder="请输入内容"></el-input> <el-button type="primary" @click="getid">测试2</el-button>
    <p>{{datarev2}}</p>
    <el-button type="primary" @click="posttest">测试3</el-button>
    <p>{{datarev3}}</p> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Dashboard'
})
export default class extends Vue {
  datarev = 'a';
  datarev2 = 'b';
  datarev3:any = 'c';
  id = 'p1';
  
  private mounted() {
    // this.getString();
  }
  public async getString() {
    let test = await this.$axios.get("/medical/ceshi");
    // console.log(typeof test)
    this.datarev = test.data[0];
    // this.datarev = await this.$axios.get("/medical/ceshi");
  }
  public async getid() {
    let root = '/medical/find_data/?user_id=';
    let test = await this.$axios.get(root + this.id);
    // console.log(typeof test)
    this.datarev2 = test.data.name;
    // this.datarev = await this.$axios.get("/medical/ceshi");
  }
  public async posttest() {
    const user = new FormData();
    // let data = 
    let test = await this.$axios.post("/medical/test1shouhuan_insertdata", {
  "name": "string",
  "price": 0,
  "description": "string",
  "tax": 0
});
    this.datarev3 = test;
    // console.log(typeof test)
    // this.datarev2 = test.data.name;
    // this.datarev = await this.$axios.get("/medical/ceshi");
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

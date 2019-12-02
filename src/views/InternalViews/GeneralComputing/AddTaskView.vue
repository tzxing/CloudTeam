<template>
  <div>
    <el-page-header @back="goback" content="新增任务"></el-page-header>
    <el-form>
      <el-form-item :model="add_task_info" label="任务名称">
        <el-input v-model="add_task_info.name" placeholder="请输入自定义的任务名称"></el-input>
      </el-form-item>
      <el-form-item :model="add_task_info" label="镜像名称">
        <el-input v-model="add_task_info.image" placeholder="请输入完整的镜像名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add_task">创建新任务</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface AddTaskInfo {
  image: string;
  name: string;
}

@Component({})
export default class AddTaskView extends Vue {
  private add_task_info: AddTaskInfo = {
    image: "",
    name: ""
  };

  public async add_task() {
    await this.$axios.post("gp/add", this.add_task_info);

    this.$message.info("成功新增一项计算任务！");

    this.$router.push("/internal/general_computing/tasklist");
  }

  public async goback() {
    if (this.add_task_info.image !== "" || this.add_task_info.name !== "") {
      await this.$confirm(
        "你已填入部分信息，是否放弃新增任务？",
        "放弃新增任务",
        {
          confirmButtonText: "放弃",
          cancelButtonText: "不放弃",
          type: "info"
        }
      );
    }

    this.$router.push("/internal/general_computing/tasklist");
  }
}
</script>
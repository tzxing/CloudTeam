<template>
  <div>
    <el-button type="primary" @click="$router.push('/internal/general_computing/addtask')">新增任务</el-button>
    <el-button @click="fetch_list()">刷新任务列表</el-button>
    <el-table :data="task_list_data" style="width: 100%">
      <el-table-column label="ID" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.id.substring(0, 6)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="任务名称"></el-table-column>
      <el-table-column prop="state" label="状态" width="180"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="show_output(scope.row)"
            type="text"
            size="small"
            disabled="scope.row.state==='正在排队'"
          >显示输出</el-button>
          <el-button
            @click="stop_task(scope.row)"
            type="text"
            size="small"
            disabled="scope.row.state!=='正在执行'"
          >停止</el-button>
          <el-button
            @click="del_task(scope.row)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Task {
  id: string;
  name: string;
  state: string;
}

@Component({})
export default class TaskListView extends Vue {
  private task_list_data: Task[] = [];
  private websock?: WebSocket;

  public async fetch_list() {
    const { data } = await this.$axios.get("gp/tasks");
    this.task_list_data = data;
  }

  public async stop_task(task: Task) {
    await this.$confirm("此任务停止后将不能再次启动，是否停止？", "警告", {
      confirmButtonText: "停止",
      cancelButtonText: "取消操作",
      type: "warning"
    });

    await this.$axios.post("gp/do", { action: "stop", taskid: task.id });

    this.$message({ type: "success", message: "任务已停止!" });

    this.fetch_list();
  }

  public async del_task(task: Task) {
    await this.$confirm("删除操作不可撤销，是否删除？", "警告", {
      confirmButtonText: "删除",
      cancelButtonText: "取消操作",
      type: "warning"
    });

    await this.$axios.post("gp/do", { action: "delete", taskid: task.id });

    this.$message({ type: "success", message: "任务已删除!" });

    this.fetch_list();
  }

  public mounted() {
    this.fetch_list();
  }

  public show_output(task: Task) {
    const wsuri = `api/gp/${task.id}/log?access_token=${this.$store.state.user.access_token}`; //ws地址
    this.websock = new WebSocket(wsuri);
    this.websock.onmessage = e => {
      // console.log(e.data);
    };

    this.websock.onclose = e => {
      // console.log("connection closed (" + e.code + ")");
    };
  }
}
</script>
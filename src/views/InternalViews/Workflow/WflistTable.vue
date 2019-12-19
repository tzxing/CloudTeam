<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>自创工作流列表</span>
      </div>
      <div>
        <el-table :data="tableUserWFData" height="250">
          <el-table-column property="date" label="创建日期" sortable width="200"></el-table-column>
          <el-table-column property="name" label="工作流名称" width="400"></el-table-column>
          <el-table-column label="操作" width="500" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="Execute(scope.row)">运行</el-button>
              <el-button type="text">修改</el-button>
              <el-button type="text" @click="Copy(scope.row)">复制</el-button>
              <el-button type="text" @click="to_wfsdetails(scope.row.name)">详细信息</el-button>
              <el-button type="text" @click="Delete_wf(scope.row)">删除</el-button>
              <el-button type="text" @click="ShareDialog(scope.row)">共享</el-button>

              <!-- 分享弹框 -->
              <el-dialog title="分享给其他用户" :visible.sync="dialogTableVisible" width="40%">
                <el-form :model="form">
                  <div class="filter-box">
                    <el-input
                      v-model="shareadd.name"
                      placeholder="查找用户"
                      autocomplete="off"
                      class="mr10"
                    ></el-input>
                    <el-button size="small" type="primary" @click="add">添加分享</el-button>
                  </div>
                </el-form>
                <span>已分享过的用户:{{wf_id}}</span>
                <el-table :data="share" height="250">
                  <el-table-column property="name" label="分享过的用户" width="300"></el-table-column>
                  <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogTableVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        style="display:table-cell;height:50px;font-size:15px;font-height:14px;vertical-align:middle;text-align:center"
      >
        <span>分享工作流列表</span>
      </div>
      <div>
        <el-table :data="tableToWFData" height="250">
          <el-table-column prop="date" label="创建日期" sortable width="200"></el-table-column>
          <el-table-column prop="name" label="工作流名称" width="400"></el-table-column>
          <el-table-column label="操作" width="500" align="center">
            <template slot-scope="scope">
              <el-button type="text">运行</el-button>
              <el-button type="text" @click="Copy(scope.row)">复制</el-button>
              <el-button type="text" @click="to_wfsdetails(scope.row.name)">详细信息</el-button>
              <el-button type="text" @click="Delete(scope.$index,scope.row)">取消分享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template> 

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class WflistTableView extends Vue {
  // share = {
  //   to_user_id: "",
  //   name: ""
  // };
  private wf_id: any = "";
  private to_user_name: any = "";
  share = [];
  shareadd = {
    selectclass: "",
    name: ""
  };
  // tableUserWFData = {
  //   wf_id:"",
  //   date:"",
  //   name:"",
  //   current_user:""
  // }
  tableUserWFData = [];
  tableToWFData = [];

  created() {
    // alert("test");
    this.userWF();
    this.toWF();
  }

  //获取用户工作流列表
  async userWF() {
    try {
      const { data } = await this.$axios.get("wfs/SearchWFFInfo");
      if (data) {
        this.tableUserWFData = data;
      }
    } catch (e) {
      this.$message.error("失败，请稍后再试！");
    }
  }
  //获取被分享的工作流列表
  async toWF() {
    try {
      const { data } = await this.$axios.get("wfs/SearchWFTInfo");
      if (data) {
        this.tableToWFData = data;
      }
    } catch (e) {
      this.$message.error("失败，请稍后再试！");
    }
  }

  dialogTableVisible = false;
  dialogFormVisible = false;
  form = {
    name: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: ""
  };
  formLabelWidth = "120px";

  //启动工作流---创建一个实例
  async Execute(row: any) {
    try {
      const { data } = await this.$axios.post(
        "wfs/workflow" + row.name + "/execute"
      );
      if (data) {
        //后端返回后再跳转
        this.to_wfexec();
      }
    } catch (e) {
      this.$message.error("连接服务器失败");
    }
  }
  to_wfexec() {
    this.$router.push({
      //跳转到实例页面
      name: "wflistable/wfsdetails"
    });
  }

  //跳转工作流详情页面
  to_wfsdetails(row: string) {
    this.$router.push({
      name: "wflistable/wfsdetails",
      query: { name: row }
    });
  }

  //取消分享
  async Delete(index: any, row: any) {
    // console.log(index, row);
    try {
      this.wf_id = row.wf_id;
      alert(this.wf_id);
      const { data } = await this.$axios.post("wfs/cancel_share", {
        wf_id: this.wf_id
      });
      if (data == true) {
        //成功则更新被分享的工作流列表
        try {
          const { data } = await this.$axios.get("wfs/SearchWFTInfo");
          if (data) {
            this.tableToWFData = data;
            this.$message.success("取消分享成功，更新成功");
          }
        } catch (e) {
          this.$message.error("连接服务器失败");
        }
      }
    } catch (e) {
      this.$message.error("取消分享失败");
    }
  }
  //复制工作流
  async Copy(row: any) {
    try {
      this.wf_id = row.wf_id;
      const { data } = await this.$axios.post("wfs/copy_workflow", {
        wf_id: this.wf_id
      });
      if (data == true) {
        //成功则更新工作流列表
        try {
          const { data } = await this.$axios.get("wfs/SearchWFFInfo");
          if (data) {
            this.tableUserWFData = data;
            this.$message.success("复制工作流成功，更新成功");
          }
        } catch (e) {
          this.$message.error("连接服务器失败，复制失败");
        }
      }
    } catch (e) {
      this.$message.error("复制失败");
    }
  }
  //删除自己创建的工作流
  async Delete_wf(row: any) {
    try {
      this.wf_id = row.wf_id;
      const { data } = await this.$axios.post("wfs/delete_workflow", {
        wf_id: this.wf_id
      });
      if (data == true) {
        //删除成功则更新自创工作流列表
        try {
          const { data } = await this.$axios.get("wfs/SearchWFFInfo");
          if (data) {
            this.tableUserWFData = data;
            this.$message.success("删除工作流成功，更新成功");
          }
        } catch (e) {
          this.$message.error("连接服务器失败，删除失败");
        }
      }
    } catch (e) {
      this.$message.error("失败");
    }
  }

  //分享弹框的操作
  //分享工作流弹框-分享过的用户列表
  async ShareDialog(row: any) {
    this.dialogTableVisible = true;
    try {
      this.wf_id = row.wf_id;
      const { data } = await this.$axios.post("wfs/SearchShareInfo", {
        wf_id: this.wf_id
      });

      if (data) {
        this.share = data;
        // this.$message.success("检索成功");
      }
    } catch (e) {
      this.$message.error("检索失败，请稍后再试！");
    }
  }
  //添加分享
  async add() {
    try {
      // alert(this.shareadd.name)
      const { data } = await this.$axios.post("wfs/add_share", {
        to_user_name: this.shareadd.name,
        wf_id: this.wf_id
      });
      if (data == "success") {
        //成功更新用户列表
        try {
          const { data } = await this.$axios.post("wfs/SearchShareInfo", {
            wf_id: this.wf_id
          });
          if (data) {
            this.share = data;
            this.$message.success("添加成功，更新成功");
          }
        } catch (e) {
          this.$message.error("更新失败，请稍后再试！");
        }
        this.$message.success("添加成功");
      }
    } catch (e) {
      this.$message.error("添加失败，重复");
    }
  }
  //删除曾经的分享
  async handleDelete(index: any, row: any) {
    // console.log(index, row);
    try {
      this.to_user_name = row.name;
      const { data } = await this.$axios.post("wfs/share_delete", {
        to_user_name: this.to_user_name,
        wf_id: this.wf_id
      });
      if (data == "success") {
        //成功更新用户列表
        try {
          const { data } = await this.$axios.post("wfs/SearchShareInfo", {
            wf_id: this.wf_id
          });
          if (data) {
            this.share = data;
            this.$message.success("删除成功，更新成功");
          }
        } catch (e) {
          this.$message.error("更新失败，请稍后再试！");
        }
      }
    } catch (e) {
      this.$message.error("删除失败");
    }
  }
}
</script>

<style scoped>
.filter-box {
  display: flex;
}
.mr10 {
  margin-right: 10px;
  width: 300px;
}
.ml10 {
  margin-left: 10px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>

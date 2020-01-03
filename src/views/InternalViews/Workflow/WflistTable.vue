<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="自创工作流列表" name="first" class="tabs1">
      
      <el-table :data="tableUserWFData" style="width: 100%" :height="tableHeight">
        <el-table-column property="date" label="创建日期" sortable :width="uniformwidth"></el-table-column>
        <el-table-column property="name" label="工作流名称" :width="uniformwidth"></el-table-column>
        <el-table-column label="操作" :width="uniformwidth">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-video-play"
              circle
              @click="Execute(scope.row)"
              title="启动工作流"
            >运行</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              circle
              @click="to_wfsedit(scope.row)"
              title="修改工作流"
            >修改</el-button>
            <el-button
              type="text"
              icon="el-icon-document-copy"
              circle
              @click="Copy(scope.row)"
              title="复制工作流"
            >复制</el-button>
            <el-button
              type="text"
              icon="el-icon-document"
              circle
              @click="to_wfsdetails(scope.row)"
              title="查看详细信息"
            >详细信息</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              circle
              @click="Confirm_Delete_wf(scope.$index,scope.row)"
              title="删除工作流"
            >删除</el-button>
            <el-button
              type="text"
              icon="el-icon-share"
              circle
              @click="ShareDialog(scope.row)"
              title="分享工作流"
            >分享</el-button>

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
              <!-- <span>已分享过的用户:{{wf_id}}</span> -->
              <el-table :data="share" height="250">
                <el-table-column property="name" label="分享过的用户" width="300"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      circle
                      @click="Confirm_Delete_share(scope.$index,scope.row)"
                      title="删除分享"
                    >删除</el-button>
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
      <div style="height:  20px">
        <el-button
          style="float: right; margin-top: 3px; position: sticky"
          size="medium"
          icon="el-icon-plus"
          circle
          type="primary"
          @click="add_wf"
        ></el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="分享工作流列表" name="second">
      <div>
        <el-table :data="tableToWFData" :height="tableHeight" style="width: 100%">
          <el-table-column prop="date" label="创建日期" sortable :width="uniformwidth"></el-table-column>
          <el-table-column prop="name" label="工作流名称" :width="uniformwidth"></el-table-column>
          <el-table-column label="操作" :width="uniformwidth">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-video-play" circle @click="Execute(scope.row)">运行</el-button>
              <el-button
                type="text"
                icon="el-icon-document-copy"
                circle
                @click="Copy(scope.row)"
                title="复制工作流"
              >复制</el-button>
              <el-button
                type="text"
                icon="el-icon-document"
                circle
                @click="to_wfsdetails(scope.row)"
                title="查看详细信息"
              >详细信息</el-button>
              <el-button
                type="text"
                icon="el-icon-circle-close"
                circle
                @click="Confirm_Console_wf(scope.$index,scope.row)"
                title="取消分享工作流"
              >取消分享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <!-- 删除工作流提示框 -->
    <el-dialog title="删除提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="Delete_wf">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除分享提示框 -->
    <el-dialog title="删除提示" :visible.sync="delshareVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button @click="delshareVisible = false">取 消</el-button>
        <el-button type="primary" @click="Delete_share">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 取消分享提示框 -->
    <el-dialog title="取消分享提示" :visible.sync="cansoshareVisible" width="300px" center>
      <div class="del-dialog-cnt">取消分享关系不可恢复，是否确定取消？</div>
      <span slot="footer">
        <el-button @click="cansoshareVisible = false">取 消</el-button>
        <el-button type="primary" @click="Delete">确 定</el-button>
      </span>
    </el-dialog>
  </el-tabs>
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
  delVisible = false;
  delshareVisible = false;
  cansoshareVisible = false;
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
    this.uniformwidth = (window.innerWidth - 280) / 3;
    this.tableHeight = window.innerHeight - 180;
  }
  data() {
    return {
      activeName: "first"
    };
  }

  //获取用户工作流列表
  async userWF() {
    try {
      const { data } = await this.$axios.get("wfs/workflow_list/WFFInfo");
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
      const { data } = await this.$axios.get("wfs/workflow_list/WFTInfo");
      if (data) {
        this.tableToWFData = data;
      }
    } catch (e) {
      this.$message.error("失败，请稍后再试！");
    }
  }
  uniformwidth = 0;
  tableHeight = 0;
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
        "wfs/workflows/" + row.wf_id + "/execute"
      );
      if (data) {
        //后端返回后再跳转
        this.to_wfexec(data);
      }
    } catch (e) {
      this.$message.error("连接服务器失败");
    }
  }
  to_wfexec(wf_name: any) {
    this.$router.push({
      //跳转到实例页面
      name: "workflowjob",
      query: { data: wf_name }
    });
  }
  //新增工作流
  add_wf() {
    this.$router.push({
      //跳转到实例页面
      name: "wflistable/wfsedit",
      query: { flag: "0" }
    });
  }
  //删除工作流弹框
  Confirm_Delete_wf(index: any, row: any) {
    this.wf_id = row.wf_id;
    this.delVisible = true;
  }
  //删除工作流弹框
  Confirm_Delete_share(index: any, row: any) {
    this.to_user_name = row.name;
    this.delshareVisible = true;
  }
  //删除工作流弹框
  Confirm_Console_wf(index: any, row: any) {
    this.wf_id = row.wf_id;
    this.cansoshareVisible = true;
  }

  //跳转工作流详情页面
  to_wfsdetails(row: any) {
    this.$router.push({
      name: "wflistable/wfsdetails",
      query: { name: row.name, wf_id: row.wf_id }
    });
  }
  to_wfsedit(row: any) {
    this.$router.push({
      name: "wflistable/wfsedit",
      query: { name: row.name, wf_id: row.wf_id, flag: "1" }
    });
  }

  //取消分享
  async Delete() {
    // console.log(index, row);
    try {
      // this.wf_id = row.wf_id;
      // alert(this.wf_id)
      const { data } = await this.$axios.delete(
        "wfs/workflow_list/WFTInfo/" + this.wf_id
      );
      if (data == "success") {
        //成功则更新被分享的工作流列表
        try {
          const { data } = await this.$axios.get("wfs/workflow_list/WFTInfo");
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
    this.cansoshareVisible = false;
  }
  //复制工作流
  async Copy(row: any) {
    try {
      this.wf_id = row.wf_id;
      const { data } = await this.$axios.post(
        "wfs/workflow_list/" + this.wf_id
      );
      if (data == "success") {
        //成功则更新工作流列表
        try {
          const { data } = await this.$axios.get("wfs/workflow_list/WFFInfo");
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
  async Delete_wf() {
    try {
      // this.wf_id = row.wf_id;
      const { data } = await this.$axios.delete(
        "wfs/workflow_list/WFFInfo/" + this.wf_id
      );
      if (data == "success") {
        //删除成功则更新自创工作流列表
        try {
          const { data } = await this.$axios.get("wfs/workflow_list/WFFInfo");
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
    this.delVisible = false;
  }

  //分享弹框的操作
  //分享工作流弹框-分享过的用户列表
  async ShareDialog(row: any) {
    this.dialogTableVisible = true;
    try {
      this.wf_id = row.wf_id;
      const { data } = await this.$axios.get(
        "wfs/workflow_list/" + this.wf_id + "/share"
      );

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
      const { data } = await this.$axios.post(
        "wfs/workflow_list/" + this.wf_id + "/share/" + this.shareadd.name
      );
      if (data == "success") {
        //成功更新用户列表
        try {
          const { data } = await this.$axios.get(
            "wfs/workflow_list/" + this.wf_id + "/share"
          );
          if (data) {
            this.share = data;
            this.$message.success("添加、更新成功");
          }
        } catch (e) {
          this.$message.error("更新失败，请稍后再试！");
        }
        // this.$message.success("添加成功");
      } else {
        this.$message.error("添加失败，请确认输入的用户邮箱是否正确!");
      }
    } catch (e) {
      this.$message.error("添加失败，请稍后再试！");
    }
  }
  //删除曾经的分享
  async Delete_share() {
    // console.log(index, row);
    try {
      // this.to_user_name = row.name;
      const { data } = await this.$axios.delete(
        "wfs/workflow_list/" + this.wf_id + "/share/" + this.to_user_name
      );
      if (data == "success") {
        //成功更新用户列表
        try {
          const { data } = await this.$axios.get(
            "wfs/workflow_list/" + this.wf_id + "/share"
          );
          if (data) {
            this.share = data;
            this.$message.success("删除成功，更新成功");
          }
        } catch (e) {
          this.$message.error("更新失败，请稍后再试！");
        }
      } else {
        this.$message.error("删除失败，请稍后再试！");
      }
    } catch (e) {
      this.$message.error("删除失败");
    }
    this.delshareVisible = false;
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
.selfwflist::before,
.selfwflist ::after {
  display: table;
  content: "";
}
.selfwflist ::after {
  clear: both;
}
.addwf {
  float: right;
  padding: 0px 3px;
}
.primary {
  font-size: 16px;
}
.dis {
  padding: 10px, 0px;
}
.table1 {
  width: 100%;
  height: 100%;
}
.tabs1 {
  height: 100%;
}
</style>

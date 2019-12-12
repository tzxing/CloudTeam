<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header">
        <span>自创工作流列表</span>
      </div>
      <div>
        <el-table :data="tableUserWFData" height="250">
          <el-table-column property="date" label="创建日期" sortable width="150"></el-table-column>
          <el-table-column property="name" label="工作流名称" width="120"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text">运行</el-button>
              <el-button type="text">修改</el-button>
              <el-button type="text">复制</el-button>
              <el-button type="text" @click="to_wfsdetails(scope.row.name)">详细信息</el-button>
              <el-button type="text">删除</el-button>
              <el-button type="text" @click="ShareDialog(scope.row)">共享</el-button>

              <!-- 分享弹框 -->
              <el-dialog title="分享给其他用户" :visible.sync="dialogTableVisible">
                <el-form :model="form">
                  <el-form-item label="查找用户" :label-width="formLabelWidth">
                    <el-input v-model="shareadd.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small" type="primary" @click="add">添加分享</el-button>
                  </el-form-item>
                </el-form>
                <span>已分享过的用户:{{wf_id}}</span>
                <el-table :data="share" height="250">
                  <el-table-column property="name" label="姓名" width="200"></el-table-column>
                  <el-table-column label="操作" width="180" align="center">
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
      <div>
        <span>分享工作流列表</span>
      </div>
      <div>
        <el-table :data="tableToWFData" height="250">
          <el-table-column prop="date" label="创建日期" sortable width="150"></el-table-column>
          <el-table-column prop="name" label="工作流名称" width="120"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text">运行</el-button>
              <el-button type="text">复制</el-button>
              <el-button type="text" @click="to_wfsdetails(scope.row.name)">详细信息</el-button>
              <el-button type="text" @click="handleDelete(scope.$index,scope.row)">取消共享</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination mt20">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
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
      const { data } = await this.$axios.get("wfs/UserWFInfo");
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
      const { data } = await this.$axios.get("wfs/getOterWFInfo");
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

  //跳转工作流详情页面
  to_wfsdetails(row: string) {
    this.$router.push({
      name: "wfsdetails",
      query: { name: row }
    });
  }
  private wf_id: any = "";
  private to_user_name: any = "";
  //分享工作流弹框-分享过的用户列表
  async ShareDialog(row: any) {
    this.dialogTableVisible = true;
    try {
      this.wf_id = row.wf_id;
      const { data } = await this.$axios.post("wfs/getShareInfo", {
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
      const { data } = await this.$axios.post("wfs/add_share", {
        to_user_name: this.shareadd,
        wf_id: this.wf_id
      });
      if (data == "success") {
        //成功更新用户列表
        try {
          const { data } = await this.$axios.post("wfs/getShareInfo", {
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
      const { data } = await this.$axios.post("wfs/share_delete", {
        to_user_name: this.to_user_name,
        wf_id: this.wf_id
      });
      if (data == "success") {
        //成功更新用户列表
        try {
          const { data } = await this.$axios.post("wfs/getShareInfo", {
            wf_id: this.wf_id
          });
          if (data) {
            this.share = data;
            this.$message.success("添加成功，更新成功");
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

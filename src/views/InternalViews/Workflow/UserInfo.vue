<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>用户列表</span>
      </div>
      <div class="filter-box">
        <el-select v-model="conditions.selectclass" placeholder="检索条件" class="ml10 mr10">
          <el-option label="昵称" value="nickname"></el-option>
          <el-option label="邮箱" value="email"></el-option>
          <el-option label="电话" value="phone"></el-option>
          <el-option label="姓名" value="username"></el-option>
          <el-option label="角色" value="role"></el-option>
          <el-option label="学号" value="stuid"></el-option>
        </el-select>
        <el-input v-model="conditions.text" placeholder="检索关键词" class="mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="tableData" ref="multipleTable">
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="role" label="角色" width="100"></el-table-column>
        <el-table-column prop="nickname" label="用户昵称" width="100"></el-table-column>
        <el-table-column prop="username" label="真实姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="idcard" label="身份证号" width="120"></el-table-column>
        <el-table-column prop="stuid" label="学号" width="120"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              title="编辑"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              title="删除"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.role"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.stuid"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class BaseTableView extends Vue {
  idx = -1;
  tableData = [];
  conditions = {
    selectclass: "",
    text: ""
  };
  editVisible = false;
  delVisible = false;
  form = {
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    name: "",
    phone: "",
    stuid: "",
    idcard: ""
  };

  created() {
    this.getData();
  }

  //得到用户数据
  async getData() {
    try {
      const { data } = await this.$axios.get("users/getUserInfo");
      this.tableData = data;
    } catch (e) {
      this.$message.error("请求用户数据失败，请稍后再试！");
    }
  }

  //检索用户数据
  async search() {
    try {
      const { data } = await this.$axios.post(
        "users/SearchUserInfo",
        this.conditions
      );
      if (data == "success") {
        this.$message.success("检索成功");
      }
    } catch (e) {
      this.$message.error("检索失败，请稍后再试！");
    }
  }

  handleEdit(index: any, row: any) {
    this.idx = index;
    const item: any = this.tableData[index];
    this.form = {
      id: item.id,
      email: item.email,
      password: item.password,
      nickname: item.password,
      role: item.role,
      name: item.name,
      phone: item.phone,
      stuid: item.stuid,
      idcard: item.idcard
    };
    this.editVisible = true;
  }

  handleDelete(index: any, row: any) {
    this.idx = index;
    const item: any = this.tableData[index];
    this.form = {
      id: item.id,
      email: item.email,
      password: item.password,
      nickname: item.password,
      role: item.role,
      name: item.name,
      phone: item.phone,
      stuid: item.stuid,
      idcard: item.idcard
    };
    this.delVisible = true;
  }

  // 保存编辑
  async saveEdit() {
    try {
      const { data } = await this.$axios.post("users/updateUserInfo", this.form);
      if (data == "success") {
        this.$message.success("更改成功");
      }
    } catch (e) {
      this.$message.error("更改失败，请稍后再试！");
    }
    this.editVisible = false;
    this.getData();
  }
  // 确定删除
  async confirmDel() {
    try {
      const { data } = await this.$axios.post("users/delUserInfo", {
        id: this.form.id
      });
      if (data == "success") {
        this.$message.success("删除成功");
      }
    } catch (e) {
      this.$message.error("删除失败，请稍后再试！");
    }
    this.delVisible = false;
    this.getData();
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
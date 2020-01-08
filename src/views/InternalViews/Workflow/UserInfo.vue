<template>
  <div>
    <el-container>
      <el-header>
        <div class="filter-box">
          <el-select v-model="searchdata.selectclass" placeholder="检索条件" class="ml10 mr10">
            <el-option label="昵称" value="nickname"></el-option>
            <el-option label="邮箱" value="email"></el-option>
            <el-option label="电话" value="phone"></el-option>
            <el-option label="姓名" value="username"></el-option>
            <el-option label="角色" value="role"></el-option>
            <el-option label="学号" value="stuid"></el-option>
          </el-select>
          <el-input v-model="searchdata.text" placeholder="检索关键词" class="mr10"></el-input>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
          <el-button type="primary" icon="search" @click="resetdata">重置</el-button>
        </div>
      </el-header>

      <el-main>
        <el-table :data="tableData" ref="multipleTable" max-height="100%">
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称"></el-table-column>
          <el-table-column prop="username" label="真实姓名"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="stuid" label="学号"></el-table-column>
          <el-table-column prop="idcard" label="身份证号" sortable></el-table-column>
          <el-table-column label="操作">
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
      </el-main>
    </el-container>

    <!-- </el-card> -->

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
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
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idcard" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.stuid" :disabled="true"></el-input>
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
export default class UserInfoTableView extends Vue {
  idx = -1;
  tableData = [];
  uniformwidth = 0;
  searchdata = {
    selectclass: "",
    text: ""
  };
  table_height = 0;
  editVisible = false;
  delVisible = false;
  form = {
    email: "",
    nickname: "",
    role: "",
    username: "",
    phone: "",
    stuid: "",
    idcard: ""
  };

  created() {
    this.getData();
    this.table_height = window.innerHeight - 140;
    this.uniformwidth = (window.innerWidth - 260) / 8;
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
        this.searchdata
      );
      if (data) {
        this.tableData = data;
      }
    } catch (e) {
      this.$message.error("检索失败，请稍后再试！");
    }
  }
  //重置检索数据
  async resetdata() {
    this.getData();
    (this.searchdata.selectclass = ""), (this.searchdata.text = "");
  }

  handleEdit(index: any, row: any) {
    this.idx = index;
    const item: any = this.tableData[index];
    this.form = {
      email: item.email,
      nickname: item.nickname,
      role: item.role,
      username: item.username,
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
      email: item.email,
      nickname: item.nickname,
      role: item.role,
      username: item.username,
      phone: item.phone,
      stuid: item.stuid,
      idcard: item.idcard
    };
    this.delVisible = true;
  }

  // 保存编辑
  async saveEdit() {
    try {
      const { data } = await this.$axios.post(
        "users/updateUserInfo",
        this.form
      );
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
        email: this.form.email
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

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

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
</style>
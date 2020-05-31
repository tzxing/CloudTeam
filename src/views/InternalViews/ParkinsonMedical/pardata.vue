<template>
  <div class="pardata">
    <el-button type="primary" round @click="dialogVisible = true">添加患者</el-button>
    <el-dialog
      title="添加管理的患者"
      :visible.sync="dialogVisible"
      width="50%"
      @closed="handleClose"
      center>

        <el-input v-model="searchInput.UserInfo" placeholder="请输入患者的姓名" @keyup.enter.native="searchPatientInfo" style="margin: 10px 45px; width: 500px;"></el-input>
        <el-button type="primary" style="margin: 0 0px;" @click="searchPatientInfo">查 询</el-button>
      <div style="height: 45vh; overflow: auto;">
        <el-table
          :data="searchData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="用户名">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{{ props.row.age }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{ props.row.idcard }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="电话"
            prop="phone"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            label="身份证号"
            prop="idcard"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-plus"
                circle
                @click="addPatient(scope.$index, scope.row)"/>
            </template>
          </el-table-column>
        </el-table>

      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      
    </el-dialog>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="120">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="username"
        label="患者ID"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div id="myEcharts" style="height: 400px;"></div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class PardataView extends Vue {
  activeIndex = "";
  dialogVisible = false;
  searchInput = {UserInfo:""};
  searchData:{
    name:string;
    username:string;
    age:string;
    gender:string;
    phone:string;
    idcard:string;
    email:string;
    address:string;
    }[] = [];
  tableData:{
    name:string;
    age:string;
    gender:string;
    address:string;
    username:string;
    }[] = [];
  // tableData = [{
  //     date: '2016-05-02',
  //     name: '王小虎',
  //     province: '上海',
  //     city: '普陀区',
  //     address: '上海市普陀区金沙江路 1518 弄',
  //     id: '000001'
  // }, {
  //     date: '2016-05-04',
  //     name: '李晓丽',
  //     province: '上海',
  //     city: '普陀区',
  //     address: '上海市普陀区金沙江路 1517 弄',
  //     id: '000002'
  // }, {
  //     date: '2016-05-01',
  //     name: '王小明',
  //     province: '上海',
  //     city: '普陀区',
  //     address: '上海市普陀区金沙江路 1519 弄',
  //     id: '000003'
  // }, {
  //     date: '2016-05-03',
  //     name: '孙晓达',
  //     province: '上海',
  //     city: '普陀区',
  //     address: '上海市普陀区金沙江路 1516 弄',
  //     id: '000004'
  // }];
//组件加载的同时向后端取数据
  created() {
    this.getData();
  }

  //得到用户数据
  async getData() {
    try {
      const { data } = await this.$axios.get("medical/find_all_patients/");
      if (data=="nopatients"){
         this.$message.warning("您当前没有监管病人，请添加");
      }else{
      this.tableData = data;
      }
    } catch (e) {
      this.$message.error("请求患者数据失败，请稍后再试！");
    }
  }

  //检索用户数据
  async searchPatientInfo() {
    try {
      const { data } = await this.$axios.post(
        "medical/finduserinfo",
        this.searchInput
      );
      if (data) {
        this.searchData = data;
      }
    } catch (e) {
      this.$message.error("检索失败，请稍后再试！");
    }
  }

  // private searchPatientInfo() { //查询患者的函数，之后替换成与数据库交互的内容
  //   if(this.searchInput == '王小明') {
  //     this.searchData = [{
  //       name:'王小明',
  //       username:'WXM',
  //       age:64,
  //       gender:'男性',
  //       phone:'18888888766',
  //       idcard:'389942195603133843',
  //       email:'wangxiaoming@gmail.com',
  //       address:'北京市海淀区',
  //     }];
  //   }
  //   else if(this.searchInput == '李晓霞') {
  //     this.searchData = [{
  //       name:'李晓霞',
  //       username:'xiaoxia_li',
  //       age:35,
  //       gender:'女性',
  //       phone:'18837462345',
  //       idcard:'389942198508243965',
  //       email:'lixiaoxia@sina.com',
  //       address:'北京市朝阳区',
  //     }];
  //   }
  //   else if(this.searchInput == '陆桥山') {
  //     this.searchData = [{
  //       name:'陆桥山',
  //       username:'luqiaoshan',
  //       age:26,
  //       gender:'男性',
  //       phone:'15731132245',
  //       idcard:'130304199402231517',
  //       email:'ya@163.com',
  //       address:'上海市普陀区金沙江路1518弄',
  //     }, {
  //       name:'陆桥山',
  //       username:'qiaoshan_LU',
  //       age:28,
  //       gender:'男性',
  //       phone:'18800359483',
  //       idcard:'130304199212310483',
  //       email:'qiaoshan@163.com',
  //       address:'上海市黄浦区人民大道',
  //     }];
  //   }
  //   else this.searchData = [];
  // }

  addPatient(index:any, row:any) {
    //用row.username来索引用户名传回后端
  }
  
  handleOpen() {
    //对话框弹出动画开始时的回调函数
  }

  handleClose(done:any) {  //对话框动画结束后的回调函数
    this.searchData = [];
    this.searchInput.UserInfo = '';
    this.getData(); //重新拉取管理的患者数据
  }

}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
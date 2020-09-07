<template>
  <div class="prescription">
    <el-button type="primary" icon="el-icon-refresh-right" @click="getData" style="float:right;">刷新列表</el-button>
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item label="患者筛选">
        <el-input v-model="form.screenInput" placeholder="键入姓名以筛选患者" @keyup.enter.native="screenByName" @input="screenByName"></el-input>
        <input type="text" style="display:none"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="screenClear">重置条件</el-button>
      </el-form-item>
    </el-form>
    
    <el-table
      :data="screenData"
      border
      :default-sort = "{prop: 'date', order: 'ascending'}"
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
        label="患者用户名"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="636"
            trigger="click">
            <el-table :data="prescriptionData">
              <el-table-column width="150" prop="name" label="药品名" align="center"></el-table-column>
              <el-table-column width="100" prop="date" label="日期" align="center"></el-table-column>
              <el-table-column width="300" prop="text" label="备注" align="center"></el-table-column>
              <el-table-column label="操作" width="85" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deletePrescription(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: right; margin: 0">
              <el-button type="primary" size="mini" @click="dialogVisible = true">增加处方</el-button>
            </div>
            <el-button slot="reference" @click="expendPrescription(scope.$index, scope.row)" type="info" size="mini" icon="el-icon-document">查看处方</el-button>
          </el-popover>
          <el-dialog title="新增处方" :visible.sync="dialogVisible">
            <el-form :model="prescriptionFrom">
              <el-form-item label="药品名" label-width="120px">
                <el-input v-model="prescriptionFrom.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="服用频次" label-width="120px">
                <el-input v-model="prescriptionFrom.time" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注" label-width="120px">
                <el-input v-model="prescriptionFrom.text" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addPrescription()">确 定</el-button>
            </div>
          </el-dialog>
          
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class PrescriptionView extends Vue {
  collapse = false;
  activeIndex = "";
  dialogVisible = false;
  form = {
    screenInput: '',
  };
  focusUsername = '';
  popoverVisible = false;
  prescriptionData:{
    name: string,
    date: string,
    text: string
  }[]=[];
  prescriptionFrom = {
    name: '',
    time: '',
    text: ''
  };
  tableData:{
    name:string;
    age:string;
    gender:string;
    address:string;
    username:string;
    }[] = [];
  screenData:{
    name:string;
    age:string;
    gender:string;
    address:string;
    username:string;
    }[] = [];

  
  
  created() {
    this.form.screenInput = ''; //将搜索框置为空，初始化
    this.getData();
    //this.screenClear(); //将筛选框初始化
  }

  screenByName() {
    if(this.form.screenInput == '')
      this.screenData = this.tableData;
    else
    {
      console.log(this.form.screenInput[0]);
      this.screenData = [];
      let screenlength = this.form.screenInput.length;
      let j = 0;
      for(let i = 0; i < this.tableData.length; i++)
      {
        if(this.form.screenInput == this.tableData[i].name.substring(0,screenlength))
        {
          //this.screenData.push(this.tableData[i]);
          this.screenData[j++] = this.tableData[i];
          //j++;
        }
      }
    }
  }

  screenClear() {
    console.log(this.tableData.length);
    this.form.screenInput = '';
    this.screenData = this.tableData;
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
      this.screenByName();
    } catch (e) {
      this.$message.error("请求患者数据失败，请稍后再试！");
    }
  }

  expendPrescription(index:any, row:any) {
    this.focusUsername = row.username;
    //向后端拉取数据
    this.requestprescription()
    //向后端拉取数据
  }

  addPrescription(index:any, row:any) {
    //写增加语句，与后端通信
    this.sendprescription()
    //与后端通信
  }

  deletePrescription(index:any, row:any) {
    this.$confirm('是否要删除该条处方？','删除确认',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      //写删除语句
      this.deletePre(index, row);
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
  
  async deletePre(index:any, row:any) {
    //成功信息前先写和后端的交互语句，用row.username来索引用户名传回后端
     try {
      const { data } = await this.$axios.post(
        "medical/deletePrescription",
         {username:this.focusUsername,prescription:[row.name,row.date,row.text]}
      );
      if (data=="success"){
      this.$message({
      message: '已将该处方移除',
      type: 'success'})
      // this.getData();
      this.tableData = this.tableData.filter(
        item => item["name"] != row.name
      );
      // this.screenData = this.screenData.filter(
      //   item => item["username"] != row.username
      // );
    }
    } catch (e) {
      this.$message.error("网络出现问题，请稍后再试！");
    }
  }


  async sendprescription() {
      try {
        const { data } = await this.$axios.post("medical/addprescription", 
        {username:this.focusUsername, prescriptionFrom:[this.prescriptionFrom.name,this.prescriptionFrom.time,this.prescriptionFrom.text]});
        if (data == "success") 
        {this.dialogVisible = false;}
      } catch (e){this.$message.error("请求失败，请稍后再试！");}
  }
  async requestprescription() {
      try {
        const { data } = await this.$axios.post("medical/requestprescription", 
        {username:this.focusUsername});
        this.prescriptionData=data
      } catch (e){this.$message.error("请求失败，请稍后再试！");}
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
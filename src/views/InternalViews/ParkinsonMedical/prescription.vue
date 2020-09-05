<template>
  <div class="prescription">
    <el-button type="primary" icon="el-icon-refresh-right" @click="getData" style="float:right;">刷新列表</el-button>
    <el-form :inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item label="患者筛选">
        <el-input v-model="form.screenInput" placeholder="键入姓名以筛选患者" @keyup.enter.native="screenByName" @input="screenByName"></el-input>
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
              <el-table-column width="150" property="name" label="药品名" align="center"></el-table-column>
              <el-table-column width="100" property="date" label="日期" align="center"></el-table-column>
              <el-table-column width="300" property="text" label="备注" align="center"></el-table-column>
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
              <el-button size="mini" type="text">取消</el-button>
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
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
  popoverVisible = false;
  prescriptionData = [] as Array<{
    name: string,
    date: string,
    text: string
  }>;
  prescriptionFrom = {
    name: '',
    time: '',
    text: ''
  };
  tableData = [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      id: '000001',
      username: 'WXH'
  }, {
      date: '2016-05-04',
      name: '李晓霞',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1517 弄',
      id: '000002',
      username: 'xiaoxia_li'
  }, {
      date: '2016-05-01',
      name: '王小明',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1519 弄',
      id: '000003',
      username: 'WXM'
  }, {
      date: '2016-05-03',
      name: '陆桥山',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1516 弄',
      id: '000004',
      username: 'qiaoshan_LU'
  }];
  screenData = [] as Array<{
    date: string;
    name: string;
    province: string;
    city: string;
    address: string;
    id: string;
    username: string;
  }>

  
  
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
    console.log('1');
    this.prescriptionData = [];
    if(row.username == 'WXM') {
      this.prescriptionData = [{
        name: '药品A',
        date: '一日三次',
        text: '无'
      },{
        name: '药品B',
        date: '一日两次',
        text: '饭后服用'
      }]
    }
    if(row.username == 'WXH') {
      this.prescriptionData = [{
        name: '药品C',
        date: '一日三次',
        text: '无'
      },{
        name: '药品D',
        date: '一日四次',
        text: '饭前服用'
      }]
    }
  }

  addPrescription(index:any, row:any) {
    console.log(row.username);
  }

  deletePrescription(index:any, row:any) {
    this.$confirm('是否要删除该条处方？','删除确认',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
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
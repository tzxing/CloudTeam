<template>
  <div class="questionnaire">
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
      ref="table"
      border
      :data="screenData"
      style="width: 100%;">
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        align="center"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        align="center"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
        min-width="20%">
      </el-table-column>
      <el-table-column
        prop="username"
        label="患者用户名"
        align="center"
        min-width="10%">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="5%">
        <template slot-scope="scope">
          <el-button @click="toogleExpand(scope.$index, scope.row)" type="info" size="mini" icon="el-icon-search">问卷结果</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <el-form label-position="left" inline class="questionnaire-table-expand">
            <el-form-item label="———— 基本诊疗信息 ————" class="questionnaire-table-highlight">
              <span>{{ "" }}</span>
            </el-form-item>
            <el-form-item label="首发症状时间">
              <span>{{ props.row.questionnaire.first_symptom_time }}</span>
            </el-form-item>
            <el-form-item label="目前主要症状（运动症状）">
              <span>{{ props.row.questionnaire.motor_symptoms }}</span>
            </el-form-item>
            <el-form-item label="目前主要症状（非运动症状）">
              <span>{{ props.row.questionnaire.nonmotor_symptoms }}</span>
            </el-form-item>
            <el-form-item label="确诊医院">
              <span>{{ props.row.questionnaire.hosptial }}</span>
            </el-form-item>
            <el-form-item label="目前负责医生">
              <span>{{ props.row.questionnaire.responsibility_doctor }}</span>
            </el-form-item>
            <el-form-item label="是否存在开关现象">
              <span>{{ props.row.questionnaire.onoff_phenomenon }}</span>
            </el-form-item>
            <el-form-item label="有无DBS手术治疗">
              <span>{{ props.row.questionnaire.DBS }}</span>
            </el-form-item>
            <el-form-item label="———— 目前服药情况 ————" class="questionnaire-table-highlight">
              <span>{{ "" }}</span>
            </el-form-item>
            <el-form-item label="美多芭">
              <span>{{ props.row.questionnaire.medication.Medopar }}</span>
            </el-form-item>
            <el-form-item label="柯丹">
              <span>{{ props.row.questionnaire.medication.Comtan }}</span>
            </el-form-item>
            <el-form-item label="森福罗">
              <span>{{ props.row.questionnaire.medication.Sifrol }}</span>
            </el-form-item>
            <el-form-item label="罗替高汀贴剂">
              <span>{{ props.row.questionnaire.medication.Rotigotine }}</span>
            </el-form-item>
            <el-form-item label="金刚烷胺">
              <span>{{ props.row.questionnaire.medication.Amantadine }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class QuestionnaireView extends Vue {
  activeIndex = "";
  dialogVisible = false;
  searchInput = {UserInfo:""};
  form = {
    screenInput: '',
  };
  tableData:{
    name:string;
    age:string;
    gender:string;
    address:string;
    username:string;
    questionnaire: {
      first_symptom_time:string;
      motor_symptoms:string;
      nonmotor_symptoms:string;
      hosptial:string;
      onoff_phenomenon:string;
      DBS:string;
      medication: {
        Medopar:string;     //美多巴
        Comtan:string;      //柯丹
        Sifrol:string;      //森福罗
        Rotigotine:string;  //罗替高汀贴剂
        Amantadine:string;  //金刚烷胺
      }
    }
  }[] = [];
  screenData:{
    name:string;
    age:string;
    gender:string;
    address:string;
    username:string;
    questionnaire: {
      first_symptom_time:string;
      motor_symptoms:string;
      nonmotor_symptoms:string;
      hosptial:string;
      onoff_phenomenon:string;
      DBS:string;
      medication: {
        Medopar:string;     //美多巴
        Comtan:string;      //柯丹
        Sifrol:string;      //森福罗
        Rotigotine:string;  //罗替高汀贴剂
        Amantadine:string;  //金刚烷胺
      }
    }
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
    this.form.screenInput = ''; //将搜索框置为空，初始化
    this.getData();
    //this.screenClear(); //将筛选框初始化
  }

  screenByName() {  //筛选框发生输入事件时的触发函数
    if(this.form.screenInput == '') //当搜索栏清空时回到默认状态
      this.screenData = this.tableData;
    else
    {
      this.screenData = [];
      let screenlength = this.form.screenInput.length;
      let j = 0;
      for(let i = 0; i < this.tableData.length; i++)
      {
        if(this.form.screenInput == this.tableData[i].name.substring(0,screenlength))
        {
          //this.screenData.push(this.tableData[i]);
          this.screenData[j] = this.tableData[i];
          j++;
        }
      }
    }
  }
  
  screenClear() { //按下筛选框重置按钮时的触发函数
    this.form.screenInput = ''; //将搜索框置为空
    this.screenData = this.tableData; //重新将拉取到的表格信息赋给screenData变量
  }

  //得到用户数据
  async getData() {
    try {
      const { data } = await this.$axios.get("medical/subjective_questionnaire");
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

 

  toogleExpand(index:any, row:any) { //展开行
  let $table:any = this.$refs.table;
  $table.toggleRowExpansion(row);
  // for(let key in this.screenData[0]) {
  //   console.log(key + ":" + typeof this.screenData)
  // }
  }

}
</script>

<style>
  .questionnaire-table-expand {
    font-size: 0;
  }
  .questionnaire-table-expand label {
    width: 250px;
    color: #99a9bf;
  }
  .questionnaire-table-expand .el-form-item {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .questionnaire-table-highlight label {
    width: 250px;
    color: #454d57;
  }

</style>
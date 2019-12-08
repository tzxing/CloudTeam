<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header">
        <span>自创工作流列表</span>
      </div>
      <div>
        <el-table :data="tableData" height="250">
        <el-table-column prop="date" label="创建日期" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="工作流名称" width="120"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text">运行</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text">复制</el-button>
            <el-button @click="to_wfsdetails(scope.row)">详细信息</el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text">共享</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div>
        <span>分享工作流列表</span>
      </div>
      <div>
        <el-table :data="tableData" height="250">
        <el-table-column prop="date" label="创建日期" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="工作流名称" width="120"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" >运行</el-button>
            <el-button type="text" >复制</el-button>
            <el-button type="text" @click="to_wfsdetails(scope.row)">详细信息</el-button>
            <el-button type="text" >取消共享</el-button>
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

    <!-- 修改弹出框 
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 删除提示框 
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDel">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template> 

<script lang="ts">
  // export default{
  //   // methods: {
  //   //   handleClick(row) {
  //   //     console.log(row);
  //   //   }
  //   // }

  //   data() {
  //     return {
  //       tableData: [{
  //         date: '2016-05-02',
  //         name: '工作流-1'
  //       }, 
  //       {
  //         date: '2016-05-02',
  //         name: '工作流-2'
  //       }, 
  //       {
  //         date: '2016-05-02',
  //         name: '工作流-3'
  //       }, 
  //       {
  //         date: '2016-05-02',
  //         name: '工作流-4'
  //       }]
  //     }
  //   }

  // }
//import * as Api from '@/api/api'
import { Component, Vue } from "vue-property-decorator";
  @Component({})
  export default class details extends Vue{
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '工作流-1'
        }, 
        {
          date: '2016-05-02',
          name: '工作流-2'
        }, 
        {
          date: '2016-05-02',
          name: '工作流-3'
        }, 
        {
          date: '2016-05-02',
          name: '工作流-4'
        }]
      }
    }
    name:string = "bai"
      public to_wfsdetails(row:string){
        this.$router.push({path:"/internal/workflow/wfsdetails",query:{'name':name}})
    }
  }




</script>

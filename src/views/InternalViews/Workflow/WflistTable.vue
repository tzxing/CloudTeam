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
            <el-button type="text" @click="dialogTableVisible = true">共享</el-button>

            <!-- 弹框 -->
            <el-dialog title="分享给其他用户" :visible.sync="dialogTableVisible">
              <el-form :model="form">
                <el-form-item label="查找用户" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="uploadFile">添加</el-button>
                </el-form-item> 
              </el-form>
              <span>已分享过的用户</span>
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
        <el-table :data="tableData" height="250">
        <el-table-column prop="date" label="创建日期" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="工作流名称" width="120"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" >运行</el-button>
            <el-button type="text" >复制</el-button>
            <el-button type="text" @click="to_wfsdetails(scope.row)">详细信息</el-button>
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
    share = {
        id: "",
        date: "",
        name: ""
         };

    handleDelete(index:any,row:any) {
      console.log(index,row);
      }

    created() {
      this.getData();
      }

  async getData() {
    try {          
      const {data} = await this.$axios.get("wfs/getShareInfo");
      this.share=data;
    } catch (e) {
      this.$message.error("请求用户数据失败，请稍后再试！");
    }
  }

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
        }],
        gridData: [{
          
          name: '用户-1'
        }, 
        {
          
          name: '用户-2'
        }, 
        {
          
          name: '用户-3'
        }, 
        {
          
          name: '用户-4'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
        };
      }

      name:string = "bai"
      public to_wfsdetails(row:string){
        this.$router.push({path:"/internal/workflow/wfsdetails",query:{'name':name}})
    }
  }

</script>

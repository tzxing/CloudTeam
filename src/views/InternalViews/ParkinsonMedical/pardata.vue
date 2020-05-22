<template>
  <div class="pardata">
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
  collapse = false;
  activeIndex = "";
  dialogVisible = false;
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
  tableData = [];
//组件加载的同时向后端取数据
  created() {
    this.getData();
  }

  //得到用户数据
  async getData() {
    try {
      const { data } = await this.$axios.get("medical/find_all_patients/");
      this.tableData = data;
    } catch (e) {
      this.$message.error("请求患者数据失败，请稍后再试！");
    }
  }
  
  handleEdit(index:any, row:any) {
    console.log(index, row.id);
    this.$router.push({
      path:'data_detail',
      query:{ id:row.id }
    })
  }
  // public $echarts: any;
  // private options: object = {
  //   title: {
  //       text: '堆叠区域图'
  //   },
  //   tooltip : {
  //       trigger: 'axis',
  //       axisPointer: {
  //           type: 'cross',
  //           label: {
  //               backgroundColor: '#6a7985'
  //           }
  //       }
  //   },
  //   legend: {
  //       data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
  //   },
  //   toolbox: {
  //       feature: {
  //           saveAsImage: {}
  //       }
  //   },
  //   grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       containLabel: true
  //   },
  //   xAxis : [
  //       {
  //           type : 'category',
  //           boundaryGap : false,
  //           data : ['周一','周二','周三','周四','周五','周六','周日']
  //       }
  //   ],
  //   yAxis : [
  //       {
  //           type : 'value'
  //       }
  //   ],
  //   series : [
  //       {
  //           name:'邮件营销',
  //           type:'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data:[120, 132, 101, 134, 90, 230, 210]
  //       },
  //       {
  //           name:'联盟广告',
  //           type:'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data:[220, 182, 191, 234, 290, 330, 310]
  //       },
  //       {
  //           name:'视频广告',
  //           type:'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data:[150, 232, 201, 154, 190, 330, 410]
  //       },
  //       {
  //           name:'直接访问',
  //           type:'line',
  //           stack: '总量',
  //           areaStyle: {normal: {}},
  //           data:[320, 332, 301, 334, 390, 330, 320]
  //       },
  //       {
  //           name:'搜索引擎',
  //           type:'line',
  //           stack: '总量',
  //           label: {
  //               normal: {
  //                   show: true,
  //                   position: 'top'
  //               }
  //           },
  //           areaStyle: {normal: {}},
  //           data:[820, 932, 901, 934, 1290, 1330, 1320]
  //       }
  //   ]
  // };
  // private mounted() {
  //   const ele = document.getElementById('myEcharts');
  //   const chart: any = this.$echarts.init(ele);
  //   chart.setOption(this.options);
  // }


  // open() {
  //   const ele = document.getElementById('myEcharts');
  //   const chart: any = this.$echarts.init(ele);
  //   chart.setOption(this.options);
  // }

  // getDetailedInfo() {
    
  // }
}
</script>
<template>
  <el-container>
    <el-main>
      <div class="vmList" v-for="(value) in podList.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="value" v-loading="loading">
        <el-col :span="12">
          <el-card :body-style="{ padding: '20px' }" class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight: bolder;font-size: 17px">{{ value }}</span>
              <el-button style="float: right; padding: 3px 0" type="text"><router-link style="color: #409EFF" :to="'/prediction/pod/' + value + '/decompose'">能耗分解</router-link></el-button>
            </div>
          </el-card>
          <br>
        </el-col>
      </div>
    </el-main>
    <el-footer style="text-align: center">
      <el-pagination
          v-show="showPagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          :total="totalPodItems"
          layout="prev, pager, next, total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
var _this = {};
import { mapMutations } from 'vuex';
import {formatDate} from './formatDate'
import HighCharts from 'highcharts'
export default {
  name: "HardDecomposeList",
  data() {
    return {
      userName: "",
      showPagination: true,
      loading: false,
      activeIndex: '1',
      currentPage: 1,
      pageSize: 6,
      records: [],
      arr: [],
      fromTime: '',
      flag: false,
      chartData: [],
      timestamp: new Date('2019-09-12 22:44:04'),
      chart: null,
      totalItems: 0,
      totalPodItems: 0,
      serverList: [],
      vmList: [],
      podList: []
    }
  },
  beforeCreate:function(){
    _this = this;
  },
  created() {
    //
  },
  mounted() {
    this.getServerList();
    this.getPodList();
  },
  methods: {
    toVmDetail(url){
      window.open(url)
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
    },
    async getVMList() {
      try {
        for (let i=0; i<this.serverList.length; i++) {
          // let lidataUrl = "http://10.160.109.63:8081/getVMs/" + this.serverList[i];
          let lidataUrl = "http://10.160.109.63:8088/entityinfo/getVMs/" + this.serverList[i];

          const {data} = await this.$axios.get(lidataUrl);
          for(let j in data.entities) {
            this.vmList.push(data.entities[j]);
          }
          this.totalItems += data.entities.length;
        }
        this.getPodList()
      } catch (e) {
        this.$message.error("请求数据失败，请稍后再试！");
      }
    },
    async getServerList() {
      try {
        // let lidataUrl = "http://10.160.109.63:8081/getServers";
        let lidataUrl = "http://10.160.109.63:8088/entityinfo/getServers";

        const {data} = await this.$axios.get(lidataUrl);
        this.serverList = data.entities;
        this.getVMList();
      } catch (e) {
        this.$message.error("请求数据失败，请稍后再试！");
      }
    },
    async getPodList() {
      try {
        for (let i=0; i<this.vmList.length; i++) {
          // let lidataUrl = "http://10.160.109.63:8081/getPods/" + this.vmList[i]
          let lidataUrl = "http://10.160.109.63:8088/entityinfo/getPods/" + this.vmList[i]
          const {data} = await this.$axios.get(lidataUrl);
          if(data.entities != null){
            for(let j in data.entities) {
              this.podList.push(data.entities[j]);
            }
            this.totalPodItems += data.entities.length;
          }
        }
      } catch (e) {
        this.$message.error("请求数据失败，请稍后再试！");
      }
    },
  }
}
</script>

<style scoped>

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.el-dropdown-link {
  cursor: pointer;
  /*color: #409EFF;*/
}
.el-icon-arrow-down {
  font-size: 12px;
}
.clearfix:after {
  clear: both
}
a {
  text-decoration: none;
}
.box-card {
  width: 90%;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /*border-top: 10px solid rgb(64, 158, 255);*/
}
.vmList {
  width: 100%;
}
</style>

<template>
  <el-container>
    <el-main>
      <div class="vmList" v-for="(value) in serverList.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="value" v-loading="loading">
        <el-col :span="12">
          <el-card :body-style="{ padding: '20px' }" class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight: bolder;font-size: 17px">{{ value}}</span>
              <el-button style="float: right; padding: 3px 0;margin-left: 10px" type="text"><router-link style="color: #409EFF" :to="'/prediction/server/' + value + '/predict'">能耗预测</router-link></el-button>
              <el-button style="float: right; padding: 3px 0" type="text"><router-link style="color: #409EFF" :to="'/prediction/server/' + value + '/hard-decompose'">能耗分解</router-link></el-button>
              <el-button style="float: right; padding: 3px 0" type="text"><router-link style="color: #409EFF" :to="'/prediction/server/' + value + '/metrics'">指标评估</router-link></el-button>
            </div>
            <div class="text item">
              <p><router-link style="color: #409EFF" :to="'/prediction/vm-list/' + value">虚拟机列表</router-link></p>
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
          :total="totalItems"
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
  name: "ServerList",
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
      serverList: [],
      fromTime: '',
      flag: false,
      chartData: [],
      timestamp: new Date('2019-09-12 22:44:04'),
      chart: null,
      totalItems: 0
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
  },
  methods: {
    toVmDetail(url){
      window.open(url)
    },
    getUser () {
      this.$axios.get('/users').then(res => {
        console.log(res);
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
    },
    async getServerList() {
      try {
        let lidataUrl = "http://10.160.109.63:8081/getServers";
        const {data} = await this.$axios.get(lidataUrl);
        this.serverList = data.entities;
        this.totalItems = data.entities.length;
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
  width: 550px;
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /*border-top: 10px solid rgb(64, 158, 255);*/
}
.vmList {
  width: 100%;
}
</style>

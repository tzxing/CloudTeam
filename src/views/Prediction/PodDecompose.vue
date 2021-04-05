<template>
  <el-container>
    <el-container  style="height: 620px; border: 1px solid #eee">
      <el-container>
          <el-main>
            <div style="margin-bottom: 30px">
              <span style="color: #606266">{{ this.$route.params.serverName }}</span>
              <el-divider direction="vertical"></el-divider>
              <span style="color: #606266">{{ serverIP }}</span>
              <el-divider direction="vertical"></el-divider>
              <span style="color: #606266">{{ realPower }}W</span>
            </div>
            <el-date-picker
                v-model="timestamp"
                style="margin-right: 20px"
                type="datetime"
                placeholder="选择日期时间"
                @change='handleSelectTimestamp'>
            </el-date-picker>
            <el-select
                v-model="algorithm"
                style="margin-right: 20px"
                placeholder="请选择"
                @change='handleSelectAlgorithm'>
              <el-option
                  v-for="item in Algorithms"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
            <el-select v-model="hostname" placeholder="请选择" @change='handleSelectHostname'>
              <el-option
                  v-for="item in hostNames"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
            <div class="x-bar">
              <div id="prediction" :option="option"></div>
            </div>
            <div id="container-column-stacked-percent"></div>
          </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
var _this = {};
import { mapMutations } from 'vuex';
import {formatDate} from './formatDate'
import HighCharts from 'highcharts'
export default {
  name: "Decompose",
  data() {
    return {
      userName: "",
      activeIndex: '1',
      records: [],
      arr: [],
      fromTime: '',
      flag: false,
      chartData: [],
      timestamp: new Date('2019-09-15 09:23:37'),
      chart: null,
      vmDetail: [],
      algorithm: 'regtree',
      vmList: [],
      powerList: [],
      hostname: 'linpack11',
      serverIP: "",
      realPower: 0,
      xTimestamp: this.getTimestamp(new Date('2019-09-15 09:23:40')) - 1,
      hostNames: [
        {
          value: '选项1',
          label: 'linpack11'
        },{
          value: '选项2',
          label: 'linpack10'
        },
      ],
      Algorithms: [
        {
          value: '选项1',
          label: 'regtree'
        }
      ],
      container: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'pod能耗分解图'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: '能耗值'
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>' +
              '({point.percentage:.0f}%)<br/>',
          //:.0f 表示保留 0 位小数，详见教程：https://www.hcharts.cn/docs/basic-labels-string-formatting
          shared: true
        },
        plotOptions: {
          column : {
            pointWidth: 60
          }
        },
        series: [{
          name: 'Power',
          data: []
        }]
      },
      // 选中的选项
      item: {},
      idForm: {
        id: "1"
      },
      id: 1,
    }
  },
  beforeCreate:function(){
    _this = this;
  },
  created() {
    //
  },
  filters: {
    tagsFilter(data) {
      return data.toString().replace('[','');
    },
    formatDate:function(date) {
      return moment(date).format("HH:mm:ss");
    }
  },
  mounted() {
    HighCharts.chart('container-column-stacked-percent', this.container);
    this.getEvalData();
    HighCharts.chart('container-column-stacked-percent', this.container);
  },
  methods: {
    getTimestamp(time) { //把时间日期转成时间戳
      return (new Date(time)).getTime() / 1000
    },
    toTime(timestamp) {
      return formatDate(timestamp, 'yyyy-MM-dd hh:mm')
    },
    unixTimeToDateTime(date) {
      var dateN = new Date(date*1000); // 依情况进行更改 * 1
      var y = dateN.getFullYear();
      var m = dateN.getMonth() + 1;
      var d = dateN.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + dateN.toTimeString().substr(0, 8);
    },
    async getEvalData() {
      try {
        let lidataUrl = 'http://10.160.109.63:8081/powerevaluate/' + this.xTimestamp + '/' + this.xTimestamp  + '/pod/' + this.algorithm + '/' + this.hostname;
        let localUrl = 'http://localhost:8085/yunprophet/evalution/body/' + this.xTimestamp + '/' + this.algorithm + '/' + this.$route.params.serverName;
        console.log(lidataUrl);
        const {data} = await this.$axios.get(lidataUrl);
        console.log(data)
        this.serverIP = data.server;
        this.realPower = data.podPower[0];
        this.vmList = [];
        this.powerList = [];
        // local
        // for(const i in data.vmList){
        //   this.vmList.push(data.vmList[i].vmName);
        //   this.powerList.push(data.vmList[i].evaluatePower);
        // }
        for(const i in data.vmlist){
          this.vmList.push(data.vmlist[i].vmname);
          this.powerList.push(data.vmlist[i].evaluatePower[0]);
        }
        this.container.xAxis.categories = this.vmList;
        this.container.series[0].data = this.powerList;
        HighCharts.chart('container-column-stacked-percent', this.container);
      } catch (e) {
        this.$message.error("请求数据失败，请稍后再试！");
      }
    },
    loadSubOptions(name) {
      this.option.subValue=null;
      const subOptionName = name + "Options";
      this.subOptions=this[`${subOptionName}`];
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    handleSelectTimestamp() {
      this.xTimestamp = this.getTimestamp(this.timestamp);
      this.getEvalData();
      HighCharts.chart('container-column-stacked-percent', this.container);
    },
    handleSelectAlgorithm(value) {
      this.algorithm = value
      this.getEvalData();
      HighCharts.chart('container-column-stacked-percent', this.container);
    },
    handleSelectHostname(value) {
      this.hostname = value
      this.getEvalData();
      HighCharts.chart('container-column-stacked-percent', this.container);
    },
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 350px;
  padding: 0;
  font-size: 10px;
}
.vminfodetail {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.cpuinfo {
  font-size: 30px;
  font-weight: bolder;
}
.monitortitle {
  /*font-weight: bolder;*/
  font-size: 16px;
}
.el-menu-header {
  float: right;
  /*margin-right: 200px;*/
  /*width: 100%;*/
  /*text-align: right;*/
}
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

.router-link-active {
  text-decoration: none;
}

#container-column-stacked-percent {
  padding-top: 80px;
  min-width:400px;
  height:400px
}
</style>

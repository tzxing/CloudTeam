<template>
  <el-container>
    <el-container  style="height: 620px; border: 1px solid #eee">
      <el-container>
          <el-main>
            <div style="margin-bottom: 30px">
              <span style="color: #606266">{{ this.$route.params.podName }}</span>
              <el-divider direction="vertical"></el-divider>
              <span style="color: #606266">{{ serverIP }}</span>
            </div>
            <el-date-picker
                v-model="startTimestamp"
                style="margin-right: 20px"
                type="datetime"
                placeholder="选择日期时间"
                @change='handleSelectStartTimestamp'>
            </el-date-picker>
            <el-date-picker
                v-model="endTimestamp"
                style="margin-right: 20px"
                type="datetime"
                placeholder="选择日期时间"
                @change='handleSelectEndTimestamp'>
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
            <el-select v-model="hostname" disabled placeholder="请选择" @change='handleSelectHostname'>
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
      startTimestamp: new Date('2019-09-15 09:23:37'),
      endTimestamp: new Date('2019-09-15 09:23:40'),
      chart: null,
      vmDetail: [],
      algorithm: 'regtree',
      vmList: [],
      powerList: [],
      hostname: this.$route.params.podName,
      serverIP: "",
      evalPower: [],
      xStartTimestamp: this.getTimestamp(new Date('2019-09-15 09:23:37')) - 1,
      xEndTimestamp: this.getTimestamp(new Date('2019-09-15 09:23:40')) - 1,
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
          type: 'spline',
          marginRight: 10,
        },
        title: {
          text: 'pod能耗分解'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: '能耗值'
          }
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                HighCharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                HighCharts.numberFormat(this.y, 2);
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: '预测值',
          data:  []
        },{
          name: '真实值',
          data: (function () {
            // 生成随机值
            var data = [],
                time = _this.timestamp,
                i;
            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: 3
              });
            }
            return data;
          }())
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
        let lidataUrl = 'http://10.160.109.63:8081/powerevaluate/' + this.xStartTimestamp + '/' + this.xEndTimestamp  + '/pod/' + this.algorithm + '/' + this.hostname;
        let localUrl = 'http://localhost:8085/yunprophet/evalution/body/' + this.xTimestamp + '/' + this.algorithm + '/' + this.$route.params.serverName;
        const {data} = await this.$axios.get(lidataUrl);
        if(data.status == 200) {
          this.serverIP = data.server;
          this.container.series[0].data = data.podPower;
          HighCharts.chart('container-column-stacked-percent', this.container);
        }else {
          this.$message.error("请求数据失败，请稍后再试！");
        }
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
    handleSelectStartTimestamp(value) {
      this.xStartTimestamp = this.getTimestamp(value);
      this.getEvalData();
      HighCharts.chart('container-column-stacked-percent', this.container);
    },
    handleSelectEndTimestamp(value) {
      this.xEndTimestamp = this.getTimestamp(value);
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

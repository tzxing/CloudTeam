<template>
  <el-container>
    <el-main>
      <el-date-picker
          v-model="timestamp"
          type="datetime"
          placeholder="选择日期时间"
          @change='handleSelectTimestamp'>
      </el-date-picker>

      <el-select v-model="forecasttype" placeholder="请选择" @change='handleSelectType'>
        <el-option
            v-for="item in forecastTypes"
            :key="item.value"
            :label="item.label"
            :value="item.label">
        </el-option>
      </el-select>

      <el-select v-model="algorithm" placeholder="请选择" @change='handleSelectAlgorithm'>
        <el-option
            v-for="item in Algorithms"
            :key="item.value"
            :label="item.label"
            :value="item.label">
        </el-option>
      </el-select>

      <el-select v-model="hostname" placeholder="请选择" @change='handleSelectHostname'>
        <el-option
            v-for="item in choosehostNames"
            :key="item.value"
            :label="item.label"
            :value="item.label">
        </el-option>
      </el-select>
      <p></p>
      <div class="x-bar">
        <div id="prediction" :option="option"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
var _this = {};
import { formatDate } from './formatDate'
import HighCharts from 'highcharts'
export default {
  name: "Forecast",
  data() {
    return {
      userName: "",
      activeIndex: '1',
      records: [],
      arr: [],
      fromTime: '',
      flag: false,
      chartData: [],
      timestamp: new Date('2019-09-14 13:47:11'),
      chart: null,
      vmDetail: [],
      algorithm: 'RF',
      pred: '',
      real: '',
      hostname: '',
      choosehostNames: "",
      forecasttype: 'pod',
      xTimestamp: this.getTimestamp(new Date('2019-09-14 13:47:11')) - 1,
      podHostNames: [
        {
          value: '选项1',
          label: 'linpack11'
        },{
          value: '选项2',
          label: 'linpack12'
        },
      ],
      pcHostNames: [
        {
          value: '选项1',
          label: 'compute01'
        }
      ],
      forecastTypes: [
        {
          value: '选项1',
          label: 'server'
        },{
          value: '选项2',
          label: 'pod'
        },
      ],
      Algorithms: [
        {
          value: '选项1',
          label: 'ARIMA'
        }, {
          value: '选项2',
          label: 'RF'
        }, {
          value: '选项3',
          label: 'DA-RNN'
        }, {
          value: '选项4',
          label: 'TCN'
        }, {
          value: '选项5',
          label: 'LSTM'
        }
      ],
      option: {
        chart: {
          type: 'spline',
          marginRight: 10,
          events: {
            load: function () {
              var series = this.series[0];
              var series2 = this.series[1];
              setInterval(function () {
                // var x = (new Date()).getTime(),     // 当前时间 number
                var x = new Date(_this.unixTimeToDateTime(_this.xTimestamp)).getTime();
                var z = _this.real;
                series2.addPoint([x, z], true, true);
                _this.xTimestamp = _this.xTimestamp + 1;
                var v = _this.getPredData(),           // 预测值
                    nx = new Date(_this.unixTimeToDateTime(_this.xTimestamp)).getTime(),           // 时间戳
                    // y = Math.random();              // 随机值
                    y = _this.pred;
                // z = _this.real;
                series.addPoint([nx, y], true, true);
                // _this.activeLastPointToolip(chart);
                // series2.addPoint([x, z], true, true);
                // _this.activeLastPointToolip(chart2);
              }, 1000);
            }
          }
        },
        title: {
          text: '物理机能耗预测'
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
    // this.getPredData();
    this.choosehostNames = this.podHostNames;
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
    async getPredData() {
      try {
        let localUrl = "http://localhost:8085/yunprophet/predict/body/data/" + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname + '/' + this.forecasttype;
        let lidataUrl = "http://10.160.109.63:8081/powerpredict/" + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname + '/' + this.forecasttype;
        const {data} = await this.$axios.get(lidataUrl);
        this.pred = data.data.pred;
        this.real = data.data.real;
        this.xTimestamp = parseInt(data.data.timestamp);
      } catch (e) {
        this.$message.error("请求数据失败，请稍后再试！");
        HighCharts.chart("prediction", this.option).destroy();
      }
    },
    handleSelectHostname(value) {
      this.hostname = value
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectTimestamp(value) {
      this.xTimestamp = this.getTimestamp(value);
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectAlgorithm(value) {
      this.algorithm = value
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectType(value) {
      this.forecasttype = value;
      if(value === 'pod') {
        this.choosehostNames = this.podHostNames
      }else if (value === 'server') {
        this.choosehostNames = this.pcHostNames
      }
      HighCharts.chart("prediction", this.option).redraw();
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
.x-bar {
  padding-top: 100px;
}
</style>

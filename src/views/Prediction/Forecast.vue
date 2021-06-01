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
  //data() 是 data:function()的缩写
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
      xTimestamp: this.getTimestamp(new Date('2019-09-14 13:47:11')) - 1,//unix时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒
      podHostNames: [
        {
          value: '选项1',
          label: 'linpack10'
        },{
          value: '选项2',
          label: 'linpack11'
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
          label: 'DARNN'
        }, {
          value: '选项4',
          label: 'TCN'
        }, {
          value: '选项5',
          label: 'LSTMx2'
        }
      ],
      option: {
        chart: {
          type: 'spline',
          marginRight: 10,
          events: {
            load: function () {
              var series = this.series[0];//预测值
              var series2 = this.series[1];//真实值
              //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
              setInterval(function () {
                var x = new Date(_this.unixTimeToDateTime(_this.xTimestamp+28800)).getTime();
                var z = _this.real;
                series2.addPoint([x, z], true, true);
                _this.xTimestamp = _this.xTimestamp + 1;
                var v = _this.getPredData(),           // 预测值
                    nx = new Date(_this.unixTimeToDateTime(_this.xTimestamp+28800)).getTime(),           // 时间戳
                    y = _this.pred;
                series.addPoint([nx, y], true, true);
                // _this.activeLastPointToolip(chart);
                // series2.addPoint([x, z], true, true);
                // _this.activeLastPointToolip(chart2);
              }, 1000);
            },

          }
        },
        title: {
          text: '能耗预测'
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
        //数据提示框指的当鼠标悬停在某点上时，以框的形式提示该点的数据，比如该点的值，数据单位等。
        //数据提示框内提示的信息完全可以通过格式化函数动态指定；通过设置 tooltip.enabled = false 即可不启用提示框。
        tooltip: {
          //提示框内容格式化回调函数
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                HighCharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                HighCharts.numberFormat(this.y, 2);
          }
        },
        legend: { //图例
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
          }()),
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
  // created() {
  // },
  destroyed() {
    HighCharts.chart("prediction", this.option).destroy();
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
        let lidataUrl = "http://10.160.109.63:8088/powerpredict/" + this.forecasttype + '/' + this.hostname + '/' + this.xTimestamp + '/' + this.algorithm;
        const {data} = await this.$axios.get(lidataUrl);
        this.pred = data.predictValue;
        this.real = data.realValue;
        this.xTimestamp = parseInt(data.timestamp);
      } catch (e) {
        this.$message.error("请求数据失败，请稍后再试！");
        HighCharts.chart("prediction", this.option).destroy();
      }
    },
    handleSelectHostname(value) {
      this.hostname = value
      this.option.title.text = this.forecasttype + '能耗预测'
      this.resetData();
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectTimestamp(value) {
      this.xTimestamp = this.getTimestamp(value);
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectAlgorithm(value) {
      this.algorithm = value;
      this.resetData();
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectType(value) {
      this.forecasttype = value;
      if(value === 'pod') {
        this.choosehostNames = this.podHostNames
        this.option.title.text = 'pod能耗预测'
      }else if (value === 'server') {
        this.choosehostNames = this.pcHostNames
        this.option.title.text = '物理机能耗预测'
      }
      HighCharts.chart("prediction", this.option).destroy();
      this.hostname=null;
      this.resetData();
    },
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    resetData() {
      // this.xTimestamp = this.getTimestamp(this.timestamp);

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

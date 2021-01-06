<template>
  <el-container>
    <el-container  style="height: 620px; border: 1px solid #eee">
      <el-container>
          <el-main>
            <el-date-picker
                v-model="timestamp"
                type="datetime"
                placeholder="选择日期时间"
                @change='handleSelectTimestamp'>
            </el-date-picker>
            <el-select v-model="algorithm" placeholder="请选择" @change='handleSelectAlgorithm'>
              <el-option
                  v-for="item in Algorithms"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
            <el-select v-model="hostname" placeholder="请选择" @change='handleLoadSubOptions'>
              <el-option
                  v-for="item in hostNames"
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
    </el-container>
  </el-container>
</template>

<script>
var _this = {};
import { mapMutations } from 'vuex';
import {formatDate} from './formatDate'
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
      timestamp: new Date('2019-09-12 22:44:04'),
      chart: null,
      metric: "cpu.0.percent.active",
      vmDetail: [],
      value: 'cpu',
      subValue: 'cpu.0.percent.active',
      algorithm: 'DA-RNN',
      pred: '',
      real: '',
      hostname: 'compute01',
      xTimestamp: this.getTimestamp(new Date('2019-09-12 22:44:04')) - 1,
      hostNames: [
        {
          value: '选项1',
          label: 'compute01'
        },{
          value: '选项2',
          label: 'compute02'
        },
      ],
      Options: [
        {
          value: '选项1',
          label: 'cpu'
        }, {
          value: '选项2',
          label: 'disk'
        }, {
          value: '选项3',
          label: 'memory'
        }, {
          value: '选项4',
          label: 'net'
        }
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
      subOptions: [
        {
          value: '选项1',
          label: 'disk.0.percent.active'
        }, {
          value: '选项2',
          label: 'disk.1.percent.active'
        }, {
          value: '选项3',
          label: 'disk.2.percent.active'
        }, {
          value: '选项4',
          label: 'disk.3.percent.active'
        }, {
          value: '选项5',
          label: 'disk.4.percent.active'
        }
      ],
      cpuOptions: [
        {
          value: '选项1',
          label: 'cpu.0.percent.active'
        }, {
          value: '选项2',
          label: 'cpu.1.percent.active'
        }, {
          value: '选项3',
          label: 'cpu.2.percent.active'
        }, {
          value: '选项4',
          label: 'cpu.3.percent.active'
        }, {
          value: '选项5',
          label: 'cpu.4.percent.active'
        }
      ],
      diskOptions: [
        {
          value: '选项1',
          label: 'disk.0.percent.active'
        }, {
          value: '选项2',
          label: 'disk.1.percent.active'
        }, {
          value: '选项3',
          label: 'disk.2.percent.active'
        }, {
          value: '选项4',
          label: 'disk.3.percent.active'
        }, {
          value: '选项5',
          label: 'disk.4.percent.active'
        }
      ],
      memoryOptions: [
        {
          value: '选项1',
          label: 'mem.0.percent.active'
        }, {
          value: '选项2',
          label: 'mem.1.percent.active'
        }, {
          value: '选项3',
          label: 'mem.2.percent.active'
        }, {
          value: '选项4',
          label: 'mem.3.percent.active'
        }, {
          value: '选项5',
          label: 'mem.4.percent.active'
        }
      ],
      netOptions: [
        {
          value: '选项1',
          label: 'net.0.percent.active'
        }, {
          value: '选项2',
          label: 'net.1.percent.active'
        }, {
          value: '选项3',
          label: 'net.2.percent.active'
        }, {
          value: '选项4',
          label: 'net.3.percent.active'
        }, {
          value: '选项5',
          label: 'net.4.percent.active'
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
          text: 'Power Prediction'
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
    this.getPredData()
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
      console.log("fff")
      try {
        console.log("http://localhost:8085/yunprophet/predict/body/data/" + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname)
        const {data} = await this.$axios.get("http://localhost:8085/yunprophet/predict/body/data/" + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname);
        this.pred = data.data.pred;
        this.real = data.data.real;
        this.xTimestamp = parseInt(data.data.timestamp);
        console.log("lll")
      } catch (e) {
        this.$message.error("请求用户数据失败，请稍后再试！");
      }
    },
    getOPredData() {
      let url = 'http://localhost:8085/yunprophet/predict/body/data/' + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname;
      let nUrl = 'http://192.168.0.218:5555/api-powerpredict/powerpredict/' + this.xTimestamp + '/' + this.algorithm + '/' + this.hostname;
      this.$api.get(nUrl, null, r => {
        console.log('res',r)
        this.pred = r.data.data.pred;
        this.real = r.data.data.real;
        this.xTimestamp = parseInt(r.data.data.timestamp);
      })
    },
    showVmServerDetail () {
      this.$http.get('http://127.0.0.1:8085/yunprophet/serverapi/getServerVmDetail',{
        params: {
          id: this.id
        },
        _timeout: 5000,
        onTimeout :(request) => {
          this.$message.error('请求超时');
          this.loading = false
        }
      }).then((response) => {
        var res = JSON.parse(response.bodyText);
        if (res.code === 200) {
          this.loading = false;
          this.vmDetail = res.data;
        } else {
          this.$message.error('查询数据失败');
        }
      })
    },
    toVmDetail(url){
      window.open(url)
    },
    loadSubOptions(name) {
      this.option.subValue=null;
      const subOptionName = name + "Options";
      this.subOptions=this[`${subOptionName}`];
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleLoadSubOptions(value) {
      this.loadSubOptions(value);
    },
    handleSelectTimestamp() {
      this.xTimestamp = this.getTimestamp(this.timestamp);
      HighCharts.chart(this.id, this.option);
    },
    handleSelectAlgorithm(value) {
      this.algorithm = value
      // this.showCPUCharts();
      // HighCharts.chart(this.id, this.option)
      HighCharts.chart("prediction", this.option).redraw();
    },
    handleSelectMatrix(value) {
      this.item = this.options.find((item) => {
        return item.value === value
      })
      this.matrix = this.item.label;
    },
    formatDate(time) {
      time = time * 1000
      let date = new Date(time)
      console.log(new Date(time))
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
</style>

<template>
  <el-container>
    <el-main>
      <el-main>
        <el-date-picker
            v-model="timestamp"
            type="datetime"
            style="margin-right: 20px"
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
<!--        <el-select v-model="hostname" placeholder="请选择" @change='handleSelectHostname'>-->
<!--          <el-option-->
<!--              v-for="item in hostNames"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.label">-->
<!--          </el-option>-->
<!--        </el-select>-->
        <div id="container"></div>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
var _this = {};
import {formatDate} from './formatDate'
import HighCharts from 'highcharts'
export default {
  name: "HardDecompose",
  data() {
    return {
      activeIndex: '1',
      records: [],
      arr: [],
      fromTime: '',
      flag: false,
      chartData: [],
      timestamp: new Date('2019-09-12 22:44:04'),
      chart: null,
      vmDetail: [],
      algorithm: 'xgboost',
      serverName: '',
      ser: [],
      hostname: 'compute01',
      xTimestamp: this.getTimestamp(new Date('2019-09-12 22:44:04')) - 1,
      hostNames: [
        {
          value: '选项1',
          label: 'compute01'
        },
        {
          value: '选项2',
          label: 'compute02'
        },
      ],
      Algorithms: [
        {
          value: '选项1',
          label: 'xgboost'
        }
      ],
      container: {
        chart: {
          type: 'variablepie'
        },
        title: {
          text: '物理机能耗值实时分解'
        },
        subtitle: {
          text: ''
        },
        tooltip: {
          headerFormat: '',
          animation: false,
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
              '能耗值 (瓦): <b>{point.y}</b><br/>'
        },
        loading: {
          showDuration: 10
        },
        series: [{
          minPointSize: 10,
          innerSize: '20%',
          zMin: 0,
          name: 'countries',
          data: []
        }]
      },
      item: {},
      idForm: {
        id: "1"
      },
      id: this.$route.params.id,
      id2: 2
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
    this.serverName = this.$route.params.serverName;
    this.getHardDecomposeData()
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
    async getHardDecomposeData() {
      try {
        let lidataUrl = 'http://10.160.109.63:8081/powerevaluate/' + this.xTimestamp + '/'+ this.xTimestamp + '/' + 'hardware/' + this.algorithm + '/' + this.serverName;
        let localUrl = "http://localhost:8085/yunprophet/decompose/body/data/" + this.xoptionTimestamp + '/' + this.algorithm + '/' + this.$route.params.serverName;
        const {data} = await this.$axios.get(lidataUrl);
        // this.ser = [{
        //   name: 'CPU',
        //   y: data.cpuPower,
        //   z: 92.9
        // }, {
        //   name: 'Disk',
        //   y: data.diskPower,
        //   z: 118.7
        // }, {
        //   name: 'Memory',
        //   y: data.memPower,
        //   z: 124.6
        // },{
        //   name: 'Net',
        //   y: data.netPower,
        //   z: 124.6
        // },{
        //   name: 'Other',
        //   y: data.otherPower,
        //   z: 124.6
        // }];
        this.ser = [{
          name: 'CPU',
          y: data.cpuPower[0],
          z: 92.9
        }, {
          name: 'Disk',
          y: data.diskPower[0],
          z: 118.7
        }, {
          name: 'Memory',
          y: data.memPower[0],
          z: 124.6
        },{
          name: 'Net',
          y: data.netPower[0],
          z: 124.6
        },{
          name: 'Other',
          y: data.otherPower[0],
          z: 124.6
        }];
        this.container.title.text = '物理机' + this.serverName + '能耗分解';
        this.container.series[0].data = this.ser;
        HighCharts.chart('container', this.container);
      } catch (e) {
        // this.$message.error("请求用户数据失败，请稍后再试！");
      }
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    handleSelectTimestamp() {
      this.xTimestamp = this.getTimestamp(this.timestamp);
      this.getHardDecomposeData();
    },
    handleSelectAlgorithm(value) {
      this.algorithm = value
      this.getHardDecomposeData();
    },
    handleSelectHostname(value) {
      this.hostname = value
      this.getHardDecomposeData();
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
#container {
  min-width: 300px;
  max-width: 800px;
  height: 400px;
  margin: 1em auto;
  padding-top: 50px;
}
</style>

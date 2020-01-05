<template>
  <div class="container">
    <div class="functions-area">
      <div id="functions">
        <el-card style="grid-area: a; " body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>成功率</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="SuccRate" :ei.sync="ei1" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: b;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="IORate" :ei.sync="ei2" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: c;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="workLoad1" :ei.sync="ei3" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: d;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="workLoad2" :ei.sync="ei4" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: e;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="PredictError" :ei.sync="ei5" style="height: 100%"></VueEcharts>
          </div>
        </el-card>
      </div>
    </div>
    <!-- <VueEcharts :option="option" :ei.sync="ei"></VueEcharts> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ECharts } from "echarts";

@Component({})
export default class DashboardView extends Vue {
  public emphasisStyle = {
    itemStyle: {
      barBorderWidth: 1,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: "rgba(0,0,0,0.5)"
    }
  };
  public PredictError = {
    legend: {
      data: ["pred", "real", "error"],
      left: 1,
      orient: "vertical"
    },
    title: {
      text: "预测误差",
      left: "center"
    },
    xAxis: {
      data: (function (){
                let now = new Date();
                let res = [];
                let len = 8;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(Number(now) - 2000);
                }
                return res;
            })(),
      name: "X Axis",
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false }
    },
    yAxis: {
      inverse: true,
      splitArea: { show: false }
    },
    grid: {
      left: 100
    },
    series: [
      {
        name: "bar",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        data: [-69, -70, -65, -74, -69, -70, -63, -75]
      },
      {
        name: "bar2",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        data: [71, 73, 68, 79, 65, 78, 68, 70]
      },
      {
        name: "bar3",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        data: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
      }
    ]
  };
  public SuccRate = {
    title: {
      text: "成功率",
      left: "center"
    },
    xAxis: {
      type: "category",
      data: (function (){
                let now = new Date();
                let res = [];
                let len = 15;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(Number(now) - 2000);
                }
                return res;
            })()
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [81, 82, 83, 84, 84, 83, 80, 81, 85, 79, 80, 82, 83, 81, 76],
        type: "line"
      }
    ]
  };
  public IORate = {
    title: {
      text: "吞吐率",
      left: "center"
    },
    xAxis: {
      type: "category",
      data: (function (){
                let now = new Date();
                let res = [];
                let len = 15;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(Number(now) - 2000);
                }
                return res;
            })()
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [81, 82, 83, 84, 84, 83, 80, 81, 85, 79, 80, 82, 83, 81, 76],
        type: "line"
      }
    ]
  };
  public workLoad1 = {
    title: {
      text: "任务负载",
      left: "center"
    },
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: "业务指标",
        type: "gauge",
        detail: { formatter: "{value}%" },
        data: [{ value: 50, name: "完成率" }]
      }
    ]
  };
  public workLoad2 = {
    title: {
      text: "任务负载",
      left: "center"
    },
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: "业务指标",
        type: "gauge",
        detail: { formatter: "{value}%" },
        data: [{ value: 50, name: "完成率" }]
      }
    ]
  };
  private ei1: any | ECharts = {};
  private ei2: any | ECharts = {};
  private ei3: any | ECharts = {};
  private ei4: any | ECharts = {};
  private ei5: any | ECharts = {};

  public mounted() {
    setInterval(() => {
      let randBase = 30 // 任务基准数目
      let randPM1 = Math.random(); // 任务判断+/-
      let randPM2 = Math.random(); // 成功率判断+/-
      let randPM3 = Math.random(); // 失败占(失败+未完成)的比例
      let randBias1 = parseInt((Math.random() * 10).toFixed(1)); // 加减任务值
      let succPercentBase = 85; // 成功率基准值
      let randBias2 = Math.random() * 5 + 7; // 变化范围
      let WorkNum = 0;
      let surate = 0;
      let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''); // 当前时间
      if (randPM1 > 0.5) {
        WorkNum = randBase + randBias1;
      }
      else WorkNum = randBase - randBias1;

      if (randPM2 > 0.5) {
        surate = succPercentBase * (1 + randBias2 / 100)
      }
      else surate = succPercentBase * (1 - randBias2 / 100)
      let wkload = ((WorkNum * (1 - surate/100) * randPM3 + WorkNum * surate)/WorkNum).toFixed(2)
      
      this.workLoad1.series[0].data[0].value =parseFloat(wkload);
      this.SuccRate.series[0].data.shift()
      this.SuccRate.series[0].data.push(surate)
      this.SuccRate.xAxis.data.shift()
      this.SuccRate.xAxis.data.push(axisData)

      this.IORate.series[0].data.shift()
      this.IORate.series[0].data.push(parseFloat(wkload))
      this.IORate.xAxis.data.shift()
      this.IORate.xAxis.data.push(axisData)
    }, 2000);
    setInterval(()=> {
      let realTimeBase = 75;
      let randPM4 = Math.random(); // 判断真实+/-
      let randPM5 = Math.random(); // 判断预测+/-
      let realTime = 0;
      let predTime = 0;
      
      if (randPM4 > 0.5)
      {realTime = realTimeBase + (Math.random() * 0.3 + 1)}
      else
      {realTime = realTimeBase - (Math.random() * 0.3 + 1)}

      if(randPM5 > 0.5) {predTime = realTime + (Math.random() * 0.1 + 1)}
      else {predTime = realTime - (Math.random() * 0.1 + 1)}
      let err = realTime - predTime;
      let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''); // 当前时间
      this.PredictError.series[0].data.shift()
      this.PredictError.series[0].data.push(parseFloat((-predTime).toFixed(2)))
      this.PredictError.series[1].data.shift()
      this.PredictError.series[1].data.push(parseFloat((realTime).toFixed(2)))
      this.PredictError.series[2].data.shift()
      this.PredictError.series[2].data.push(parseFloat((err).toFixed(2)))
      this.PredictError.xAxis.data.shift()
      this.PredictError.xAxis.data.push(axisData)
    }, 2000)
  }
}
</script>


<style lans="scss" scoped>
#functions {
  display: grid;
  grid-template-areas:
    "a a b"
    "c d e";
  grid-template-rows: repeat(2, 48%);
  grid-template-columns: repeat(2, 33.3%);
  grid-gap: 0.6rem;
  height: 100%;
}
.container {
  background: transparent;
  height: 100%;
}
.functions-area {
  height: 100%;
}
.text-item {
  height: 100%;
}
</style>

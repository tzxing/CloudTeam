<template>
  <div class="container">
    <div class="functions-area">
      <div id="functions">
        <el-card style="grid-area: a; " body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>成功率</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="SuccRate" :ei.sync="ei" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: b;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="IORate" :ei.sync="ei" style="z: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: c;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="workLoad" :ei.sync="ei" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: d;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts  :option="workLoad" :ei.sync="ei" style="height: 100%"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: e;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="PredictError" :ei.sync="ei" style="height: 100%"></VueEcharts>
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
      data: ["bar", "bar2", "bar3"],
      left: 10,
      orient: "vertical"
    },
    title: {
      text: "预测误差",
      left: "center"
    },
    xAxis: {
      data: [1, 2, 3, 4, 5, 6, 7, 8],
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
        data: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      {
        name: "bar2",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        data: [2, 3, 4, 5, 6, 7, 8, 9]
      },
      {
        name: "bar3",
        type: "bar",
        stack: "two",
        emphasis: this.emphasisStyle,
        data: [3, 4, 5, 6, 7, 8, 9, 10]
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
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
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
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }
    ]
  };
  public workLoad = {
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
  private ei: any | ECharts = {};
}
// setInterval(function () {
//     workLoad.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//     // .setOption(this.workLoad, true);
// },2000);
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

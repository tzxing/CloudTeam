<template>
  <div>
    <VueEcharts :option="option" :ei.sync="ei"></VueEcharts>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ECharts } from "echarts";

export default class DashboardView extends Vue {
  private option = {
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
  private ei: any | ECharts = {};
}
</script>

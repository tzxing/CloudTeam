<template>
  <div class="container">
    <div class="functions-area">
      <div id="functions">
        <el-card style="grid-area: a; " body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>部署硬件利用比率DH-UR</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="QoS" :ei.sync="ei1" style="height: 100%" theme="walden"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: b;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="IORate" :ei.sync="ei2" style="height: 100%" theme="walden"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: c;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="workLoad1" :ei.sync="ei2" style="height: 100%" theme="walden"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: d;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="workLoad2" :ei.sync="ei4" style="height: 100%" theme="walden"></VueEcharts>
          </div>
        </el-card>

        <el-card style="grid-area: e;" body-style="height: 100%">
          <!-- <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>-->
          <div class="text-item">
            <VueEcharts :option="PredictError" :ei.sync="ei5" style="height: 100%" theme="walden"></VueEcharts>
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
import "./DashTheme/walden.js";
import echarts from "echarts";
import axios from "axios";

@Component({})
export default class DashboardView extends Vue {

  qosList: number[] = [] as any[];
  startTimestamp: string = '1'
  endTimestamp: string = '20'
  qosNum: never = 0 as never;
  timer: number = 0

  async getQoSListInit() {
    try {
      let url = 'http://10.160.109.63:8081/dcevaluate/' + this.startTimestamp + '/' + this.endTimestamp +'/qos/brb/' + this.$route.params.serverName;
      const {data} = await axios.get(url);
      this.qosList = data.values;
      this.QoS.series[0].data = this.qosList as never;
      this.startTimestamp = '20';
      this.endTimestamp = '21'
    } catch (e) {
      this.$message.error("请求数据失败，请稍后再试！");
    }
  }

  async getQoSList() {
    try {
      let url = 'http://10.160.109.63:8081/dcevaluate/' + this.startTimestamp + '/' + this.endTimestamp +'/qos/brb/' + this.$route.params.serverName;
      const {data} = await axios.get(url);
      this.qosNum = data.values[0] as never;
    } catch (e) {
      this.$message.error("请求数据失败，请稍后再试！");
    }
  }

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
      left: 10
    },
    title: {
      text: "部署硬件利用比率(DH-UR)",
      left: "center"
    },
    xAxis: {
      data: (function() {
        let now = new Date();
        let res = [];
        let len = 8;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
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
        name: "pred",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        smooth: true,
        data: [-69, -70, -65, -74, -69, -70, -63, -75]
      },
      {
        name: "real",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        data: [71, 73, 68, 79, 65, 78, 68, 70]
      },
      {
        name: "error",
        type: "bar",
        stack: "one",
        emphasis: this.emphasisStyle,
        data: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
      }
    ]
  };
  public QoS = {

    title: {
      text: "服务质量(QoS)",
      left: "center"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: (function() {
        let now = new Date();
        let res = [];
        let len = 19;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
          now = new Date(Number(now) - 5000);
        }
        return res;
      })(),
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [],
        type: "line",
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: "rgb(255, 70, 131)"
        },
        areaStyle: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#516b91"
          //   },
          //   {
          //     offset: 1,
          //     color: "#59c4e6"
          //   }
          // ])
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)"
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)"
            }
          ])
        }
      }
    ]
  };
  public IORate = {
    title: {
      text: "能量比例(EP)",
      left: "center"
    },
    xAxis: {
      type: "category",
      data: (function() {
        let now = new Date();
        let res = [];
        let len = 15;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
          now = new Date(Number(now) - 120000);
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
        type: "line",
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#516b91"
            },
            {
              offset: 1,
              color: "#59c4e6"
            }
          ])
        }
      }
    ]
  };

  public workLoad1 = {
    title: {
      text: "动态范围(DR)",
      left: "center"
    },

    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },

    series: [
      {
        type: "gauge",
        detail: {
          formatter: "{value}%",
          fontSize: window.innerHeight / 30,
          offsetCenter: [0, "5%"]
        },
        data: [{ value: 76.3 }],
        axisTick: {
          splitNumber: 100,
          lineStyle: {
            width: 3,
            color: {
              //  image: document.getElementById('img'),
              //  repeat: 'no-repeat'
              type: "radial",
              x: 1,
              y: 1,
              r: 2,
              colorStops: [
                {
                  offset: 0,
                  color: "#4bcad5" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#272961" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          },
          length: 20
        },
        pointer: { show: false },
        splitNumber: 1,
        splitLine: { show: false },
        axisLine: {
          // 坐标轴线
          show: false,
          lineStyle: {
            width: 20,
            opacity: 0
          }
        }
      }
    ]
  };
  public workLoad2 = {
    title: {
      text: "线性偏差(LD)",
      left: "center"
    },

    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },

    series: [
      {
        type: "gauge",
        detail: {
          formatter: "{value}%",
          fontSize: window.innerHeight / 30,
          offsetCenter: [0, "5%"]
        },
        data: [{ value: 76.3 }],
        axisTick: {
          splitNumber: 100,
          lineStyle: {
            width: 3,
            color: {
              //  image: document.getElementById('img'),
              //  repeat: 'no-repeat'
              type: "radial",
              x: 1,
              y: 1,
              r: 2,
              colorStops: [
                {
                  offset: 0,
                  color: "#4bcad5" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#272961" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          },
          length: 20
        },
        pointer: { show: false },
        splitNumber: 1,
        splitLine: { show: false },
        axisLine: {
          // 坐标轴线
          show: false,
          lineStyle: {
            width: 20,
            opacity: 0
          }
        }
      }
    ]
  };
  public treeDataURI =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC";

  public NodeNum = 46;

  // Make fake data.
  public makeCategoryData() {
    var categoryData = [];
    let count = 4;
    for (var i = 0; i < count; i++) {
      categoryData.push(i + "a");
    }
    return categoryData;
  }

  public makeSeriesData(year: number, negative: boolean) {
    // make a fake value just for demo.
    let r = (year + 1) * 10;
    let seriesData = [];
    let lineCount = 4;

    for (let i = 0; i < lineCount; i++) {
      let sign = negative
          ? -1 * (i % 3 ? 0.9 : 1)
          : 1 * ((i + 1) % 3 ? 0.9 : 1);
      seriesData.push({
        // value: 0,
        value:
            sign *
            (year <= 1
                ? Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5
                    ? 5
                    : 0
                : (10 - Math.abs(i - lineCount / 2 + 0.5)) * r),
        symbolOffset: i % 2 ? ["50%", 0] : null
      });
    }
    // console.log("test");
    // console.log(r, year, seriesData, negative);
    return seriesData;
  }
  private ei1: any | ECharts = {};
  private ei2: any | ECharts = {};
  private ei3: any | ECharts = {};
  private ei4: any | ECharts = {};
  private ei5: any | ECharts = {};

  public beforeDestroy() {
    clearTimeout(this.timer)
  }

  public mounted() {
    // let img1 = new Image();
    // img1.src = './DashTheme/linear_pig.jpeg';
    // img1.id = "img"
    // img1.alt = 'alt';
    // document.body.appendChild(img1);
    // console.log(document.getElementById('img'))
    this.getQoSListInit();
    this.getQoSList();
    this.timer = window.setInterval(() => {
      let randBase = 30; // 任务基准数目
      let randPM1 = Math.random(); // 任务判断+/-
      let randPM2 = Math.random(); // 成功率判断+/-
      let randPM3 = Math.random(); // 失败占(失败+未完成)的比例
      let randBias1 = parseInt((Math.random() * 10).toFixed(1)); // 加减任务值
      let succPercentBase = 40; // 成功率基准值
      let randBias2 = Math.random() * 5 + 7; // 变化范围
      let WorkNum = 0;
      let surate = 0;
      let Qos = 0 as never;
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, ""); // 当前时间
      if (randPM1 > 0.5) {
        WorkNum = randBase + randBias1;
      } else WorkNum = randBase - randBias1;

      if (randPM2 > 0.5) {
        surate = succPercentBase * (1 + randBias2 / 100);
      } else surate = succPercentBase * (1 - randBias2 / 100);
      let wkload = (
          (WorkNum * (1 - surate / 100) * randPM3 + WorkNum * surate) /
          WorkNum
      ).toFixed(2);
      this.startTimestamp = this.endTimestamp;
      this.endTimestamp = (parseInt(this.endTimestamp) + 1).toString();
      this.getQoSList();
      Qos = this.qosNum;
      this.workLoad1.series[0].data[0].value = parseFloat(wkload);
      this.QoS.series[0].data.shift();
      this.QoS.series[0].data.push(Qos);
      this.QoS.xAxis.data.shift();
      this.QoS.xAxis.data.push(axisData);
      this.IORate.series[0].data.shift();
      this.IORate.series[0].data.push(parseFloat(wkload));
      this.IORate.xAxis.data.shift();
      this.IORate.xAxis.data.push(axisData);
    }, 5000);
    setInterval(() => {
      let realTimeBase = 75;
      let randPM4 = Math.random(); // 判断真实+/-
      let randPM5 = Math.random(); // 判断预测+/-
      let realTime = 0;
      let predTime = 0;

      if (randPM4 > 0.5) {
        realTime = realTimeBase + (Math.random() * 0.3 + 1);
      } else {
        realTime = realTimeBase - (Math.random() * 0.3 + 1);
      }

      if (randPM5 > 0.5) {
        predTime = realTime + (Math.random() * 0.1 + 1);
      } else {
        predTime = realTime - (Math.random() * 0.1 + 1);
      }
      let err = realTime - predTime;
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, ""); // 当前时间
    }, 2000);
  }
}
</script>


<style lans="scss" scoped>
#functions {
  display: grid;
  /*grid-template-areas:*/
  /*  "a b"*/
  /*  "c d";*/
  /*grid-template-rows: repeat(2, 48%);*/
  /*grid-template-columns: repeat(2, 50%);*/
  /*grid-gap: 0.6rem;*/
  /*height: 100%;*/
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
.pstyle {
  height: 100%;
  font-size: 40px;
  color: #6b6854;
  /* top: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #cff;
}
</style>

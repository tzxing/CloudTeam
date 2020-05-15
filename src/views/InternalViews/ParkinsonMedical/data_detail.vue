<template>
  <div class="data_detail">
    {{this.$route.query.id}}
    <el-form
      ref="form"
      :model="form"
      label-width="200px"
    >
      <el-form-item label="请选择要查看的数据：">
        <el-select
          v-model="form.dataset"
          placeholder="数据集"
        >
          <el-option
            label="测试数据1"
            value="1"
          />
          <el-option
            label="测试数据2"
            value="2"
          />
        </el-select>
        <el-button
          type="primary"
          label-width="200px"
          @click="goBack"
          style="float:right; margin-right:750px"
        >
          返回
        </el-button>
      </el-form-item>
    </el-form><!-- 头部 -->
    <div id="myEcharts" style="height: 400px;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class datadetailView extends Vue {
  private form = {
    dataset: '2',
    id: '',
    /* 下面表格相关 */
    base : +new Date(1968, 9, 3),
    oneDay : 24 * 3600 * 1000,
    date: [] as Array<string>, //强制令date为string类型
    data: [Math.random() * 300] as Array<number>,

  };
  collapse = false;
  activeIndex = "";
  dialogVisible = false;

  public $echarts: any;
  private options: object = {
    title: {
        text: '测试数据1'
    },
    tooltip : {
        trigger: 'axis',
        
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : this.form.date
        }
    ],
    yAxis : [
        {
            type : 'value',
            boundaryGap : [0, '100%']
        }
    ],
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [{
        name: '模拟数据',
        data: this.form.data,
        sampling: 'average',
        smooth: true,
        symbol: 'none',
        itemStyle: {
                 color: 'rgb(113,174,230)'
             },
        type: 'line'
    }]
  };
  private mounted() {
    this.form.id = String(this.$route.query.id);

    for(var i:number = 1; i < 20000; i++){
      var now:Date = new Date(this.form.base += this.form.oneDay);
      this.form.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
      this.form.data.push(Math.round((Math.random() - 0.5) * 20 + this.form.data[i - 1]));
    }

    const ele = document.getElementById('myEcharts');
    const chart: any = this.$echarts.init(ele);
    chart.setOption(this.options);
  }
  
  goBack() {
    this.$router.push({
      path:`pardata`
    })
  }
}
</script>
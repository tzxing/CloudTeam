<template>
  <div class="data_detail">
    <!-- {{this.$route.query.username}} -->
    <el-form
      :inline="true"
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="数据集">
        <el-select
          v-model="form.dataset"
          placeholder="请选择要查看的数据集"
        >
          <el-option
            v-for="item in form.datasetList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="时间区间">
        <el-select
          v-model="form.duration"
          placeholder="请选择要查看的时间区间"
          @change="durationChange"
        >
          <el-option
            v-for="item in form.durationList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="数据精度">
        <el-select
          v-model="form.precision"
          placeholder="请选择曲线的数据绘制精度"
        >
          <el-option
            v-for="item in form.precisionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="dataGraph"
        >
          查看数据
        </el-button>
        <el-button
          type="primary"
          plain
          label-width="200px"
          @click="goBack"
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
    datasetList:[//数据集下拉菜单内容
      { value:'acce_x0', label:'x轴加速度' },
      { value:'gyro_x0', label:'x轴陀螺仪' }
    ],
    dataset: '',
    durationList:[//数据集下拉菜单内容
      { value:'1h', label:'过去1小时' },
      { value:'8h', label:'过去8小时' },
      { value:'24h', label:'过去24小时' },
      { value:'7d', label:'过去一周内' },
      { value:'30d', label:'过去一月内' }
    ],
    duration:'',
    precisionList:[] as Array< {value: string; label: string} >,
    precision:'',
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
            data : [] as Array<string>
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
        data: [] as Array<number>,
        sampling: 'average',
        smooth: true,
        symbol: 'none',
        itemStyle: {
                 color: 'rgb(113,174,230)'
             },
        type: 'line'
    }]
  };
  // private mounted() {
  //   this.form.id = String(this.$route.query.id);
  //   // for(var i:number = 1; i < 20000; i++){
  //   //   var now:Date = new Date(this.form.base += this.form.oneDay);
  //   //   this.form.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  //   //   this.form.data.push(Math.round((Math.random() - 0.5) * 20 + this.form.data[i - 1]));
  //   // }
  //   // this.drawBarChart();
  // }
  
 async drawBarChart(selectdataset:any,pasttime:any,grouptime:any){
    const ele = document.getElementById('myEcharts');
    const chart: any = this.$echarts.init(ele);
    chart.setOption(this.options);
    chart.showLoading();
    try {
      const { data:{output,time} } = await this.$axios.post(
        "medical/find_acceleration_data",
        {username:String(this.$route.query.username),selectdataset:selectdataset,pasttime:pasttime,grouptime:grouptime,}
      );
      // this.form.date=gyro_z0;
      // this.form.data=time
      chart.hideLoading();
      chart.setOption({
      xAxis:[{data:time}],
      series:[{data:output}]
    })
    } catch (e) {
      this.$message.error("信息拉取失败，请稍后再试！");
    }
  }

  durationChange() { //当时间区间变化的时候触发的函数
    this.form.precision = '';
    switch (this.form.duration) {
    case '1h': //过去1小时
      this.form.precisionList = [
        { value:'5s', label:'每5秒' },
        { value:'30s', label:'每30秒' },
        { value:'1m', label:'每分钟' },
        { value:'5m', label:'每5分钟' },
      ];
      break;
    case '8h': //过去8小时
      this.form.precisionList = [
        { value:'1m', label:'每分钟' },
        { value:'5m', label:'每5分钟' },
        { value:'30m', label:'每半小时' },
        { value:'1h', label:'每小时' },
      ];
      break;
    case '24h': //过去24小时
      this.form.precisionList = [
        { value:'30m', label:'每半小时' },
        { value:'1h', label:'每小时' },
        { value:'6h', label:'每6小时' },
        { value:'12h', label:'每12小时' },
      ];
      break;
    case '7d': //过去一周内
      this.form.precisionList = [
        { value:'1h', label:'每小时' },
        { value:'6h', label:'每6小时' },
        { value:'12h', label:'每12小时' },
        { value:'24h', label:'每24小时' },
      ];
      break;
    case '30d': //过去一月内
      this.form.precisionList = [
        { value:'1h', label:'每小时' },
        { value:'6h', label:'每6小时' },
        { value:'12h', label:'每12小时' },
        { value:'24h', label:'每24小时' },
      ];
      break;
    }
  }

  dataGraph() { //按下绘图按钮的时候触发的函数
    if(this.form.dataset != '' && this.form.duration != '' && this.form.precision != '') {
      //写和服务器的交互语句，dataset、duration、precision三个变量分别储存用户在下拉菜单中的选择项
      this.drawBarChart(this.form.dataset,this.form.duration,this.form.precision); //可以直接调用吗？
    }
    else
      this.$message({
        message: '请选择前面下拉菜单内容',
        type: 'warning'
      })
  }

  goBack() { //按下返回按钮时路由跳转
    this.$router.push({
      path:`pardata`
    })
  }
}
</script>
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
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="form.datevalue"
            type="datetimerange"
            :picker-options="form.pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="durationChange"
            style="width: 380px;">
          </el-date-picker>
        </div>
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

    pickerOptions: {
      shortcuts: [{
        text: '最近一天',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一周',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近半个月',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近半年',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一年',
        onClick(picker:any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    datevalue: [] as Array<Date>, //储存选择的时间区间

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
      const { data:{output,time} } = 
      await this.$axios.post(
        "medical/find_acceleration_data",
        {username:String(this.$route.query.username),selectdataset:selectdataset,pasttime:pasttime,grouptime:grouptime}
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
    let startTime = this.form.datevalue[0].getTime(); //getTime()函数返回距1970年1月1日的毫秒数
    let endTime = this.form.datevalue[1].getTime();
    let duration = (endTime - startTime)/1000/3600/24; //得到按天为单位的时间间隔
    let category : number;

    if(duration < 3) category = 1; //第1类表示3天之内
    else if(duration >= 3 && duration < 10) category = 2; //3到10天
    else if(duration >= 10 && duration < 45) category = 3; //10到45天
    else if(duration >= 45 && duration < 180) category = 4; //45天到半年
    else if(duration >= 180 && duration < 540) category = 5; //半年到一年半
    else category = 6; //一年半以上

    switch (category) {
    case 1:
      this.form.precisionList = [
        { value:'5s', label:'每5秒' },
        { value:'30s', label:'每30秒' },
        { value:'1m', label:'每分钟' },
        { value:'5m', label:'每5分钟' },
      ];
      break;
    case 2: //3到10天
      this.form.precisionList = [
        { value:'1m', label:'每分钟' },
        { value:'5m', label:'每5分钟' },
        { value:'30m', label:'每半小时' },
        { value:'1h', label:'每小时' },
      ];
      break;
    case 3: //10到45天
      this.form.precisionList = [
        { value:'1h', label:'每小时' },
        { value:'6h', label:'每6小时' },
        { value:'12h', label:'每12小时' },
        { value:'1d', label:'每24小时' },
      ];
      break;
    case 4: //45天到半年
      this.form.precisionList = [
        { value:'6h', label:'每6小时' },
        { value:'12h', label:'每12小时' },
        { value:'1d', label:'每24小时' },
        { value:'7d', label:'每周' },
      ];
      break;
    case 5: //半年到一年半
      this.form.precisionList = [
        { value:'12h', label:'每12小时' },
        { value:'1d', label:'每24小时' },
        { value:'7d', label:'每周' },
        { value:'14d', label:'每两周' },
      ];
      break;
    case 6: //一年半以上
      this.form.precisionList = [
        { value:'1d', label:'每天' },
        { value:'7d', label:'每周' },
        { value:'14d', label:'每两周' },
        { value:'30d', label:'每月' },
      ];
      break;
    }
  }

  dataGraph() { //按下绘图按钮的时候触发的函数
    if(this.form.dataset != '' && this.form.datevalue != [] && this.form.precision != '') {
      //写和服务器的交互语句，dataset、duration、precision三个变量分别储存用户在下拉菜单中的选择项
      this.drawBarChart(this.form.dataset,this.form.datevalue,this.form.precision); //接口要如何改动？
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
<template>
  <div class="data_detail">
    <!-- {{this.$route.query.username}} -->
    <el-row>
      <el-col :span="24"><div style="font-size:20px;"><i class="el-icon-edit-outline"></i> 手部传感器数据</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div style="margin-top:40px;">
          <el-form
            :inline="false"
            ref="form_hand"
            :model="form_hand"
            label-width="70px"
          >
            <el-form-item label="数据集">
              <el-select
                v-model="form_hand.dataset"
                placeholder="请选择要查看的数据集"
                style="width: 360px;"
              >
                <el-option
                  v-for="item in form_hand.datasetList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          <el-form-item label="特征选择">
              <el-select
                v-model="form_hand.characteristicset"
                placeholder="请选择要查看的特征"
                style="width: 360px;"
              >
                <el-option
                  v-for="item in form_hand.characteristicList"
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
                  v-model="form_hand.datevalue"
                  type="datetimerange"
                  :picker-options="form_hand.pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  style="width: 360px;">
                </el-date-picker>
              </div>
            </el-form-item>
            
            <div style="text-align:center;">
              <el-button
                type="primary"
                @click="drawChart_judge_hand"
              >
                查看数据
              </el-button>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <div id="echarts_hand" style="height: 350px;"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div style="font-size:20px;"><i class="el-icon-edit-outline"></i> 脚部传感器数据</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div style="margin-top:40px;">
          <el-form
            :inline="false"
            ref="form_foot"
            :model="form_foot"
            label-width="70px"
          >
            <el-form-item label="数据集">
              <el-select
                v-model="form_foot.dataset"
                placeholder="请选择要查看的数据集"
                style="width: 360px;"
              >
                <el-option
                  v-for="item in form_foot.datasetList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          <el-form-item label="特征选择">
              <el-select
                v-model="form_foot.characteristicset"
                placeholder="请选择要查看的特征"
                style="width: 360px;"
              >
                <el-option
                  v-for="item in form_foot.characteristicList"
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
                  v-model="form_foot.datevalue"
                  type="datetimerange"
                  :picker-options="form_foot.pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  style="width: 360px;">
                </el-date-picker>
              </div>
            </el-form-item>

            <div style="text-align:center;">
              <el-button
                type="primary"
                @click="drawChart_judge_foot"
              >
                查看数据
              </el-button>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <div id="echarts_foot" style="height: 350px;"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div style="font-size:20px;"><i class="el-icon-edit-outline"></i> 关键指标</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div style="margin-top:40px;">
          <el-form
            :inline="false"
            ref="form_result"
            :model="form_result"
            label-width="70px"
          >
            <el-form-item label="数据集">
              <el-select
                v-model="form_result.dataset"
                placeholder="请选择要查看的数据集"
                style="width: 360px;"
              >
                <el-option
                  v-for="item in form_result.datasetList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          <el-form-item label="特征选择">
              <el-select
                v-model="form_result.characteristicset"
                placeholder="请选择要查看的特征"
                style="width: 360px;"
              >
                <el-option
                  v-for="item in form_result.characteristicList"
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
                  v-model="form_result.datevalue"
                  type="datetimerange"
                  :picker-options="form_result.pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  style="width: 360px;">
                </el-date-picker>
              </div>
            </el-form-item>
            
            <div style="text-align:center;">
              <el-button
                type="primary"
                @click="drawChart_judge_result"
              >
                查看数据
              </el-button>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <div id="echarts_result" style="height: 350px;"></div>
        </div>
      </el-col>
    </el-row>
    
     <!-- <el-popover
      placement="bottom"
      width="300"
      trigger="click"
      :hidden="(form_hand.dataset=='divided'?false:true)||(!form_hand.chartStatus)">
      <el-table :data="form_hand.resultList" :show-header="true">
        <el-table-column width="200" property="property" label="属性"></el-table-column>
        <el-table-column width="100" property="value" label="值"></el-table-column>
      </el-table>
      <el-button slot="reference">数据概况</el-button>
    </el-popover> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class datadetailView extends Vue {
  private form_hand = {
    datasetList:[//数据集下拉菜单内容
      { value:'acce_x', label:'x轴加速度' },
      { value:'acce_y', label:'y轴加速度' },
      { value:'acce_z', label:'z轴加速度' },
      { value:'gyro_x', label:'x轴陀螺仪' },
      { value:'gyro_y', label:'y轴陀螺仪' },
      { value:'gyro_z', label:'z轴陀螺仪' },
    ],
    dataset: 'acce_x',
    characteristicList:[//数据集下拉菜单内容
      { value:'initial', label:'原始数据' },
      { value:'mean', label:'均值' },
      { value:'covariance', label:'方差' },
      { value:'maximum', label:'最大值' },
      { value:'minimum', label:'最小值' },
      { value:'overzero', label:'过零点' },
      { value:'power', label:'能量' },
      { value:'tremor', label:'震颤判断结果' },
    ],
    characteristicset: 'initial',
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

    // precisionList:[] as Array< {value: string; label: string} >,
    // precision:'5s',
    id: '',
    /* 下面表格相关 */
    base : +new Date(1968, 9, 3),
    oneDay : 24 * 3600 * 1000,
    date: [] as Array<string>, //强制令date为string类型
    data: [Math.random() * 300] as Array<number>,

    resultList: [ //详情结果储存表单，需要根据要求留出接口
      {
        property: '区间长度/小时',
        value: '25'
      }, {
        property: '区间采样数据点数',
        value: '3450'
      }, {
        property: '疑似异常数据点数',
        value: '1239'
      }, {
        property: '异常比例',
        value: '35.91%'
      }
    ],
    chartStatus: false,

  };

  private form_foot = {
    datasetList:[//数据集下拉菜单内容
      { value:'acce_x', label:'x轴加速度' },
      { value:'acce_y', label:'y轴加速度' },
      { value:'acce_z', label:'z轴加速度' },
      { value:'gyro_x', label:'x轴陀螺仪' },
      { value:'gyro_y', label:'y轴陀螺仪' },
      { value:'gyro_z', label:'z轴陀螺仪' },
    ],
    dataset: 'acce_x',
    characteristicList:[//数据集下拉菜单内容
      { value:'initial', label:'原始数据' },
      { value:'mean', label:'均值' },
      { value:'covariance', label:'方差' },
      { value:'maximum', label:'最大值' },
      { value:'minimum', label:'最小值' },
      { value:'overzero', label:'过零点' },
      { value:'power', label:'能量' },
      { value:'tremor', label:'震颤判断结果' },
    ],
    characteristicset: 'initial',
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
    precision:'5s',
    id: '',
    /* 下面表格相关 */
    base : +new Date(1968, 9, 3),
    oneDay : 24 * 3600 * 1000,
    date: [] as Array<string>, //强制令date为string类型
    data: [Math.random() * 300] as Array<number>,

    resultList: [ //详情结果储存表单，需要根据要求留出接口
      {
        property: '区间长度/小时',
        value: '25'
      }, {
        property: '区间采样数据点数',
        value: '3450'
      }, {
        property: '疑似异常数据点数',
        value: '1239'
      }, {
        property: '异常比例',
        value: '35.91%'
      }
    ],
    chartStatus: false,

  };

  private form_result = {
    datasetList:[//数据集下拉菜单内容
      { value:'acce_x', label:'x轴加速度' },
      { value:'acce_y', label:'y轴加速度' },
      { value:'acce_z', label:'z轴加速度' },
      { value:'gyro_x', label:'x轴陀螺仪' },
      { value:'gyro_y', label:'y轴陀螺仪' },
      { value:'gyro_z', label:'z轴陀螺仪' },
    ],
    dataset: 'acce_x',
    characteristicList:[//数据集下拉菜单内容
      { value:'initial', label:'原始数据' },
      { value:'mean', label:'均值' },
      { value:'covariance', label:'方差' },
      { value:'maximum', label:'最大值' },
      { value:'minimum', label:'最小值' },
      { value:'overzero', label:'过零点' },
      { value:'power', label:'能量' },
      { value:'tremor', label:'震颤判断结果' },
    ],
    characteristicset: 'initial',
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
    precision:'5s',
    id: '',
    /* 下面表格相关 */
    base : +new Date(1968, 9, 3),
    oneDay : 24 * 3600 * 1000,
    date: [] as Array<string>, //强制令date为string类型
    data: [Math.random() * 300] as Array<number>,

    resultList: [ //详情结果储存表单，需要根据要求留出接口
      {
        property: '区间长度/小时',
        value: '25'
      }, {
        property: '区间采样数据点数',
        value: '3450'
      }, {
        property: '疑似异常数据点数',
        value: '1239'
      }, {
        property: '异常比例',
        value: '35.91%'
      }
    ],
    chartStatus: false,

  };
  collapse = false;
  activeIndex = "";
  dialogVisible = false;

  public $echarts: any;
  
  ele_hand: any;
  ele_foot: any;
  ele_result: any;
  chart_hand: any;
  chart_foot: any;
  chart_result: any;
  // public options: object = {
  //   title: {
  //       text: '测试数据1'
  //   },
  //   tooltip : {
  //       trigger: 'axis',
        
  //       axisPointer: {
  //           type: 'cross',
  //           label: {
  //               backgroundColor: '#6a7985'
  //           }
  //       }
  //   },
  //   toolbox: {
  //       feature: {
  //         saveAsImage: {}
  //       }
  //   },
  //   grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       containLabel: true
  //   },
  //   xAxis : [
  //       {
  //           type : 'category',
  //           boundaryGap : false,
  //           data : [] as Array<string>
  //       }
  //   ],
  //   yAxis : [
  //       {
  //           type : 'value',
  //           boundaryGap : [0, '100%']
  //       }
  //   ],
  //   dataZoom: [
  //                   {   // 这个dataZoom组件，默认控制x轴。
  //                       type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
  //                       start: 10,      // 左边在 10% 的位置。
  //                       end: 60         // 右边在 60% 的位置。
  //                   }
  //               ],
  //   series: [{
  //       name: '模拟数据',
  //       data: [] as Array<number>,
  //       sampling: 'average',
  //       smooth: true,
  //       symbol: 'none',
  //       itemStyle: {
  //                color: 'rgb(113,174,230)'
  //            },
  //       type: 'line'
  //   }]
  // };
  private optionbar: object={
     title: {
        //  text: '数据显示',
         top: 0,
         left: '3%'
     },
     grid: {
       top:"20px",
       left:"80px",
       right:"5px",
       bottom:"50px",
       width:"auto", 
     },
     color:['#3bcec6'],
     tooltip: {
        trigger: 'axis',
        axisPointer: {           
            type: 'shadow'        
        }
    },
    toolbox: {
        show: true,
        feature: {
            // dataView: {show: true, readOnly: false},
            // magicType: {show: true, type: ['line', 'bar']},
            // restore: {show: true},

        }
    },
    // calculable: true,
    xAxis: [
        {
            type: 'category',
            data : [] as Array<string>,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            // min: 0,
            // max: 125,
            // interval: 25,
            splitLine:{show:true}
        }
    ],
    dataZoom: [
                    {   // 这个dataZoom组件，默认控制x轴。
                        type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                        start: 0,      // 左边在 10% 的位置。
                        end: 100         // 右边在 60% 的位置。
                    }
                ],
    series: [
        {   name: '数据取值',
            type: 'line',
            data: [] as Array<number>,
            // barMaxWidth:"30",
            barWidth: '50%',
            // markPoint: {
            //     data: [
            //         {type: 'max', name: '最大值', itemStyle: {color:'#c23531'}},
            //         {type: 'min', name: '最小值'}
            //     ]
            // },
        markLine : {
              itemStyle: {color:'#c23531'},
							label:{
                position:"end",
                formatter:"风险值"},
                data : [{yAxis: 50}]}
        },
    ]
 };
// private optionss: object={//简单的 折线图+饼图 展示
//     title: [{
//          text: '分类结果统计',
//          left: '9%'
//      },
//      {text:"异常时间占比",
//      left: '70%',
//      }
//      ],
//     grid: [
//         {x: '10%', y: '10%', width: '60%', height: '50%'},//折线图位置控制
//     ],
//     xAxis: [
//         {gridIndex: 0,type: 'category',
//         data: ['0-25（正常）', '25-50（正常）', '50-75（异常）', '75-100（严重）']},
//     ],
//     tooltip:{trigger: 'item'},
//     yAxis: [
//         {gridIndex: 0 },
//     ],
//     series: [
//         {   name:"危险值分类结果",
//             type: 'bar',
//             barWidth: '50%',
//             data: [] as Array<number>,
//         },
//         {
//             name: '危险值分类结果',
//             type: 'pie',
//             radius : '55%',
//             center: ['83%', '40%'],//饼图位置控制
//             data: [],
//         },
//     ]
// };


  // private mounted() {
  //   this.form_hand.id = String(this.$route.query.id);
  //   // for(var i:number = 1; i < 20000; i++){
  //   //   var now:Date = new Date(this.form_hand.base += this.form_hand.oneDay);
  //   //   this.form_hand.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  //   //   this.form_hand.data.push(Math.round((Math.random() - 0.5) * 20 + this.form_hand.data[i - 1]));
  //   // }
  //   // this.drawChart_hand();
  // }

  mounted() {
    this.ele_hand = document.getElementById('echarts_hand');
    this.chart_hand = this.$echarts.init(this.ele_hand);
    this.ele_foot = document.getElementById('echarts_foot');
    this.chart_foot = this.$echarts.init(this.ele_foot);
    this.ele_result = document.getElementById('echarts_result');
    this.chart_result = this.$echarts.init(this.ele_result);
    let start = new Date();
    let end = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.form_hand.datevalue = [start, end];
    this.form_foot.datevalue = [start, end];
    this.form_result.datevalue = [start, end];
    this.drawChart_hand(this.form_hand.dataset,this.form_hand.characteristicset,this.form_hand.datevalue,'5s');
    this.drawChart_foot(this.form_foot.dataset,this.form_foot.characteristicset,this.form_foot.datevalue,'5s');
    this.drawChart_result(this.form_result.dataset,this.form_result.characteristicset,this.form_result.datevalue,'5s');

  }

  drawChart_judge_hand() { //按下绘图按钮的时候触发的函数
    if(this.form_hand.dataset != '' && this.form_hand.datevalue != []) {
      //写和服务器的交互语句，dataset、duration、precision三个变量分别储存用户在下拉菜单中的选择项
      this.drawChart_hand(this.form_hand.dataset,this.form_hand.characteristicset,this.form_hand.datevalue,'5s'); //接口要如何改动？
      this.form_hand.chartStatus = true;
    }
    else
      this.$message({
        message: '请选择前面下拉菜单内容',
        type: 'warning'
      })
  }
  
  async drawChart_hand(selectdataset:any,characteristicset:any,pasttime:any,grouptime:any){
    // const ele_hand = document.getElementById('echarts_hand');
    // const chart_hand: any = this.$echarts.init(ele_hand);
    this.chart_hand.showLoading();
    this.chart_hand.clear();
        try {const { data:{output,time} } = 
            await this.$axios.post(
            "medical/find_acceleration_data",
            {username:String(this.$route.query.username),selectdataset:selectdataset,characteristicset:characteristicset,pasttime:pasttime,grouptime:grouptime});
            this.chart_hand.hideLoading();
            this.chart_hand.setOption(this.optionbar);
            this.chart_hand.setOption({xAxis:[{data:time}],series:[{data:output}]})
            } catch (e) {this.$message.error("信息拉取失败，请稍后再试！");}
    // chart.showLoading();
    // try {
    //   const { data:{output,time} } = 
    //   await this.$axios.post(
    //     "medical/find_acceleration_data",
    //     {username:String(this.$route.query.username),selectdataset:selectdataset,pasttime:pasttime,grouptime:grouptime}
    //   );
    //   // this.form_hand.date=gyro_z0;
    //   // this.form_hand.data=time
      // chart.hideLoading();
      
      // chart.setOption({xAxis:[{data:time}],series:[{data:output}]})
    // } catch (e) {
    //   this.$message.error("信息拉取失败，请稍后再试！");
    // }
  }

  async drawChart_foot(selectdataset:any,characteristicset:any,pasttime:any,grouptime:any){
    this.chart_foot.showLoading();
    this.chart_foot.clear();
        try {const { data:{output,time} } = 
            await this.$axios.post(
            "medical/find_acceleration_data",
            {username:String(this.$route.query.username),selectdataset:selectdataset,characteristicset:characteristicset,pasttime:pasttime,grouptime:grouptime});
            this.chart_foot.hideLoading();
            this.chart_foot.setOption(this.optionbar);
            this.chart_foot.setOption({xAxis:[{data:time}],series:[{data:output}]})
            } catch (e) {this.$message.error("信息拉取失败，请稍后再试！");}
  }

  drawChart_judge_foot() { //按下绘图按钮的时候触发的函数
    if(this.form_hand.dataset != '' && this.form_hand.datevalue != []) {
      //写和服务器的交互语句，dataset、duration、precision三个变量分别储存用户在下拉菜单中的选择项
      this.drawChart_foot(this.form_hand.dataset,this.form_hand.characteristicset,this.form_hand.datevalue,'5s'); //接口要如何改动？
      this.form_foot.chartStatus = true;
    }
    else
      this.$message({
        message: '请选择前面下拉菜单内容',
        type: 'warning'
      })
  }

  async drawChart_result(selectdataset:any,characteristicset:any,pasttime:any,grouptime:any){
    this.chart_result.showLoading();
    this.chart_result.clear();
        try {const { data:{output,time} } = 
            await this.$axios.post(
            "medical/find_acceleration_data",
            {username:String(this.$route.query.username),selectdataset:selectdataset,characteristicset:characteristicset,pasttime:pasttime,grouptime:grouptime});
            this.chart_result.hideLoading();
            this.chart_result.setOption(this.optionbar);
            this.chart_result.setOption({xAxis:[{data:time}],series:[{data:output}]})
            } catch (e) {this.$message.error("信息拉取失败，请稍后再试！");}
  }

  drawChart_judge_result() { //按下绘图按钮的时候触发的函数
    if(this.form_result.dataset != '' && this.form_result.datevalue != []) {
      //写和服务器的交互语句，dataset、duration、precision三个变量分别储存用户在下拉菜单中的选择项
      this.drawChart_result(this.form_result.dataset,this.form_result.characteristicset,this.form_result.datevalue,'5s'); //接口要如何改动？
      this.form_result.chartStatus = true;
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

<style>
  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
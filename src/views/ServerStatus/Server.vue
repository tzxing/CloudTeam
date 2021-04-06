<template>

<div class="container">
    <el-progress :text-inside="true" :stroke-width="16" :percentage="prog" v-if="mode==2&&prog!=100"  style="margin-bottom:0.5em"></el-progress>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tag effect="dark" v-if="mode==1" style="float:right">ONLINE</el-tag>
      <el-tag effect="dark" type="warning" v-if="mode==2" style="float:right">SNAPSHOT</el-tag>
      <label class="text-a">{{ds.ds.ServerName}}</label><br>
      <label class="text-s" style="float:right; margin-top:0.5rem; color:#909399">Last update: {{ds.ts}}</label>
      
      <el-row :gutter="10" style="margin: 1.5em 0 0 0.5em">
            <el-col :sm="24"  :lg="7">
            Start time: {{ds.ds.baseStatsTable.Start_time}} 
            </el-col>
            <el-col :sm="24"  :lg="7">
           Version: {{ds.ds.baseStatsTable.Version}}
            </el-col>
            <el-col :sm="24"  :lg="7">
           Num. Regions: {{ds.ds.baseStatsTable.Num_Regions}}
            </el-col>
          </el-row>
           <el-row :gutter="10" style="margin: 0 0 0 0.5em">
            <el-col :sm="24"  :lg="7">
            Max Request Per Second: {{Max_Request_Per_Second[1] | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="7">
              Request Per Second: {{ds.ds.requestStatsTable.Request_Per_Second | formatNum}}
            </el-col>
             <el-col :sm="24"  :lg="7">
             Last contact: {{ds.ds.baseStatsTable.Last_contact}} 
            </el-col>
      </el-row>
    </div>

      <div class="text item">
          <div id="requestChart" style="height:440px;width = 100%" ></div>
      </div>

  </el-card>
<el-row :gutter="10" style="margin-top: 1em">
  <el-col :sm="24"  :lg="12">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <label class="text-a">Request</label><br>
         <el-row :gutter="10" style="margin: 1.5em 0 0 0.5em">
            <el-col :sm="24"  :lg="7">
            Read Count: {{ds.ds.requestStatsTable.Read_Request_Count | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="7">
            Write Count: {{ds.ds.requestStatsTable.Write_Request_Count | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="10">
            Filtered Read Count: {{ds.ds.requestStatsTable.Filtered_Read_Request_Count | formatNum}}
            </el-col>
          </el-row>
    </div>
      <div class="text item">
              <div id="requestStatsChart" style="height:440px;width = 100%" ></div>
          </div>
  </el-card>
  </el-col>
   <el-col :sm="24"  :lg="12">
     <el-card class="box-card">
    <div slot="header" class="clearfix">
      <label class="text-a">Memory</label><br>
         <el-row :gutter="10" style="margin: 1.5em 0 0 0.5em">
            <el-col :sm="24"  :lg="8">
            Max Heap: {{ds.ds.memoryStatsTable.Max_Heap | formatStorageUnit}}
            </el-col>
            <el-col :sm="24"  :lg="8">
           Used Heap: {{ds.ds.memoryStatsTable.Used_Heap | formatStorageUnit}}
            </el-col>
            <el-col :sm="24"  :lg="8">
            Memstore Size: {{ds.ds.memoryStatsTable.Memstore_Size | formatStorageUnit}}
            </el-col>
          </el-row>
    </div>
      <div class="text item">
              <div id="heapChart" style="height:440px;width = 100%" ></div>
          </div>
  </el-card>
</el-col>
</el-row>

<el-row :gutter="10" style="margin-top: 1em">
  <el-col :sm="24"  :lg="12">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <label class="text-a">Store</label><br>
         <el-row :gutter="10" style="margin: 1.5em 0 0 0.5em">
            <el-col :sm="24"  :lg="6">
            Num. Stores: {{ds.ds.storeStatsTable.Num_Stores | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="11">
            Storefile Size: {{ds.ds.storeStatsTable.Storefile_Size | formatStorageUnit}}
            </el-col>
            <el-col :sm="24"  :lg="7">
            Index Size: {{ds.ds.storeStatsTable.Index_Size | formatStorageUnit}}
            </el-col>
            </el-row>
            <el-row :gutter="10" style="margin: 0 0 0 0.5em">
            <el-col :sm="24"  :lg="6">
            Num. Storefiles: {{ds.ds.storeStatsTable.Num_Storefiles | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="11">
            Storefile Size Uncompressed: {{ds.ds.storeStatsTable.Storefile_Size_Uncompressed | formatStorageUnit}}
            </el-col>
            <el-col :sm="24"  :lg="7">
            Bloom Size: {{ds.ds.storeStatsTable.Bloom_Size | formatStorageUnit}}
            </el-col>
          </el-row>
    </div>
      <div class="text item">
              <div id="storeSizeChart" style="height:440px;width = 100%" ></div>
          </div>
  </el-card>
  </el-col>
   <el-col :sm="24"  :lg="12">
     <el-card class="box-card">
    <div slot="header" class="clearfix">
      <label class="text-a">Compaction</label><br>
           <el-row :gutter="10" style="margin: 1.5em 0 0 0.5em">
            <el-col :sm="24"  :lg="12">
            Num. Compacting Cells: {{ds.ds.compactionStatsTable.Num_Compacting_Cells | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="12">
            Remaining Cells: {{ds.ds.compactionStatsTable.Num_Compacted_Cells | formatNum}}
            </el-col>
            </el-row>
            <el-row :gutter="10" style="margin: 0 0 0 0.5em">
            <el-col :sm="24"  :lg="12">
            Num. Compacted Cells: {{ds.ds.compactionStatsTable.Remaining_Cells | formatNum}}
            </el-col>
            <el-col :sm="24"  :lg="12">
            Compaction Progress: {{ds.ds.compactionStatsTable.Compaction_Progress}} %
            </el-col>
          </el-row>
    </div>
      <div class="text item">
              <div id="cellsChart" style="height:440px;width = 100%" ></div>
          </div>
  </el-card>
</el-col>
</el-row>
</div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "MasterView",

  data() {return{
    job:null,
    mode:1,
    sId:0,
    minId: 0,
    maxId: 0,
    prog:0,
    cacheNum: 100, //numCache 100,1000

    Max_Request_Per_Second:[0,0],
    id: -2, //当前的数据id
    ds: {ts: '',ds: {"ServerName": "",
"baseStatsTable": { "Start_time": "", "Last_contact": "", "Version": "", "Requests_Per_Second": 0, "Num_Regions": 0 },
"memoryStatsTable": { "Used_Heap": 0, "Max_Heap": 0, "Memstore_Size": 0 }, "requestStatsTable": { "Request_Per_Second": 0, "Read_Request_Count": 0, "Filtered_Read_Request_Count": 0, "Write_Request_Count": 0 },
"storeStatsTable": { "Num_Stores": 0, "Num_Storefiles": 0, "Storefile_Size_Uncompressed": 0, "Storefile_Size": 0, "Index_Size": 0, "Bloom_Size": 0 },
"compactionStatsTable": { "Num_Compacting_Cells": 0, "Num_Compacted_Cells": 0, "Remaining_Cells": 0, "Compaction_Progress": 0 }}},

    cs:{
      uCount:0, //已经更新图表的次数
      color: ['#058DC7', '#50B432', '#ED561B', '#fabc05', '#d85758','#862586'],
      colors: [
        [{offset: 0,color:'rgb(255, 70, 131)' }, {offset: 1,color: 'rgb(255, 158, 68)'}],
      [{offset: 0,color:'rgba(128, 255, 165)'}, {offset: 1,color: 'rgba(1, 191, 236)'}],
      [{offset: 0,color:'rgba(0, 221, 255)'}, {offset: 1,color: 'rgba(77, 119, 255)'}],
      [{offset: 0,color:'rgba(55, 162, 255)'}, {offset: 1,color: 'rgba(116, 21, 219)'}],
        [{offset: 0,color:'rgba(224, 62, 76)'}, {offset: 1,color: 'rgba(255, 191, 0)'}],
         [{offset: 0,color:'rgba(255, 0, 135)'}, {offset: 1,color: 'rgba(135, 0, 157)'}],],
      
      request:{chart:null,seriesDs:{data:[]}},
      requestStats:{chart:null,seriesDs:[{data:[]},{data:[]},{data:[]}]},
      heap: { chart: null,seriesDs:{data:[]} },
      storeSize: { chart: null,seriesDs:[{data:[]},{data:[]}] },
      cells: { chart: null,seriesDs:[{data:[]},{data:[]},{data:[]}] },
    }
  }},
   mounted() {
    this.init();
  },
  methods: {
    init(){
      let mode = this.$route.query.mode;
      let sId = this.$route.query.sId;
      let minId = this.$route.query.minId;
      let maxId = this.$route.query.maxId;

      if(!(mode==1||mode==2)) mode = 1;
      if(sId==null || isNaN(sId)) sId = 0;

     // console.log(mode,sId,minId,maxId)
      if(mode==2&&minId>0&&maxId>0&&maxId>minId){
        this.mode = mode;
        this.id = minId - 1; 
        this.minId = minId - 1;
        this.maxId = maxId - 1;
        this.cacheNum = 1000;
      }else{this.mode = 1;}

      this.initCharts()
    },

  async reqNewData(){
      let id = this.id + 1;
      let ds = await this.$axios.get("/getSsById?id=" + id+"sId="+this.sId).then((res) => {return res.data.data.ds;});

    if(ds.length>0){
      let d = ds[0];
      if(d.id>this.id){
        this.ds = d;
        this.id = d.id;
        this.updateChartsData(d);
         this.updateCharts();
      }
    }
    },

//这里，递归调用获取数据
    async recursiveReq(num){
    this.prog = Number(((this.id-this.minId)/(this.maxId-this.minId)*100).toFixed(0));
    if(num<=0){
      let opt={dataZoom: [{ type: 'inside',start: 50,end: 100 }, {start: 50,end: 100}]}
      this.cs.request.chart.setOption(opt);
      this.cs.requestStats.chart.setOption(opt);
      this.cs.heap.chart.setOption(opt);
      this.cs.storeSize.chart.setOption(opt);
      this.cs.cells.chart.setOption(opt);
        return;
      }
    if(num > 100) num = 100;
    
    let id = this.id+1;
    let ds = await this.$axios.get("/getSsById?id=" + id+"&sId="+this.sId+"&num="+num).then((res) => {return res.data.data.ds;});

    if(ds.length>0){
      ds.forEach(d=>{
        this.ds = d;
        this.id = d.id;
        this.updateChartsData(d);
        })
        this.updateCharts();
      }
    this.recursiveReq(this.maxId - this.id);
    },

  async initCharts() {
      //let sId = this.sId
    let that = this;
      //let colorsNum = this.cs.colors.length;
      /**request Chart */
    this.cs.request.chart =echarts.init(document.getElementById("requestChart"));
    this.cs.request.chart.setOption({title:{text: 'Requests Per Second'},tooltip: {trigger: 'axis'},xAxis: { type: 'time'},yAxis: {type: 'value'},
      //dataZoom: [{ type: 'inside',start: 0,end: 10 }, {start: 0,end: 10}],
    series:{name: 'Requests Per Second',type: 'line',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[0])},emphasis: {focus: 'series'},data: []}});

    this.cs.requestStats.chart =echarts.init(document.getElementById("requestStatsChart"));
    this.cs.requestStats.chart.setOption({title:{text: 'Request Status'},tooltip: {trigger: 'axis',axisPointer: {type: 'cross', label: { backgroundColor: '#6a7985'}}},legend: {},
    xAxis: { type: 'time'},yAxis: {type: 'value'},
      //dataZoom: [{ type: 'inside',start: 0,end: 10 }, {start: 0,end: 10}],
    series: [{name: 'Read Count',type: 'line',stack: '总量',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[1])},emphasis: {focus: 'series'},data: []},

    {name: 'Write Count',type: 'line',stack: '总量',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[2])},emphasis: {focus: 'series'},data: []},

    {name: 'Filtered Read Count',type: 'line',stack: '总量',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[3])},emphasis: {focus: 'series'},data: []}
      ]});

    this.cs.heap.chart =echarts.init(document.getElementById("heapChart"));
    this.cs.heap.chart.setOption({visualMap: {show: false, type: 'continuous',min: 0,max: 100},title: {text: 'Heap Usage (%)'},tooltip: {trigger:'axis'},xAxis:{type: 'time'},yAxis: {type:"value"},series: {type:'line', lineStyle: { width:3},showSymbol: false,data: []} })

    this.cs.storeSize.chart =echarts.init(document.getElementById("storeSizeChart"));
    this.cs.storeSize.chart.setOption({title:{text: 'Store Size'},tooltip: {trigger: 'axis',axisPointer: {type: 'cross', label: { backgroundColor: '#6a7985'}}},legend: {},xAxis: { type: 'time'},yAxis: {type: 'value'},series: [{name: 'Storefile',type: 'line',stack: 'store',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[4])},emphasis: {focus: 'series'},data: []},
    
    {name: 'Uncompressed',type: 'line',stack: 'store',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[5])},emphasis: {focus: 'series'},data: []},]});

    this.cs.cells.chart =echarts.init(document.getElementById("cellsChart"));
    this.cs.cells.chart.setOption({xAxis: { type: 'time'},yAxis: {type: 'value'},legend: {},title: {text: 'Num. Cells'},tooltip: {trigger:'axis'},
    series: [{name:'Compacting Cells',data: [],type: 'line',showSymbol: false},
    {name:'Compacted Cells',data: [],type: 'line',showSymbol: false},
    {name:'Remaining Cells',data: [],type: 'line',showSymbol: false}]});

    let opt = {grid: {left: '3%',right: '4%',bottom: '10%',containLabel: true},toolbox: { feature: { saveAsImage: {}}},}

    this.cs.request.chart.setOption(opt);
    this.cs.requestStats.chart.setOption(opt);
    this.cs.heap.chart.setOption(opt);
    this.cs.storeSize.chart.setOption(opt);
    this.cs.cells.chart.setOption(opt);

    window.addEventListener("resize", this.resize);

    if (this.mode == 2) {
        console.log("Snapshot Model...");
        this.recursiveReq(this.maxId - this.id);
      } else {
        console.log("Online Model...");
        this.job = setInterval(this.reqNewData, 3000);
      }

},
 resize() {
    this.cs.request.chart.resize();
    this.cs.requestStats.chart.resize();
    this.cs.heap.chart.resize();
    this.cs.storeSize.chart.resize();
    this.cs.cells.chart.resize();
    },

  updateChartsData(tds){

    this.cs.uCount++;
    let ds = tds.ds;
    let ts = (new Date(tds.timestamp)).getTime();

    if(this.cs.uCount> this.cacheNum){
      this.cs.request.seriesDs.data.shift();
      this.cs.requestStats.seriesDs[0].data.shift();
      this.cs.requestStats.seriesDs[1].data.shift();
      this.cs.requestStats.seriesDs[2].data.shift();
      this.cs.heap.seriesDs.data.shift();
      this.cs.storeSize.seriesDs[0].data.shift();
      this.cs.storeSize.seriesDs[1].data.shift();
      this.cs.cells.seriesDs[0].data.shift();
      this.cs.cells.seriesDs[1].data.shift();
      this.cs.cells.seriesDs[2].data.shift();
    }

    if(ds.baseStatsTable.Requests_Per_Second >= this.Max_Request_Per_Second[0]) this.Max_Request_Per_Second = [ts,ds.baseStatsTable.Requests_Per_Second]

    this.cs.request.seriesDs.data.push([ts,ds.baseStatsTable.Requests_Per_Second|| 0])

    this.cs.requestStats.seriesDs[0].data.push([ts,ds.requestStatsTable.Read_Request_Count || 0])
    this.cs.requestStats.seriesDs[1].data.push([ts,ds.requestStatsTable.Write_Request_Count || 0])
    this.cs.requestStats.seriesDs[2].data.push([ts,ds.requestStatsTable.Filtered_Read_Request_Count || 0])

    this.cs.heap.seriesDs.data.push([ts,(ds.memoryStatsTable.Used_Heap/ds.memoryStatsTable.Max_Heap*100).toFixed(2)])

    this.cs.storeSize.seriesDs[0].data.push([ts,ds.storeStatsTable.Storefile_Size || 0])
    this.cs.storeSize.seriesDs[1].data.push([ts,ds.storeStatsTable.Storefile_Size_Uncompressed || 0])

    this.cs.cells.seriesDs[0].data.push([ts,ds.compactionStatsTable.Num_Compacting_Cells || 0])
    this.cs.cells.seriesDs[1].data.push([ts,ds.compactionStatsTable.Num_Compacted_Cells || 0])
    this.cs.cells.seriesDs[2].data.push([ts,ds.compactionStatsTable.Remaining_Cells || 0])

},
    updateCharts(){
      let that = this;
      this.cs.request.chart.setOption({series: that.cs.request.seriesDs})
      this.cs.requestStats.chart.setOption({series: that.cs.requestStats.seriesDs});
      this.cs.heap.chart.setOption({series: that.cs.heap.seriesDs})
      this.cs.storeSize.chart.setOption({series: that.cs.storeSize.seriesDs})
      this.cs.cells.chart.setOption({series: that.cs.cells.seriesDs})
    }
    
  },
  
  filters: {
    formatStorageUnit(d) {
      if (d == undefined) { return '0 KB' }
      if (d >= 1073741824) return (d / 1073741824).toFixed(2) + " TB"
      if (d >= 1048576) return (d / 1048576).toFixed(2) + " GB"
      if (d >= 1024) return (d / 1024) + " MB"
          return d + " KB"
      },

    formatNum(n) {
      if (n == undefined) { return '0' }
        n = n + ""
        let re = /\d{1,3}(?=(\d{3})+$)/g;
        let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, "$&,") + s2; });
        return n1;
    },}
}
</script>


<style>
.container{
  text-align: left;
  margin: 0 1rem 1rem 1rem;
}
  .text {
    font-size: 14px;
  }
  .text-a{
    margin-top: 1rem;
    margin-left: 0.5rem;
    
    font-size: 1.8rem;
    font-weight: 600;
  }
  .text-b{
    margin-top: 1rem;
    margin-left: 0.5rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .text-s{
     margin-left: 0.5rem;
    font-size: 1rem;
      
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
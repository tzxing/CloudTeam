<template>

<div class="container">
  <el-progress :text-inside="true" :stroke-width="16" :percentage="prog" v-if="mode==2&&prog!=100"  style="margin-bottom:0.5em"></el-progress>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
              <el-tag effect="dark" v-if="mode==1" style="float:right">ONLINE</el-tag>
              <el-tag effect="dark" type="warning" v-if="mode==2" style="float:right">SNAPSHOT</el-tag>
               <label class="text-a">{{ds.master}}</label><br>
              <label class="text-s" style="float:right; margin-top:0.5rem; color:#909399">Last update: {{ds.ts}}</label>

              <el-table :data="ds.ds" stripe style="width: 100%">
                <el-table-column prop="ServerName" label="ServerName" >
                    <template slot-scope="scope">
                      <el-link :href="'/serverstatus/server?sId='+scope.$index"  class="buttonText" target="_blank"  type="primary" :underline="false">{{scope.row.ServerName}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="baseStatsTable.Version" label="Version" ></el-table-column>
                <el-table-column prop="baseStatsTable.Start_time" label="Start time"></el-table-column>
                <el-table-column prop="baseStatsTable.Requests_Per_Second" label="Requests Per Second"></el-table-column>
                <el-table-column prop="baseStatsTable.Num_Regions" label="Num. Regions"></el-table-column>
                <el-table-column prop="baseStatsTable.Last_contact" label="Last contact"></el-table-column>
              </el-table>

          </div>
          <div class="text item">
            <div id="requestChart" style="height:440px;width = 100%" ></div>
          </div>
      </el-card>

      <el-card class="box-card" style="margin-top:1.5em">
          <div slot="header" class="clearfix">
              <label class="text-b">Request Status</label>
              <el-table :data="ds.ds" stripe style="width: 100%">
                <el-table-column prop="ServerName" label="ServerName" >
                    <template slot-scope="scope">
                      <el-link :href="'/serverstatus/server?sId='+scope.$index"  class="buttonText" target="_blank"  type="primary" :underline="false">{{scope.row.ServerName}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="requestStatsTable.Request_Per_Second" label="Request Per Second" >
                   <template slot-scope="scope">{{ scope.row.requestStatsTable.Request_Per_Second | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="requestStatsTable.Read_Request_Count" label="Read Request Count" >
                  <template slot-scope="scope">{{ scope.row.requestStatsTable.Read_Request_Count | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="requestStatsTable.Write_Request_Count" label="Write Request Count">
                   <template slot-scope="scope">{{ scope.row.requestStatsTable.Write_Request_Count | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="requestStatsTable.Filtered_Read_Request_Count" label="Filtered Read Request Count">
                   <template slot-scope="scope">{{ scope.row.requestStatsTable.Read_Request_Count | formatNum }}</template>
                </el-table-column>
              </el-table>

          </div>
          <div class="text item">
             <div id="readRequestChart" style="height:440px;width = 100%" ></div>
              <div id="writeRequestChart" style="height:440px;width = 100%" ></div>
              <div id="filteredRequestChart" style="height:440px;width = 100%" ></div>
          </div>
      </el-card>


      
      <el-card class="box-card" style="margin-top:1.5em">
          <div slot="header" class="clearfix">

              <el-table :data="ds.ds" stripe style="width: 100%">
                <el-table-column prop="ServerName" label="ServerName" >
                    <template slot-scope="scope">
                      <el-link :href="'/serverstatus/server?sId='+scope.$index"  class="buttonText" target="_blank"  type="primary" :underline="false">{{scope.row.ServerName}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="storeStatsTable.Num_Stores" label="Num. Stores" >
                   <template slot-scope="scope">{{ scope.row.storeStatsTable.Num_Stores | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="storeStatsTable.Num_Storefiles" label="Num. Storefiles" >
                  <template slot-scope="scope">{{ scope.row.storeStatsTable.Num_Storefiles | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="storeStatsTable.Storefile_Size" label="Storefile Size">
                   <template slot-scope="scope">{{ scope.row.storeStatsTable.Storefile_Size | formatStorageUnit }}</template>
                </el-table-column>
                <el-table-column prop="storeStatsTable.Storefile_Size_Uncompressed" label="Storefile Size Uncompressed">
                   <template slot-scope="scope">{{ scope.row.storeStatsTable.Storefile_Size_Uncompressed | formatStorageUnit }}</template>
                </el-table-column>
                <el-table-column prop="storeStatsTable.Index_Size" label="Index Size">
                   <template slot-scope="scope">{{ scope.row.storeStatsTable.Index_Size | formatStorageUnit }}</template>
                </el-table-column>
                <el-table-column prop="storeStatsTable.Bloom_Size" label="Bloom Size">
                   <template slot-scope="scope">{{ scope.row.storeStatsTable.Bloom_Size | formatStorageUnit }}</template>
                </el-table-column>
              </el-table>

          </div>
          <div class="text item">
            <el-row :gutter="10" style="margin: 1.5em 0 0 0.5em">
            <el-col :sm="24"  :lg="12">
          <div id="storeFilesChart" style="height:440px;width = 100%" ></div>
            </el-col>
            <el-col :sm="24"  :lg="12">
              <div id="storeFileSizeChart" style="height:440px;width = 100%" ></div>
            </el-col>
               </el-row>
             
          </div>
      </el-card>

      <el-card class="box-card" style="margin-top:1.5em;">
          <div slot="header" class="clearfix">

              <el-table :data="ds.ds" stripe style="width: 100%">
                <el-table-column prop="ServerName" label="ServerName" >
                    <template slot-scope="scope">
                      <el-link :href="'/serverstatus/server?sId='+scope.$index"  class="buttonText" target="_blank"  type="primary" :underline="false">{{scope.row.ServerName}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="compactionStatsTable.Num_Compacting_Cells" label="Num. Compacting Cells" >
                   <template slot-scope="scope">{{ scope.row.compactionStatsTable.Num_Compacting_Cells | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="compactionStatsTable.Num_Compacted_Cells" label="Num. Compacted Cells" >
                  <template slot-scope="scope">{{ scope.row.compactionStatsTable.Num_Compacted_Cells | formatNum }}</template>
                </el-table-column>
                <el-table-column prop="compactionStatsTable.Remaining_Cells" label="Remaining Cells">
                   <template slot-scope="scope">{{ scope.row.compactionStatsTable.Remaining_Cells | formatStorageUnit }}</template>
                </el-table-column>
                <el-table-column prop="compactionStatsTable.Compaction_Progress" label="Compaction Progress">
                   <template slot-scope="scope">{{ scope.row.compactionStatsTable.Compaction_Progress}} %</template>
                </el-table-column>
              </el-table>
          </div>
         <!-- <div class="text item">
               <div id="compactingCellsChart" style="height:440px;width = 100%" ></div>
          </div>-->
      </el-card>

      </div>
</template>
<script>

import * as echarts from 'echarts';


export default {
  name: "MasterView",

  data() {
    return {
      job: null, //用于快照模式清除轮询任务

      mode: 0, // 1:online实时获取数据，2:snapshot快照模式
      minId: 0, //如果是快照模式开始值和结束值
      maxId: 0, //
      cacheNum: 100, //numCache 100,1000

      id: -2, //当前的数据id //由于每次请求会+1,会让系统误以为从0开始
      ds: {}, //最新的数据
      ss: [], //服务器列表

      prog:0,

      cs: {
        uCount:0, //已经更新图表的次数
       // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        color: ['#058DC7', '#50B432', '#ED561B', '#fabc05', '#d85758','#862586'],
        colors: [[{offset: 0,color:'rgba(128, 255, 165)'}, {offset: 1,color: 'rgba(1, 191, 236)'}],
                [{offset: 0,color:'rgba(0, 221, 255)'}, {offset: 1,color: 'rgba(77, 119, 255)'}],
                [{offset: 0,color:'rgba(55, 162, 255)'}, {offset: 1,color: 'rgba(116, 21, 219)'}],
                [{offset: 0,color:'rgba(255, 0, 135)'}, {offset: 1,color: 'rgba(135, 0, 157)'}],
                [{offset: 0,color:'rgba(255, 191, 0)'}, {offset: 1,color: 'rgba(224, 62, 76)'}],],
        
        request:{chart:null,seriesDs:[]},
        readRequest:{chart:null,seriesDs:[]},
        writeRequest:{chart:null,seriesDs:[]},
        filteredRequest:{chart:null,seriesDs:[]},
        storeFiles:{chart:null,seriesDs:{data:[]}},
        storeFileSize:{chart:null,seriesDs:[]},
       // compactingCells:{chart:null,seriesDs:[]},
      },
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      let mode = this.$route.query.mode;
      let minId = this.$route.query.minId;
      let maxId = this.$route.query.maxId;

      if(!(mode==1||mode==2)) mode = 1;
      this.mode = mode;

      if(mode==2&&minId>0&&maxId>0&&maxId>minId){
        this.id = minId- 1 ; 
        this.minId = minId -1;
        this.maxId = maxId -1;
        this.cacheNum = 1000;
      }else{this.mode = 1;}
      //console.log(mode,minId,maxId)
      this.initCharts();
    },

    async reqNewData(){
      let id = this.id + 1;
      let ds = await this.$axios.get("/getDsById?id=" + id).then((res) => {return res.data.data.ds;});
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

    async recursiveReq(num){
      this.prog = Number(((this.id-this.minId)/(this.maxId-this.minId)*100).toFixed(0));
      if(num<=0){
        let opt={dataZoom: [{ type: 'inside',start: 50,end: 100 }, {start: 50,end: 100}]}
      this.cs.request.chart.setOption(opt);
      this.cs.readRequest.chart.setOption(opt);
      this.cs.writeRequest.chart.setOption(opt);
      this.cs.filteredRequest.chart.setOption(opt);
      this.cs.storeFileSize.chart.setOption(opt);
        return;
      }
      if(num > 100) num = 100;
    
      let id = this.id+1;
      let ds = await this.$axios
        .get("/getDsById?id=" + id+"&num="+num).then((res) => {return res.data.data.ds;});

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

/***
 * initCharts流程：
 * 首先初始化表格静态的部分，
 * 然后根据第一次收到的数据初始化动态的部分（如series的个数）
 * 然后调用updateCharts,直接用收到的数据对表格进行更新。
 */
    async initCharts() {
      console.log("Init Charts...")
      let that = this;

      /**request Chart */
      this.cs.request.chart =echarts.init(document.getElementById("requestChart"));
      this.cs.request.chart.setOption({title:{text: 'Requests Per Second'},tooltip: {trigger: 'axis',axisPointer: {type: 'cross', label: { backgroundColor: '#6a7985'}}},legend: {},
      xAxis: [{ type: 'time'}],yAxis: [{type: 'value'}],
      //dataZoom: [{ type: 'inside',start: 0,end: 10 }, {start: 0,end: 10}],
      series: []});
      
      this.cs.readRequest.chart =echarts.init(document.getElementById("readRequestChart"));
      this.cs.readRequest.chart.setOption({title: { text: 'Read Request Count'},legend: {},
      tooltip: {trigger: 'axis'},xAxis: {type: 'time'},yAxis: {type: 'value'},series: []});

      this.cs.writeRequest.chart =echarts.init(document.getElementById("writeRequestChart"));
      this.cs.writeRequest.chart.setOption({title: { text: 'Write Request Count'},
      //legend: { type: 'scroll', bottom: 10,},
      legend: {},tooltip: {trigger: 'axis'},xAxis: {type: 'time'},yAxis: {type: 'value'},series: []});

      this.cs.filteredRequest.chart =echarts.init(document.getElementById("filteredRequestChart"));
      this.cs.filteredRequest.chart.setOption({title: { text: 'Filtered_Read_Request_Count'},
      legend: {},tooltip: {trigger: 'axis'},xAxis: {type: 'time'},yAxis: {type: 'value'},series: []});

      this.cs.storeFiles.chart =echarts.init(document.getElementById("storeFilesChart"));
      this.cs.storeFiles.chart.setOption({title: { text: 'Store Files Count'},tooltip: {trigger: 'axis',axisPointer: { type: 'shadow'}},
      xAxis: {type: 'category', data: [],axisTick: {alignWithLabel: true}},
      yAxis: {type: 'value'},series: [{name: 'Count',type: 'bar',barWidth: '60%',data: []}]});

      this.cs.storeFileSize.chart =echarts.init(document.getElementById("storeFileSizeChart"));
      this.cs.storeFileSize.chart.setOption({title: { text: 'StoreFile Size'},tooltip: {trigger: 'axis'},xAxis: {type: 'time'},yAxis: {type: 'value'},series: []});

  
      let id = this.id;
      let ds = await this.$axios.get("/getDsById?id="+id).then((res) => {return res.data.data.ds;});

      if(ds.length < 0) return;

      ds = ds[0];
      this.ds = ds;
      this.id = ds.id;
      console.log(ds)

      let index = 0;
      let colorsNum = this.cs.colors.length;
      let ss =[];
      let requestSeries = [];
      let readRequestSeries = [];
      that.ds.ds.forEach(d => {
      ss.push(d.ServerName);

      that.cs.request.seriesDs.push({data:[]})
      that.cs.readRequest.seriesDs.push({data:[]})
      that.cs.writeRequest.seriesDs.push({data:[]})
      that.cs.filteredRequest.seriesDs.push({data:[]})
      that.cs.storeFileSize.seriesDs.push({data:[]})

      requestSeries.push({name: d.ServerName,
      type: 'line',stack: '总量',smooth: true, lineStyle: { width: 0},showSymbol: false,areaStyle: {opacity: 0.8,color: new echarts.graphic.LinearGradient(0, 0, 0, 1, that.cs.colors[index%colorsNum])},emphasis: {focus: 'series'},data: []});

      readRequestSeries.push({name: d.ServerName,type: 'line', showSymbol: false,color:that.cs.color[index%colorsNum],data:[]})
      
      index++;
      })
    //this.ss = ss;
    this.cs.request.chart.setOption({series:requestSeries,})
    this.cs.readRequest.chart.setOption({series:readRequestSeries,})
    this.cs.writeRequest.chart.setOption({series:readRequestSeries,})
    this.cs.filteredRequest.chart.setOption({series:readRequestSeries,})
    this.cs.storeFileSize.chart.setOption({series:readRequestSeries})

    let opt = {grid: {left: '3%',right: '4%',bottom: '10%',containLabel: true},toolbox: { feature: { saveAsImage: {}}},};
    this.cs.request.chart.setOption(opt);
    this.cs.readRequest.chart.setOption(opt);
    this.cs.writeRequest.chart.setOption(opt);
    this.cs.filteredRequest.chart.setOption(opt);
    this.cs.storeFiles.chart.setOption(opt);
    this.cs.storeFileSize.chart.setOption(opt);

    window.addEventListener("resize", this.resize);

    this.updateChartsData(ds);
    this.updateCharts();

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
      this.cs.readRequest.chart.resize();
      this.cs.writeRequest.chart.resize();
      this.cs.filteredRequest.chart.resize();
      this.cs.storeFiles.chart.resize();
      this.cs.storeFileSize.chart.resize();
    },

    updateChartsData(tds){
     
      this.cs.uCount++;
      let ds = tds.ds;
      let ts = (new Date(tds.timestamp)).getTime();

      if(this.cs.uCount>this.cacheNum){
        for(let i = 0; i< ds.length; i++){
          this.cs.request.seriesDs[i].data.shift()
          this.cs.readRequest.seriesDs[i].data.shift()
          this.cs.writeRequest.seriesDs[i].data.shift()
          this.cs.filteredRequest.seriesDs[i].data.shift()
          this.cs.storeFileSize.seriesDs[i].data.shift()
          }
      }
      this.cs.storeFiles.seriesDs.data=[];
      for(let i = 0; i< ds.length; i++){
        this.cs.request.seriesDs[i].data.push([ts,ds[i].baseStatsTable.Requests_Per_Second || 0])
        
        this.cs.readRequest.seriesDs[i].data.push([ts,ds[i].requestStatsTable.Read_Request_Count || 0])
        this.cs.writeRequest.seriesDs[i].data.push([ts,ds[i].requestStatsTable.Write_Request_Count|| 0])
        this.cs.filteredRequest.seriesDs[i].data.push([ts,ds[i].requestStatsTable.Filtered_Read_Request_Count || 0])
        
        this.cs.storeFiles.seriesDs.data.push(ds[i].storeStatsTable.Num_Storefiles);

        this.cs.storeFileSize.seriesDs[i].data.push([ts,ds[i].storeStatsTable.Storefile_Size || 0])
      }

    },
    updateCharts(){
      let that = this;
      this.cs.request.chart.setOption({series: that.cs.request.seriesDs})
      this.cs.readRequest.chart.setOption({series: that.cs.readRequest.seriesDs})
      this.cs.writeRequest.chart.setOption({series: that.cs.writeRequest.seriesDs})
      this.cs.filteredRequest.chart.setOption({series: that.cs.filteredRequest.seriesDs})
      this.cs.storeFiles.chart.setOption({series: that.cs.storeFiles.seriesDs})
      this.cs.storeFileSize.chart.setOption({series: that.cs.storeFileSize.seriesDs})
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
};
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
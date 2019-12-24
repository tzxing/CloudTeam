<template>
  <div>
    <WorkflowChart :chart_data="chart_data" ref="workflow_chart"></WorkflowChart>
    <!-- <el-button @click="stop">stop</el-button> -->
    <el-select v-model="value" placeholder="请选择" @change="onchange(value)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkflowChart from "./Components/WorkflowChart.vue";
// import WorkflowChartAlter from "./Components/WorkflowChartAlter.vue";

@Component({
  components: { WorkflowChart }
})
export default class WorkflowJobView extends Vue {
  public chart_data = '[]';

  //public char_data = "[{'name': 'A', 'dependencies': [], 'id': '1', 'template': 'alpine: 3.7', 'style_type': 'success'}, {'name': 'B', 'dependencies': ['A'], 'id': '2', 'template': 'alpine: 3.7', 'style_type': 'normal'}, {'name': 'C', 'dependencies': ['A'], 'id': '3', 'template': 'alpine: 3.7', 'style_type': 'disable'}, {'name': 'D', 'dependencies': ['B', 'C'], 'id': '4', 'template': 'alpine: 3.7', 'style_type': 'success'}]";
  //public chart = new WorkflowChartAlter(this.chart_data);
  public str: string = "";
  public chart: any;
  public workflow_name: string = "";
  public scheduler: number = 0;

  created(){
    // console.log(this.$route.query.data)
    this.workflow_name = this.$route.query.data.toString() 
    // this.scheduler()
  }
  data() {
      return {
        options: [{
          value: 0.5,
          label: '0.5s'
        }, {
          value: 1.0,
          label: '1.0s'
        }, {
          value: 1.5,
          label: '1.5s'
        }, {
          value: 2,
          label: '2s'
        }],
        value: 1.0
      }
    }

  beforeDestroy(){
    this.stop()
  }

  onchange(value:number){
    // console.log(value)
    this.stop()
    this.scheduler = self.setInterval(()=>{
      this.getData();
    }, 1000 * value)
  }

  async getData(){
    const { data } = await this.$axios.get("wfs/workflowJobs/" + this.workflow_name);
    var result = JSON.parse(data)
    this.chart_data = JSON.stringify(result.topology)
    // console.log(JSON.stringify(result.topology))
    // console.log(result.phase)
    if(result.phase == "Succeeded"){
    this.stop()
    }
  }

  stop(){
    window.clearInterval(this.scheduler)
  }

  mounted() {
    this.chart = this.$refs.workflow_chart as WorkflowChart;

    this.scheduler = self.setInterval(()=>{
      this.getData();
    }, 1000)
    this.getData();
    // console.log(this.$route.query.data)
    //this.get_message()

    //console.log(this.chart.get_chartjson());
  }

  public get_chartjson() {
    // console.log(this.chart.get_chartjson());
  }
  // async get_message() {
  //   console.log(this.chart);
  //   this.str = this.chart.get_chartjson();
  //   console.log(this.str + "%%%%%");
  // }
}
</script>

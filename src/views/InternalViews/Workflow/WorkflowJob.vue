<template>
  <div>
    <WorkflowChart :chart_data="chart_data" ref="workflow_chart"></WorkflowChart>
    <el-button @click="stop">默认按钮</el-button>
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
  public chart_data =
    '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","style_type":"normal"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","style_type":"normal"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","style_type":"normal"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","style_type":"normal"}]';

  //public char_data = "[{'name': 'A', 'dependencies': [], 'id': '1', 'template': 'alpine: 3.7', 'style_type': 'success'}, {'name': 'B', 'dependencies': ['A'], 'id': '2', 'template': 'alpine: 3.7', 'style_type': 'normal'}, {'name': 'C', 'dependencies': ['A'], 'id': '3', 'template': 'alpine: 3.7', 'style_type': 'disable'}, {'name': 'D', 'dependencies': ['B', 'C'], 'id': '4', 'template': 'alpine: 3.7', 'style_type': 'success'}]";
  //public chart = new WorkflowChartAlter(this.chart_data);
  public str: string = "";
  public chart: any;
  public workflow_name: string = "";
  public scheduler: number = 0;

  created(){
    console.log(this.$route.query.data)
    this.workflow_name = this.$route.query.data.toString() 
    this.scheduler = self.setInterval(()=>{
      this.getData();
    }, 2000)
    // this.scheduler()
  }

  beforeDestroy(){
    this.stop()
  }

  async getData(){
    const { data } = await this.$axios.get("wfs/workflowJobs/" + this.workflow_name);
    var result = JSON.parse(data)
    this.chart_data = JSON.stringify(result.topology)
    console.log(result.phase)
    // if(result.phase == "Succeeded"){
      stop()
    // }
  }

  async stop(){
    window.clearInterval(this.scheduler)
  }

  mounted() {
    this.chart = this.$refs.workflow_chart as WorkflowChart;
    // console.log(this.$route.query.data)
    //this.get_message()

    //console.log(this.chart.get_chartjson());
  }

  public get_chartjson() {
    console.log(this.chart.get_chartjson());
  }
  // async get_message() {
  //   console.log(this.chart);
  //   this.str = this.chart.get_chartjson();
  //   console.log(this.str + "%%%%%");
  // }
}
</script>

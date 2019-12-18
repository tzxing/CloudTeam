<template>
  <div>
    <WorkflowChart :chart_data="chart_data" ref="workflow_chart"></WorkflowChart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import WorkflowChart from "./Components/WorkflowChart.vue";
import WorkflowChart from "./Components/WorkflowChart.vue";

@Component({
  components: { WorkflowChart }
})
export default class DashboardView extends Vue {
  public chart_data =
    '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","style_type":"success"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","style_type":"normal"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","style_type":"disable"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","style_type":"disable"}]';

  //public char_data = "[{'name': 'A', 'dependencies': [], 'id': '1', 'template': 'alpine: 3.7', 'style_type': 'success'}, {'name': 'B', 'dependencies': ['A'], 'id': '2', 'template': 'alpine: 3.7', 'style_type': 'normal'}, {'name': 'C', 'dependencies': ['A'], 'id': '3', 'template': 'alpine: 3.7', 'style_type': 'disable'}, {'name': 'D', 'dependencies': ['B', 'C'], 'id': '4', 'template': 'alpine: 3.7', 'style_type': 'success'}]";
  //public chart = new WorkflowChartAlter(this.chart_data);
  public str: string = "";
  public chart: any;

  mounted() {
    this.chart = this.$refs.workflow_chart as WorkflowChart;
    //this.get_message()
    console.log(this.chart.get_chartjson())

  }



  // async get_message() {
  //   console.log(this.chart);
  //   this.str = this.chart.get_chartjson();
  //   console.log(this.str + "%%%%%");
  // }
}
</script>

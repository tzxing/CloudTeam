<template>
  <div>
    <WorkflowChartAlter :chart_data="chart_data" ref="workflow_chart"></WorkflowChartAlter>

    <div>
      <el-button type="text" @click="get_chartjson">生成工作流模版!!!</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import WorkflowChart from "./Components/WorkflowChart.vue";
import WorkflowChartAlter from "./Components/WorkflowChartAlter.vue";

@Component({
  components: { WorkflowChartAlter }
})
export default class DashboardView extends Vue {
<<<<<<< HEAD
  public chart_data =
    '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","phase":"normal"},{"name":"B","dependencies":["A"],"id":"2","template":"alpine: 3.7","phase":"normal"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","phase":"normal"},{"name":"D","dependencies":["B","C"],"id":"4","template":"alpine: 3.7","phase":"normal"},{"name":"fd","dependencies":["4"],"id":"f4e625cd-2e29-4a5c-9d4e-7e01ec61ee47","template":"fd","phase":"normal"}]'
=======
  public chart_data ='[{"name": "A","dependencies":[], "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-579873966"}, {"dependencies": ["A"], "name": "B", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-563096347"}, {"dependencies": ["A"], "name": "C", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-546318728"}, {"dependencies": ["B", "C"], "name": "D", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-663762061"}]'
  //  '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","phase":"normal"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","phase":"normal"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","phase":"normal"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","phase":"normal"}]';
>>>>>>> wanghong
  public str: string = "";
  public chart: any;

  mounted() {
    this.chart = this.$refs.workflow_chart as WorkflowChartAlter;
    //this.get_message()

    //console.log(this.chart.get_chartjson());
  }

  public get_chartjson() {
    console.log(this.chart.get_chartjson());
   //console.log(this.chart.workflow_uuid_name_pairs)

  }
  // async get_message() {
  //   console.log(this.chart);
  //   this.str = this.chart.get_chartjson();
  //   console.log(this.str + "%%%%%");
  // }
}
</script>

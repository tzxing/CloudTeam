<template>
  <div>
    <WorkflowChart :chart_data="chart_data" ref="workflow_chart"></WorkflowChart>

    <div>
      <el-button type="text" @click="get_chartjson">生成工作流模版!!!</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkflowChart from "./Components/WorkflowChart.vue";
// import WorkflowChartAlter from "./Components/WorkflowChartAlter.vue";

@Component({
  components: { WorkflowChart }
})
export default class DashboardView extends Vue {
  public chart_data =
    '[{"name": "A", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-579873966"}, {"dependencies": ["A"], "name": "B", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-563096347"}, {"dependencies": ["A"], "name": "C", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-546318728"}, {"dependencies": ["B", "C"], "name": "D", "template": "workflow1", "phase": "success", "id": "tttttaa-rx7hx-663762061"}]';
  public str: string = "";
  public chart: any;

  created(){
    console.log(this.$route.query.data)
  }

  mounted() {
    this.chart = this.$refs.workflow_chart as WorkflowChart;
    console.log(this.$route.query.data)
    this.chart_data = this.$route.query.data.toString()
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

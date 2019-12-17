<template>
  <div>
    <WorkflowChartAlter :chart_data="char_data"></WorkflowChartAlter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import WorkflowChart from "./Components/WorkflowChart.vue";
import WorkflowChartAlter from "./Components/WrokflowChartAlter.vue";

@Component({
  components: { WorkflowChartAlter }
})
export default class DashboardView extends Vue {
  public char_data =
    '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","style_type":"success"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","style_type":"normal"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","style_type":"disable"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","style_type":"success"}]';
}
</script>

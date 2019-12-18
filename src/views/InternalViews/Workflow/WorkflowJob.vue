<template>
  <div>
    <WorkflowChart  chart_data='[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7"}]'></WorkflowChart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WorkflowChart from "./Components/WorkflowChart.vue";

@Component({
    components:{WorkflowChart}
})
export default class DashboardView extends Vue {

}
</script>

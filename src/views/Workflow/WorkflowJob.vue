<template>
  <div>
    <el-select v-model="refresh_interval" placeholder="请选择" @change="onchange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <WorkflowChart :chart_data="chart_data" ref="workflow_chart"></WorkflowChart>
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
  public chart_data = "[]";

  //public char_data = "[{'name': 'A', 'dependencies': [], 'id': '1', 'template': 'alpine: 3.7', 'style_type': 'success'}, {'name': 'B', 'dependencies': ['A'], 'id': '2', 'template': 'alpine: 3.7', 'style_type': 'normal'}, {'name': 'C', 'dependencies': ['A'], 'id': '3', 'template': 'alpine: 3.7', 'style_type': 'disable'}, {'name': 'D', 'dependencies': ['B', 'C'], 'id': '4', 'template': 'alpine: 3.7', 'style_type': 'success'}]";
  //public chart = new WorkflowChartAlter(this.chart_data);
  public str: string = "";
  public chart: any;
  public workflow_name: string = "";
  public scheduler: number = 0;
  private flag = 1;

  created() {
    // console.log(this.$route.query.data) data:custom_id
    this.workflow_name = this.$route.query.data.toString();
    // this.scheduler()
  }

  options = [
    {
      value: 0.5,
      label: "0.5s"
    },
    {
      value: 1.0,
      label: "1.0s"
    },
    {
      value: 1.5,
      label: "1.5s"
    },
    {
      value: 2,
      label: "2s"
    }
  ];
  private refresh_interval = 1.0;

  beforeDestroy() {
    this.stop();
  }

  onchange(value: number) {
    this.stop();
    this.scheduler = self.setInterval(() => {
      this.getData();
    }, 1000 * value);
  }

  async getData() {
    console.log("12233"+this.workflow_name);
    const { data } = await this.$axios.get(
      "wfs/workflowJobs/" + this.workflow_name + "/" + this.flag
    );
    if (data == 1){
      return 
    }
    console.log(typeof '{"result":true, "count":42}');
    console.log(typeof data);
    console.log(data);
    const result = JSON.parse(data);
    this.chart_data = JSON.stringify(result.topology);
    if (result.phase == "Succeeded") {
      this.stop();
    }
    this.flag = 0
  }

  public stop() {
    window.clearInterval(this.scheduler);
  }

  public mounted() {
    this.chart = this.$refs.workflow_chart as WorkflowChart;

    this.onchange(this.refresh_interval);
    this.getData();
  }
}
</script>

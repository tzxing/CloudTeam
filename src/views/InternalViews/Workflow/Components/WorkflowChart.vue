<template>
  <div class="wf-chart">
    <WorkflowChartNode
      v-for="info in workflow_nodes"
      :key="info.id"
      :id="info.id"
      :jsp_instance="plumbIns"
      :label="info.name"
      style_type="normal"
    ></WorkflowChartNode>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WorkflowChartNode from "./WorkflowChartNode.vue";
import { jsPlumb } from "jsplumb";

interface Workflownode {
  id:string;
  name: string;
  dependencies: [];
  image: string;
}

@Component({
  components: { WorkflowChartNode }
})
export default class WorkflowChart extends Vue {
  @Prop({ required: true, type: String })
  public chart_data!: string; //传入的json串，表示工作流树结构

  //public test_str = '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7"}]'
  public workflow_nodes = JSON.parse(this.chart_data);
  public workflow_pairs: any = [];
  public workflow_uuid_pairs: { [index: string]: string } = {};

  private plumbIns: any = jsPlumb.getInstance();

  public get_uuid_pairs() {
    this.workflow_nodes.array.forEach((item: Workflownode) => {
      this.workflow_uuid_pairs[item["name"]] = item["id"]
    });
  }

  public get_dependcy_pairs() {
    this.get_uuid_pairs()
    let pairs: any = [];
    this.workflow_nodes.forEach((item: Workflownode) => {
      let node_name = item["name"];
      if (item["dependencies"].length != 0) {
        item["dependencies"].forEach(element_dependcy => {
          let pair: string[] = [];
          pair[0] = this.workflow_uuid_pairs[element_dependcy];
          pair[1] = this.workflow_uuid_pairs[node_name];
          pairs.push(pair);
        });
      }
    });
    return pairs;
  }

  public mounted() {
    //let plumbIns = jsPlumb.getInstance()
    //console.log(this.workflow_nodes)
    //console.log(this.get_dependcy_pairs());
    // this.workflow_uuid_pairs = this.get_uuid_pairs()
    // console.log(this.workflow_uuid_pairs)
    
    this.$nextTick(() => {
      this.workflow_pairs = this.get_dependcy_pairs()
      for (let item of this.workflow_pairs) {
        this.plumbIns.connect({
          source: item[0],
          target: item[1]
        })
      }
    });
  }

  public get_chartjson(): string {
    return JSON.stringify(this.chart_data);
  }

  // callback() {
  //     let blocks = []
  // }
}
</script>

<style lang="scss" scoped>
.wf-chart {
  position: relative;
}
</style>
<template>
  <div class="wf-chart">
    <WorkflowChartNode
      v-for="info in workflow_nodes"
      :key="info.id"
      :id="info.id"
      :jsp_instance="plumbIns"
      :label="info.name"
      style_type = "normal"
    ></WorkflowChartNode>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WorkflowChartNode from "./WorkflowChartNode.vue";
import { jsPlumb } from "jsplumb";

interface Workflownode {
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

  //public test_str = '{"name":"dag-diamond","tasks":[{"name":"A","dependencies":[],"template":"alpine: 3.7"},{"name":"B","dependencies":["A"],"template":"alpine: 3.7"},{"name":"C","dependencies":["A"],"template":"alpine: 3.7"},{"name":"D","dependencies":["B","C"],"template":"alpine: 3.7"}]}'
  public workflow_nodes = JSON.parse(this.chart_data);
  public workflow_pairs: any = [];
  private plumbIns: any=jsPlumb.getInstance();

  public get_pairs() {
    let pairs: any = [];
    this.workflow_nodes.forEach((item: Workflownode) => {
      let node_name = item["name"];
      if (item["dependencies"].length != 0) {
        item["dependencies"].forEach(element => {
          // if(element === ""){
          //     console.log(item)
          // }
          let pair: string[] = [];
          pair[0] = element;
          pair[1] = node_name;
          pairs.push(pair);
        });
      }
    });
    return pairs;
  }

  public mounted() {
    //let plumbIns = jsPlumb.getInstance()
    //console.log(this.workflow_nodes)
    console.log(this.get_pairs());
    this.$nextTick(()=>{
        // this.workflow_pairs = this.get_pairs()
        // for (let item of this.workflow_pairs) {
        //   this.plumbIns.connect({
        //     source: item[0],
        //     target: item[1]
        //   }, defaultConfig)
        // }
    })
  }

  public get_chartjson():string{
      let chart_json = ""

      return JSON.stringify(chart_json)
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
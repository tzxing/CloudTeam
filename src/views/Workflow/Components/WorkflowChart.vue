<template>
  <div class="wf-chart" ref="wf_chart_area">
    <div>
      <WorkflowChartNodeDetail
        v-for="info in workflow_nodes"
        :key="info.id"
        :id="info.id"
        :jsp_instance="plumbIns"
        :label="info.name"
        :image="info.image"
        :style_type="info.phase"
        :node_info="info.node_info"
        :enable_edit="false"
      ></WorkflowChartNodeDetail>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import WorkflowChartNodeDetail from "./WorkflowChartNodeDetail.vue";
import { jsPlumb, jsPlumbInstance } from "jsplumb";
const dagre = require("dagre");

interface WorkflowChartnodeDetail {
  id: string;
  name: string;
  dependencies: string[];
  image: string;
  style_type: string;
  node_info: string;
}

@Component({
  components: { WorkflowChartNodeDetail }
})
export default class WorkflowChart extends Vue {
  @Prop({ required: true, type: String })
  public chart_data!: string; //传入的json串，表示工作流树结构
  public workflow_nodes = JSON.parse(this.chart_data);
 
  // public test_str = '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","style_type":"success","node_info":"A11"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","style_type":"error","node_info":"B22"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","style_type":"disable","node_info":"C33"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","style_type":"success","node_info":"D44"}]';
  // public workflow_nodes = JSON.parse(this.test_str);

  public workflow_pairs: any = [];
  public workflow_uuid_pairs: { [index: string]: string } = {};
  public workflow_uuid_name_pairs: { [index: string]: string } = {};
  public dialogFormVisible = false;
  public chartjson: string = "";

  public form = {
    name: "",
    image: "",
    parallel: ""
  };

  //   constructor(chart_data: any) {
  //     super();
  //     this.chart_data = chart_data;
  //   }

  private plumbIns: jsPlumbInstance = jsPlumb.getInstance();

  //获取节点名称-uuid的map映射
  public get_uuid_pairs() {
    this.workflow_nodes.forEach((item: WorkflowChartnodeDetail) => {
      this.workflow_uuid_pairs[item["name"]] = item["id"];
    });
  }

  @Watch("chart_data")
  private chart_data_changed(new_vaule: string) {
    this.plumbIns.deleteEveryConnection();
    this.workflow_nodes = JSON.parse(new_vaule);

    this.$nextTick(() => {
      this.draw_connections();
    });
  }

  //获取uuid-节点名称的map映射
  public get_uuid_name_pairs() {
    this.workflow_nodes.forEach((item: WorkflowChartnodeDetail) => {
      this.workflow_uuid_name_pairs[item["id"]] = item["name"];
    });
  }

  //获取节点id-父节点id的map映射
  public get_dependcy_pairs() {
    this.get_uuid_pairs();
    let pairs: any = [];
    this.workflow_nodes.forEach((item: WorkflowChartnodeDetail) => {
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

  private draw_connections() {
    this.workflow_pairs = this.get_dependcy_pairs();
    // console.log(this.workflow_pairs);

    for (let item of this.workflow_pairs) {
      this.connect_node(item[0], item[1]);
    }

    this.auto_layout();
  }

  public mounted() {
    // this.workflow_uuid_pairs = this.get_uuid_pairs()
    //console.log(this.workflow_uuid_pairs)

    this.plumbIns.ready(() => {
      this.plumbIns.bind("beforeDrop", (info: any) => {
        this.workflow_pairs.push([info.sourceId, info.targetId]);
        //this.connect_node(info.sourceId, info.targetId);
        this.workflow_nodes.forEach((item: WorkflowChartnodeDetail) => {
          if (item.id == info.targetId) {
            item.dependencies.push(
              this.workflow_uuid_name_pairs[info.sourceId]
            );
          }
        });
        return false;
      });
    });

    this.$nextTick(() => {
      this.draw_connections();
    });
     
  }

  private connect_node(source_id: string, target_id: string) {
    this.plumbIns.connect({
      source: source_id,
      target: target_id,
      overlays: [["Arrow", { width: 12, length: 12, location: 1 }]],
      connector: "StateMachine",
      anchors: ["ContinuousBottom", "ContinuousTop"],
      endpoint: "Blank"
    });
  }

  public auto_layout() {
    const g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(function() {
      return {};
    });
    this.workflow_nodes.forEach((n: WorkflowChartnodeDetail) => {
      g.setNode(n.id, { width: 100, height: 40 });
    });
    this.workflow_pairs.forEach((itm: any) => {
      g.setEdge(itm[0], itm[1]);
    });
    dagre.layout(g, { ranker: "tight-tree" });
    const move_offset =
      ((this.$refs.wf_chart_area as any).offsetWidth - g.graph().width) / 2 -
      50;
    g.nodes().forEach((n: string) => {
      (document.getElementById(n) as any).style.left =
        g.node(n).x + move_offset + "px";
      (document.getElementById(n) as any).style.top = g.node(n).y + "px";
    });

    this.plumbIns.repaintEverything();
  }

  public get_chartjson(): string {
    this.chartjson = JSON.stringify(this.workflow_nodes);
    //console.log(this.chartjson)
    return this.chartjson;
  }

  public guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
}
</script>

<style lang="scss" scoped>
.wf-chart {
  position: relative;
  padding-left: 60%;
  padding-top: 5%;
  padding-bottom: 30%;
}
</style>
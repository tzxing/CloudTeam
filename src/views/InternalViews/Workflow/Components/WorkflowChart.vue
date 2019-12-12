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

    <el-button type="text" @click="dialogFormVisible = true">新增工作流节点</el-button>

    <el-dialog title="节点信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="镜像" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_node">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WorkflowChartNode from "./WorkflowChartNode.vue";
import { jsPlumb, jsPlumbInstance } from "jsplumb";
const dagre = require("dagre");

interface Workflownode {
  id: string;
  name: string;
  dependencies: string[];
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
  public dialogFormVisible= false
  public form= {
        name: "",
        image: "",
        parallel: ""
      }

  private plumbIns: jsPlumbInstance = jsPlumb.getInstance();

  //获取节点名称-id的map映射
  public get_uuid_pairs() {
    this.workflow_nodes.forEach((item: Workflownode) => {
      this.workflow_uuid_pairs[item["name"]] = item["id"];
    });
  }

  //获取节点id-父节点id的map映射
  public get_dependcy_pairs() {
    this.get_uuid_pairs();
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
    // this.workflow_uuid_pairs = this.get_uuid_pairs()
    //console.log(this.workflow_uuid_pairs)

    this.plumbIns.ready(() => {
      this.plumbIns.bind("beforeDrop", (info: any) => {
        this.workflow_pairs.push([info.sourceId, info.targetId]);
        this.connect_node(info.sourceId, info.targetId);
        this.workflow_nodes.forEach((item: Workflownode) => {
          if (item.id == info.targetId) {
            item.dependencies.push(info.sourceId);
          }
        });
        return false;
      });
    });

    this.$nextTick(() => {
      this.workflow_pairs = this.get_dependcy_pairs();

      for (let item of this.workflow_pairs) {
        this.connect_node(item[0], item[1]);
      }

      this.auto_layout();
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
    this.workflow_nodes.forEach((n: Workflownode) => {
      g.setNode(n.id, { width: 100, height: 40 });
    });
    this.workflow_pairs.forEach((itm: any) => {
      g.setEdge(itm[0], itm[1]);
    });
    dagre.layout(g, { ranker: "tight-tree" });
    g.nodes().forEach((n: string) => {
      (document.getElementById(n) as any).style.left = g.node(n).x + "px";
      (document.getElementById(n) as any).style.top = g.node(n).y + "px";
      console.log(`${n} x: ${g.node(n).x}, y:${g.node(n).y}`);
    });

    this.plumbIns.repaintEverything();
  }

  public get_chartjson(): string {
    return JSON.stringify(this.workflow_nodes);
  }

  public add_node(){

      let add_info: { [index: string]: any } = {};
      add_info["name"] = this.form.name
      add_info["template"] = this.form.image
      add_info["dependencies"] = []
      add_info["id"] = this.guid()
      this.workflow_nodes.push(add_info)

      this.dialogFormVisible = false;
  }



public guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
}
</script>

<style lang="scss" scoped>
.wf-chart {
  position: relative;
}
</style>
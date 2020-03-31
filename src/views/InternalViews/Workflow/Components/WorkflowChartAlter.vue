<template>
  <div class="wf-chart">
    <div class="alter_button">
      <div>
        <el-button type="text" @click="dialogFormVisible = true">新增工作流节点</el-button>
      </div>
      <div>
        <el-button type="text" @click="auto_layout">自动布局</el-button>
      </div>
    </div>

    <div>
      <WorkflowChartNode
        v-for="info in workflow_nodes"
        :key="info.id"
        :id="info.id"
        :jsp_instance="plumbIns"
        :label="info.name"
        :style_type="info.phase"
      ></WorkflowChartNode>
    </div>

    <el-dialog title="节点信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="formRule">
        <el-form-item label="批量取值终点">
          <el-input v-model.number="form.range_end" placeholder="输入终点，起点默认从0开始"></el-input>
        </el-form-item>
        <el-form-item prop="node_name" label="节点名称" required>
          <el-input v-model="form.node_name" placeholder="节点由字母，数字和横线构成，且以字母开始"></el-input>
        </el-form-item>
        <el-form-item prop="image" label="镜像" required>
          <el-input v-model="form.image"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_node">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import WorkflowChartNode from "./WorkflowChartNode.vue";
import { jsPlumb, jsPlumbInstance } from "jsplumb";
import { Form } from "element-ui";
const dagre = require("dagre");

interface Workflownode {
  id: string;
  name: string;
  dependencies: string[];
  image: string;
  phase: string;
}

@Component({
  components: { WorkflowChartNode }
})
export default class WorkflowChartAlter extends Vue {
  @Prop({ required: true, type: String })
  public chart_data!: string; //传入的json串，表示工作流树结构

  public form = {
    node_name: "",
    image: "",
    parallel: "",
    range_end: 0
  };
  public formRule = {
    node_name: [
      {
        validator: (rule: any, value: any, callback: any) => {
          const pattern = /^[A-Za-z]+[a-zA-Z0-9-]*(\{\})?$/g;
          if (value === "") {
            callback(new Error("节点名称为必填项"));
          } else if (!pattern.test(value)) {
            callback(
              new Error(
                "节点名称不合法，只能包含字母，数字和横线，且以字母开始"
              )
            );
          }
          callback();
        },
        trigger: "blur"
      },
      { required: true, message: "节点名是必填项", trigger: "blur" }
    ],
    image: [{ required: true, message: "镜像名是必填项", trigger: "blur" }]
  };

  //public test_str = '[{"name":"A","dependencies":[],"id":"1","template":"alpine: 3.7","style_type":"success"},{"name":"B","id":"2","dependencies":["A"],"template":"alpine: 3.7","style_type":"error"},{"name":"C","dependencies":["A"],"id":"3","template":"alpine: 3.7","style_type":"disable"},{"name":"D","id":"4","dependencies":["B","C"],"template":"alpine: 3.7","style_type":"success"}]''
  public workflow_nodes = JSON.parse(this.chart_data);
  public workflow_pairs: any = [];
  public workflow_uuid_pairs: { [index: string]: string } = {};
  public workflow_uuid_name_pairs: { [index: string]: string } = {};
  public dialogFormVisible = false;
  public chartjson: string = "";

  private plumbIns: jsPlumbInstance = jsPlumb.getInstance();

  //获取节点名称-uuid的map映射
  public get_uuid_pairs() {
    this.workflow_nodes.forEach((item: Workflownode) => {
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
    this.workflow_nodes.forEach((item: Workflownode) => {
      this.workflow_uuid_name_pairs[item["id"]] = item["name"];
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

  private draw_connections() {
    this.workflow_pairs = this.get_dependcy_pairs();

    for (let item of this.workflow_pairs) {
      this.connect_node(item[0], item[1]);
    }

    this.auto_layout();
  }

  public mounted() {
    this.plumbIns.ready(() => {
      this.plumbIns.bind("beforeDrop", (info: any) => {
        this.workflow_pairs.push([info.sourceId, info.targetId]);
        this.connect_node(info.sourceId, info.targetId);
        this.workflow_nodes.forEach((item: Workflownode) => {
          if (item.id == info.targetId) {
            this.get_uuid_name_pairs();
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
    this.workflow_nodes.forEach((n: Workflownode) => {
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

  public async add_node() {
    if (await (this.$refs["form"] as Form).validate()) {
      // 检查是否为批量添加
      const pattern_name = /^([A-Za-z]+[a-zA-Z0-9-]*)(\{\})?$/gm;
      const pattern_image = /([a-zA-Z/._0-9]+)(\{\})?([a-zA-Z/._:0-9]+)/gm;
      const reg_rst = pattern_name.exec(this.form.node_name)!;
      if (reg_rst.length == 3) {
        const name_prefix = reg_rst[1];
        const reg_rst_2 = pattern_image.exec(this.form.image)!;
        const image_prefix = reg_rst_2[1];
        const image_postfix = reg_rst_2[3];

        for (let i = 0; i <= this.form.range_end; i++) {
          let add_info: { [index: string]: any } = {};
          add_info["name"] = `${name_prefix}${i}`;
          add_info["template"] = `${image_prefix}${i}${image_postfix}`;
          add_info["dependencies"] = [];
          add_info["phase"] = "normal";
          add_info["id"] = this.guid();
          this.workflow_nodes.push(add_info);
        }
      } else {
        let add_info: { [index: string]: any } = {};
        add_info["name"] = this.form.node_name;
        add_info["template"] = this.form.image;
        add_info["dependencies"] = [];
        add_info["phase"] = "normal";
        add_info["id"] = this.guid();
        this.workflow_nodes.push(add_info);
      }

      this.dialogFormVisible = false;
      this.form.node_name = "";
      this.form.image = "";
    }
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
.alter_button {
  position: relative;
}
</style>
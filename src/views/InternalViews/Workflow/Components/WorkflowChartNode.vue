<template>
  <div class="wf-node-wrapper" :class="[_style_type]">
    <div class="wf-node-text">{{label}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { jsPlumbInstance } from "jsplumb";

@Component({
  components: { WorkflowChartNode }
})
export default class WorkflowChartNode extends Vue {
  @Prop({ required: true, type: String })
  public id!: string;

  @Prop({ required: true, type: String })
  public jsp_instance!: jsPlumbInstance;

  @Prop({ required: true, type: String })
  public label!: string;

  @Prop({ required: false, default: "normal", type: String })
  public style_type: string = "normal";

  private get _style_type(): string {
    return `wf-node-type-${this.style_type}`;
  }

  public mounted() {
    console.log(this.jsp_instance)
    this.jsp_instance.draggable(this.id);
    this.jsp_instance.addEndpoint(this.id, {
      anchor: "Continuous",
      maxConnections: 1,
      parameters: {},
      id: this.id,
      scope: "",
      isSource: true,
      isTarget: true,
      reattachConnections: false,
      type: "Dot",
      paintStyle: {
        fill: "gray",
        strokeWidth: 8
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.wf-node-wrapper {
  width: 80px;
  height: 30px;
  border-radius: 10px;
  position: absolute;

  .wf-node-text {
    padding: 5px 5px 5px 20px;
    font-size: 0.8em;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    background-color: white;
  }
}

.wf-node-type-normal {
  background-color: blue;
}

.wf-node-type-success {
  background-color: green;
}

.wf-node-type-error {
  background-color: red;
}

.wf-node-type-disable {
  background-color: gray;
}
</style>
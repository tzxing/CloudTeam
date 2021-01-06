<template>
  <div class="wf-node-wrapper" :id="id" :class="[_style_type]">
    <div class="wf-node-text">
      <span>{{label}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { jsPlumbInstance, Endpoint } from "jsplumb";


@Component({
  components: { WorkflowChartNode }
})
export default class WorkflowChartNode extends Vue {
  @Prop({ required: true, type: String })
  public id!: string;

  @Prop({ required: true })
  public jsp_instance!: jsPlumbInstance;

  @Prop({ required: true, type: String })
  public label!: string;

  @Prop({ required: false, default: "disable", type: String })
  public style_type!: string;

  @Prop({ required: false, default: true })
  public  readonly enable_edit!:boolean;

  private get _style_type(): string {
    return `wf-node-type-${this.style_type}`;
  }

  public mounted() {
    this.jsp_instance.draggable(this.id);
    if (this.enable_edit) {
      this.jsp_instance.addEndpoint(this.id, {
        anchor: "Left",
        connector: "StateMachine",
        maxConnections: -1,
        parameters: {},
        id: this.id,
        scope: "",
        isSource: true,
        isTarget: true,
        reattachConnections: false,
        type: "Rectangle",
        paintStyle: { fill: "transparent" },
      });
    }
  }
 
 
}
</script>

<style lang="scss" scoped>
$wrapper_height: 40px;
$wrapper_width: 100px;
$small_pad: 2px;
$large_pad: 18px;
$border-size: 1px;

.wf-node-wrapper {
  width: $wrapper_width;
  height: $wrapper_height;
  border-radius: 5px;
  position: absolute;
  box-sizing: border-box;
  cursor: default;

  .wf-node-text {
    margin: $small_pad $small_pad $small_pad $large_pad;
    width: $wrapper_width - $small_pad - $large_pad - 2 * $border-size;
    height: $wrapper_height - 2 * $small_pad - 2 * $border-size;
    border-style: solid;
    border-color: black;
    border-width: $border-size;
    background-color: white;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.wf-node-type-normal {
  background-color: #20a0ff;
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

.wf-node-type-running {
  background-color: #FFCC00;
}

</style>
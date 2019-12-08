<template>
  <div class="wf-node">
    <div></div>
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

  @Prop({ required: true })
  public jsp_instance!: jsPlumbInstance;
}
</script>

<style lang="scss" scoped>
</style>
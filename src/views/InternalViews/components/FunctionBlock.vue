<template>
  <div class="function-block" :style="styleObject" @click="jump_to">
    <div>
      <slot></slot>
    </div>
    <i></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class FunctionBlockComponent extends Vue {
  @Prop({ type: String })
  url: string = "";

  @Prop()
  background_color: string = "";

  @Prop()
  cursor: string = "pointer";

  styleObject = {
    backgroundColor: "",
    cursor: "pointer"
  };

  public jump_to() {
    if (this.url !== "") this.$router.push(this.url);
  }

  public mounted() {
    this.styleObject.backgroundColor = this.background_color;
    this.styleObject.cursor = this.cursor;
  }
}
</script>

<style lang="scss" scoped>
.function-block {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 1.1em;

  & > i {
    height: 1px;
    width: 0px;
    transition: all 0.2s linear;
  }

  & > div {
    color: white;

    & > p {
      margin: 0px 10px 5px 10px;
    }
  }
}

.function-block:hover {
  & > i {
    background-color: white;
    height: 1px;
    width: 4em;
    margin: 10px 0px;
    transition: all 0.2s linear;
  }
}
</style>
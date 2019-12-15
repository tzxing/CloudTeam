<template>
  <div class="container">
    <div id="logo-title">
      <h1>云控制一体化服务平台</h1>
    </div>

    <div id="functions-area">
      <div id="functions">
        <FunctionBlock
          style="grid-area: a;"
          background_color="rgb(155, 53, 196)"
          url="/internal/workflow"
        >工作流调度</FunctionBlock>

        <FunctionBlock
          style="grid-area: b;"
          background_color="#e5ca8f"
          url="/internal/smartcar"
        >智能小车</FunctionBlock>

        <div class="label-block" style="grid-area: c;">
          <h1>内部系统</h1>
          <div>欢迎你，请选择要进入的功能模块</div>
        </div>

        <FunctionBlock
          style="grid-area: d;"
          background_color="#55a5aa"
          url="/internal/deep_space"
        >深空探测</FunctionBlock>

        <FunctionBlock style="grid-area: e;" background_color="#ffffff" cursor="default">
          <p style="color: black;">现在时间是</p>
          <p style="color: black;">{{current_time_string}}</p>
        </FunctionBlock>

        <FunctionBlock
          style="grid-area: f;"
          background_color="#01763a"
          url="/internal/parkinson"
        >帕金森医疗平台</FunctionBlock>

        <FunctionBlock
          style="grid-area: g;"
          url="/internal/general_computing"
          background_color="#B16E98"
        >高性能计算平台</FunctionBlock>

        <FunctionBlock
          style="grid-area: i;"
          url="/internal/sys_manage"
          background_color="#C58664"
        >系统管理</FunctionBlock>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FunctionBlock from "./components/FunctionBlock.vue";

@Component({
  components: {
    FunctionBlock
  }
})
export default class InternalIndexView extends Vue {
  private current_time_string: string = "";
  private timer!: number;

  public mounted() {
    this.timer = setInterval(() => {
      const today = new Date();
      const y = today.getFullYear(),
        M = today.getMonth() + 1,
        d = today.getDate();
      const h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds();
      const date = `${y}-${M}-${d}`;
      const time = `${h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
      this.current_time_string = date + " " + time;
    }, 1000);
  }

  public beforeDestroy() {
    clearInterval(this.timer);
  }

  public jump_to(url: string) {
    this.$router.push(url);
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-image: url("../../assets/internal_index_background.jpg");
  background-repeat: repeat;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }

  #logo-title {
    height: 150px;
    margin: 20px 5px;
  }

  #functions-area {
    width: 100%;
    margin-bottom: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    #functions {
      display: grid;
      grid-gap: 0.6rem;
      grid-template-columns: repeat(4, 199px);
      grid-template-rows: repeat(3, 160px);
      grid-template-areas:
        "a b c c"
        "d e f g"
        "h i j k";

      .label-block {
        width: 100%;
        height: 100%;
        text-align: start;
        padding-left: 2em;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        & > h1 {
          font-size: 2rem;
          margin: 0px 0px 21px 0px;
        }

        & > div {
          font-size: 1.3em;
        }
      }
    }
  }
}
</style>
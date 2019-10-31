<template>
  <div class="container">
    <div id="logo-title">
      <h1>云控制一体化服务平台</h1>
    </div>
    <div id="functions-area">
      <div id="functions">
        <div
          class="function-block"
          style="grid-area: a; background-color: rgb(155, 53, 196);"
          @click="jump_to('/internal/workflow')"
        >
          <div>工作流调度</div>
          <i></i>
        </div>
        <div
          class="function-block"
          style="grid-area: b; background-color: #e5ca8f;"
          @click="jump_to('/internal/smartcar')"
        >
          <div>智能小车</div>
          <i></i>
        </div>
        <div class="label-block" style="grid-area: c;">
          <h2>内部系统</h2>
          <div>欢迎你，请选择要进入的功能模块</div>
        </div>
        <div
          class="function-block"
          style="grid-area: d; background-color: #55a5aa;"
          @click="jump_to('/internal/deep_space')"
        >
          <div>深空探测</div>
          <i></i>
        </div>
        <div
          class="function-block"
          style="grid-area: e; background-color: #ffffff; cursor: default;"
        >
          <p>现在时间是</p>
          <p>{{current_time_string}}</p>
        </div>
        <div
          class="function-block"
          style="grid-area: f; background-color: #01763a;"
          @click="jump_to('/internal/parkinson')"
        >
          <div>帕金森医疗平台</div>
          <i></i>
        </div>
        <div class="function-block" style="grid-area: g;">Waiting……</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
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

  display: flex;
  flex-direction: column;

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
      grid-template-rows: repeat(2, 160px);
      grid-template-areas:
        "a b c c"
        "d e f g";

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

        cursor: pointer;
        font-size: 1.1em;

        & > i {
          height: 1px;
          width: 0px;
          transition: all 0.2s linear;
        }

        & > div {
          color: white;
        }

        & > p {
          margin: 0px 10px 5px 10px;
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

      .label-block {
        width: 100%;
        height: 100%;
        text-align: start;
        padding-left: 2em;
      }
    }
  }
}
</style>
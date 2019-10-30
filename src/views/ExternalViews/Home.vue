<template>
  <div>
    <!-- 
        第 1 部分 跑马灯
          注意：图片地址
                为固定目录下，固定文件名的图片文件(1.jpg 2.jpg 3.jpg 4.jpg)
              跑马灯图片要求：高度 760 px，高宽比16：9
    -->
    <el-carousel id="carousel-area" :height="carousel_height+'px'">
      <el-carousel-item>
        <img
          src="../../assets/carousels/1.jpg"
          class="carousel-img"
          :style="{height: carousel_height+'px'}"
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="../../assets/carousels/2.jpg"
          class="carousel-img"
          :style="{height: carousel_height+'px'}"
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="../../assets/carousels/3.jpg"
          class="carousel-img"
          :style="{height: carousel_height+'px'}"
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="../../assets/carousels/4.jpg"
          class="carousel-img"
          :style="{height: carousel_height+'px'}"
        />
      </el-carousel-item>
    </el-carousel>
    <div id="show-area">
      <!-- 
        第 2 部分 八栏导航
      -->
      <div class="section-title">研究方向</div>
      <div id="eight-panel-nav">
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #397ABF;"></span>
          <img src="../../assets/panels/1.png" class="eight-panel-img" />
          <a href="/details/cloudcontrol" class="eight-panel-label">云控制</a>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <img src="../../assets/panels/2.png" class="eight-panel-img" />
          <span class="eight-panel-label">MPC</span>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #EBC34B;"></span>
          <img src="../../assets/panels/3.png" class="eight-panel-img" />
          <span class="eight-panel-label">MPC</span>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #684931;"></span>
          <img src="../../assets/panels/4.png" class="eight-panel-img" />
          <span class="eight-panel-label">MPC</span>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #5144C4;"></span>
          <img src="../../assets/panels/5.png" class="eight-panel-img" />
          <span class="eight-panel-label">MPC</span>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #BBAE99;"></span>
          <img src="../../assets/panels/6.png" class="eight-panel-img" />
          <span class="eight-panel-label">MPC</span>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #00145D;"></span>
          <img src="../../assets/panels/7.png" class="eight-panel-img" />
          <span class="eight-panel-label">MPC</span>
        </div>
        <div :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="eight-panel-item">
          <span class="eight-panel-item-color-mask" style="background-color: #fefefe;"></span>
          <img src="../../assets/panels/8.gif" class="eight-panel-img" />
          <span class="eight-panel-label" style="color: #000000">MPC</span>
        </div>
      </div>

      <!-- 
        第 3 部分 四栏导航
      -->
      <div id="four-panel-nav">
        <div class="four-panel-item" style="background-color: #52b4e2">
          <img src="../../assets/fourpanels/1.svg" class="four-panel-item-icon" />
          <span class="four-panel-item-label">国家重点研发计划</span>
        </div>
        <div class="four-panel-item" style="background-color: #e0c05d">
          <img src="../../assets/fourpanels/2.svg" class="four-panel-item-icon" />
          <span class="four-panel-item-label">公共科研服务</span>
        </div>
        <div class="four-panel-item" style="background-color: #798b8c">
          <img src="../../assets/fourpanels/3.svg" class="four-panel-item-icon" />
          <el-link type="info" class="four-panel-item-label" @click="position_dlg_vis = true;">实验室位置</el-link>
        </div>
        <div class="four-panel-item" style="background-color: #0c812d">
          <img src="../../assets/fourpanels/4.svg" class="four-panel-item-icon" />
          <span class="four-panel-item-label">历届毕业生</span>
        </div>
      </div>
    </div>

    <div id="links-area">
      <div id="links-contents">
        <div class="links-contens-item">快速链接：</div>
        <a href="https://service.most.gov.cn/" class="links-contens-item">国家科技管理信息系统公共服务平台</a>
        <el-divider direction="vertical"></el-divider>
        <a href="http://www.bit.edu.cn/" class="links-contens-item">北京理工大学</a>
        <el-divider direction="vertical"></el-divider>
        <a href="http://ac.bit.edu.cn/" class="links-contens-item">北京理工大学自动化学院</a>
        <el-divider direction="vertical"></el-divider>
        <a href="https://mirrors.tuna.tsinghua.edu.cn/" class="links-contens-item">清华大学镜像源</a>
        <el-divider direction="vertical"></el-divider>
        <a href="https://hub.docker.com/" class="links-contens-item">Docker Hub</a>
        <el-divider direction="vertical"></el-divider>
        <a href="https://www.github.com/" class="links-contens-item">GitHub</a>
      </div>
    </div>

    <el-dialog title="实验室位置" :visible.sync="position_dlg_vis" width="70%">
      <img id="position-map-img" src="../../assets/position_map.jpg" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ExternalMain extends Vue {
  private carousel_height: number = 760;
  private position_dlg_vis: boolean = false;

  public resize_carousel() {
    // 跑马灯高度自适应(根据图片高度)
    const img_height: number = document.body.clientWidth / 1.8;
    this.carousel_height = img_height;
  }

  public mounted() {
    window.addEventListener("resize", this.resize_carousel, false);
  }

  public beforeDestory() {
    window.removeEventListener("resize", this.resize_carousel);
  }
}
</script>

<style lang="scss" scoped>
#show-area {
  display: flex;
  flex-direction: column;
  align-items: center;

  #carousel-area {
    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  #four-panel-nav {
    display: flex;
    justify-content: space-between;
    margin: 60px 0;
    width: 1232px;

    div {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      width: 300px;
      height: 207px;
    }
  }

  #eight-panel-nav {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: repeat(4, 308px);
    grid-template-rows: 272px 272px;
    margin: 0 auto;

    .eight-panel-item {
      position: relative;
      overflow: hidden;

      .eight-panel-item-color-mask {
        width: 100%;
        height: 0%;
        opacity: 0;
      }

      .eight-panel-label {
        visibility: hidden;
      }
    }

    .eight-panel-item:hover {
      overflow: hidden;

      .eight-panel-item-color-mask {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        opacity: 0.9;
        transition: all 0.2s linear;
      }

      .eight-panel-label {
        text-decoration-line: none;
        visibility: visible;
        color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    img {
      width: auto;
      height: 100%;
      max-width: 100%;
    }
  }

  .section-title {
    margin: 60px 0 25px;
    font-size: 2.5rem;
    display: flex;
  }

  .four-panel-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .four-panel-item-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
    }

    .four-panel-item-label {
      color: white;
    }
  }
}

#links-area {
  width: 100%;
  height: 38px;
  background-color: #f1f8f6;
  display: flex;
  justify-content: center;
  align-items: center;

  #links-contents {
    flex-basis: 1232px;
    display: flex;
    align-items: center;
    height: 100%;

    .links-contens-item {
      text-decoration-line: none;
      color: black;
    }
  }
}

#position-map-img {
  width: auto;
  height: 100%;
  max-width: 100%;
}
</style>

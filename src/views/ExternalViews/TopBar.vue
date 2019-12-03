<template>
  <div>
    <div id="logo-bar">
      <img id="logo-icon" src="../../assets/logo.png" />
      <h1 id="logo-label">云控制一体化服务平台</h1>
    </div>
    <el-tooltip id="nav-menu-button-tooltip" :value="true" :hide-after="5" effect="dark" content="更多内容" placement="left">
      <el-button id="nav-menu-button" @click="show_menu" icon="el-icon-menu"></el-button>
    </el-tooltip>
    
    <div
      id="menu-mask"
      class="animated faster"
      :class="[{'header-nav-hidden':need_hidden_nav},need_hidden_nav?'':'fadeIn']"
      @click="need_hidden_nav = true"
    ></div>
    <div
      id="header-nav"
      class="animated faster"
      :class="[{'header-nav-hidden':need_hidden_nav},need_hidden_nav?'':'fadeIn']"
      @click="click_menu"
    >
      <router-link to="/home">首页</router-link>
      <router-link to="/ourgroup">团队介绍</router-link>
      <router-link to="/academic">学术成就</router-link>
      <router-link to="/international">国际交流</router-link>
      <router-link to="/cloudplantform">云控制平台</router-link>
      <router-link to="/connect">联系我们</router-link>
      <router-link to="/internal">系统登录</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ExternalViewTopBar extends Vue {
  need_hidden_nav = true;

  show_menu() {
    this.need_hidden_nav = false;
  }
  click_menu() {
    this.need_hidden_nav = true;
  }
}
</script>

<style lang="scss" scoped>
$respective-width: 1248px;

#logo-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: $respective-width) {
    height: 100%;
  }

  @media screen and (min-width: $respective-width) {
    height: 64px;
  }

  #logo-icon {
    @media screen and (max-width: $respective-width) {
      width: 1.5em;
      height: 1.5em;
      margin-right: 1em;
    }
    @media screen and (min-width: $respective-width) {
      // ipad 及以上
      width: 60px;
      height: 60px;
      margin-right: 64px;
    }
  }

  #logo-label {
    @media screen and (max-width: $respective-width) {
      font-size: 1em;
    }
    @media screen and (min-width: $respective-width) {
      // ipad 及以上
      font-size: 3em;
    }
    font-family: "隶书";
  }
}

@media screen and (min-width: $respective-width) {
  // ipad 及以上
  #header-nav {
    display: flex;
    background-color: #007935;
    height: 40px;
    padding: 0 190px;

    a {
      text-decoration-line: none;
      font-size: 1.1rem;
      color: white;
      padding: 0 20px;
      display: inline;
      vertical-align: middle;
      line-height: 40px;
    }
  }

  #nav-menu-button {
    display: none;
  }

  #nav-menu-button-tooltip{
    display: none;
  }

  #menu-mask {
    display: none;
  }
}

@media screen and (max-width: $respective-width) {
  #header-nav {
    display: flex;
    flex-direction: column;
    background-color: #007935;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 60%;
    min-width: 150px;
    min-height: 100vh;
    z-index: 300;
    font-size: 1.2rem;

    a {
      text-decoration-line: none;
      font-size: 1em;
      color: white;
      padding: 8px 5px;
      display: inline;
      vertical-align: middle;
      line-height: 40px;
    }
  }

  .header-nav-hidden {
    visibility: hidden;
  }

  #nav-menu-button-tooltip {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 200;
  }

  #nav-menu-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 200;
  }

  #menu-mask {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 199;
    width: 100%;
    height: 100%;
    background-color: black;
  }
}

.router-link-active {
  background-color: #11984c;
}
</style>
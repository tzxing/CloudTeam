<template>
  <div>
    <div id="logo-bar">
      <img id="logo-icon" src="../../assets/logo.png" />
      <h1 id="logo-label">云控制一体化服务平台</h1>
    </div>
    <div id="header-nav">
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
export default class ExternalViewTopBar extends Vue {}
</script>

<style lang="scss" scoped>
#logo-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;

  #logo-icon {
    width: 60px;
    height: 60px;
    margin-right: 64px;
  }

  #logo-label {
    font-size: 3rem;
    font-family: "隶书";
  }
}

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

.router-link-active {
  background-color: #11984c;
}
</style>
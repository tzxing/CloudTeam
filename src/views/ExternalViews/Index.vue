<template>
  <el-container>
    <el-header>
      <TopBar></TopBar>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer height="117px">
      <a href="http://www.beian.miit.gov.cn/">京ICP备19050641号</a>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBar from "./TopBar.vue";

@Component({
  components: {
    TopBar
  }
})
export default class ExternalMain extends Vue {
  public mounted() {
    this.$router.replace("/home");
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  @media screen and (min-width: 700px) {
    height: 104px !important;
  }

  @media screen and (max-width: 700px) {
    height: 2em !important;
  }
}

.el-main {
  padding: 8px 0;
}

.el-footer {
  background-image: url("../../assets/foot.jpg");
  font-size: 12px;
  color: white;
}
</style>

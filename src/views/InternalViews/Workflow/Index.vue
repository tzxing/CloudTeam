<template>
  <el-container>
    <el-header>
      <TheHeader></TheHeader>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <TheSidebar></TheSidebar>
      </el-aside>
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "./Components/TheHeader.vue";
import TheSidebar from "./Components/TheSidebar.vue";

@Component({
  components: {
    TheHeader,
    TheSidebar
  }
})
export default class WorkflowIndexView extends Vue {
  collapse = false;
  crumbList = "";
  keepAlive = [];
}
</script>

<style lang="scss" scoped>
.header {
  background: #324157;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
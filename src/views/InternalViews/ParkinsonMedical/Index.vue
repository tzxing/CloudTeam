<template>
  <el-container>
    <el-aside width="200px"> <!--侧边栏-->
      <Sidebar></Sidebar>
    </el-aside>
    <el-container> <!--网页右侧主体-->
      <el-header style="text-align: right; font-size: 12px"> <!--顶栏-->
        <Navbar></Navbar>
      </el-header>
      <el-main> <!--网页内容部分-->
        <transition name="fade-transform" mode="out-in">
          <router-view class="main-router-view"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./Components/Navbar.vue";
import Sidebar from "./Components/Sidebar.vue";
// import { Route } from 'vue-router';
import store from '@/store'
@Component({
  components: {
    Navbar,
    Sidebar
  },
  beforeRouteEnter(to,from,next){
  if (store.state.user.medicalsignup === "N"){
    next(vm=>{vm.$router.push("/internal/parkinsonsignup")});
  } else
  {
    next()
  }
}

})
export default class ParkinsonMedicalIndexView extends Vue {
  collapse = false;
  crumbList = "";
  keepAlive = [];



}



</script>

<style lang="scss">
.el-header {
  // background: #324157;
  // background: #148431;
  background: #FAFAFA;
}

.el-aside {
  background: #304156;
}

html,
body,
#app,
.el-container,
.main-router-view {
  height: 100%;
}

// .header {
//   background: #324157;
// }

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
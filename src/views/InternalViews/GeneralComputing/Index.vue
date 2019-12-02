<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class GeneralComputingIndexView extends Vue {
    public mounted() {
        this.$router.replace("/internal/general_computing/tasklist")
    }
}
</script>
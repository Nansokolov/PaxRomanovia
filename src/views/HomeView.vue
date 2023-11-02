<template>
  <div class="main-page">
    <div class="content">
      <MapComp></MapComp>
      <FilterComp></FilterComp>
    </div>
  </div>
</template>

<script>
import MapComp from "@/components/MapComp.vue";
import FilterComp from "@/components/FilterComp.vue";

export default {
  name: "HomeView",
  components: {
    MapComp,
    FilterComp,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    // только фиксированные величины!!!!!
    width: 1360px;
  }
}
</style>

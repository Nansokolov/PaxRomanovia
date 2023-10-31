<template>
  <div class="main-page">
    <div class="content">
      <MapComp></MapComp>
    </div>
  </div>
</template>

<script>
import MapComp from "@/components/MapComp.vue";

export default {
  name: "HomeView",
  components: {
    MapComp,
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  justify-content: center;
  .content {
    width: 800px;
  }
}
</style>

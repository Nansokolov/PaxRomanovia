<template>
  <div class="main-page">
    <div class="content">
      <header>
        <router-link class="link" to="/about">
          <div class="logo">PAX ROMANOVIA</div>
        </router-link>
        <div class="content-filters">
          <FilterComp></FilterComp>
          <FilterComp></FilterComp>
        </div>
      </header>

      <MapComp></MapComp>
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

  background-color: #212121;
  height: 100vh;
  .content {
    // только фиксированные величины!!!!!
    width: 1360px;

    header {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      margin-bottom: 20px;

      align-items: center;
      justify-content: space-between;
    }

    &-filters {
      display: flex;
      gap: 25px;
    }
  }

  .link {
    text-decoration: none;
    font-weight: 800;
    color: antiquewhite;

    &:visited {
      color: antiquewhite;
    }
  }

  .logo {
    font-size: 49px;
    align-self: flex-start;
  }
}
</style>

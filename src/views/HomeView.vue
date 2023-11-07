<template>
  <div class="main-page">
    <div class="content">
      <header>
        <router-link class="link" to="/about">
          <div class="logo">PAX ROMANOVIA</div>
        </router-link>
        <div class="content-filters">
          <FilterComp
            v-for="filterName in filterNames"
            :key="filterName"
            :filterName="filterName"
          ></FilterComp>
        </div>
      </header>

      <MapComp></MapComp>
      <div class="last">
        <RangeComp></RangeComp>
      </div>
    </div>
  </div>
</template>

<script>
import MapComp from "@/components/MapComp.vue";
import FilterComp from "@/components/FilterComp.vue";
import RangeComp from "@/components/RangeComp.vue";

export default {
  name: "HomeView",
  components: {
    MapComp,
    FilterComp,
    RangeComp,
  },
  computed: {
    filterNames() {
      return this.$store.getters.filterNames;
    },
  },
  mounted() {
    document.title = "Pax Romanovia";
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
    display: flex;
    flex-direction: column;

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
      gap: 75px;
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

.last {
  flex-grow: 1;
  display: flex;
  align-items: center;
}
</style>

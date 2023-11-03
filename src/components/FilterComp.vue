<template lang="">
  <div class="filter" @click="openOptionsList">
    <div class="filter-container">
      <div class="filter-icon">
        <img
          src="@/assets/filtericon.svg"
          alt=""
          :class="{ 'rotate-img': hovered }"
        />
      </div>
      <div class="filter-selected">{{ selectedOption }}</div>
      <div class="filter-options" v-if="hovered">
        <div
          class="filter-option"
          v-for="(option, index) in options"
          :key="index"
          @click="updateSelected(option)"
        >
          <span>&bull;</span> {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    filterName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
      vuexModuleUsing: "filters",
    };
  },
  computed: {
    selectedOption() {
      return this.$store.getters[`${this.vuexModuleUsing}/getSelectedOption`](
        this.filterName
      );
    },
    options() {
      return this.$store.getters[`${this.vuexModuleUsing}/getOptions`](
        this.filterName
      );
    },
  },
  methods: {
    openOptionsList() {
      this.hovered = !this.hovered;
    },
    updateSelected(option) {
      const payload = { filter: this.filterName, option };
      console.log(payload);
      this.$store.commit(`${this.vuexModuleUsing}/setSelected`, payload);
      this.$store.commit(`${this.vuexModuleUsing}/setKeyOfSelected`, payload);
      this.$store.commit("setSelectedFilters");
    },
  },
};
</script>
<style lang="scss">
.filter {
  width: 300px;
  position: relative;
  color: antiquewhite;
  &-container {
    height: 100%;
    border-bottom: 4px solid #bd9447b6;
    padding-block: 5px;
    height: 30px;

    display: flex;
    justify-content: center;
  }
  &-icon {
    position: absolute;
    top: 5px;
    left: 0;
    width: 50px;
  }

  &-selected {
    font-size: large;
    line-height: 19px;
  }
  &-options {
    background-color: red;
    position: absolute;
    width: inherit;
    top: 40px;
    left: 0;
    z-index: 100;
  }
  &-option {
    span {
    }
  }
}

.rotate-img {
  transform: rotate(180deg);
}
</style>

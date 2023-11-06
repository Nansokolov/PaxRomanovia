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
      <div class="filter-remove" @click="clearSelected">
        <img src="@/assets/cross.svg" alt="" />
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
    selectedaaa() {
      return this.$store.getters[`${this.vuexModuleUsing}/getSelectedFilters`];
    },
  },
  methods: {
    openOptionsList() {
      this.hovered = !this.hovered;
    },
    updateSelected(option) {
      const payload = { filter: this.filterName, option };

      this.$store.commit(`${this.vuexModuleUsing}/setSelected`, payload);
      this.$store.commit(`${this.vuexModuleUsing}/setKeyOfSelected`, payload);

      this.$emit("updateMarkers");
    },
    clearSelected(event) {
      event.stopPropagation();
      this.$store.commit(
        `${this.vuexModuleUsing}/clearFilter`,
        this.filterName
      );
      this.hovered = false;
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
    position: absolute;
    width: inherit;
    top: 40px;
    left: 0;
    z-index: 1000;
    background-color: #212121a1;
    padding-inline: 5px;

    border-radius: 10px;
  }
  &-option {
    line-height: 35px;
    width: 250px;
    span {
    }
  }
  &-remove {
    position: absolute;
    align-self: center;
    right: 0;
    img {
      height: 15px;
    }
  }
}

.rotate-img {
  transform: rotate(180deg);
}
</style>

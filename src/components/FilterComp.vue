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
      <div class="filter-selected">{{ selected }}</div>
      <div class="filter-options" v-if="hovered">
        <div
          class="filter-option"
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(index)"
        >
          <span>&bull;</span> {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hovered: true,
      selected: "realy much long Default option",
      options: ["option1", "option2"],
    };
  },
  methods: {
    openOptionsList() {
      this.hovered = !this.hovered;
    },
    selectOption(index) {
      this.selected = this.options[index];
    },
  },
};
</script>
<style lang="scss">
.filter {
  width: 350px;
  position: relative;
  color: white;
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

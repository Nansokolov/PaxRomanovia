<template lang="">
  <div class="filter" @mouseover="hovered = true" @mouseleave="hovered = false">
    <div class="filter-container">
      <div class="filter-icon">
        <img src="@/assets/filtericon.svg" alt="" />
      </div>
      <div class="filter-selected">{{}}</div>
      <div class="filter-options" v-if="hovered">
        <div
          class="fliter-option"
          v-for="(option, index) in options"
          :key="index"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hovered: false,
      selected: "",
      options: ["option1", "option2"],
    };
  },
};
</script>
<style lang="scss">
.filter {
  height: 20px;
  width: 350px;
  &-container {
    height: 100%;
    border-bottom: 2px solid #bd9956;
  }
  &-icon {
    background-color: red;
    width: 20px;
    height: 20px;
  }
}
</style>

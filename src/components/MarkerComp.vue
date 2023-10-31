<template lang="">
  <div class="marker" @click="click">
    <img
      class="icon"
      src="@/assets/icons/conflict.svg"
      alt=""
      draggable="false"
    />
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    click() {
      console.log(this.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.marker {
  height: 40px;
  width: 40px;
  text-align: center;

  position: absolute;

  pointer-events: auto;

  cursor: pointer;
}

.icon {
  display: inline;
  height: 20px;
}
</style>

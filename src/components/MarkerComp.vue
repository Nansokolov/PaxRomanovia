<template lang="">
  <div class="marker" @click="click">
    <img
      class="icon"
      src="./../assets/icons/conflict.svg"
      alt=""
      draggable="false"
      @mouseover="showHint = true"
      @mouseout="showHint = false"
    />
    <span class="hint" v-show="showHint">пваыпвап</span>
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
    return {
      showHint: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    click() {
      alert(this.id);
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

.hint {
  width: 100px;
  height: 30px;
}
</style>

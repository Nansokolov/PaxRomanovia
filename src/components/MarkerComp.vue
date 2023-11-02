<template lang="">
  <div class="marker" @click="click">
    <img
      class="icon"
      :src="icons[data.type]"
      alt=""
      draggable="false"
      @mouseover="showHint = true"
      @mouseout="showHint = false"
      :id="data.id"
    />
    <div class="hint" v-show="showHint">
      <span>{{ data.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      showHint: false,

      icons: {
        conflict: require("@/assets/icons/conflict.svg"),
        strengthen: require("@/assets/icons/castle.svg"),
        experiments: require("@/assets/icons/experiment.svg"),
        subjects: require("@/assets/icons/people.svg"),
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {},
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
  font-size: 10px;
}

.icon {
  display: inline;
  height: 40px;
}

.hint {
  transform: translate(50px, -35px);
  background-color: antiquewhite;
  border-radius: 5px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  width: 200px;
  font-size: small;
  border: 1px solid #000;
  span {
    line-height: 16px;
    font-size: 14px;
  }
}
</style>

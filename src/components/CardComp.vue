<template lang="">
  <div class="cardContainer">
    <div class="cardHead" id="event-name">{{ data.name }}</div>
    <div class="cardDate" id="event-date">{{ data.period }}</div>
    <img class="picPreview" src="{{data.pic}}" alt="" draggable="false" />
    <div class="cardBody" id="event-desc">{{ data.description }}</div>
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
.cardContainer {
  height: 420px;
  width: 280px;
  border: 2px solid #bd9956;
  border-radius: 20px;
  background-color: #717171;
  color: white;
  padding: 30px;
}
.picPreview {
  width: 100%;
  height: 100px;
  background-color: red;
}
.cardHead {
  text-transform: capitalize;
  font-size: 16px;
}
.cardDate {
  font-size: 14px;
  margin: 10px 0px;
}
.cardBody {
  margin-top: 20px;
  height: 170px;
  color: black;
  font-size: 14px;

  overflow-y: scroll;
  pointer-events: auto;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: auto;
  }

  &::-webkit-scrollbar-track {
    background-color: darkgrey;
  }

  &::-webkit-scrollbar-thumb {
    background-color: blue; /* цвет бегунка */
    border-radius: 20px; /* округлось бегунка */
    border: 3px solid orange; /* отступ вокруг бегунка */
  }
}
</style>

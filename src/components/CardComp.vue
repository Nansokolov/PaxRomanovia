<template lang="">
  <div class="cardContainer">
    <div class="cardHead" id="event-name">{{ data.name }}</div>
    <div class="cardDate" id="event-date">{{ data.period }}</div>
    <img class="picPreview" :src="returnImg()" alt="" draggable="false" />
    <div class="cardBody" id="event-desc">
      <div>{{ data.description }}</div>
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

  methods: {
    returnImg() {
      return require(`@/assets/cards/${this.data.img}.jpg`);
    },
  },
};
</script>
<style lang="scss" scoped>
.cardContainer {
  height: 420px;
  width: 380px;
  border: 2px solid #bd9956;
  border-radius: 20px;
  background-color: #717171;
  color: antiquewhite;
  padding: 30px;

  -webkit-box-shadow: 12px 12px 8px 0px rgba(34, 60, 80, 0.43);
  -moz-box-shadow: 12px 12px 8px 0px rgba(34, 60, 80, 0.43);
  box-shadow: 12px 12px 8px 0px rgba(34, 60, 80, 0.43);
}
.picPreview {
  height: 130px;
  width: 100%;
  max-height: 130px;
  object-fit: cover;
  margin: auto;
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
  height: 150px;
  width: calc(100% + 10px);
  font-size: 14px;
  color: black;
  padding-right: 5px;
  overflow-y: scroll;
  pointer-events: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #717171;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bd9956; /* цвет бегунка */
    border-radius: 10px;
  }
}

.cardBody div {
  color: white;
  //  background-color: #d9d9d9;
  // height: 100%;
  min-height: 100%;
  padding: 5px 0px 5px 5px;
}
</style>

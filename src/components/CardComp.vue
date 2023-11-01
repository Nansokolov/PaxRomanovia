<template lang="">
    <div class="marker" @click="click">
      <div class="cardHead" id="event-name">{{data.name}}</div>
      <div class="cardDate" id="event-date">{{data.period}}</div>
      <img
        class="picPreview"
        src={{data.pic}}
        alt=""
        draggable="false"
      />
      <div class="cardBody" id="event-desc">{{data.description}}</div>
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
    .picPreview{
      width: 100%;
      height: 100px;
      background-color: red;
    }
    .cardHead{
      text-transform:capitalize;
      font-size: 16px;
    }
    .cardDate{
      font-size: 14px;
      margin: 10px 0px;
    }
    .cardBody{
      background-color: #d9d9d9;
      margin-top: 20px;
      height: 170px;
      color: black;
      font-size: 14px;
      padding: 10px;
    }
  </style>
  
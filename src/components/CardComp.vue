<template lang="">
    <div class="marker" @click="click">
      12323
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

  </style>
  
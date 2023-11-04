<template lang="">
  <div class="inputContainer">
    <input
      type="range"
      class="slider"
      id="myRange"
      min="1600"
      max="1920"
      step="1"
      value="0.00"
      @input="setValue"
      draggable="false"
    />
  </div>
  <span class="minValInput">1600</span>
  <span
    class="minValInput"
    id="currentValue"
    style="position: absolute; background: rgb(33 33 33)"
  ></span>
  <span class="maxValInput">1920</span>
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
      icons: {
        rangemarker: require("@/assets/rangeIcon.png"),
      },
    };
  },
  methods: {
    setValue() {
      const margin = 25; //Value of margin of the "min" span from left corner
      const myRange = document.querySelector("#myRange"); // this.$refs.myRange
      const myValue = document.querySelector("#currentValue"); // this.$refs.currentValue
      myValue.style.display = ""; // здесь через дерективу style
      //Calculating the percentage of the value in between min and max values
      const valueAsPercent =
        (myRange.valueAsNumber - parseInt(myRange.min)) /
        (parseInt(myRange.max) - parseInt(myRange.min));
      // Setting the proper "left" attribute for "Value span" of the range
      myValue.style.left =
        valueAsPercent * myRange.offsetWidth +
        (1 - margin * valueAsPercent) +
        "px"; // шдесь тоже если опрокидываем с помощью дерективы, то просто в data вноси значения и меняй
      // Setting the value of "Value span" of the range
      myValue.innerHTML = myRange.value; // щдесь через дерективу v-html

      setTimeout(function () {
        myValue.style.display = "none";
      }, 1000); // тут почему-то сразу пропадает значение это не работая через setTimeout
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  -moz-appearance: none;
  appearance: none;
  background: none;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: calc(100% - 60px);
  margin: 0 30px;
  -webkit-appearance: none;
  appearance: none;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
  background: #90733c;
  height: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
  -webkit-appearance: none;
  appearance: none;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
  background: #90733c;
  height: 0px;
  margin-top: 10px;
  -webkit-appearance: none;
  appearance: none;
}
.slider::-webkit-slider-thumb {
  --c: orange; /* active color */
  --g: 0px; /* the gap */
  --l: 0px; /* line thickness*/
  --s: 30px; /* thumb size*/

  height: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  // box-shadow: 0 0 0 var(--l) inset var(--c);
  border-image: none;
  border-image: linear-gradient(
      #0000 calc(50% - 1px),
      #90733c 0 calc(50% + 1px),
      #0000 0
    )
    1/0 100vw/0 calc(100vw + 2px);
  -webkit-appearance: none;
  appearance: none;
  transition: 0.3s;

  box-shadow: 0 0 0 var(--l) inset var(--c);

  margin-top: -14px;
  // -webkit-appearance: none;
  // appearance: none;
  // width: 30px;
  // height: 30px;
  // border: 0;
  // border-radius: 50%;
  background-image: url("@/assets/rangeIcon.png");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  // cursor: pointer;
}

.slider::-moz-range-thumb {
  // margin-top: -14px;
  width: 30px;
  height: 30px;
  border: 0;
  margin: 0;
  border-radius: 50%;
  background-image: url("@/assets/rangeIcon.png");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.minValInput,
.maxValInput {
  color: white;
  font-weight: bold;
  display: inline-block;
  margin: 0px 25px;
}
.maxValInput {
  float: right;
}
</style>

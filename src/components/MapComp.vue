<template lang="">
  <div class="map-container" ref="container">
    <div class="card">fasdfsdafasd</div>
    <div
      class="map-layers"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mousemove="drag"
      @mouseleave="stopDragging"
      ref="mapLayer"
    >
      <img
        class="map-layers__background"
        src="@/assets/map.jpg"
        alt=""
        draggable="false"
        ref="map"
      />
      <div
        class="map-layers__markers-layer"
        :style="{ width: mapSize.width + 'px', height: mapSize.height + 'px' }"
      >
        <MarkerComp
          v-for="(marker, index) in markers"
          :key="index"
          :style="{ top: marker.x + 'px', left: marker.y + 'px' }"
          :id="marker.id"
        >
        </MarkerComp>
      </div>
    </div>
  </div>
</template>
<script>
import MarkerComp from "./MarkerComp.vue";

export default {
  components: {
    MarkerComp,
  },
  data() {
    return {
      isDragging: false,
      containerSize: {},
      mapSize: {},
      markers: [
        { x: 20, y: 100, id: 12 },
        { x: 500, y: 180, id: 321 },
      ],
      offsetX: 0,
      offsetY: 0,
    };
  },

  mounted() {
    this.mapSize = this.countMapSizes();
    this.containerSize = this.countContainerSizes();
  },

  methods: {
    countMapSizes() {
      return {
        width: this.$refs.map.clientWidth,
        height: this.$refs.map.clientHeight,
      };
    },
    countContainerSizes() {
      return {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
    },
    startDragging(event) {
      if (event.button !== 0) return;

      this.mapSize = this.countMapSizes();
      this.containerSize = this.countContainerSizes();

      this.isDragging = true;
      document.body.style.cursor = "grabbing";
      this.lastMousePosition = { x: event.clientX, y: event.clientY };
    },
    drag(event) {
      if (!this.isDragging) return;

      const dx = event.clientX - this.lastMousePosition.x;
      const dy = event.clientY - this.lastMousePosition.y;

      const diffX = this.containerSize.width - this.mapSize.width,
        diffY = this.containerSize.height - this.mapSize.height;

      this.offsetX += dx;
      this.offsetY += dy;

      if (this.offsetX > 0) this.offsetX = 0;
      if (this.offsetY > 0) this.offsetY = 0;

      if (this.offsetX < diffX) this.offsetX = diffX;
      if (this.offsetY < diffY) this.offsetY = diffY;
      this.lastMousePosition = { x: event.clientX, y: event.clientY };

      this.$refs.mapLayer.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    },
    stopDragging() {
      this.isDragging = false;
      document.body.style.cursor = "default";
    },
  },
};
</script>
<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;

  .map-layers {
    position: absolute;

    &__background {
      width: 1000px;
    }

    &__markers-layer {
      pointer-events: none;
      position: absolute;
      top: 0;
    }
  }
  .card {
    position: absolute;
    height: 400px;
    width: 300px;
    border: 4px solid red;
    background-color: green;
    z-index: 100;
    right: 40px;
    top: 40px;
    pointer-events: none;
  }
}
</style>

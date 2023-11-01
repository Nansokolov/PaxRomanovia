<template lang="">
  <div class="map-container" ref="container">
    <div class="card">fasdfsdafasd</div>
    <div
      class="map-layers"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mousemove="drag"
      @mouseleave="stopDragging"
      @wheel="setMousePosition"
      ref="mapLayer"
      :style="{
        transform: 'translate(' + offsetX + 'px,' + offsetY + 'px)',
        scale: '(2)',
        transformOrigin: '100% 100%',
      }"
    >
      <img
        class="map-layers__background"
        src="@/assets/map.jpg"
        alt=""
        draggable="false"
        ref="map"
        :style="{
          width: mapSize.width + 'px',
          height: mapSize.height + 'px',
        }"
      />
      <div
        class="map-layers__markers-layer"
        :style="{
          width: mapSize.width + 'px',
          height: mapSize.height + 'px',
        }"
      >
        <MarkerComp
          v-for="(marker, index) in currentMarkers"
          :key="index"
          :style="{
            left: marker.place[0] * zoom - 20 + 'px',
            top: marker.place[1] * zoom - 20 + 'px',
          }"
          :data="marker"
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
      // for transition and dragging
      isDragging: false,
      containerSize: {},
      mapSize: {
        width: 800,
        height: 500,
      },
      offsetX: 0,
      offsetY: 0,

      mousePositionX: 100,
      mousePositionY: 100,

      zoom: 1,

      currentYear: 1900,

      // for markers example to take from storage
      /* Example of marker item:
        {
          place: [100, 100],
          id: 1,
          type: "conflict", (only 4 types: conflict, strengthen, experiments, subjects)
          region: "moscow",
          name: "первое восстание",
        }

    Take such item from storage
       */
      currentMarkers: [
        {
          place: [100, 100],
          id: 1,
          type: "conflict",
          region: "moscow",
          name: "первое восстание",
        },
        {
          place: [200, 200],
          id: 2,
          type: "strengthen",
          region: "moscow",
          name: "New reveal",
        },
      ],
    };
  },

  mounted() {
    this.containerSize = this.countContainerSizes();
  },

  watch: {
    zoom(newVal, oldVal) {
      Object.assign(this.mapSize, {
        width: (this.mapSize.width / oldVal) * newVal,
        height: (this.mapSize.height / oldVal) * newVal,
      });

      this.checkOffset();
    },
  },

  updated() {},

  methods: {
    countContainerSizes() {
      return {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
    },
    startDragging(event) {
      if (event.button !== 0) return;

      /*       this.mapSize = this.countMapSizes();
      this.containerSize = this.countContainerSizes(); */

      this.isDragging = true;
      document.body.style.cursor = "grabbing";
      this.lastMousePosition = { x: event.clientX, y: event.clientY };
    },
    drag(event) {
      if (!this.isDragging) return;

      const dx = event.clientX - this.lastMousePosition.x;
      const dy = event.clientY - this.lastMousePosition.y;

      this.offsetX += dx;
      this.offsetY += dy;

      this.checkOffset();
      this.lastMousePosition = { x: event.clientX, y: event.clientY };
    },
    stopDragging() {
      this.isDragging = false;
      document.body.style.cursor = "default";
    },

    checkOffset() {
      const diffX = this.containerSize.width - this.mapSize.width,
        diffY = this.containerSize.height - this.mapSize.height;

      if (this.offsetX > 0) this.offsetX = 0;
      if (this.offsetY > 0) this.offsetY = 0;

      if (this.offsetX < diffX) this.offsetX = diffX;
      if (this.offsetY < diffY) this.offsetY = diffY;
    },

    setMousePosition(event) {
      this.mousePositionX = event.offsetX;
      this.mousePositionY = event.offsetY;
      event.target.style.transformOrigin = `${this.mousePositionX}px ${this.mousePositionY}px`;
      this.handleWheelEvent(event.deltaY);
    },

    handleWheelEvent(delta) {
      if (delta > 0) {
        this.zoom = this.zoom = Math.round((this.zoom - 0.2) * 10) / 10;
        if (this.zoom < 1) this.zoom = 1;
      } else {
        this.zoom = Math.round((this.zoom + 0.2) * 10) / 10;
        if (this.zoom > 4) this.zoom = 4;
      }

      this.checkOffset();
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
      // transition: all 0.3s;
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
    display: none;
  }
}
</style>

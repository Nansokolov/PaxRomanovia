<template lang="">
  <div class="map-container" ref="container">
    <CardComp :data="selectedElement" class="card" v-if="modal"></CardComp>

    <div
      class="map-layers"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mousemove="drag"
      @mouseleave="stopDragging"
      @wheel.passive="handleWheelEvent"
      @click="checkCenterOfMarker"
      ref="mapLayer"
      :style="{
        transform: 'translate(' + offsetX + 'px,' + offsetY + 'px)',
      }"
    >
      <img
        id="map"
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
            left:
              marker.place[0] * (startMapSize.width / 1360) * zoom - 20 + 'px',
            top:
              marker.place[1] * (startMapSize.height / 850) * zoom - 20 + 'px',
          }"
          current="index"
          :data="marker"
          @click="handleCardDisplay(modal, marker)"
        >
        </MarkerComp>
      </div>
    </div>
  </div>
</template>
<script>
import MarkerComp from "./MarkerComp.vue";
import CardComp from "./CardComp.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    MarkerComp,
    CardComp,
  },
  data() {
    return {
      // for transition and dragging
      modal: false,
      isDragging: false,
      containerSize: {},
      mapSize: {},
      startMapSize: {},
      deltaZoom: 0.2,
      offsetX: -1,
      offsetY: -1,

      mousePositionX: 0,
      mousePositionY: 0,

      zoom: 1,

      selectedElement: {},
    };
  },

  mounted() {
    this.containerSize = this.countContainerSizes();
    this.startMapSize.width = this.containerSize.width;
    this.startMapSize.height = Math.round((this.containerSize.width / 8) * 5);
    Object.assign(this.mapSize, this.startMapSize);
  },

  watch: {
    zoom(newVal, oldVal) {
      Object.assign(this.mapSize, {
        width: Math.round((this.mapSize.width / oldVal) * newVal),
        height: Math.round((this.mapSize.height / oldVal) * newVal),
      });
      this.checkOffset();
    },
  },

  computed: {
    ...mapGetters({
      currentMarkers: "currentMarkers",
    }),
  },

  updated() {},

  methods: {
    handleCardDisplay(modal, elem) {
      if (this.selectedElement == elem) {
        this.modal = !modal;
      } else {
        this.modal = true;
        this.selectedElement = elem;
      }
    },
    countContainerSizes() {
      return {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
    },
    startDragging(event) {
      if (event.button !== 0) return;

      /* if (event.target.className != "icon") {
        this.modal = false;
      } */

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

    handleWheelEvent(event) {
      let delX = event.offsetX / this.mapSize.width,
        delY = event.offsetY / this.mapSize.height;

      const maxOffsetX = this.startMapSize.width * this.deltaZoom,
        maxOffsetY = this.startMapSize.height * this.deltaZoom;

      if (event.deltaY > 0) {
        this.zoom = Math.round((this.zoom - this.deltaZoom) * 10) / 10;
        if (this.zoom < 1) {
          this.zoom = 1;
          return;
        } else {
          this.offsetX += maxOffsetX * delX;
          this.offsetY += maxOffsetY * delY;
        }
      } else {
        this.zoom = Math.round((this.zoom + this.deltaZoom) * 10) / 10;
        if (this.zoom > 4) {
          this.zoom = 4;
          return;
        } else {
          this.offsetX -= maxOffsetX * delX;
          this.offsetY -= maxOffsetY * delY;
        }
      }
    },

    checkCenterOfMarker(event) {
      console.log([event.offsetX, event.offsetY]);
    },
  },
};
</script>
<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 70vh;
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

    z-index: 100;
    right: 40px;
    top: 40px;
    pointer-events: none;
    text-align: left;
  }
}
</style>

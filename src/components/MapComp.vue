<template lang="">
  <div class="map-container" ref="container">
    <CardComp :data="val" class="card" v-show="modal"></CardComp>

    <div
      class="map-layers"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mousemove="drag"
      @mouseleave="stopDragging"
      @wheel="handleWheelEvent"
      ref="mapLayer"
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

export default {
  components: {
    MarkerComp,
    CardComp
  },
  data() {
    return {
      // for transition and dragging
      modal: false,
      isDragging: false,
      containerSize: {},
      mapSize: {},
      offsetX: 0,
      offsetY: 0,
      zoom: 1,
      val: "heh",
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
    this.mapSize = this.countMapSizes();
    this.containerSize = this.countContainerSizes();
  },

  watch: {
    zoom(newVal, oldVal) {
      Object.assign(this.mapSize, {
        width: (this.mapSize.width / oldVal) * newVal,
        height: (this.mapSize.height / oldVal) * newVal,
      });

      const diffX = this.containerSize.width - this.mapSize.width,
        diffY = this.containerSize.height - this.mapSize.height;

      if (this.offsetX < diffX) this.offsetX = diffX;
      if (this.offsetY < diffY) this.offsetY = diffY;

      this.$refs.mapLayer.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    },
  },

  methods: {
    handleCardDisplay(modal, elem){
      this.modal = !modal
      console.log(elem.name)
      // return modal
    },
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

      const diffX = this.containerSize.width - this.mapSize.width,
        diffY = this.containerSize.height - this.mapSize.height;

      console.log(diffX, diffY);

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

    handleWheelEvent(event) {
      if (event.deltaY > 0) {
        this.zoom -= 0.3;
        this.zoom = Math.max(1, this.zoom);
        // Прокрутка вниз
      } else {
        this.zoom += 0.3; // Прокрутка вверх
        this.zoom = Math.min(2.5, this.zoom);
      }
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
    // display: none;
  }
}
</style>

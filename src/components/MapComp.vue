<template lang="">
  <div class="map-container" ref="container">
    <CardComp :data="selectedElement" class="card" v-show="modal"></CardComp>

    <div
      class="map-layers"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mousemove="drag"
      @mouseleave="stopDragging"
      @wheel="handleWheelEvent"
      ref="mapLayer"
      :style="{
        transform: 'translate(' + offsetX + 'px,' + offsetY + 'px)',
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
      startMapSize: {
        width: 800,
        height: 500,
      },
      deltaZoom: 0.2,
      offsetX: -1,
      offsetY: -1,

      mousePositionX: 0,
      mousePositionY: 0,

      zoom: 1,
      val: "heh",
      currentYear: 1900,

      selectedElement: {},

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
          period: "1600-1700г.",
          pic: "@/assets/castle.svg",
          description: "text text text .... blablabla 1",
        },
        {
          place: [200, 200],
          id: 2,
          type: "strengthen",
          region: "moscow",
          name: "New reveal",
          period: "1700-1800г.",
          pic: "@/assets/castle.svg",
          description: "text text text .... blablabla 2",
        },
        {
          place: [300, 300],
          id: 3,
          type: "experiments",
          region: "moscow",
          name: "try to destroy your ass",
          period: "1800-1900г.",
          pic: "@/assets/castle.svg",
          description: "text text text .... blablabla 3",
        },
      ],
    };
  },

  mounted() {
    this.containerSize = this.countContainerSizes();
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

  updated() {},

  methods: {
    handleCardDisplay(modal, elem){
      if(this.selectedElement == elem){
        this.modal = !modal
      }else{
        this.modal=true
        this.selectedElement = elem
      }
      // return modal
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
      const delX = event.offsetX / this.mapSize.width,
        delY = event.offsetY / this.mapSize.height;

      const maxOffsetX = this.startMapSize.width * this.deltaZoom,
        maxOffsetY = this.startMapSize.height * this.deltaZoom;

      console.log(maxOffsetX * delX, maxOffsetY * delY);

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
          console.log(this.offsetX, this.offsetY);
        }
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

  margin-top: 100px;

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
    height: 420px;
    width: 280px;
    border: 2px solid #bd9956;
    border-radius: 20px;
    background-color: #717171;
    color: white;
    padding: 30px;
    z-index: 100;
    right: 40px;
    top: 40px;
    pointer-events: none;
    text-align: left;
  }

}
</style>

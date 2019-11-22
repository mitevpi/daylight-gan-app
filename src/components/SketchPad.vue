<template>
  <div id="container" class="svg-container">
    <svg v-if="redrawToggle === true" ref="svg" :width="svgWidth" :height="svgHeight">
      <g v-if="lines.length > 0">
        <transition-group name="fade" tag="g">
          <!-- <rect
            v-for="item in dataSet"
            :key="item.x"
            :fill="item.color"
            class="element-positive"
            :x="item.x"
            :y="item.y"
            :width="50"
            :height="50"
          /> -->

          <line
            v-for="item in lines"
            :key="item[0].x"
            class="element-positive"
            :stroke="item[0].color"
            :x1="item[0].x"
            :y1="item[0].y"
            :x2="item[1].x"
            :y2="item[1].y"
          />
        </transition-group>
      </g>
    </svg>
  </div>
</template>

<script>
import store from "../store";

// import { scaleLinear, scaleBand } from "d3-scale";
// import { event } from "d3-selection";
// import { transition } from "d3-transition";

export default {
  name: "SketchPad",
  props: {
    msg: String
  },
  data: () => ({
    dataSet: [],
    svgWidth: 0,
    redrawToggle: true,
    svg: null,
    mouseX: null,
    mouseY: null,
    clientOffsetDim: null
  }),
  computed: {
    svgHeight() {
      return this.svgWidth / 1.61803398875;
    },
    color() {
      return store.getters.color;
    },
    lines() {
      return this.chunk(this.dataSet, 2);
    }
  },
  mounted() {
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.svg = this.$refs.svg;
    // this.svg.addEventListener("mousemove", e => {
    //   // temp
    // });

    this.svg.addEventListener("click", e => {
      this.clientOffsetDim =
        this.clientOffsetDim == null ? e.target.getBoundingClientRect() : this.clientOffsetDim;
      this.mouseX = e.clientX - this.clientOffsetDim.left;
      this.mouseY = e.clientY - this.clientOffsetDim.top;
      this.dataSet.push({ x: this.mouseX, y: this.mouseY, color: this.color });
    });
  },
  methods: {
    chunk(array, size) {
      if (!array) return [];
      const firstChunk = array.slice(0, size); // create the first chunk of the given array
      if (!firstChunk.length) {
        return array; // this is the base case to terminal the recursive
      }
      return [firstChunk].concat(this.chunk(array.slice(size, array.length), size));
    }
  }
};
</script>

<style scoped>
/* #container {
  outline: 2px dashed;
} */
svg {
  outline-offset: -4px;

  outline: 1px dashed;
  display: block;
  margin: auto;
}

.element-positive {
  stroke-width: 10px;
  transition: r 0.2s ease-in-out;
}
.element-positive:hover {
  fill: steelblue;
}
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  /* padding-bottom: 1%; */
  vertical-align: center;
  overflow: hidden;
}

.fade-enter-active {
  transition: opacity 0.25s;
}
.fade-enter {
  opacity: 0;
}
</style>

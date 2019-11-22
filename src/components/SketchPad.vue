<template>
  <div id="container" class="svg-container">
    <svg v-if="redrawToggle === true" ref="svg" :width="svgWidth" :height="svgHeight">
      <g>
        <transition-group name="fade" tag="g">
          <rect
            v-for="item in dataSet"
            :key="item.x"
            class="bar-positive"
            :x="item.x"
            :y="item.y"
            :width="50"
            :height="50"
          />
        </transition-group>
      </g>
    </svg>
  </div>
</template>

<script>
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
    mouseY: null
  }),
  computed: {
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    }
  },
  mounted() {
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.svg = this.$refs.svg;
    this.svg.addEventListener("mousemove", e => {
      const dim = e.target.getBoundingClientRect();
      this.mouseX = e.clientX - dim.left;
      this.mouseY = e.clientY - dim.top;
    });

    this.svg.addEventListener("click", () => {
      this.dataSet.push({ x: this.mouseX, y: this.mouseY });
    });
  },
  methods: {}
};
</script>

<style scoped>
/* #container {
  outline: 2px dashed;
  text-align: center;
  display: flex;
  align-items: center;
  height: 100%;
} */
svg {
  outline: 1px dashed;
  display: block;
  margin: auto;
}

.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}
.bar-positive:hover {
  fill: brown;
}
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}

.fade-enter-active {
  transition: opacity 0.25s;
}
.fade-enter {
  opacity: 0;
}
</style>

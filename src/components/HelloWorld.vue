<template>
  <div id="container" class="svg-container" align="center">
    <svg v-if="redrawToggle === true" ref="svg" :width="svgWidth" :height="svgHeight">
      <g>
        <rect
          v-for="item in dataSet"
          :key="item.x"
          fill="green"
          :x="item.x"
          :y="item.y"
          :width="50"
          :height="50"
        />
      </g>
    </svg>
  </div>
</template>

<script>
// import { scaleLinear, scaleBand } from "d3-scale";
// import { event } from "d3-selection";
// import { transition } from "d3-transition";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => ({
    dataSet: [{ x: 0, y: 0 }],
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
      // console.log(e.clientX, e.clientY); // log the mouse x,y position
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
</style>

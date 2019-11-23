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
            :key="item[0].x + item[1].y + item[0].y + item[1].x"
            class="element-positive"
            :stroke="item[0].color"
            :x1="item[0].x"
            :y1="item[0].y"
            :x2="item[1].x"
            :y2="item[1].y"
          />
        </transition-group>
      </g>
      <!-- ghostline -->
      <g>
        <line
          v-if="lastClick.length > 0"
          class="element-ghost"
          :stroke="color"
          :x1="lastClick[0]"
          :y1="lastClick[1]"
          :x2="mouseX"
          :y2="mouseY"
        />
      </g>

      <!-- ghostcursor -->
      <g>
        <circle :cx="mouseX" :cy="mouseY" r="4" :fill="color" />
      </g>
    </svg>
  </div>
</template>

<script>
import store from "../store";

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
    lastClick: [],
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
      const chunked = this.chunk(this.dataSet, 2);
      return chunked.filter(list => list.length > 1);
    }
  },
  mounted() {
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.svg = this.$refs.svg;
    this.svg.addEventListener("mousemove", e => {
      this.clientOffsetDim =
        this.clientOffsetDim == null ? e.target.getBoundingClientRect() : this.clientOffsetDim;
      this.mouseX = e.clientX - this.clientOffsetDim.left;
      this.mouseY = e.clientY - this.clientOffsetDim.top;
    });

    this.svg.addEventListener("click", () => {
      this.dataSet.push({ x: this.mouseX, y: this.mouseY, color: this.color });
      this.lastClick = this.lastClick.length > 0 ? [] : [this.mouseX, this.mouseY];
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
.element-ghost {
  stroke-width: 3px;
  stroke-dasharray: 4;
  transition: r 0.2s ease-in-out;
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

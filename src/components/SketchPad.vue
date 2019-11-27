<template>
  <v-container align-center justify-center>
    <v-row no-gutters justify="center" align="center">
      <v-col>
        <div id="container">
          <svg v-if="redrawToggle === true" ref="svg" :width="svgWidth" :height="svgHeight">
            <!-- drawn lines -->
            <g><rect width="100%" height="100%" fill="white" /></g>
            <g v-if="lines.length > 0">
              <transition-group name="fadeLine" tag="g">
                <line
                  v-for="item in lines"
                  :key="item[0].x + item[1].y + item[0].y + item[1].x"
                  class="element-positive"
                  :stroke="item[0].color"
                  stroke-width="3"
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
      </v-col>

      <v-col justify="center" align="center">
        <!-- <transition name="fade"> -->
        <canvas v-show="result === null" ref="canvas" width="512" height="512" />
        <img
          v-show="result !== null"
          class="noselect"
          ref="result"
          width="512"
          height="512"
          :src="result"
        >
        <!-- </transition> -->
      </v-col>
    </v-row>
  </v-container>
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
    canvas: null,
    svgWidth: 0,
    redrawToggle: true,
    mouseX: null,
    mouseY: null,
    lastClick: [],
    clientOffsetDim: null,
    model: null,
    modelReady: false,
    result: null
  }),
  computed: {
    svgHeight() {
      // return this.svgWidth / 1.61803398875;
      return this.svgWidth;
    },
    color() {
      return store.getters.color;
    },
    analysisReady() {
      return store.getters.analysisReady;
    },
    lines() {
      const chunked = this.chunk(this.dataSet, 2);
      return chunked.filter(list => list.length > 1);
    }
  },
  watch: {
    model() {
      store.commit("setModelReady", true);
    },
    analysisReady(val) {
      if (val === true) {
        console.log(val);
        this.predict();
        store.commit("setAnalysisReady", false);
      } else {
        //
      }
    }
  },
  mounted() {
    const self = this;
    ml5
      .pix2pix("models/planToDaylight.pict")
      .then(model => {
        self.model = model;
      })
      .catch(err => {
        console.error(error);
      });

    // svg width
    this.svgWidth = document.getElementById("container").offsetWidth;
    this.$refs.svg.addEventListener("mousemove", e => {
      this.clientOffsetDim =
        this.clientOffsetDim == null ? e.target.getBoundingClientRect() : this.clientOffsetDim;
      this.mouseX = e.clientX - this.clientOffsetDim.left;
      this.mouseY = e.clientY - this.clientOffsetDim.top;
    });

    this.$refs.svg.addEventListener("click", () => {
      this.dataSet.push({ x: this.mouseX, y: this.mouseY, color: this.color });
      this.lastClick = this.lastClick.length > 0 ? [] : [this.mouseX, this.mouseY];
      this.mirrorCanvas();
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
    },
    predict() {
      this.model.transfer(this.$refs.canvas, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result && result.src) {
          this.result = result.src;
          this.$refs.result.src = result.src;
        }
      });
    },
    mirrorCanvas() {
      const svg = document.querySelector("svg");
      const canvas = document.querySelector("canvas");
      const xml = new XMLSerializer().serializeToString(svg);

      // make it base64
      const svg64 = btoa(xml);
      const b64Start = "data:image/svg+xml;base64,";

      // prepend a "header"
      const image64 = b64Start + svg64;

      // set it as the source of the img element
      const img2 = new Image();
      img2.src = image64;

      // const self = this;
      img2.onload = () => {
        canvas.getContext("2d").fillStyle = "white";
        canvas.getContext("2d").drawImage(
          img2,
          0,
          0,
          img2.width,
          img2.height, // source rectangle
          0,
          0,
          canvas.width,
          canvas.height
        );
        // const canvasdata = canvas.toDataURL("image/png", 1);
      };
    }
  }
};
</script>

<style scoped>
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
  vertical-align: center;
  overflow: hidden;
}

.fadeLine-enter-active {
  transition: opacity 0.5s;
}
.fadeLine-enter {
  opacity: 0;
}
</style>

<template>
  <div>
    <h3>Sketch Data</h3>
    <div class="box-layout">
      <p>Analysis Elements: {{ elementCount }}</p>
    </div>
    <h3>Analysis Data</h3>
    <div class="box-layout">
      <div class="box" :style="darkMuted.style">
        {{ darkMuted.count }}
      </div>
      <div class="box" :style="darkVibrant.style">
        {{ darkVibrant.count }}
      </div>
      <div class="box" :style="vibrant.style">
        {{ vibrant.count }}
      </div>
      <div class="box" :style="muted.style">
        {{ muted.count }}
      </div>
      <div class="box" :style="lightMuted.style">
        {{ lightMuted.count }}
      </div>
      <div class="box" :style="lightVibrant.style">
        {{ lightVibrant.count }}
      </div>
    </div>
  </div>
</template>

<script>
import * as Vibrant from "node-vibrant";

export default {
  name: "Results",
  props: {
    data: Array,
    imagePath: String
  },
  data: () => ({
    palette: {},
    darkMuted: {},
    darkVibrant: {},
    lightMuted: {},
    lightVibrant: {},
    muted: {},
    vibrant: {}
  }),
  computed: {
    elementCount() {
      return this.data.length;
    }
  },
  watch: {
    imagePath(val) {
      console.log("changed");
      this.getPalette(val);
    }
  },
  created() {
    this.getPalette(this.imagePath);
  },
  methods: {
    getPalette(path) {
      Vibrant.from(path)
        .getPalette()
        .then(palette => {
          console.log(palette);
          this.palette = palette;
          this.parsePalette(palette);
        });
    },
    parsePalette(palette) {
      this.darkMuted = {
        color: palette.DarkMuted.hex,
        count: palette.DarkMuted.population,
        style: `background: ${palette.DarkMuted.hex}`
      };
      this.darkVibrant = {
        color: palette.DarkVibrant.hex,
        count: palette.DarkVibrant.population,
        style: `background: ${palette.DarkVibrant.hex}`
      };
      this.lightMuted = {
        color: palette.LightMuted.hex,
        count: palette.LightMuted.population,
        style: `background: ${palette.LightMuted.hex}`
      };
      this.lightVibrant = {
        color: palette.LightVibrant.hex,
        count: palette.LightVibrant.population,
        style: `background: ${palette.LightVibrant.hex}`
      };
      this.muted = {
        color: palette.Muted.hex,
        count: palette.Muted.population,
        style: `background: ${palette.Muted.hex}`
      };
      this.vibrant = {
        color: palette.Vibrant.hex,
        count: palette.Vibrant.population,
        style: `background: ${palette.Vibrant.hex}`
      };
    }
  }
};
</script>
<style scoped>
h3 {
  text-align: left;
}

.box {
  float: left;
  clear: both;
  width: 45px;
  height: 25px;
  margin-right: 10px;
}

.box-layout {
  display: flex;
  width: 100px;
  margin: 0 auto;
  min-width: 700px;
  margin-bottom: 10px;
  justify-content: left;
  align-content: left;
}
</style>

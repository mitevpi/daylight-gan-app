<template>
  <div class="home">
    <SketchPad msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import SketchPad from "../components/SketchPad.vue";

export default {
  name: "Home",
  components: {
    SketchPad
  }
};
</script>

<template>
  <div>
    <v-toolbar flat dense>
      <v-toolbar-title>Daylight GAN</v-toolbar-title>

      <v-spacer />

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-select v-model="elementSelected" class="selectColor" :items="items" label="Element" />

        <v-btn icon>
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-check-circle</v-icon>
        </v-btn>
        <v-btn href="/about" icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>

        <v-toolbar-items>
          <v-btn href="/" icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn text href="/about">About</v-btn>
        </v-toolbar-items>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  components: {},
  data() {
    return {
      items: ["Wall", "Window", "CW"],
      elementSelcted: null,
      drawer: null,
      address: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    toggleNavDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style scoped>
#toolbarTitle {
  font-size: 11px;
}
#iconSize {
  font-size: 20;
}
.selectColor {
  margin-top: 25px;
  padding-top: 60px;
  width: 100px;
  max-width: 120px;
}
</style>

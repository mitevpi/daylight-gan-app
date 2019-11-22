<template>
  <div>
    <v-toolbar flat dense>
      <v-toolbar-title>Daylight GAN</v-toolbar-title>

      <v-spacer />

      <template v-if="$vuetify.breakpoint.smAndUp">
        <!-- <v-select v-model="elementSelected" :items="items" label="Element" /> -->

        <v-overflow-btn
          v-model="elementSelected"
          :items="items"
          label="Element"
          hide-details
          class="pa-0 selectColor"
        />

        <v-btn icon>
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-check-circle</v-icon>
        </v-btn>
        <v-btn href="/" icon>
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
import store from "../store";

export default {
  name: "Toolbar",
  components: {},
  data() {
    return {
      items: ["Wall", "Window", "CW"],
      elementSelected: null,
      drawer: null,
      address: null
    };
  },
  computed: {
    color() {
      switch (this.elementSelected) {
        case "Wall":
          return "#000000";
        case "Window":
          return "#f5b800";
        case "CW":
          return "#f5b800";
        default:
          return "#000000";
      }
    }
  },
  watch: {
    color(val) {
      store.commit("setColor", val);
    }
  },
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
  width: 150px;
  max-width: 150px;
}
</style>

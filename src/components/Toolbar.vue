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

        <v-btn icon @click="missingAlert">
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
        <v-btn icon @click="missingAlert">
          <v-icon>mdi-check-circle</v-icon>
        </v-btn>
        <v-btn href="/" icon @click="goHome">
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>

        <v-toolbar-items>
          <v-btn href="/" icon @click="goHome">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn href="/about" icon>
            <v-icon>mdi-help</v-icon>
          </v-btn>
        </v-toolbar-items>
      </template>
    </v-toolbar>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
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
      snackbar: false,
      snackbarText: "Test",
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
      this.snackbarText = "Elemented Changed";
      this.snackbar = true;
      store.commit("setColor", val);
    }
  },
  methods: {
    goHome() {
      this.snackbarText = "Drawing Cleared, Going Home";
      this.snackbar = true;
    },
    missingAlert() {
      this.snackbarText = "Not Yet Implemented! :(";
      this.snackbar = true;
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

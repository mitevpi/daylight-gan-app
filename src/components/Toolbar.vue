<template>
  <div>
    <v-toolbar flat dense>
      <v-toolbar-title>Daylight <strong>GAN</strong></v-toolbar-title>

      <v-spacer />

      <template v-if="$vuetify.breakpoint.smAndUp">
        <!-- DRAWING CONTROLS -->
        <!-- SELECT ELEMENT BUTTON -->
        <v-menu offset-y>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...tooltip, ...menu }">
                  <v-icon>fas fa-building</v-icon>
                </v-btn>
              </template>
              <span>Pick Building Element</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="elementSelected = item"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- SENT TO ANALYSIS BUTTON -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-on="{ ...tooltip }" @click="missingAlert">
              <v-icon>fas fa-check-circle</v-icon>
            </v-btn>
          </template>
          <span>Send For Analysis</span>
        </v-tooltip>

        <!-- TRASH BUTTON -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon href="/" v-on="{ ...tooltip }" @click="goHome">
              <v-icon>fas fa-trash-alt</v-icon>
            </v-btn>
          </template>
          <span>Delete Drawing</span>
        </v-tooltip>

        <v-toolbar-items>
          <v-btn icon @click="goHome">
            <v-icon>fas fa-home</v-icon>
          </v-btn>
          <v-btn icon @click="goAbout">
            <v-icon>fas fa-question-circle</v-icon>
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
import router from "../router";

export default {
  name: "Toolbar",
  components: {},
  data() {
    return {
      items: ["Wall", "Window", "CW", "Door"],
      snackbar: false,
      snackbarText: "Test",
      elementSelected: null,
      drawer: null,
      address: null,
      page: "Sketch"
    };
  },
  computed: {
    color() {
      switch (this.elementSelected) {
        case "Wall":
          return "#000000";
        case "Window":
          return "#ef9b15";
        case "CW":
          return "#ea2700";
        case "Door":
          return "#4b6aa9";
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
    },
    page(val) {
      store.commit("setPage", val);
    }
  },
  methods: {
    goHome() {
      this.snackbarText = "Drawing Cleared, Going Home";
      this.page = "Sketch";
      this.snackbar = true;
      router.push({ path: "/" });
      // this.$forceUpdate();
    },
    goAbout() {
      this.page = "About";
      router.push({ path: "/about" });
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

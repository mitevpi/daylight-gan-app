<template>
  <div id="app">
    <v-app>
      <toolbar id="nav" class="noselect" />
      <transition name="fade">
        <router-view />
      </transition>
      <bottom-bar />
    </v-app>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import BottomBar from "./components/BottomBar.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    BottomBar
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  overflow: hidden;
  display: block;
  position: relative;
}

#nav {
  margin-bottom: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
}
</style>

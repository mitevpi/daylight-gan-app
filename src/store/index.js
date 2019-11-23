import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: "#000000",
    page: "Sketch"
  },
  mutations: {
    setColor(state, payload) {
      state.color = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    }
  },
  actions: {},
  modules: {},
  getters: {
    color(state) {
      return state.color;
    },
    page(state) {
      return state.page;
    }
  }
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: "#000000",
    page: "Sketch",
    modelReady: false,
    analysisReady: false
  },
  mutations: {
    setColor(state, payload) {
      state.color = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
    setModelReady(state, payload) {
      state.modelReady = payload;
    },
    setAnalysisReady(state, payload) {
      state.analysisReady = payload;
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
    },
    modelReady(state) {
      return state.modelReady;
    },
    analysisReady(state) {
      return state.analysisReady;
    }
  }
});

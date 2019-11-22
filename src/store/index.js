import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    color: "#000000"
  },
  mutations: {
    setColor(state, payload) {
      state.color = payload;
    }
  },
  actions: {},
  modules: {},
  getters: {
    color(state) {
      return state.color;
    }
  }
});

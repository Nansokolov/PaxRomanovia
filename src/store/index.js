import { createStore } from "vuex";

export default createStore({
  state: {
    events: {},
    currentMarkers: [],
    currentCardData: {},

    showCard: true,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    typeFilter: {
      namespaced: true,
      state: {
        options: ["первое", "второе", "третье"],
        selected: "первое",
      },
      getters: {},
      mutations: {
        updateSelected(state, option) {
          state.selected = option;
        },
      },
      actions: {},
    },
    regionFilter: {
      namespaced: true,
      state: {
        options: ["ывфа", "ыфва", "фыва"],
        selected: "фыва",
      },
      getters: {},
      mutations: {
        updateSelected(state, option) {
          state.selected = option;
        },
      },
      actions: {},
    },
  },
});

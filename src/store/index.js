import { createStore } from "vuex";
import filters from "./filters";

export default createStore({
  state: {
    filterNames: ["typeFilter", "regionFilter"],

    selectedFilters: {},

    allCards: [
      {
        place: [100, 100],
        id: 1,
        type: "conflict",
        region: "moscow",
        name: "первое восстание",
        period: "1600-1700г.",
        pic: "@/assets/castle.svg",
        description:
          "text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1",
      },
      {
        place: [200, 200],
        id: 2,
        type: "strengthen",
        region: "moscow",
        name: "New reveal",
        period: "1700-1800г.",
        pic: "@/assets/castle.svg",
        description: "text text text .... blablabla 2",
      },
      {
        place: [300, 300],
        id: 3,
        type: "experiments",
        region: "moscow",
        name: "try to destroy your ass",
        period: "1800-1900г.",
        pic: "@/assets/castle.svg",
        description: "text text text .... blablabla 3",
      },
    ],
  },
  getters: {
    filterNames(state) {
      return state.filterNames;
    },
    currentMarkers(state) {
      return state.allCards;
    },
    selectedFilters(state) {
      return state.selectedFilters;
    },
  },
  mutations: {
    createfilters(state) {
      state.filterNames.forEach((elem) => {
        state.selectedFilters[elem] = "";
      });
    },
    setSelectedFilters(state) {
      for (let elem in state.selectedFilters) {
        if (state.selectedFilters[elem] == "") {
          state.selectedFilters[elem] = "123";
        }
      }
    },
  },
  actions: {},
  modules: {
    filters,
  },
});

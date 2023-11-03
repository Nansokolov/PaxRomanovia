import { createStore } from "vuex";
import filters from "./filters";

export default createStore({
  state: {
    filterNames: ["typeFilter", "regionFilter"],

    allCards: [
      {
        place: [500, 100],
        id: 1,
        type: "conflict",
        region: "uralSiberia",
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
        region: "north",
        name: "New reveal",
        period: "1700-1800г.",
        pic: "@/assets/castle.svg",
        description: "text text text .... blablabla 2",
      },
      {
        place: [277, 519],
        id: 5,
        type: "strengthen",
        region: "steppeFrontiers",
        name: "New reveal",
        period: "1700-1800г.",
        pic: "@/assets/castle.svg",
        description: "text text text .... blablabla 2",
      },
      {
        place: [300, 300],
        id: 3,
        type: "experiments",
        region: "northernBlackSea",
        name: "try to destroy your ass",
        period: "1800-1900г.",
        pic: "@/assets/castle.svg",
        description: "text text text .... blablabla 3",
      },
      {
        place: [793, 342],
        id: 4,
        type: "subjects",
        region: "farEast",
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
    currentMarkers(state, getters, rootState) {
      const filters = rootState.filters.selectedFilters;
      return state.allCards.filter((elem) => {
        const typeMatches =
          filters.typeFilter === "" || elem.type === filters.typeFilter;
        const regionMatches =
          filters.regionFilter === "" || elem.region === filters.regionFilter;
        return typeMatches && regionMatches;
      });
    },
  },
  mutations: {},
  actions: {},
  modules: {
    filters,
  },
});

import { createStore } from "vuex";
import filters from "./filters";

export default createStore({
  state: {
    filterNames: ["typeFilter", "regionFilter"],

    allCards: [
      {
        place: [323, 338],
        id: 1,
        //filters:
        type: "conflict",
        region: "uralSiberia",
        year: "1600",
        //data:
        name: "первое восстание",
        period: "1600-1700г.",
        img: "ekb",
        description:
          "text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1text text text .... blablabla 1",
      },
      {
        place: [200, 200],
        id: 2,
        type: "strengthen",
        region: "north",
        year: "1620",
        name: "New reveal",
        period: "1700-1800г.",
        img: "pospolit",
        description: "text text text .... blablabla 2",
      },
      {
        place: [277, 519],
        id: 5,
        type: "strengthen",
        region: "steppeFrontiers",
        year: "1640",
        name: "New reveal",
        period: "1700-1800г.",
        img: "kazakrelocation",
        description: "text text text .... blablabla 2",
      },
      {
        place: [300, 300],
        id: 3,
        type: "experiments",
        region: "northernBlackSea",
        year: "1620",
        name: "try to destroy your ass",
        period: "1800-1900г.",
        img: "persidskiy",
        description: "text text text .... blablabla 3",
      },
      {
        place: [793, 342],
        id: 4,
        type: "subjects",
        region: "farEast",
        year: "1600",
        name: "try to destroy your ass",
        period: "1800-1900г.",
        img: "pospolit",
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
        const yearMathes = elem.year === filters.year;
        return typeMatches && regionMatches && yearMathes;
      });
    },
  },
  mutations: {},
  actions: {},
  modules: {
    filters,
  },
});

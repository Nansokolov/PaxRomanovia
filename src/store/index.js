import { createStore } from "vuex";
import filters from "./filters";
import cards from "@/assets/cards.js";

export default createStore({
  state: {
    filterNames: ["typeFilter", "regionFilter"],

    allCards: [],
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
  mutations: {
    setCards(state, payload) {
      state.allCards = payload;
    },
  },
  actions: {
    getCardsfromJson(state) {
      state.commit("setCards", cards);
    },
  },
  modules: {
    filters,
  },
});

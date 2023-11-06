export default {
  namespaced: true,
  state: {
    typeFilter: {
      options: {
        strengthen: "Укреплять и осваивать",
        experiments: "Эксперименты империи",
        subjects: "Новые подданные",
        conflict: "Конфликт",
      },
      selected: "Тип события",
    },
    regionFilter: {
      options: {
        caucasus: "Кавказ",
        uralSiberia: "Урал и Сибирь",
        steppeFrontiers: "Степные рубежи",
        northernBlackSea: "Северное Причерноморье",
        westernBorderlands: "Западные окраины",
        farEast: "Дальний Восток",
        north: "Север",
      },
      selected: "Регион",
    },

    selectedFilters: {
      typeFilter: "",
      regionFilter: "",
      year: "1600",
    },
  },

  getters: {
    getSelectedOption: (state) => (filterType) => {
      return state[filterType].selected;
    },
    getOptions: (state) => (filterType) => {
      return state[filterType].options;
    },
    getSelectedFilters(state) {
      return state.selectedFilters;
    },
  },

  mutations: {
    setSelected(state, payload) {
      state[payload.filter].selected = payload.option;
    },
    setKeyOfSelected(state, payload) {
      function findKey(obj, value) {
        return Object.keys(obj).find((key) => obj[key] === value);
      }
      const key = findKey(state[payload.filter].options, payload.option);
      state.selectedFilters[payload.filter] = key;
    },
    clearFilter(state, payload) {
      state.selectedFilters[payload] = "";
      if (payload === "typeFilter") state[payload].selected = "Тип события";
      if (payload === "regionFilter") state[payload].selected = "Регион";
    },
    setYear(state, payload) {
      state.selectedFilters.year = payload;
    },
  },

  actions: {},
};

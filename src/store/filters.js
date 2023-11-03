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
      keyOfSelectedOption: "",
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
      keyOfSelectedOption: "",
    },
  },

  getters: {
    getSelectedOption: (state) => (filterType) => {
      return state[filterType].selected;
    },
    getOptions: (state) => (filterType) => {
      return state[filterType].options;
    },
    getKeyOfSelectedOption: (state) => (filterType) => {
      return state[filterType].keyOfSelectedOption;
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
      state[payload.filter].keyOfSelectedOption = key;
    },
  },

  actions: {},
};

export const state = () => ({
  selectedColorPair: {
    id: 1,
    firstColor: "#E6265A",
    secondColor: "#200E32",
  },
  primary: "#E6265A",
  defaultColorPairs: [
    {
      id: 1,
      firstColor: "#E6265A",
      secondColor: "#200E32",
    },
    {
      id: 2,
      firstColor: "#F4D0BB",
      secondColor: "#148883",
    },
    {
      id: 3,
      firstColor: "#90E0EF",
      secondColor: "#490D58",
    },
    {
      id: 4,
      firstColor: "#F38B80",
      secondColor: "#04055E",
    },
  ],
});

export const mutations = {
  SET_PRIMARY_COLOR(state, newValue) {
    state.primary = newValue;
  },
  SET_COLOR_PAIR(state, newValue) {
    state.selectedColorPair = newValue;
  },
  SET_COLOR_PAIR_BY_ID(state, newValue) {
    state.primary = newValue.firstColor;
    const colorIndex = state.defaultColorPairs.findIndex(
      (item) => item.id === newValue.id
    );
    state.selectedColorPair = newValue;
    state.defaultColorPairs[colorIndex] = newValue;
  },
};

export const actions = {
  setPrimaryColor: ({ commit }, payload) => {
    commit("SET_PRIMARY_COLOR", payload);
  },
  setColorPair: ({ commit }, payload) => {
    commit("SET_COLOR_PAIR", payload);
  },
  setColorPairById: ({ commit }, payload) => {
    commit("SET_COLOR_PAIR_BY_ID", payload);
  },
};

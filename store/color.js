export const state = () => ({
  firstColor: "#E6265A",
  secondColor: "#200E32",
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
    {
      id: 5,
      firstColor: "#B77BAB",
      secondColor: "#211F36",
    },
    {
      id: 6,
      firstColor: "#B7C582",
      secondColor: "#0F0F0F",
    },
    {
      id: 7,
      firstColor: "#f6cde1",
      secondColor: "#562f40",
    },
  ],
});

export const mutations = {
  SET_PRIMARY_COLOR(state, newValue) {
    state.primary = newValue;
  },
  SET_COLOR_PAIR(state, newValue) {
    state.firstColor = newValue.firstColor;
    state.secondColor = newValue.secondColor;
  },
};

export const actions = {
  setPrimaryColor: ({ commit }, payload) => {
    commit("SET_PRIMARY_COLOR", payload);
  },
  setColorPair: ({ commit }, payload) => {
    commit("SET_COLOR_PAIR", payload);
  },
};

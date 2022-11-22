export const state = () => ({
  show: false,
  img: {},
  customImg: null,
});

export const mutations = {
  toggle(state, value) {
    state.show = value;
  },

  setImg(state, value) {
    state.img = value;
  },
};

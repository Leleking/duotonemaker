export const state = () => ({
  show: false,
  img: {}
})

export const mutations = {
  toggle (state, value) {
    state.show = value
  },

  setImg (state, value) {
    state.img = value
  }
}

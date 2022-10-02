import axios from "axios";

export const state = () => ({
  searchKey: "",
  imgs: [],
  photoAPIs: {
    unsplash: "https://api.unsplash.com/search/photos",
    pexels: "",
  },
  selectedAPIOption: "unsplash",
  page: 1,
  pageLoader: false,
});

export const mutations = {
  UPDATE_SEARCH_KEY(state, newValue) {
    state.searchKey = newValue;
  },
  UPDATE_IMGS(state, newValue) {
    state.imgs = newValue;
  },
  UPDATE_PAGE_LOADER(state, newValue) {
    state.pageLoader = newValue;
  },
  UPDATE_API_PAGE(state, newValue) {
    state.page = newValue;
  },
};

export const actions = {
  updatePageLoader: ({ commit }, payload) => {
    commit("UPDATE_PAGE_LOADER", payload);
  },
  updateSearchKey: ({ commit }, payload) => {
    commit("UPDATE_SEARCH_KEY", payload);
  },
  updateImgs: ({ commit }, payload) => {
    commit("UPDATE_IMGS", payload);
  },
  updateApiPage: ({ commit }, payload) => {
    commit("UPDATE_API_PAGE", payload);
  },
  async getPhotos({ commit, state }, { showPageLoader, page }) {
    console.log("page", page);
    if (showPageLoader) {
      commit("UPDATE_PAGE_LOADER", true);
    }
    const api = state.photoAPIs[state.selectedAPIOption];
    let mappedImgs;
    const photos = await axios.get(api, {
      params: {
        client_id: "sW2Q_-zDlAXfQ2jn_vVstxRUvwIanRAmdJhSb1klMlI",
        per_page: 20,
        query: state.searchKey ? state.searchKey : "random",
        page,
      },
    });
    console.log("phots", photos);
    if (state.selectedAPIOption === "unsplash") {
      mappedImgs = photos?.data?.results.map((item) => {
        return {
          id: item?.id,
          width: item?.width,
          height: item?.height,
          urls: item?.urls,
          author: item?.user.name,
          link: item?.links.html,
        };
      });
    }
    if (page < 2) {
      commit("UPDATE_IMGS", mappedImgs);
    }
    if (page > 1) {
      commit("UPDATE_IMGS", [...state.imgs, ...mappedImgs]);
    }
    commit("UPDATE_PAGE_LOADER", false);
  },
};

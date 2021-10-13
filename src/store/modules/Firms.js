import axios from '../../api';

export default {
  namespaced: true,
  state() {
    return {
      lists: [],
      firmsData: [],
      isLoading: false,
      error: null
    };
  },
  mutations: {
    getTableData(state, payload) {
      // state.isLoading = true;         //dry principle
      state.lists = payload.data.data;
    },
    getFirmsId(state, payload) {
      state.firmsData = payload.data.data;
      // console.log(state.firmsData)
    },
    toLoaderFalse(state) {
      state.isLoading = false;
    },
    toLoaderTrue(state) {
      state.isLoading = true;
    }
  },
  actions: {
    async getData(context, isFirmsId) {
      // context.state.isLoading = true;
      await axios
        .get('/Firms/GetAll')
        .then(response => {
          if (!isFirmsId) {
            context.commit('getTableData', response);
          } else {
            context.commit('getFirmsId', response);
          }
          // context.state.isLoading = false;
        })
        .catch(() => {
          context.state.error = 'Failed to fetch data';
        });
    }
  },
  getters: {
    getLists(state) {
      return state.lists;
    },
    getLoading(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    },
    getFirmsData(state) {
      return state.firmsData;
    }
  }
};

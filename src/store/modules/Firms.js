import axios from 'axios';
import router from '../../router.js';

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
      // console.log(state.lists)
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
      context.state.isLoading = true;
      await axios
        .get('https://bspacedev.azurewebsites.net/api/Firms/GetAll', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('mytoken')}`
          }
        })
        .then(
          response => {
            if (!isFirmsId) {
              context.commit('getTableData', response);
            } else {
              context.commit('getFirmsId', response);
            }
            context.state.isLoading = false;
          },
          e => {
            if (e.response.status === 401) {
              //|| e.response.status === 404
              // console.log(context.rootState)
              context.rootState.isActive = false;
              // localStorage.removeItem('mytoken')
              // localStorage.removeItem('firmId')
              localStorage.clear();
              context.state.isLoading = false;
              router.push('/signIn');
            }
            context.state.error = 'Failed to fetch data';
          }
        );
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

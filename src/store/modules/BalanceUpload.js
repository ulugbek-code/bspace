import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      balances: [],
      isError: false,
      isLoading: false
    };
  },
  mutations: {
    getBalance(state, payload) {
      state.balances = payload.data.data;
      console.log(state.balances);
      //   if (payload.data.isValid) {
      //     state.balances = payload.data.data;
      //     console.log(state.balances);
      //   } else {
      //     state.errors = payload.data.errors;
      //     console.log('error');
      //   }
    }
  },
  actions: {
    async getAllBalances(context) {
      context.state.isLoading = true;
      await axios
        .get(
          'https://bspacedev.azurewebsites.net/api/BalanceFiles/GetAll/' +
            localStorage.getItem('firmId'),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          }
        )
        .then(response => {
          context.commit('getBalance', response);
          context.state.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          context.state.isLoading = false;
          context.state.isError = true;
        });
    }
  },
  getters: {
    getBalanceList(state) {
      return state.balances;
    },
    getError(state) {
      return state.isError;
    },
    getLoading(state) {
      return state.isLoading;
    }
  }
};

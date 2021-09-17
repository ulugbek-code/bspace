import { createStore } from 'vuex';
import Firms from './modules/Firms.js';
import Accounts from './modules/Accounts.js';
import BalanceUpload from './modules/BalanceUpload.js';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    firm: Firms,
    account: Accounts,
    balance: BalanceUpload
  },
  plugins: [
    createPersistedState({
      paths: ['isActive']
    })
  ],
  state() {
    return {
      isActive: false,
      isNavOpened: false, // for hamburger menu
      token: ''
    };
  },
  getters: {
    isNav(state) {
      return state.isNavOpened;
    },
    isNavActive(state) {
      return state.isActive;
    },
    appToken(state) {
      return state.token;
    }
  },
  mutations: {
    toggleNavBar(state) {
      state.isNavOpened = !state.isNavOpened;
    },
    signIn(state, payload) {
      localStorage.setItem('mytoken', payload.data.data.token);
      localStorage.setItem('firmId', payload.data.data.userDetails.firmId);
      localStorage.setItem(
        'userData',
        JSON.stringify(payload.data.data.userDetails)
      );

      state.isActive = true;
      state.token = payload.data.data.token;
    },
    toggleActivity(state) {
      state.isActive = false;
    }
  },
  actions: {
    signing(context, res) {
      context.commit('signIn', res);
    }
  }
});

export default store;

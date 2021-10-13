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
      paths: ['isActive', 'offset']
    })
  ],
  state() {
    return {
      isActive: false,
      isNavOpened: false, // for hamburger menu
      token: '',
      offset: 0
    };
  },
  getters: {
    getOffset(state) {
      return state.offset;
    },
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
    offsetting(state, payload) {
      // console.log(payload.target.offsetTop);
      state.offset = payload.target.offsetTop - 4;
    },
    refreshOffset(state) {
      state.offset = -4;
    },
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
    },
    makeActive(state) {
      state.isActive = true;
    }
  },
  actions: {
    signing(context, res) {
      context.commit('signIn', res);
    }
  }
});

export default store;

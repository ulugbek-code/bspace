<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-accounts
      @searching="searching($event)"
      :categories="categories"
      :types="types"
      :parentAcc="parentAcc"
      :editingData="editingData"
    ></create-accounts>
    <table-accounts
      :search="search"
      @category="sendcategory($event)"
      @ifrsTypes="sendTypes($event)"
      @parentAccounts="getParentAcc($event)"
      @editAccounts="getEditingData($event)"
    ></table-accounts>
    <!--  :ifrs="ifrs" deleted prop from create-accounts-->
    <!-- @ifrs="sendIfrs($event)" emit from table-accounts-->
  </div>
</template>

<script>
import CreateAccounts from '../components/accounts/CreateAccounts.vue';
import TableAccounts from '../components/accounts/TableAccounts.vue';
export default {
  components: {
    CreateAccounts,
    TableAccounts
  },
  data() {
    return {
      search: '',
      categories: [],
      // ifrs: [],
      types: [],
      parentAcc: [],
      editingData: []
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
    }
  },
  methods: {
    searching(val) {
      this.search = val;
    },
    sendcategory(val) {
      this.categories = val;
    },
    // sendIfrs(val) {
    //   this.ifrs = val;
    // },
    sendTypes(val) {
      this.types = val;
    },
    getParentAcc(val) {
      this.parentAcc = val;
    },
    getEditingData(val) {
      this.editingData = val;
    }
  }
};
</script>

<style scoped>
.box {
  margin-left: 270px;
  transition: all 0.6s ease;
}
.box.nav {
  margin-left: 110px;
}
</style>

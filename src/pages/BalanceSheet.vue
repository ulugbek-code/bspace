<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-balance-sheet
      @sendReport="gettingReport($event)"
    ></create-balance-sheet>
    <table-balance-sheet :repo="repo"></table-balance-sheet>
  </div>
</template>

<script>
import CreateBalanceSheet from '../components/balanceSheet/CreateBalanceSheet.vue';
import TableBalanceSheet from '../components/balanceSheet/TableBalanceSheet.vue';

export default {
  components: {
    CreateBalanceSheet,
    TableBalanceSheet
  },
  data() {
    return {
      repo: []
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
    }
  },
  methods: {
    gettingReport(val) {
      this.repo = val;
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

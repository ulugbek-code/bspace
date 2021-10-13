<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-reports
      reportHeader="Balance Sheet"
      reportUrl="GetAllBalanceSheets"
      @sendReport="repo = $event"
      @sendHeaderPeriod="headerPeriod = $event"
    ></create-reports>
    <table-balance-sheet :repo="repo" :per="headerPeriod"></table-balance-sheet>
  </div>
</template>

<script>
import CreateReports from '../components/UI/CreateReports.vue';
import TableBalanceSheet from '../components/balanceSheet/TableBalanceSheet.vue';

export default {
  components: {
    CreateReports,
    TableBalanceSheet
  },
  data() {
    return {
      repo: [],
      headerPeriod: {}
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
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

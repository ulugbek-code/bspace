<template>
  <the-navigation></the-navigation>
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
      repo: [
        {
          name: 'Основные Ср-ва',
          code: 124242,
          note: '',
          internationalOpeningAmount: 2131,
          internationalClosingAmount: 14247534
        },
        {
          name: 'Основные Ср-ва',
          code: 3243,
          note: '',
          internationalOpeningAmount: 213471,
          internationalClosingAmount: 14234
        },
        {
          name: 'Основные Ср-ва',
          code: 2534,
          note: '',
          internationalOpeningAmount: 2131,
          internationalClosingAmount: 145475234
        },
        {
          name: 'Основные Ср-ва',
          code: 14324,
          note: '',
          internationalOpeningAmount: 2474,
          internationalClosingAmount: 14234
        },
        {
          name: 'Основные Ср-ва',
          code: 4577,
          note: '',
          internationalOpeningAmount: 547567,
          internationalClosingAmount: 14234
        },
        {
          name: 'Основные Ср-ва',
          code: 23545,
          note: '',
          internationalOpeningAmount: 2131,
          internationalClosingAmount: 14234
        }
      ],
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

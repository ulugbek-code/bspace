<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-balance-sheet></create-balance-sheet>
    <table-balance-sheet></table-balance-sheet>
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
}
.box.nav {
  margin-left: 110px;
}
</style>

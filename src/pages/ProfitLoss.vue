<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-profit-loss></create-profit-loss>
    <table-profit-loss></table-profit-loss>
  </div>
</template>

<script>
import CreateProfitLoss from '../components/profitLoss/CreateProfitLoss.vue';
import TableProfitLoss from '../components/profitLoss/TableProfitLoss.vue';

export default {
  components: {
    CreateProfitLoss,
    TableProfitLoss
  },
  data() {
    return {};
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

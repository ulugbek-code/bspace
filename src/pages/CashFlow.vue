<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-cash-flow></create-cash-flow>
    <table-cash-flow></table-cash-flow>
  </div>
</template>

<script>
import CreateCashFlow from '../components/cashFlow/CreateCashFlow.vue';
import TableCashFlow from '../components/cashFlow/TableCashFlow.vue';

export default {
  components: {
    CreateCashFlow,
    TableCashFlow
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

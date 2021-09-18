<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <h1>Dashboard</h1>
    <div>
      <router-link to="/balanceSheet">Balance Sheet</router-link><br />
      <router-link to="/profitLoss">Profit & Loss</router-link><br />
      <router-link to="/changesEquity">Changes on Equity</router-link><br />
      <router-link to="/cashFlow">Cash Flow</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
    }
  },
  created() {
    if (!localStorage.getItem('mytoken')) {
      this.$router.push('signIn');
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

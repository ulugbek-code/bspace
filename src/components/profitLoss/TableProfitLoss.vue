<template>
  <div id="profit-table-container">
    <profit-table></profit-table>
    <profit-chart></profit-chart>
  </div>
</template>

<script>
import ProfitTable from './ProfitTable.vue';
import ProfitChart from './ProfitChart.vue';

export default {
  components: {
    ProfitTable,
    ProfitChart
  }
};
</script>

<style scoped>
#profit-table-container {
  width: 100%;
  display: flex;
}
</style>

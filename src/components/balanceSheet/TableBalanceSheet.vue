<template>
  <div id="sheet-table-container">
    <sheet-table :repo="repo"></sheet-table>
    <sheet-chart></sheet-chart>
  </div>
</template>

<script>
import SheetTable from './SheetTable.vue';
import SheetChart from './SheetChart.vue';

export default {
  props: ['repo'],
  components: {
    SheetTable,
    SheetChart
  }
};
</script>

<style scoped>
#sheet-table-container {
  width: 100%;
  display: flex;
}
</style>

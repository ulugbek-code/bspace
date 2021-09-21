<template>
  <div class="box-chart">
    <div class="canvas">
      <apexchart type="line" :options="options" :series="series"></apexchart>
    </div>
    <div class="assets">
      <h3>All ASSETS</h3>
      <div class="assets-box">
        <div class="assets-container">
          <p class="a-header">Monthly</p>
          <p class="a-body">$ 4,019k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Quarterly</p>
          <p class="a-body">$ 10,115k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Monthly</p>
          <p class="a-body">$ 4,019k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Annually</p>
          <p class="a-body">$ 57,954k</p>
        </div>
        <div class="assets-container">
          <p class="a-header">Total</p>
          <p class="a-body">$ 97,590k</p>
        </div>
      </div>
    </div>
    <div class="canvas">
      <apexchart type="donut" :options="options" :series="seriesA"></apexchart>
    </div>
  </div>
</template>

<script>
// import VueApexCharts from 'vue-apexcharts';

export default {
  // components: { BarChartForm },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ],
      seriesA: [44, 55]
    };
  }
};
</script>

<style scoped>
.box-chart {
  flex: 1;
  height: 84vh;
  overflow: hidden;
  border-left: 1px solid rgba(221, 221, 221, 1);
  border-top: 1px solid rgba(221, 221, 221, 1);
}
.canvas {
  width: 90%;
  margin: 6px auto;
  padding: 8px 0;
  border-radius: 25px;
}
.assets-box {
  display: flex;
  justify-content: center;
}
h3 {
  padding-left: 24px;
}
.assets-container {
  display: flex;
  flex-direction: column;
  padding: 6px;
}
.a-header {
  color: rgba(155, 155, 155, 1);
}
.a-body {
  color: rgba(116, 101, 190, 1);
}
.assets-container p {
  font-size: 15px;
}
</style>

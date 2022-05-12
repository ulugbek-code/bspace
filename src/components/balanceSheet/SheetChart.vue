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
      <hr />
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
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins, sans-serif'
        },
        xaxis: {
          categories: [1990, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
  // mounted() {
  //   this.series[0].data[0] = 35;
  //   this.seriesA[0] = 41;
  //   this.options.xaxis.categories[0] = 1991;
  // }
};
</script>

<style scoped>
hr {
  width: 90%;
  margin: 2px auto 0;
  border: 0;
  height: 1px;
  background: rgba(221, 221, 221, 1);
}
.box-chart {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 83vh;
  /* overflow-x: hidden; */
  border-left: 1px solid rgba(221, 221, 221, 1);
  border-top: 1px solid rgba(221, 221, 221, 1);
  /* background: rgb(220, 220, 228); */
}
.canvas {
  width: 85%;
  margin: 3px auto;
  /* padding: 2px 0; */
  border-radius: 25px;
}
.assets-box {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
h3 {
  padding-left: 6%;
}
.assets-container {
  display: flex;
  flex-direction: column;
  padding: 4px;
}
.a-header {
  color: rgba(155, 155, 155, 1);
  font-size: 13px;
}
.a-body {
  color: rgba(116, 101, 190, 1);
  font-size: 16px;
}
</style>

<template>
  <div id="main-chart-container">
    <div class="canvas">
      <apexchart type="area" :options="options" :series="seriesA"></apexchart>
    </div>
    <div class="widgets">
      <router-link class="box" to="/balanceSheet">
        <img src="../../assets/balancesheet.svg" alt="" />
        Balance Sheet</router-link
      >
      <router-link class="box" to="/profitLoss">
        <img src="../../assets/businessplan.svg" alt="" />
        Profit & Loss
      </router-link>
      <router-link class="box" to="/changesEquity">
        <img src="../../assets/layers.svg" alt="" />
        Changes on Equity</router-link
      >
      <router-link class="box" to="/cashFlow">
        <img src="../../assets/cash.svg" alt="" />
        Cash Flow</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins, sans-serif'
        },
        colors: ['rgb(92, 96, 255)', 'rgb(255, 106, 52)'],
        fill: {
          colors: ['#7e7', 'rgb(255, 106, 52)']
        },
        legend: {
          position: 'top'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      seriesA: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ]
    };
  }
};
</script>

<style scoped>
#main-chart-container {
  width: 65%;
  /* height: 50%; */
  margin-right: 1rem;
  background: rgba(241, 245, 251, 1);
  overflow: hidden;
  border-radius: 50px;
}
.canvas {
  width: 88%;
  margin: 3px auto;
  padding: 14px 0;
}
.widgets {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 140px;
  height: 140px;
  border-radius: 30px;
  background: #fff;
  transition: 0.4s all ease;
}
.box:hover {
  background: #bdd1e6;
}
a {
  text-decoration: none;
  color: #2c3e50;
  font-size: 13px;
}
</style>

<template>
  <div class="box-chart">
    <div class="chart-header">
      <div>
        <h4>Profit & Loss</h4>
        <p>01.01.2020-31.12.2020</p>
      </div>
      <div>
        <base-button green="true">Accepted</base-button>
      </div>
    </div>
    <div class="canvas">
      <apexchart
        type="bar"
        :options="options"
        :series="series"
        height="100%"
      ></apexchart>
    </div>
  </div>
</template>

<script>
// import VueApexCharts from 'vue-apexcharts';
import BaseButton from '../UI/BaseButton.vue';

export default {
  components: { BaseButton },
  data() {
    return {
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          },
          fontFamily: 'Poppins, sans-serif'
        },
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       legend: {
        //         position: 'bottom',
        //         offsetX: -10,
        //         offsetY: 0
        //       }
        //     }
        //   }
        // ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '01/01/2011 GMT',
            '01/02/2011 GMT',
            '01/03/2011 GMT',
            '01/04/2011 GMT',
            '01/05/2011 GMT',
            '01/06/2011 GMT'
          ]
        },
        legend: {
          position: 'bottom',
          offsetY: 11
        }
      },
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, -18, 13, 27]
        }
      ]
    };
  }
  // mounted() {
  //   this.series[0].data[0] = 50;
  // }
};
</script>

<style scoped>
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
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin: 3px auto;
}
.canvas {
  height: 80%;
  width: 85%;
  margin: 3px auto;
  /* padding: 2px 0; */
  border-radius: 25px;
}
</style>

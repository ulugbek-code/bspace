<template>
  <div id="table-correction">
    <div class="table-wrapper">
      <table v-if="corr.length > 0">
        <tr>
          <th>CODE <fa class="arrows" :icon="['fas', 'arrows-alt-v']" /></th>
          <th>NAME</th>
          <th>
            <small>OPENING STOCK</small>
            CORRECTION
          </th>
          <th>
            <small>OPENING STOCK</small>
            IFRS AMOUNT
          </th>
          <th>
            <small>PERIOD</small>
            CORRECTION
          </th>
          <th>
            <small>PERIOD</small>
            IFRS AMOUNT
          </th>
          <th>
            <small>CLOSING STOCK</small>
            CORRECTION
          </th>
          <th>
            <small>CLOSING STOCK</small>
            IFRS AMOUNT
          </th>
          <th>
            <small>IFRS</small>
            CODE <fa class="arrows" :icon="['fas', 'arrows-alt-v']" />
          </th>
          <th>IFRS <fa class="arrows" :icon="['fas', 'arrows-alt-v']" /></th>
        </tr>
        <tr v-for="c in corr" :key="c.id">
          <td>{{ c.code ? c.code : 'No Data Yet' }}</td>
          <td>{{ c.name ? c.name : 'No Data Yet' }}</td>
          <td>{{ numberWithCommas(c.correctionOpeningAmount) }}</td>
          <td>{{ numberWithCommas(c.initialOpeningAmount) }}</td>
          <td>{{ numberWithCommas(c.initialPeriodAmount) }}</td>
          <td>{{ numberWithCommas(c.correctionPeriodAmount) }}</td>
          <td>{{ numberWithCommas(c.correctionClosingAmount) }}</td>
          <td>{{ numberWithCommas(c.initialClosingAmount) }}</td>
          <td>{{ c.endCode ? c.endCode : 'No Data Yet' }}</td>
          <td>{{ c.endIFRS ? c.endIFRS : 'No Data Yet' }}</td>
        </tr>
      </table>

      <div v-else class="no-corr">
        <img src="../../assets/noCorrection.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['corr'],
  data() {
    return {
      corr: [
        {
          code: 12,
          name: 'Законсервированные осн. ср-ва',
          correctionOpeningAmount: '2,655,334,031',
          initialOpeningAmount: '0',
          initialPeriodAmount: '0',
          correctionPeriodAmount: '13,134,324',
          correctionClosingAmount: '13,323,433',
          initialClosingAmount: '12,232',
          endCode: 12
        },
        {
          code: 24,
          name: 'Благоустройство Земли',
          correctionOpeningAmount: '2,655,334,031',
          initialOpeningAmount: '0',
          initialPeriodAmount: '0',
          correctionPeriodAmount: '13,134,324',
          correctionClosingAmount: '13,323,433',
          initialClosingAmount: '24,232',
          endCode: 24
        },
        {
          code: 45,
          name: 'Счета Учета основных ср-в',
          correctionOpeningAmount: '2,655,334,031',
          initialOpeningAmount: '0',
          initialPeriodAmount: '0',
          correctionPeriodAmount: '13,134,324',
          correctionClosingAmount: '13,323,433',
          initialClosingAmount: '45,232',
          endCode: 45
        },
        {
          code: 76,
          name: 'Обесценение осн. ср-в',
          correctionOpeningAmount: '2,655,334,031',
          initialOpeningAmount: '0',
          initialPeriodAmount: '0',
          correctionPeriodAmount: '13,134,324',
          correctionClosingAmount: '13,323,433',
          initialClosingAmount: '76,232',
          endCode: 76
        }
      ]
    };
  },
  methods: {
    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
</script>

<style scoped>
#table-correction {
  width: 100%;
  height: 60vh;
  overflow-y: scroll;
}
table {
  width: 98%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
  color: rgba(68, 68, 68, 1);
}

tr:not(:nth-child(1)) {
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
}
table tr:nth-child(1) {
  height: 40px;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
table th::after {
  content: '';
  height: 0.5px;
  width: 100%;
  position: absolute;
  bottom: 2%;
  left: 0;
  z-index: 10;
  background: rgba(170, 170, 170, 1);
}
th {
  position: relative;
  font-size: 1rem;
  color: rgba(170, 170, 170, 1);
  padding: 2px 6px;
}
td {
  font-size: 12px;
  padding: 16px 12px;
  border-right: 1px solid rgba(170, 170, 170, 0.2);
}
td:nth-child(3),
td:nth-child(4),
td:nth-child(5),
td:nth-child(6),
td:nth-child(7),
td:nth-child(8) {
  text-align: end;
}
th small {
  font-size: 11px;
  position: absolute;
  bottom: 65%;
  color: rgba(76, 175, 80, 1);
}
.arrows {
  font-size: 13px;
  padding-bottom: 2px;
}
tr:hover:not(:nth-child(1)) {
  border-radius: 15px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
tr:active:not(:nth-child(1)) {
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
}
.no-corr {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 60vh;
  z-index: 100;
}
.no-corr img {
  width: 36%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

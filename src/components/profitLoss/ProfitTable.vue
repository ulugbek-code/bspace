<template>
  <div class="box-table">
    <table v-if="repo.length > 0">
      <tr>
        <th>
          Наименование показатей<br />
          <span class="badge">10</span>
        </th>
        <th>
          Код строки<br />
          <span class="badge">50</span>
        </th>
        <th>
          За отчетный период<br />
          <span class="badge">20</span>
        </th>
      </tr>
      <tr>
        <td><h3>Продолжающаяся деятельность</h3></td>
      </tr>
      <tr v-for="r in repo" :key="r">
        <td>{{ r.name }}</td>
        <td>
          <span class="badge">{{ r.code }}</span>
        </td>
        <td>{{ numberWithCommas(r.period) }}</td>
      </tr>
    </table>

    <div v-else class="no-report">
      <img src="../../assets/noReport.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repo: [
        {
          name: 'Выручка',
          code: '010',
          period: '76565'
        },
        {
          name: 'Валовая прибыль',
          code: '020',
          period: '76565'
        },
        {
          name: 'Выручка',
          code: '040',
          period: '76565'
        },
        {
          name: 'административные расходы',
          code: '050',
          period: '76565'
        },
        {
          name: 'долгосрочная дебиторская задолженность по аренде',
          code: '080',
          period: '76565'
        },
        {
          name: 'Выручка',
          code: '040',
          period: '76565'
        },
        {
          name: 'административные расходы',
          code: '050',
          period: '76565'
        },
        {
          name: 'долгосрочная дебиторская задолженность по аренде',
          code: '080',
          period: '76565'
        },
        {
          name: 'Выручка',
          code: '040',
          period: '76565'
        },
        {
          name: 'административные расходы',
          code: '050',
          period: '76565'
        },
        {
          name: 'долгосрочная дебиторская задолженность по аренде',
          code: '080',
          period: '76565'
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
.box-table {
  flex: 2;
  height: 83vh;
  width: 100%;
  border-top: 1px solid rgba(221, 221, 221, 1);
  overflow-y: scroll;
  overflow-x: hidden;
}
table {
  width: 94%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
  color: rgba(68, 68, 68, 1);
}
tr:not(:nth-child(1)) {
  border-bottom: 0.5px solid rgba(170, 170, 170, 0.2);
}
th {
  background: #fff;
  position: sticky;
  top: 0%;
  z-index: 1;
  color: rgba(170, 170, 170, 1);
  padding: 3px 6px;
}
th::after {
  content: '';
  height: 1.5px;
  width: 100%;
  position: absolute;
  bottom: -2%;
  left: 0;
  background: rgba(170, 170, 170, 0.7);
  /* have to change cause little space is appers when scrolling */
}
.badge {
  font-size: 12px;
  font-weight: 400;
  padding: 2px 8px;
  color: rgba(68, 68, 68, 1);
  background: rgba(67, 97, 238, 0.3);
  border-radius: 12px;
}
th .badge {
  color: rgba(67, 97, 238, 1);
}
td {
  background: #fff;
  font-size: 14px;
  padding: 16px 12px;
}
td:nth-child(1) {
  max-width: 280px;
}
.greenish {
  color: rgba(76, 175, 80, 1);
}
.redish {
  color: rgba(204, 24, 24, 1);
}
.no-report {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 60vh;
  z-index: 1;
}
.no-report img {
  width: 70%;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
}
</style>

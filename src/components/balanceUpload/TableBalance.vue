<template>
  <div v-if="errorList" id="balance-error">
    <div v-for="error in errorList" :key="error" class="error-div">
      {{ error }}
    </div>
  </div>
  <div v-else id="container-table-balance">
    <div class="header">
      <h2>Сальдо за Период <span>2021</span> <span>July</span></h2>
      <button class="btn">Confirm</button>
    </div>
    <div class="table-wrapper">
      <table>
        <tr class="first-row">
          <th colspan="2">Счет,</th>
          <th colspan="2">Сальдо на начало периода</th>
          <th colspan="2">Обороты за период</th>
          <th colspan="2">Сальдо на конец периода</th>
        </tr>
        <tr class="second-row">
          <th colspan="2">Наименование</th>
          <th>Дебет</th>
          <th>Кредит</th>
          <th>Дебет</th>
          <th>Кредит</th>
          <th>Дебет</th>
          <th>Кредит</th>
        </tr>
        <tr v-for="balance in balances" :key="balance">
          <td colspan="2">
            <span>{{ balance.code }}</span>
            {{ substringedAddress(balance.name) }}
            <span class="tooltiptext">{{ balance.name }}</span>
          </td>
          <td>{{ numberWithCommas(balance.d1) }}</td>
          <td>{{ numberWithCommas(balance.k1) }}</td>
          <td>{{ numberWithCommas(balance.d2) }}</td>
          <td>{{ numberWithCommas(balance.k2) }}</td>
          <td>{{ numberWithCommas(balance.d3) }}</td>
          <td>{{ numberWithCommas(balance.k3) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['errorList'],
  data() {
    return {
      balances: [
        {
          code: 12.01,
          name: 'Счета учета основных средств',
          d1: 123113,
          k1: 2132113131313,
          d2: 2132323223213333,
          k2: 131231333313,
          d3: 1312123133,
          k3: 131313333333333333
        },
        {
          code: 1.01,
          name: 'Счета учета основных средств',
          d1: 123113,
          k1: 2132113131313,
          d2: 2132323213333,
          k2: 131231333313,
          d3: 1312123133,
          k3: 131313333333333333
        },
        {
          code: 1.01,
          name: 'Счета учета заготовления и приобретения материалов',
          d1: 123113,
          k1: 21321131313131313,
          d2: 2132323223213333,
          k2: 13133313,
          d3: 1312123133,
          k3: 783603600085
        },
        {
          code: 12.01,
          name: 'Счета учета основных средств',
          d1: 123113,
          k1: 2132113131313,
          d2: 2132323223213333,
          k2: 131231333313,
          d3: 1312123133,
          k3: 131313333333333333
        },
        {
          code: 12.01,
          name: 'Счета учета основных средств',
          d1: 123113,
          k1: 2132113131313,
          d2: 2132323223213333,
          k2: 131231333313,
          d3: 1312123133,
          k3: 131313333333333333
        }
      ]
    };
  },
  methods: {
    substringedAddress(val) {
      if (val.length > 30) {
        return val.substring(0, 34) + '...';
      } else {
        return val;
      }
    },
    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
</script>

<style scoped>
#container-table-balance,
#balance-error {
  width: 100%;
  height: 66vh;
  overflow-y: scroll;
}
#container-table-balance * {
  font-family: 'Poppins', sans-serif;
}
.error-div {
  color: rgb(214, 63, 63);
  padding: 11px 36px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
}
/* .error-div {
  color: rgb(235, 226, 226);
  background: rgb(240, 116, 103);
  padding: 11px 36px;
  border-bottom: 0.8px solid rgba(255, 255, 255, 0.15);
} */
.error-div:first-child {
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2%;
}
.header h2 {
  font-size: 28px;
}
.header span {
  color: rgba(67, 97, 238, 1);
  padding-left: 20px;
}
.header .btn {
  height: 25px;
  width: 100px;
  padding: 5px 10px;
  color: #fff;
  background: rgba(76, 175, 80, 1);
  border: none;
  border-radius: 25px;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  align-self: center;
  line-height: 14px;
}
table {
  width: 96%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
}
th {
  font-size: 1rem;
  color: rgba(170, 170, 170, 1);
  padding: 3px 6px;
}
td {
  font-size: 12px;
  padding: 16px 12px;
}
.first-row th:not(:nth-child(1)) {
  text-align: center;
}
td:nth-child(1) {
  width: 22%;
  position: relative;
}
td:not(:nth-child(1)) {
  width: 13%;
  text-align: right;
}
tr td span:nth-child(1) {
  display: inline-block;
  font-size: 13.5px;
  margin-left: -2px;
  width: 32px;
  /* background: sandybrown; */
}
tr:hover:not(:nth-child(1)):hover:not(:nth-child(2)) {
  border-radius: 15px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
tr:active:not(:nth-child(1)):active:not(:nth-child(2)) {
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
}
.tooltiptext {
  visibility: hidden;
  background-color: rgb(36, 39, 56);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 3px;
  width: fit-content;
  position: absolute;
  top: 70%;
  left: 10%;
  z-index: 1;
}
td:nth-child(1):hover .tooltiptext {
  visibility: visible;
}
</style>

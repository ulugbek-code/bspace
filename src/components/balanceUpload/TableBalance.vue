<template>
  <!-- <div v-if="!errorList && !balanceWithId.id" id="no-balance">
    <img src="../../assets/noBalance.svg" alt="" />
    <h3>No Balance choosen yet</h3>
  </div> -->
  <!-- <div v-else-if="errorList && !showBalance" id="balance-error">
    if statement changed from v-if:errorList
    <div v-for="error in errorList" :key="error" class="error-div">
      {{ error }}
    </div>
  </div> -->
  <div id="container-table-balance">
    <div class="header">
      <h2>
        Сальдо за Период <span>{{ balanceWithId.year }}</span>
        <span>{{ balanceWithId.period }}</span>
      </h2>
      <button
        v-if="!balanceWithId.isConfirmed"
        @click="confirmBalance(balanceWithId.id)"
        class="btn"
      >
        Confirm
      </button>
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
        <!-- <template v-if="balances.length > 0"> -->
        <tr v-for="balance in balances" :key="balance.id">
          <td colspan="2">
            <!-- <span>{{ balance.code }}</span> -->
            {{ substringedAddress(balance.name) }}
            <span class="tooltiptext">{{ balance.name }}</span>
          </td>
          <td>{{ numberWithCommas(balance.openingStockDebit) }}</td>
          <td>{{ numberWithCommas(balance.openingStockCredit) }}</td>
          <td>{{ numberWithCommas(balance.periodDebit) }}</td>
          <td>{{ numberWithCommas(balance.periodCredit) }}</td>
          <td>{{ numberWithCommas(balance.closingStockDebit) }}</td>
          <td>{{ numberWithCommas(balance.closingStockCredit) }}</td>
        </tr>
        <!-- </template> -->
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['errorList', 'balanceWithId'],
  data() {
    return {
      balances: [
        {
          name: 'Счета учета основных средств',
          openingStockDebit: '106,016,502,733.3',
          openingStockCredit: '38,288,538,111.01',
          periodDebit: '7,274,181,945.27',
          periodCredit: '739,138,897.74',
          closingStockDebit: '394,484,157.44',
          closingStockCredit: '43,705,268,621.25'
        },
        {
          name: 'Сырье и материалы',
          openingStockDebit: '106,016,502,733.3',
          openingStockCredit: '',
          periodDebit: '7,274,181,945.27',
          periodCredit: '739,138,897.74',
          closingStockDebit: '394,484,157.44',
          closingStockCredit: '43,705,268,621.25'
        },
        {
          name: 'Сооружения',
          openingStockDebit: '106,016,502,733.3',
          openingStockCredit: '38,288,538,111.01',
          periodDebit: '',
          periodCredit: '739,138,897.74',
          closingStockDebit: '394,484,157.44',
          closingStockCredit: '43,705,268,621.25'
        },
        {
          name: 'Оборудование к установке - импортное',
          openingStockDebit: '106,016,502,733.3',
          openingStockCredit: '38,288,538,111.01',
          periodDebit: '7,274,181,945.27',
          periodCredit: '739,138,897.74',
          closingStockDebit: '394,484,157.44',
          closingStockCredit: '43,705,268,621.25'
        }
      ],
      showBalance: false
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
    },
    confirmBalance(id) {
      axios
        .put(
          'https://bspace.azurewebsites.net/api/BalanceFiles/Confirm?id=' + id,
          {},
          {
            headers: {
              Accept: 'text/plain',
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          }
        )
        .then(() => this.$store.dispatch('balance/getAllBalances'))
        .catch(err => console.log(err));
    }
  }
  // watch: {
  //   balanceWithId(val) {
  //     this.showBalance = true;
  //     axios
  //       .get('https://bspace.azurewebsites.net/api/Balances/GetAll/' + val.id, {
  //         headers: {
  //           Accept: 'text/plain',
  //           Authorization: `Bearer ${localStorage.getItem('mytoken')}`
  //         }
  //       })
  //       .then(res => {
  //         this.balances = res.data.data;
  //       });
  //   },
  //   errorList() {
  //     this.showBalance = false;
  //   }
  // }
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
  color: rgba(68, 68, 68, 1);
}
th {
  font-size: 1rem;
  padding: 3px 6px;
  text-align: center;
  border-right: 1px solid rgb(211, 214, 231);
}
th:nth-child(1) {
  border-left: 1px solid rgb(211, 214, 231);
}
td {
  font-size: 12px;
  padding: 16px 12px;
  position: relative;
  border-left: 1px solid rgb(211, 214, 231);
}
tr {
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
}
.first-row,
.second-row {
  position: sticky;
  background: #fff;
  z-index: 10;
}
.first-row {
  top: 0%;
}
.second-row {
  top: 4%;
}
.second-row th::after {
  content: '';
  height: 1.5px;
  width: 100%;
  position: absolute;
  bottom: 0%;
  left: 0;
  z-index: 10;
  background: rgb(211, 214, 231);
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
  color: rgb(230, 224, 224);
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
#no-balance {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 66vh;
  /* background: black; */
  z-index: 100;
}
#no-balance img,
#no-balance h3 {
  width: 36%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#no-balance h3 {
  left: 52%;
}
</style>

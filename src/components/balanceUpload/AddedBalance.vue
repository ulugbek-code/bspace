<template>
  <div id="added-balance">
    <h3>Balance List</h3>
    <!-- <div v-if="loading" id="loader">
      <img src="../../assets/loader.gif" alt="" />
    </div> -->
    <!-- <div v-else-if="!loading && errors">
      NO CONNECTION
    </div> -->
    <!-- <div v-else-if="!loading && (!balances || balances.length === 0)">
      No stored data yet
    </div> -->
    <div class="table-container">
      <table v-if="balances.length > 0">
        <tr>
          <th v-for="title in titles" :key="title">
            <h4>
              {{ title }} <fa class="arrows" :icon="['fas', 'arrows-alt-v']" />
            </h4>
          </th>
        </tr>
        <tr
          v-for="(balance, i) in balances"
          :key="i"
          :class="{ current: i == current }"
          @click="getBalanceId(balance.id), makingActive(i)"
        >
          <td>
            {{ balance.year }}
          </td>
          <td>
            {{ balance.period }}
            <!-- {{ typeof +balance.period }} -->
            <!-- {{ getPeriodName(+balance.period) }} -->
          </td>
          <td>
            <!-- {{ substringedDesc(balance.description) }} -->{{
              balances.description ? 'true' : 'null'
            }}
            <!-- <small class="tooltiptext">{{ balance.description }}</small> -->
          </td>
          <td :class="[balance.isConfirmed ? 'greeny' : 'redish']">
            <p>{{ balance.isConfirmed ? 'Accepted' : 'In Progress' }}</p>
          </td>
          <!-- <td>
            status
          </td> -->
          <td @click.stop="removeBalance(balance.id)" id="trash">
            <fa :icon="['fas', 'trash']" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['sendBalanceId'],
  data() {
    return {
      current: null,
      titles: ['Year', 'Period', 'Description', 'Status'],
      periodMonths: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      balance: {},
      balances: [
        {
          year: '2020',
          period: 'June',
          description: 'OCB of shown period lorem ipsum...',
          isConfirmed: true
        },
        {
          year: '2019',
          period: 'March',
          description: 'OCB of shown period lorem ipsum...',
          isConfirmed: false
        },
        {
          year: '2022',
          period: 'May',
          description: 'OCB of shown period lorem ipsum...',
          isConfirmed: true
        },
        {
          year: '2018',
          period: 'September',
          description: 'OCB of shown period lorem ipsum...',
          isConfirmed: true
        }
      ]
    };
  },
  computed: {
    // balances() {
    //   return this.$store.getters['balance/getBalanceList'];
    // },
    errors() {
      return this.$store.getters['balance/getError'];
    },
    loading() {
      return this.$store.getters['balance/getLoading'];
    }
  },
  methods: {
    makingActive(i) {
      this.current = i;
    },
    getPeriodName(index) {
      return this.periodMonths[index];
    },
    getBalanceId(id) {
      axios
        .get(
          'https://bspace.azurewebsites.net/api/BalanceFiles/GetById?id=' + id,
          {
            headers: {
              Accept: 'text/plain',
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          }
        )
        .then(res => {
          // console.log(res.data.data);
          this.balance = res.data.data;
          this.balance.period = this.periodMonths[this.balance.period];
          this.$emit('sendBalanceId', this.balance);
        });
    },
    removeBalance(id) {
      if (confirm('do you want to delete?')) {
        axios
          .delete(
            'https://bspace.azurewebsites.net/api/BalanceFiles/Delete/' + id,
            {
              headers: {
                Accept: 'text/plain',
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .then(() => {
            this.$store.dispatch('balance/getAllBalances');
            console.log('deleted');
          })
          .catch(err => console.log(err));
      }
    },
    substringedDesc(val) {
      if (val.length > 45) {
        return val.substring(0, 45) + '...';
      } else {
        return val;
      }
    }
  },
  created() {
    this.$store.dispatch('balance/getAllBalances');
  }
};
</script>

<style scoped>
.current {
  background: rgb(255, 255, 255);
}
#added-balance {
  width: 60%;
  background: rgba(221, 221, 221, 0.4);
  padding: 20px 0 30px 20px;
  /* margin-bottom: 20px; */
}
#added-balance .table-container {
  width: 98%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
table tr:nth-child(1) {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f1f1f1;
}
table tr:nth-child(1)::after {
  content: '';
  height: 0.5px;
  width: 100%;
  position: absolute;
  bottom: 2%;
  left: 0;
  z-index: 10;
  background: rgba(170, 170, 170, 1);
}
th h4 {
  font-size: 16px;
  padding-left: 10px;
  color: rgb(133, 127, 127);
}
.arrows {
  font-size: 13px;
  padding-bottom: 2px;
}
th:nth-child(3) .arrows {
  display: none;
}
tr:not(:nth-child(1)) {
  border-bottom: 0.7px solid rgba(142, 137, 137, 0.1);
  transition: 0.1s;
}
tr:hover:not(:nth-child(1)) {
  border-radius: 15px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  cursor: pointer;
  transition: all 0s, background 0.1s;
}

td {
  position: relative;
  padding: 8px 12px;
  font-size: 13px;
}
td:nth-child(1) {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
td:last-child {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.greeny p {
  text-align: center;
  padding: 3px;
  border-radius: 25px;
  background: rgba(155, 222, 157, 0.3);
  color: rgba(76, 175, 80, 1);
}
.redish p {
  text-align: center;
  padding: 3px;
  border-radius: 25px;
  background: rgba(255, 178, 125, 0.3);
  color: rgba(237, 125, 43, 1);
}
.tooltiptext {
  visibility: hidden;
  background-color: rgb(39, 43, 61);
  color: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  width: fit-content;
  position: absolute;
  top: 70%;
  left: 4%;
  z-index: 1;
}
td:nth-child(3):hover .tooltiptext {
  visibility: visible;
}
#trash {
  font-size: 16px;
  color: rgba(170, 170, 170, 1);
  padding: 4px;
  cursor: pointer;
}
#trash:hover {
  color: rgba(204, 24, 24, 0.75);
}
#loader {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f1f2f3;
  z-index: 10;
}
#loader img {
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
}
.active {
  background: yellow;
}
</style>

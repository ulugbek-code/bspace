<template>
  <div id="added-correction">
    <h3>Correction List</h3>
    <div class="table-container">
      <table>
        <tr>
          <th v-for="title in titles" :key="title">
            <h4>
              {{ title }} <fa class="arrows" :icon="['fas', 'arrows-alt-v']" />
            </h4>
          </th>
        </tr>
        <tr
          @click="getCorrection(balance.id), makeActive(i)"
          v-for="(balance, i) in acceptedBalances"
          :key="i"
          :class="{ current: i == current }"
        >
          <td>
            {{ balance.year }}
          </td>
          <td>
            {{ balance.period }}
          </td>
          <td>
            {{ substringedDesc(balance.description) }}
            <small class="tooltiptext">{{ balance.description }}</small>
          </td>
          <td class="greeny">
            <p>Accepted</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  emits: ['sendCorrection'],
  data() {
    return {
      current: null,
      titles: ['Year', 'Period', 'Description', 'Status'],
      balances: [
        {
          year: 1199,
          period: 'March',
          desc: 'lalda adakj da sda adsd dsad',
          status: 'Accepted'
        }
      ]
    };
  },
  computed: {
    acceptedBalances() {
      return this.$store.getters['balance/getBalanceList'].filter(
        a => a.isConfirmed === true
      );
    }
  },
  methods: {
    makeActive(i) {
      this.current = i;
    },
    getCorrection(id) {
      axios
        .get('https://bspace.azurewebsites.net/api/IfrsBalances/GetAll/' + id, {
          headers: {
            Accept: 'text/plain',
            Authorization: `Bearer ${localStorage.getItem('mytoken')}`
          }
        })
        .then(res => this.$emit('sendCorrection', res.data.data));
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
#added-correction {
  width: 60%;
  background: rgba(221, 221, 221, 0.4);
  padding: 15px 0 30px 20px;
  /* margin-bottom: 20px; */
}
#added-correction .table-container {
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
  padding-left: 16px;
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
  border-bottom: 0.5px solid rgba(126, 123, 123, 0.1);
}
tr:hover:not(:nth-child(1)) {
  border-radius: 15px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  cursor: pointer;
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
.tooltiptext {
  visibility: hidden;
  background-color: rgba(19, 23, 40, 0.9);
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
.greeny p {
  text-align: center;
  padding: 3px 0;
  border-radius: 25px;
  background: rgba(155, 222, 157, 0.3);
  color: rgba(76, 175, 80, 1);
}
.current {
  background: #fff;
}
</style>

<template>
  <div id="createBalanceSheet">
    <div class="first-row">
      <h2>Balance Sheet</h2>
      <div class="first-btn-group">
        <base-button><fa :icon="['fas', 'coins']" /> Profit & Loss</base-button>
        <base-button
          ><fa :icon="['fas', 'chart-line']" /> Changes in Equity</base-button
        >
        <base-button
          ><fa :icon="['fas', 'chalkboard-teacher']" /> Cash Flow</base-button
        >
      </div>
      <div class="second-btn-group">
        <div class="download">
          <fa class="download-icon" :icon="['fas', 'download']" />
        </div>
        <base-button><fa :icon="['fas', 'print']" /> Print</base-button>
      </div>
    </div>
    <hr />
    <div class="second-row">
      <div class="input-container">
        <fa class="icons" :icon="['fas', 'search']" />
        <input type="text" placeholder="Search" />
      </div>
      <div class="input-container">
        <fa class="icons" :icon="['fas', 'calendar-alt']" />
        <base-dropdown
          :options="getYears"
          filtration="true"
          defaultVal="Years"
          @input="gettingYear($event)"
        ></base-dropdown>
        <!-- :index="true"
          :isSubmitted="isSubmitted"
          :validity="!isValid"
          @input="showIt($event)" -->
      </div>
      <div class="input-container">
        <template v-if="filteredPeriods">
          <fa class="icons" :icon="['fas', 'calendar-alt']" />
          <base-dropdown
            :options="filteredPeriods[0]"
            filtration="true"
            defaultVal="Period"
            @input="getPeriod($event)"
          ></base-dropdown>
        </template>
        <small v-else>Choose year to see periods</small>
      </div>
      <div class="input-container">
        <fa class="icons" :icon="['fas', 'bookmark']" />
        <base-dropdown
          :options="['a', 'b']"
          :index="true"
          defaultVal="Saved Filters"
        ></base-dropdown>
      </div>
      <base-button @clicked="getReport(bId)">Apply Filters</base-button>
      <div v-if="isGoing" class="little-loader">
        <img src="../../assets/loader.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseDropdown from '../UI/BaseDropdown.vue';

export default {
  emits: ['sendReport'],
  components: {
    BaseDropdown
  },
  data() {
    return {
      isGoing: false,
      bId: '664de905-75ca-404b-a2c6-049d78ee822f',
      choosenYear: null,
      choosenPeriod: null,
      filters: [],
      filteredPeriods: null
      // years: [...Array(new Date().getFullYear() - 1998).keys()].map(
      //   e => e + 1999
      // ),
      // months: [
      //   'January',
      //   'February',
      //   'March',
      //   'April',
      //   'May',
      //   'June',
      //   'July',
      //   'August',
      //   'September',
      //   'October',
      //   'November',
      //   'December'
      // ]
    };
  },
  computed: {
    getYears() {
      return this.filters.map(y => y.year).sort();
    }
  },
  methods: {
    getPeriod(val) {
      this.choosenPeriod = val;
    },
    gettingYear(val) {
      this.choosenYear = val;
    },
    gettingPeriod(year) {
      this.filteredPeriods = this.filters
        .filter(y => y.year == year)
        .map(p => p.periods);
    },
    getReport(id) {
      console.log(this.choosenYear, this.choosenPeriod);

      if (this.choosenYear !== null && this.choosenPeriod !== null) {
        this.isGoing = true;
        axios
          .get('https://bspacedev.azurewebsites.net/api/Reports/GetAll/' + id, {
            headers: {
              Accept: 'text/plain',
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          })
          .then(res => {
            this.$emit('sendReport', res.data.data);
            this.isGoing = false;
          })
          .catch(err => console.log(err));
      } else {
        alert('no data choosen');
      }
      this.choosenYear = null;
      this.choosenPeriod = null;
    },
    getAllFilters() {
      axios
        .get(
          'https://bspacedev.azurewebsites.net/api/Filters/GetAllPeriodFilters/' +
            localStorage.getItem('firmId'),
          {
            headers: {
              Accept: 'text/plain',
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          }
        )
        .then(res => (this.filters = res.data.data))
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getAllFilters();
  },
  watch: {
    choosenYear(val) {
      this.gettingPeriod(val);
    }
  }
};
</script>

<style scoped>
hr {
  margin: 8px 0 14px 0;
  border: 0;
  height: 1px;
  background: rgba(221, 221, 221, 1);
}
#createBalanceSheet {
  width: 95%;
  margin: 1rem auto;
}
.first-row {
  display: flex;
  justify-content: space-between;
}
.first-row h2 {
  flex: 1;
}
.first-btn-group {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.second-btn-group {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.download {
  background: rgba(237, 237, 237, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 28px;
  border-radius: 40px;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.download-icon {
  border-radius: 50%;
  color: rgba(170, 170, 170, 1);
}
.second-row {
  display: flex;
  align-items: center;
  position: relative;
}
.second-row .input-container {
  position: relative;
  margin-right: 3rem;
  width: 12vw;
}
.second-row input {
  border-radius: 25px;
  border: 1px solid rgba(108, 109, 113, 0.35);
  color: rgba(69, 67, 67, 0.9);
  padding-left: 22px;
  line-height: 25px;
  outline: none;
  border-radius: 25px;
}
.second-row .icons {
  font-size: 13px;
  position: absolute;
  top: 26%;
  left: 3%;
  z-index: 10;
  color: rgb(215, 226, 226);
}
.little-loader img {
  position: absolute;
  bottom: -40%;
  width: 50px;
}
</style>

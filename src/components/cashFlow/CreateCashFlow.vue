<template>
  <div id="createBalanceSheet">
    <div class="first-row">
      <h2>Cash Flow</h2>
      <div class="first-btn-group">
        <router-link to="/balanceSheet"
          ><base-button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 21"
              stroke-width="1.5"
              stroke="#fff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
              <path d="M18 14v4h4" />
              <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
              <rect x="8" y="3" width="6" height="4" rx="2" />
              <circle cx="18" cy="18" r="4" />
              <path d="M8 11h4" />
              <path d="M8 15h3" />
            </svg>
            Balance Sheet
          </base-button></router-link
        >
        <router-link to="/profitLoss"
          ><base-button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 20"
              stroke-width="1.5"
              stroke="#fff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <ellipse cx="16" cy="6" rx="5" ry="3" />
              <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
              <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
              <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
              <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
              <path d="M5 15v1m0 -8v1" />
            </svg>
            Profit & Loss</base-button
          ></router-link
        >
        <router-link to="/changesEquity">
          <base-button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 18"
              stroke-width="1.5"
              stroke="#fff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2v-2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2"
              />
              <polyline points="10 8 8 8 8 10" />
              <polyline points="8 14 8 16 10 16" />
              <polyline points="14 8 16 8 16 10" />
              <polyline points="16 14 16 16 14 16" />
            </svg>
            Changes in Equity</base-button
          ></router-link
        >
      </div>
      <div class="second-btn-group">
        <div class="download">
          <fa class="download-icon" :icon="['fas', 'download']" />
        </div>
        <base-button
          ><fa :icon="['fas', 'print']" class="icn" /> Print</base-button
        >
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
          filtration="true"
          defaultVal="Years"
          @input="gettingYear($event)"
        ></base-dropdown>
      </div>
      <div class="input-container">
        <fa class="icons" :icon="['fas', 'calendar-alt']" />
        <base-dropdown
          filtration="true"
          defaultVal="Period"
          @input="getPeriod($event)"
        ></base-dropdown>
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
import BaseDropdown from '../UI/BaseDropdown.vue';

export default {
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
    };
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
  width: 94%;
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
a {
  color: #fff;
  transition: 0.4s all ease;
  text-decoration: none;
}
a:hover svg {
  stroke: rgba(67, 97, 238, 1);
}
</style>

<template>
  <div id="createBalanceSheet">
    <div class="first-row">
      <h2>Profit & Loss</h2>
      <div class="first-btn-group">
        <base-button class="btns"
          ><fa :icon="['fas', 'coins']" /><router-link to="/profitLoss"
            >Profit & Loss</router-link
          ></base-button
        >
        <base-button class="btns"
          ><fa :icon="['fas', 'chart-line']" /><router-link to="/changesEquity"
            >Changes in Equity</router-link
          ></base-button
        >
        <base-button class="btns"
          ><fa :icon="['fas', 'chalkboard-teacher']" /><router-link
            to="/cashFlow"
            >Cash Flow</router-link
          ></base-button
        >
      </div>
      <div class="second-btn-group">
        <div class="download">
          <fa class="download-icon" :icon="['fas', 'download']" />
        </div>
        <base-button class="btns"
          ><fa :icon="['fas', 'print']" /> Print</base-button
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
.btns:hover a {
  color: rgba(67, 97, 238, 1);
}
a {
  color: #fff;
  transition: 0.4s all ease;
  text-decoration: none;
  margin-left: 3px;
}
</style>

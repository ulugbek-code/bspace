<template>
  <div id="createBalanceSheet">
    <div class="first-row">
      <h2>Balance Sheet</h2>
      <div class="first-btn-group">
        <base-button @clicked="helloWorld"
          ><fa :icon="['fas', 'coins']" /> Profit & Loss</base-button
        >
        <base-button @clicked="helloWorld"
          ><fa :icon="['fas', 'chart-line']" /> Changes in Equity</base-button
        >
        <base-button @clicked="helloWorld"
          ><fa :icon="['fas', 'chalkboard-teacher']" /> Cash Flow</base-button
        >
      </div>
      <div class="second-btn-group">
        <div class="download">
          <fa class="download-icon" :icon="['fas', 'download']" />
        </div>
        <base-button @clicked="helloWorld"
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
          :options="['january', 'february']"
          defaultVal="Period"
        ></base-dropdown>
        <!-- :index="true"
          :isSubmitted="isSubmitted"
          :validity="!isValid"
          @input="showIt($event)" -->
      </div>
      <div class="input-container">
        <fa class="icons" :icon="['fas', 'calendar-alt']" />
        <base-dropdown
          :options="['january', 'february']"
          defaultVal="Period"
        ></base-dropdown>
        <!-- :index="true"
          :isSubmitted="isSubmitted"
          :validity="!isValid"
          @input="showIt($event)" -->
      </div>
      <div class="input-container">
        <fa class="icons" :icon="['fas', 'calendar-alt']" />
        <base-dropdown
          :options="['january', 'february']"
          defaultVal="Period"
        ></base-dropdown>
        <!-- :index="true"
          :isSubmitted="isSubmitted"
          :validity="!isValid"
          @input="showIt($event)" -->
      </div>
      <base-button @clicked="helloWorld">Apply Filters</base-button>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '../UI/BaseDropdown.vue';

export default {
  components: {
    BaseDropdown
  },
  methods: {
    helloWorld() {
      console.log('hello');
    }
  }
};
</script>

<style scoped>
hr {
  margin: 8px 0;
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
  background: aquamarine;
}
.second-row .input-container {
  position: relative;
  margin-right: 3rem;
  width: 12vw;
}
.second-row input {
  padding-left: 16px;
}
.second-row .icons {
  position: absolute;
  top: 20%;
}
</style>

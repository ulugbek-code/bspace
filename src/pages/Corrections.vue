<template>
  <the-navigation></the-navigation>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-correction @sendCorr="getCorr($event)"></create-correction>
    <div class="header">
      <h2>Correction</h2>
    </div>
    <table-correction :corr="corr"></table-correction>
  </div>
</template>

<script>
import CreateCorrection from '../components/corrections/CreateCorrection.vue';
import TableCorrection from '../components/corrections/TableCorrection.vue';

export default {
  components: {
    CreateCorrection,
    TableCorrection
  },
  data() {
    return {
      corr: []
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
    }
  },
  methods: {
    getCorr(val) {
      this.corr = val;
    }
  }
};
</script>

<style scoped>
.box {
  margin-left: 270px;
  transition: all 0.6s ease;
}
.box.nav {
  margin-left: 110px;
}
.header {
  margin-left: 1%;
  margin-bottom: 4px;
}
</style>

<template>
  <the-navigation></the-navigation>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-balance
      @error="sendErr($event)"
      @sendId="sendId($event)"
    ></create-balance>
    <table-balance :balanceWithId="id" :errorList="errorList"></table-balance>
  </div>
</template>

<script>
import CreateBalance from '../components/balanceUpload/CreateBalance.vue';
import TableBalance from '../components/balanceUpload/TableBalance.vue';

export default {
  components: {
    CreateBalance,
    TableBalance
  },
  data() {
    return {
      errorList: null,
      id: {}
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
    }
  },
  methods: {
    sendErr(val) {
      this.errorList = val;
      //   console.log(this.errorList);
    },
    sendId(id) {
      this.id = id;
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
</style>

<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <create-balance @error="sendErr($event)"></create-balance>

    <!-- <div v-for="note in notes" :key="note">
      {{ note }}
    </div> -->
    <table-balance :errorList="errorList"></table-balance>
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
      errorList: null
    };
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
    }
    // notes() {
    //   return this.errorList.replace(':', ';').split(';');
    //   ///[^\d](.*\d*)$/
    // }
  },
  methods: {
    sendErr(val) {
      this.errorList = val;
      //   console.log(this.errorList);
    }
  }
};
</script>

<style scoped>
.box {
  margin-left: 270px;
}
.box.nav {
  margin-left: 110px;
}
</style>

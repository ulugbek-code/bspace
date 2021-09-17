<template>
  <div class="balance-create-box">
    <add-balance @errors="sendError($event)"></add-balance>
    <added-balance @sendBalanceId="sendBalanceId($event)"></added-balance>
  </div>
</template>

<script>
import AddBalance from './AddBalance.vue';
import AddedBalance from './AddedBalance.vue';

export default {
  components: {
    AddBalance,
    AddedBalance
  },
  emits: ['error', 'sendId'],
  data() {
    return {
      errorList: [],
      balanceId: {}
    };
  },
  methods: {
    sendError(val) {
      this.errorList = val;
      this.$emit('error', this.errorList);
    },
    sendBalanceId(id) {
      this.balanceId = id;
      this.$emit('sendId', this.balanceId);
    }
  }
};
</script>

<style scoped>
.balance-create-box {
  display: flex;
  height: 34vh;
}
</style>

<template>
  <div class="balance-create-box">
    <add-balance @errors="sendError($event)"></add-balance>
    <added-balance></added-balance>
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
  emits: ['error'],
  data() {
    return {
      errorList: []
    };
  },
  methods: {
    sendError(val) {
      this.errorList = val;
      this.$emit('error', this.errorList);
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

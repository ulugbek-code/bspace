<template>
  <div class="correction-create-box">
    <added-correction @sendCorrection="getCorr($event)"></added-correction>
    <add-correction></add-correction>
  </div>
</template>

<script>
import AddCorrection from './AddCorrection.vue';
import AddedCorrection from './AddedCorrection.vue';

export default {
  emits: ['sendCorr'],
  components: {
    AddCorrection,
    AddedCorrection
  },
  methods: {
    getCorr(val) {
      this.$emit('sendCorr', val);
    }
  }
};
</script>

<style scoped>
.correction-create-box {
  display: flex;
  height: 34vh;
}
</style>

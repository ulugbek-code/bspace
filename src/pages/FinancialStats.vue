<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <h1>Financial</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isNavOpened() {
      return this.$store.getters.isNav;
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

<template>
  <div id="notFound">
    <h1>404</h1>
    <router-link to="/dashboard" @click="back"> to Dashboard</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$store.commit('makeActive');
      this.$store.commit('refreshOffset');
    }
  }
  // beforeMount() {
  //   window.addEventListener(
  //     'beforeunload',
  //     this.$store.commit('toggleActivity')
  //   );
  // }
};
</script>
<style scoped>
#notFound {
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
}
h2 {
  color: rgb(73, 73, 73);
}
h1 {
  font-size: 14rem;
  color: rgb(154, 145, 145);
}
a {
  text-decoration: none;
  color: rgba(99, 99, 98, 1);
  transition: 0.2s ease;
}
a:hover {
  color: rgba(99, 99, 98, 0.6);
}
</style>

<template>
  <vue-progress-bar></vue-progress-bar>
  <!-- <the-navigation v-if="isNavActive"></the-navigation> -->
  <main>
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </main>
</template>

<script>
export default {
  // data() {
  //   return {
  //     events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress'],
  //     // logoutTimer: null
  //   };
  // },
  // computed: {
  //   isNavActive() {
  //     return this.$store.state.isActive;
  //   }
  // },
  // methods: {
  //   setTimers() {
  //     this.logoutTimer = setTimeout(this.logoutUser, 3000); //15*60*1000
  //   },
  //   logoutUser() {
  //     console.log('23');
  //     this.resetTimers();
  //     localStorage.clear();
  //     this.$store.commit('toggleActivity');
  //     this.$router.push('/signIn');
  //   },
  //   resetTimers() {
  //     clearTimeout(this.logoutTimer);
  //     this.setTimers();
  //   }
  // },
  // mounted() {
  //   // if(this.isNavActive){
  //   this.events.forEach(event => {
  //     window.addEventListener(event, this.resetTimers);
  //   });
  //   this.setTimers();
  //   // }
  // },
  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object

      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Poppins', sans-serif;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* .activet {
  margin-left: 400px;
} */
</style>

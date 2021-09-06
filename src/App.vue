<template>
  <the-navigation v-if="isNavActive"></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    TheNavigation
  },
  data(){
    return {
      events: ['click','mousemove','mousedown','scroll','keypress'],
      logoutTimer: null
    }
  },
  computed:{
    isNavActive(){
      return  this.$store.state.isActive 
    },
  },
  methods:{
    setTimers(){
      this.logoutTimer = setTimeout(this.logoutUser, 1000)//15*60*1000
    },
    logoutUser(){
      console.log('23')
      this.resetTimers()
      // localStorage.clear()
      // this.$store.commit('toggleActivity')
      // this.$router.push('/signIn')
    },
    resetTimers(){
      clearTimeout(this.logoutTimer)

      this.setTimers()
    }
  },
  mounted(){
    // if(this.isNavActive){
      this.events.forEach((event)=>{
      window.addEventListener(event,this.resetTimers)
    });

    this.setTimers()
    // }
  },
  unmounted(){
    this.events.forEach((event)=>{
      window.removeEventListener(event,this.resetTimers)
    });

    this.resetTimers()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: "Poppins",sans-serif;
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
.activet{
  margin-left: 400px;
}
</style>
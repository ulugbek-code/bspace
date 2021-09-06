<template>
    <nav :class="[isNavOpened ? 'openedSideBar' : '']">
      <div @click="toggleHamburgerMenu"
      :class="[isNavOpened ? 'open' : '']"
      class="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
    </div>
      <router-link to="/dashboard"><h1>{{companyName}}</h1></router-link>
      <div class="info">
        <img src="../../assets/unknown.png" alt="">
        <div class="sub-info">
          <h3>{{userInfo.firstName}} {{userInfo.lastName}}</h3>
          <p>{{userInfo.role}}</p>
        </div>
      </div>
      <div class="nav-li">
          <router-link @click="toggle" class="nav-link" to="/dashboard">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'tachometer-alt']" /> 
              <p>Dashboard</p>
            </div>
          </router-link>
          <router-link @click="toggle" class="nav-link" to="/financial">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'chart-bar']" /> 
              <p>Financial Stats</p>
            </div>
          </router-link>
          <router-link @click="toggle" class="nav-link" to="/consolidation">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'project-diagram']" /> 
              <p>Consolidation</p>
            </div>
          </router-link>
          <router-link @click="toggle" class="nav-link" to="/accounts">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'user']" /> 
              <p>Accounts</p>
            </div>
          </router-link>
          <router-link @click="toggle" class="nav-link" to="/firms">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'building']" /> 
              <p>Firms</p>
            </div>
          </router-link>
          <router-link @click="toggle" class="nav-link" to="/balance">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'upload']" /> 
              <p>Balance Upload</p>
            </div>
          </router-link>         
          <router-link @click="toggle" class="nav-link" to="/corrections">
            <div @click="offseting" class="items">
              <fa class="icons" :icon="['fas', 'edit']" /> 
              <p>Corrections</p>
            </div>
          </router-link>
        <div :style="{ top: offset + 'px' }" id="marker"></div>
      </div>
      <div @click="logOut" class="log-out items">
        <fa class="icons" :icon="['fas', 'sign-out-alt']" /> 
        <p>Log Out</p>
      </div>
    </nav>
</template>

<script>
export default {
  data(){
    return{
      offset: 0,
      userInfo: {}
    }
  },
  computed:{
    isNavOpened(){
      return this.$store.state.isNavOpened
    },
    companyName(){
      if(!this.isNavOpened){
        return 'BSpace'
      }else{
        return "BS"
      }
    }
  },
  methods:{
    offseting(e){
        this.offset = (e.target.offsetTop - 5)
      },
    toggleHamburgerMenu(){
      this.$store.commit('toggleNavBar')
    },
    toggle(){
      if(this.isNavOpened){
        this.$store.commit('toggleNavBar')
      }
    },
    logOut(){
      if(confirm('Log out?')){
        localStorage.clear()
        this.$store.commit('toggleActivity')
        this.$router.push('/signIn')
      }else{
        return
      }
    }
  },
  mounted(){
    this.userInfo = JSON.parse(localStorage.getItem('userData'))
  }
}
</script>

<style scoped>
#marker{
  position: absolute;
  left: -10%;
  height: 30px;
  width: 4.5px;
  background: rgba(67, 97, 238, 1);
  transition: 0.5s;
  border-radius: 4px;
  /* padding-bottom: 5px; */
}
nav {
  height: 100%;
  width: 270px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  background: rgba(19, 23, 40, 1);
  padding-left: 1.5rem;
}
.nav-li{
  position: relative;
}
nav.openedSideBar{
  width: 110px;
}
nav.openedSideBar p,
nav.openedSideBar .sub-info{
  display: none;
}
nav.openedSideBar .items,
nav.openedSideBar h1{
  display: flex;
  justify-content: center;
}
nav.openedSideBar .log-out{
  left: 40%;
}
nav.openedSideBar .hamburger-menu{
  margin-left: 1rem;
}
nav.openedSideBar #marker{
  display: none;
}
.hamburger-menu{
  margin: 1rem 0 2rem;
  width: 35px;
  height: 28px;
  position: relative;
  transition: all .3s ease;
  cursor: pointer;
}
.hamburger-menu span{
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 2.5px;
  opacity: 1;
  left: 0; 
  transition: .25s ease-in-out;
}
.hamburger-menu span:nth-child(1){
  top: 0px;
}

.hamburger-menu span:nth-child(2){
  top: 10px;
}
.hamburger-menu span:nth-child(3){
  top: 20px;
}
.hamburger-menu.open span:nth-child(3){
  width: 70%;
}
nav h1{
  font-size: 26px;
  letter-spacing: 1.2px;
  color: #fff;
  margin-right: 1rem;
}
.info{
  display: flex;
  justify-content: center;
  margin: 2rem 1rem 2rem  0;
}
.info img{
  height: 70px;
  width: 70px;
  border: 1px solid #333;
  background: rgba(255, 254, 254, 0.9);
  border-radius: 50%;
}
.sub-info{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
}
.sub-info h3{
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 5px;
}
.sub-info p{
   font-size: 14px;
   color:rgba(153, 153, 153, 1);
   font-weight: 300;
} 
.icons{
  position: relative;
  color: rgba(170, 170, 170, 0.5);
  font-size: 18px;
  width: 20px;
  margin-right: 1.5rem;
}
.items{
  display: flex;
  font-size: 16px;
  margin: 1rem 0;
  font-weight: 300;
  overflow: hidden;
}
.log-out{
  position: absolute;
  bottom: 5%;
  left: 10%;
  color: rgba(255, 185, 62, 1);
  font-weight: 300;
  cursor: pointer;
}
.log-out .icons{
  color: rgba(255, 185, 62, 1);
}
a {
  text-decoration: none;
  cursor: pointer;
  color: rgba(170, 170, 170, 0.5);
  font-family: 'Poppins', sans-serif;
}
a.active{
  color: #fff;
}
a:hover,
a:active,
a.router-link-active,
.items:hover > .icons,
a.router-link-active .icons{
  color: #fff;
}

</style>


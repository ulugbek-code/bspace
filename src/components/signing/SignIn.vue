<template>
    <div class="sign-in">
        <div class="form-img">
            <img src="../../assets/SignInHat.svg" alt="">
        </div>
        <h3>Log in to your account</h3>
        <form @submit.prevent="signIn" class="form">
            <div :class="{invalid: isUserInvalid}">
                <input @click="toggleError" v-model.trim="userName" type="text" placeholder="UserName">
                <small v-if="isUserInvalid">Field login is required.</small>
            </div>
            <div :class="{invalid: isPasswordInvalid}">
                <input @click="toggleError" v-model.trim="password" type="password" placeholder="Password">
                <small v-if="isPasswordInvalid">Field password is required.</small>
            </div>
            <div v-if="error" class="warning">User {{ userName }} with these credentials doesn't exist.</div>
            <span v-if="isLoad && !error" id="load">&#8634;</span>
            <button class="btn">Sign In</button>
        </form>
        <p>Don't have an account yet? <router-link to="/signUp">Sign Up</router-link></p>
    </div>
    <img class="back" src="../../assets/SignInBG.svg" alt="">
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            userName: '',
            password: '',
            validity: false,
            error: false,
            isLoad: false
        }
    },
    computed:{
        isActiveNav(){
            return this.$store.state.isActive
        },
        isUserInvalid(){
            return this.validity && this.userName == ''
        },
        isPasswordInvalid(){
            return this.validity && this.password == ''
        }
    },
    methods:{
        toggleError(){
            this.validity = false
            this.error = false
            this.isLoad = false
        },
        async signIn(){
            if(this.userName !== '' && this.password !== ''){
                    this.isLoad = true
                    await axios.post(
                "https://bspacedev.azurewebsites.net/api/Users/Login",
                    {},
                    {
                        headers: {  
                                login: this.userName,
                                password: this.password,
                        },
                    }
                ).then((res) => {
                    if(res.data.isValid === true){
                        this.$store.dispatch("signing",res)
                        console.log('sign in')
                    }else{
                        this.error = true
                        return
                    }
                    this.isLoad = false
                })
                .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                });


            
            if(this.isActiveNav){
                this.$router.push('/dashboard')
            }
            }else{
                this.validity = true
            }
            

        }
    },
    
}
</script>

<style scoped>
.sign-in{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  padding-bottom: 1rem;
  z-index: 1;
  background: #fff;
}
.form-img{
    display: flex;
    justify-content: center;
}
.form-img img{
    width: 280px;
    height: 150px;
    margin-bottom: 0.2rem;
}
.sign-in h3{
    text-align: center;
    font-family: "Poppins", "sans-serif";
    margin: 0.9rem 0 0.6rem;
}
.form{
display: flex;
flex-direction: column;
}
.form div{
    position: relative;
}
.warning{
    color: red
}
.form input {
    width: 100%;
    margin: 0.6rem;
    padding: 0.6rem 1.2rem;
    border: 0.5px solid rgba(67, 97, 238, 0.35);
    border-radius: 50px;
    outline: rgba(67, 97, 238, 1);
    color:rgba(85, 85, 85, 1);
    font-family: "Poppins", "sans-serif";
    transition: all 0.4s ease;
}
.form input:hover{
    border: 0.5px solid rgba(67, 97, 238, 1);  
}
.btn{
    width: 100%;
    background: #4361EE;;
    margin: 0.7rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 50px;
    outline: none;
    color: #fff;
    cursor: pointer;
    font-family: "Poppins", "sans-serif";
    border: 1px solid rgba(67, 97, 238, 1);
}
.btn:hover{
    box-sizing: border-box;
    background: #fff;
    color: #4361EE;
}
.btn:active{
    box-shadow: 0 0px 2px #4361EE;
}
.sign-in p{
    margin: 0.7rem 0 0.3rem;
    font-size: 0.9rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
}
.sign-in p a{
    color: #4361EE;
    text-decoration: none;
}
.back{
    position: absolute;
    bottom: 0;
    left: 50%;
    max-width: 60%;
    transform: translate(-50%,0);
    z-index: 0;
}
div.invalid input{
    border: 1px solid red;
    margin-bottom: 30px;
}
div.invalid input::placeholder,
div.invalid small{
    color: red;
}
div.invalid small{
    position: absolute;
    bottom: 0;
    left: 25%;
}
#load{
    position: absolute;
    bottom: 10%;
    left: 50%;
    /* font-size: 30px; */
    /* margin:-60px 0 0 -60px; */
    display: inline-block;
    -webkit-animation:spin 1s linear infinite;
    -moz-animation:spin 1s linear infinite;
    animation:spin 1s linear infinite;
    /* background: #4361EE; */
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(-360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }
</style>
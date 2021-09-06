<template>
    <div class="sign-up">
        <div class="form-img">
            <img src="../../assets/signUp2.svg" alt="">
        </div>
        <h3>Set up your account</h3>
        <form @submit.prevent="signUp" class="form">
            <input @click="toggleValidity" v-model.trim="userData.firstName" type="text" placeholder="First name">
            <input @click="toggleValidity" v-model.trim="userData.lastName" type="text" placeholder="Last name">
            <div class="firm_pos">
                <firms-drop-down @click="toggleValidity" :options="getFirms" @sendId="getFirmId($event)"></firms-drop-down>
                <firms-drop-down @click="toggleValidity" :options="position" @sendId="getPositionId($event)" defaultVal="Positions..."></firms-drop-down>
            </div>
            <input @click="toggleValidity" v-model.trim="userData.userName" type="text" placeholder="Username">
            <input @click="toggleValidity" v-model.trim="userData.phone" type="text" placeholder="Telephone">
            <div class="input-field error-field" :class="{ errorClass: isEmailError }">
                <input @click="toggleValidity" @blur="isEmailTouched = true" v-model.trim="userData.email" type="email"  placeholder="Email">
                <small v-if="isEmailError">Email is invalid</small>
            </div>
            <div class="input-field" :class="{ errorClass: isPasswordError }">
                <input @click="toggleValidity" @blur="isPasswordTouched = true" v-model.trim="userData.password" type="password" placeholder="Password">
                <small v-if="isPasswordError">Minimum length for password is 8 and maximum is 12. Password should contain, at least, one numeric character. Password should contain, at least, one capital letter.</small>
            </div>
            <template v-if="!isValid">
                <div class="error-list" v-for="e in errorList" :key="e">
                <p> --{{e}}</p>
                </div>
            </template>  
            <template v-if="isEmpty">
                <h3 id="empty-err">Please fill in all fields to submit the form!</h3>
            </template>  
            <button class="btn">Sign Up</button>
        </form>
        <p>Already member? <router-link to="signIn">Sign In</router-link></p>
    </div>
    <img class="back" src="../../assets/SignUpBG.svg" alt="">
</template>

<script>
import axios from 'axios'
import FirmsDropDown from '../UI/FirmsDropDown.vue'


export default {
    components:{FirmsDropDown},
    data(){
        return {
            isValid: true,
            isEmailTouched: false,
            isPasswordTouched: false,
            isEmpty: false,
            userData: {
                firstName: '',
                lastName: '',
                userName: '',
                firm: '',
                phone: '',
                email: '',
                password: '',
            },
            position: [
                {name: 'Admin', id: 0},
                {name: 'Auditor', id: 1},
                {name: 'Accountant', id: 2},
                {name: 'Accountant Assistant', id: 3},
                {name: 'Financial Officer', id: 4},
            ],
            positionId: '',
            errorList: []
        }
    },
    computed:{
        getFirms(){
            return this.$store.getters['firm/getFirmsData'].map((firm)=>{
                return {
                        name: firm.name,
                        id: firm.id
                    }
                }
            )
        },
        isEmailValid() {
            //eslint-disable-next-line
            return (/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(this.userData.email);
        },
        isPasswordSecure(){
             //eslint-disable-next-line
            return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,12})").test(this.userData.password)
        },
        isPasswordError(){
            return !this.isPasswordSecure && this.isPasswordTouched
        },
        isEmailError() {
        return !this.isEmailValid && this.isEmailTouched;
        },
    },
    methods:{
        toggleValidity(){
            this.isValid = true
            this.isEmpty = false
        },
        getFirmId(val){
            this.userData.firm = val
            console.log(this.userData.firm)
        },
        getPositionId(val){
            this.positionId = val
            console.log(this.positionId)
        },
        async signUp(){
            if(this.isEmailValid && 
            this.isPasswordSecure && 
            this.userData.firstName.length !== 0 && 
            this.userData.lastName.length !== 0 && 
            this.userData.userName.length !== 0 && 
            this.userData.firm.length !== 0 && 
            this.userData.phone.length !== 0 && 
            this.positionId.length !== 0){
                console.log({
                    "firmId": this.userData.firm,
                    "firstName": this.userData.firstName,
                    "lastName": this.userData.lastName,
                    "email": this.userData.email,   
                    "login": this.userData.userName,
                    "password": this.userData.password,
                    "telephone": this.userData.phone,
                    "role": this.positionId
                })
                await axios.post(
            "https://bspacedev.azurewebsites.net/api/Users/Register",
                {
                    "firmId": this.userData.firm,
                    "firstName": this.userData.firstName,
                    "lastName": this.userData.lastName,
                    "email": this.userData.email,
                    "login": this.userData.userName,
                    "password": this.userData.password,
                    "telephone": this.userData.phone,
                    "role": this.positionId
                }
            ).then((res) => {
                this.isValid = true
                if(res.data.isValid){
                    // console.log(res.data.data)
                    // console.log('success')
                    this.$router.push('/signIn')
                }else{
                    this.isValid = false
                    this.errorList = res.data.errors
                    console.log("error")
                }
            })
            .catch((e) => {
                console.log(e)   
            });    
            }else{
                this.isEmpty = true
            }
            // this.firstName = null,
            // this.lastName = null,
            // this.firm = '',
            // this.phone = ''
            // this.positionId = '',
            // this.userName = '',
            // this.email = null,
            // this.password = null
            
        }
    },
    async created(){
        await this.$store.dispatch("firm/getData",true)
    }
}
</script>

<style scoped>
.error{
    margin-left: 400px;
}
.sign-up{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  z-index: 1;
  background: #fff;
  min-width: 35rem;
}
.form-img{
    display: flex;
    justify-content: center;
}
.form-img img{
    width: 280px;
    height: 150px;
}
.sign-up h3{
    text-align: center;
    font-family: "Poppins", "sans-serif";
    margin-bottom: 0.7rem;;
}
.form{
display: flex;
flex-direction: column;
}
.firm_pos{
    display: flex;
    align-items: center;
}
.input-field{
    display: flex;
    flex-direction: column;
    position: relative;
}
.form select, .form input {
    margin: 0.6rem;
    padding: 0.6rem 1.2rem;
    border: 0.5px solid rgba(67, 97, 238, 0.35);
    border-radius: 50px;
    outline: rgba(67, 97, 238, 1);
    color: rgb(119, 113, 113);
    font-family: "Poppins", "sans-serif";
}
.form input:hover, select:hover{
    border: 0.5px solid rgba(67, 97, 238, 1);  
}
select::placeholder, .form input{
    color:rgba(85, 85, 85, 1)
}
.btn{
    background: #4361EE;
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
.sign-up p{
    margin: 0.7rem 0 0.5rem;
    font-size: 0.9rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
}
.sign-up p a{
    text-decoration: none;
    color: #4361EE;
}
.back{
    position: absolute;
    bottom: 0;
    left: 50%;
    max-width: 60%;
    transform: translate(-50%,0);
    z-index: 0;
}
.errorClass input{
    border-color: red !important;
    margin-bottom: 55px;
}
.error-field.errorClass input{
    margin-bottom: 35px;
}
.errorClass small{
    position: absolute;
    top: 50%;
    text-align: center;
}
.error-field.errorClass small{
    width: 100%;
    top: 70%;
}
.error-list p,
small{
    font-size: 13.5px;
    color: red;
}
#empty-err {
    font-size: 16px;
    color: red;
}
</style>
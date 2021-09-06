<template>
    <div id="add-balance">
        <h3>Create Balance</h3>
        <form @submit.prevent="addBalance">
            <div class="first-div">
                <div class="input-container">
                    <label>Year</label>
                    <input v-model="balances.year" type="number" placeholder="Input Year">
                </div>
                <div class="input-container">
                    <label>Period</label>
                    <base-dropdown :options="months" :index="true" :validity="!isValid" @input="showIt($event)" defaultVal="Input Period"></base-dropdown>
                </div>
                <div class="input-container">
                    <label>Description</label>
                    <textarea v-model="balances.desc" placeholder="Input Description" rows="3"></textarea>
                </div>
                <button class="btn">Create</button>
            </div>
            <div class="second-div">
                <div class="input-container">
                    <label>Upload File</label>
                    <div class="dropbox">
                        <input type="file" class="input-file">
                            <fa class="icon" :icon="['fas', 'cloud-upload-alt']" /> 
                    </div>
                </div>
                <div class="for-edit-file">
                    <fa class="icons icon-edit" :icon="['fas', 'edit']" />
                    <fa class="icons icon-trash" :icon="['fas', 'trash']" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import BaseDropdown from '../UI/BaseDropdown.vue'

export default {
    components:{BaseDropdown},
    props:['options','validity','index','defaultVal'],
    data(){
        return{
            isValid: true,
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            balances: {
                year: '',
                period: '',
                desc: '',
                file: null
            }
        }
    },
    methods:{
        showIt(val){
            this.balances.period = val
        },
        addBalance(){
            if(this.balances.year !== '' && this.balances.period !== '' && this.balances.desc !== ''){
                console.log(this.balances)
            }
            this.isValid = false
        }
    }
}
</script>

<style scoped>
#add-balance{
    width: 40%;
    background: rgba(221, 221, 221, 0.3);
    padding: 20px 10px 15px 30px;
    position: relative;
}
form{
    display: flex;
}
/* form label{
    padding-left: 8px;
    background: chartreuse;
} */
.first-div{
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px;
}
.second-div{
    display: flex;
    position: relative;
    margin: 5px 5px 5px 5%;
}
.first-div div{
    width: 48%;
}
.first-div div:nth-child(3){
    margin-top: 10px;
    width: 100%;
}
.for-edit-file{
    width: 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    /* background: rosybrown; */
}
.icons{
    margin-top: 14px;
    color: rgba(170, 170, 170, 1);
    cursor: pointer;
}
.icon-edit:hover{
    color: rgba(67, 97, 238, 0.75);
}
.icon-trash:hover{
    color: rgba(204, 24, 24, 0.75);
}
.input-container{
    display: flex;
    flex-direction: column;
}
.first-div label{
    padding-left: 10px;
}
.input-container input,
.input-container textarea,
.input-container select{
    border-radius: 25px;
    padding: 5px 8px;
    border: 1px solid rgba(221, 221, 221, 1);
    outline: none;
}
.input-container select{
    padding: 3px 8px;
}
.input-container textarea{
    border-radius: 12.5px;
    resize: none;
}
.input-container select{
    cursor: pointer;
}
::placeholder,
select{
    font-family: "Poppins",sans-serif;
    color: rgb(143, 143, 143);
    /* background: chartreuse; */
}
/*-----------  */
.dropbox {
    border: 2px dashed grey; /* the dash box */
    /* outline-offset: -10px; */
    border-radius: 12.5px;
    width: 90px;
    height: 90px;
    background: rgb(255, 255, 255);
    margin-top: 10px;
    padding: 10px 10px;
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0; /* invisible but it's there! */
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0%;
    top: 0%;
    cursor: pointer;
}
.icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: rgb(189, 165, 165);
}
.dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
}
.btn{
    position: absolute;
    bottom: 5%;
    font-family: 'Poppins', sans-serif;
    height: 26px;
    width: 110px;
    padding: 5px 10px;
    color: #fff;
    background: rgba(67, 97, 238, 1);
    border: none;
    border-radius: 25px;
    outline: none;
    cursor: pointer;
    font-size: 11px;
}
</style>
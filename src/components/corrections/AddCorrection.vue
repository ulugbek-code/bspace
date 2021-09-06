<template>
    <div id="add-correction">
        <h3>Create Correction</h3>
        <form @submit.prevent="addCorr">
            <div class="input-wrapper">
                <label>Sub Account</label>
                <input type="text" placeholder="Input Sub Account">
            </div>
            <div class="input-wrapper">
                <label>Period</label>
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                </select>
            </div>
            <div class="input-wrapper">
                <label>Amount</label>
                <input type="text" placeholder="Input Sub Account">
            </div>
            <div class="input-wrapper">
                <label>Description</label>
                <textarea rows="3" placeholder="Input Description"></textarea>
            </div>
            <div class="input-wrapper">
                <label>Debit/Credit</label>
                <select>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                </select>
            </div>
            <button class="btn">Save</button>
        </form>
    </div>
</template>

<script>

export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped>
#add-correction{
    height: 100%;
    width: 40%;
    background: rgba(221, 221, 221, 0.3);
    padding: 15px 15px 15px 10px;
}
form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
}
.input-wrapper *{
     font-family: "Poppins";
}
.input-wrapper{
    display: flex;
    flex-direction: column;
    width: 48%;
    margin: 5px 2px;
    font-size: 13px;
}
.input-wrapper label{
    padding-left: 10px;
    font-weight: 500;
}
.input-wrapper input,
.input-wrapper textarea,
.input-wrapper select{
    border-radius: 20px;
    padding: 2px 10px;
    border: 1px solid rgba(221, 221, 221, 1);
    outline: none;
}
input::placeholder,
textarea::placeholder{
    font-size: 12px;
    color: rgba(145, 137, 137,0.7);
}
.input-wrapper textarea{
    resize: none;
}
.input-wrapper:nth-child(5){
    margin-top: -34px;
}
.btn{
    position: absolute;
    right: 0;
    bottom:-10%;
    font-family: 'Poppins', sans-serif;
    height: 24px;
    width: 90px;
    color: #fff;
    background: rgba(67, 97, 238, 1);
    border: none;
    border-radius: 25px;
    outline: none;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s ease;
}
.btn:hover{
    background: #fff;
    color: rgba(67, 97, 238, 1);
    border: 1px solid rgba(67, 97, 238, 1);
}
.btn:active{
    background: rgba(67, 97, 238, 1);
    color: #fff;
}
</style>
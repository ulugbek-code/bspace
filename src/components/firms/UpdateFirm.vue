<template>
  <div class="add-form">
    <h3>Update selected item</h3>
    <form @submit.prevent>
      <div class="form-add">
        <div class="input-container">
          <label>Name</label>
          <input v-model.trim="name" type="text" placeholder="Input Name" />
        </div>
        <div class="input-container">
          <label>Established Year</label>
          <input v-model="year" type="number" placeholder="Input Year" />
        </div>
        <div class="input-container">
          <label>Address</label>
          <input v-model="address" type="text" placeholder="Input Address" />
        </div>
        <div class="input-container">
          <label>Bank Name</label>
          <input v-model="bankName" type="text" placeholder="Input Bank Name" />
        </div>
        <div class="input-container">
          <label>Parent Firm</label>
          <firms-drop-down
            :options="getParentFirms"
            @sendId="getId($event)"
            firm="true"
            :update="name"
          ></firms-drop-down>
        </div>
        <div class="input-container">
          <label>Telephone</label>
          <input v-model="phone" type="tel" placeholder="Input Telephone" />
        </div>
        <div class="input-container">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Input Email" />
        </div>
        <div class="input-container">
          <label>Bank Account</label>
          <input
            v-model="bankAccount"
            type="text"
            placeholder="Input Bank Account"
          />
        </div>
        <div class="input-container">
          <label>INN Number</label>
          <input v-model="inn" type="number" placeholder="Input INN Number" />
        </div>
        <div class="input-container">
          <label>Director</label>
          <input
            v-model="director"
            type="text"
            placeholder="Input Diresctor's name"
          />
        </div>
      </div>
      <div class="sub-container">
        <div class="input-container">
          <label>Logotype</label>
          <input
            type="file"
            @change="previewFiles"
            ref="logo"
            style="display: none"
          />
          <button id="my-file" @click.stop="$refs.logo.click()">
            Upload File
            <fa class="icons" :icon="['fas', 'upload']" />
            <!-- this.$refs.logo.value -->
          </button>
        </div>
        <div class="btn-add">
          <button type="button" @click="cancelUpdate">Cancel</button>
          <button type="button" @click="updateFirm">Update</button>
        </div>
      </div>
    </form>
    <!-- <p>{{getParentFirms}}</p> -->
    <!-- <p>{{editedData}}</p> -->
  </div>
</template>

<script>
import axios from 'axios';
import FirmsDropDown from '../UI/FirmsDropDown.vue';

export default {
  props: ['editedData', 'firms'],
  components: { FirmsDropDown },
  data() {
    return {
      id: this.editedData.id,
      name: this.editedData.name,
      year: this.editedData.establishedYear,
      address: this.editedData.address,
      bankName: this.editedData.bankName,
      firmId: this.editedData.firmId,
      phone: this.editedData.telephone,
      email: this.editedData.mail,
      bankAccount: this.editedData.bankAccount,
      inn: this.editedData.innNumber,
      director: this.editedData.director,
      logo: this.editedData.logo
    };
  },
  computed: {
    getParentFirms() {
      return this.firms.filter(f => {
        return f.name !== this.editedData.name;
      });
    }
  },
  methods: {
    getId(val) {
      this.firmId = val;
    },
    previewFiles(event) {
      this.logo = event.target.files[0].name;
    },
    updateFirm() {
      // console.log(
      //     {
      //         "id": this.id,
      //         "parentCompanyId": this.editedData.parentCompanyId,
      //         "name": this.name,
      //         "establishedYear": this.year,
      //         "telephone": this.phone,
      //         "mail": this.email,
      //         "address": this.address,
      //         "bankAccount": this.bankAccount,
      //         "innNumber": this.inn,
      //         "bankName": this.bankName,
      //         "logo": this.logo,
      //         "director": this.director
      //     }
      // )

      axios
        .put(
          'https://bspacedev.azurewebsites.net/api/Firms/Update',
          {
            id: this.id,
            parentCompanyId: this.editedData.parentCompanyId,
            name: this.name,
            establishedYear: this.year,
            telephone: this.phone,
            mail: this.email,
            address: this.address,
            bankAccount: this.bankAccount,
            innNumber: this.inn,
            bankName: this.bankName,
            logo: this.logo,
            director: this.director
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          }
        )
        .then(() => {
          // console.log(res.data.data)

          this.$store.dispatch('firm/getData');
        })
        .catch(err => {
          console.log(err);
        });

      // this.$emit('updating', false);
      this.cancelUpdate();
    },
    cancelUpdate() {
      this.$emit('updating', false);
    }
  },
  watch: {
    editedData(val) {
      this.name = val.name;
      this.year = val.establishedYear;
      this.address = val.address;
      this.bankName = val.bankName;
      this.firmId = val.firmId;
      this.phone = val.telephone;
      this.email = val.mail;
      this.bankAccount = val.bankAccount;
      this.inn = val.innNumber;
      this.director = val.director;
      this.logo = val.logo;
    }
  }
};
</script>

<style scoped>
.add-form {
  padding: 10px 0 0 20px;
  background: rgba(221, 221, 221, 0.3);
}
.add-form h3 {
  font-size: 18px;
  color: rgba(67, 97, 238, 1);
  margin: 0px 5px 7px;
}
.form-add {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 98%;
}
.input-container {
  flex: 0 0 19%;
  display: flex;
  flex-direction: column;
  margin: 5px;
}
.sub-container {
  width: 97%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.input-container label,
.input-container-2 label {
  font-size: 13px;
  font-family: 'Poppins', sans-serif;
  color: rgba(68, 68, 68, 1);
  padding-left: 12px;
  margin-bottom: 4px;
  font-weight: 600;
}
.input-container input {
  height: 26px;
  border: 1px solid rgb(216, 214, 214);
  border-radius: 25px;
  outline: none;
  padding: 5px 12px;
  color: rgba(68, 68, 68, 1);
  background: transparent;
  font-family: 'Poppins', sans-serif;
}
.input-container input::placeholder {
  font-size: 12px;
  color: rgba(68, 68, 68, 0.4);
}
.add-form form {
  display: flex;
  flex-direction: column;
}
.btn-add {
  align-self: flex-end;
}
#my-file,
.btn-add button {
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
.btn-add button:first-child {
  margin-right: 10px;
}
.btn-add button:active,
#my-file:active {
  background: #fff;
  color: rgba(67, 97, 238, 1) !important;
}

#my-file:hover,
button:hover {
  color: rgba(255, 255, 255, 0.8);
}
#my-file .icons {
  margin-left: 3px;
}
</style>

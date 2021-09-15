<template>
  <div v-if="!isEdit" class="add-form">
    <h3>Add Firm</h3>
    <form @submit.prevent="addFirm">
      <div class="form-add">
        <div
          :class="{ invalid: validity === 'error' && name.length === 0 }"
          class="input-container"
        >
          <label>Name</label>
          <input
            @click="toggleValidity"
            v-model.trim="name"
            type="text"
            placeholder="Input Name"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && year.length === 0 }"
          class="input-container"
        >
          <label>Established Year</label>
          <input
            @click="toggleValidity"
            v-model="year"
            type="number"
            placeholder="Input Year"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && address.length === 0 }"
          class="input-container"
        >
          <label>Address</label>
          <input
            @click="toggleValidity"
            v-model="address"
            type="text"
            placeholder="Input Address"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && bankName.length === 0 }"
          class="input-container"
        >
          <label>Bank Name</label>
          <input
            @click="toggleValidity"
            v-model="bankName"
            type="text"
            placeholder="Input Bank Name"
          />
        </div>
        <div class="input-container">
          <label>Parent Firm</label>
          <firms-drop-down
            @click="toggleValidity"
            :options="getFirms"
            @sendId="getFirmId($event)"
            firm="true"
            :isSub="isSub"
            defaultVal="Positions..."
          >
          </firms-drop-down>
        </div>
        <div
          :class="{ invalid: validity === 'error' && phone.length === 0 }"
          class="input-container"
        >
          <label>Telephone</label>
          <input
            @click="toggleValidity"
            v-model="phone"
            type="tel"
            placeholder="Input Telephone"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && email.length === 0 }"
          class="input-container"
        >
          <label>Email</label>
          <input
            @click="toggleValidity"
            v-model="email"
            type="email"
            placeholder="Input Email"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && bankAccount.length === 0 }"
          class="input-container"
        >
          <label>Bank Account</label>
          <input
            v-model="bankAccount"
            type="text"
            placeholder="Input Bank Account"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && inn.length === 0 }"
          class="input-container"
        >
          <label>INN Number</label>
          <input
            @click="toggleValidity"
            v-model="inn"
            type="number"
            placeholder="Input INN Number"
          />
        </div>
        <div
          :class="{ invalid: validity === 'error' && director.length === 0 }"
          class="input-container"
        >
          <label>Director</label>
          <input
            @click="toggleValidity"
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
            class="file-input"
          />
          {{ logo.name }}
          <button @click.prevent="" id="my-file">
            Upload File
            <fa class="icons" :icon="['fas', 'upload']" />
            <!-- this.$refs.logo.value -->
          </button>
        </div>
        <div class="btn-add">
          <span v-if="isGoing">Loading...</span>
          <button @click.prevent="cancel">Cancel</button>
          <button>Add</button>
        </div>
      </div>
    </form>
  </div>
  <update-firm
    v-else
    @updating="upp($event)"
    :editedData="editedData"
    :firms="getFirms"
  ></update-firm>
</template>

<script>
import axios from 'axios';
import UpdateFirm from './UpdateFirm.vue';
import FirmsDropDown from '../UI/FirmsDropDown.vue';

export default {
  props: ['editedData', 'isEdit'],
  components: {
    'update-firm': UpdateFirm,
    'firms-drop-down': FirmsDropDown
  },
  data() {
    return {
      isGoing: false,
      isSub: false,
      validity: 'pending',
      isValid: false,
      name: '',
      year: '',
      address: '',
      bankName: '',
      parentFirmId: null,
      phone: '',
      email: '',
      bankAccount: '',
      inn: '',
      director: '',
      logo: ''
    };
  },
  computed: {
    getFirms() {
      return this.$store.getters['firm/getFirmsData'].map(firm => {
        return {
          name: firm.name,
          id: firm.id
        };
      });
    }
  },
  methods: {
    getFirmId(val) {
      this.parentFirmId = val;
    },
    toggleValidity() {
      this.validity = 'success';
    },
    previewFiles() {
      this.logo = this.$refs.logo.files[0];
    },
    upp(val) {
      this.$emit('upping', val);
    },
    async addFirm() {
      if (
        this.name.length !== 0 &&
        this.year.length !== 0 &&
        this.address.length !== 0 &&
        this.bankName.length !== 0 &&
        this.phone.length !== 0 &&
        this.email.length !== 0 &&
        this.bankAccount.length !== 0 &&
        this.inn.length !== 0 &&
        this.director.length !== 0
      ) {
        this.isGoing = true;
        await axios
          .post(
            'https://bspacedev.azurewebsites.net/api/Firms/Add',
            {
              parentCompanyId: this.parentFirmId,
              name: this.name.trim(),
              establishedYear: this.year.trim(),
              telephone: this.phone.trim(),
              mail: this.email.trim(),
              address: this.address.trim(),
              bankAccount: this.bankAccount.trim(),
              innNumber: this.inn.trim(),
              bankName: this.bankName.trim(),
              logo: this.logo,
              director: this.director.trim()
            },
            {
              headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .catch(err => {
            console.log(err);
          });
        this.$store.dispatch('firm/getData');

        // this.validity = 'success';
        // (this.name = ''),
        //   (this.year = ''),
        //   (this.phone = ''),
        //   (this.email = ''),
        //   (this.address = ''),
        //   (this.bankAccount = ''),
        //   (this.bankName = ''),
        //   (this.firmId = '');
        // (this.inn = ''), (this.logo = null), (this.director = '');
        // this.isSubmitted = true;
        this.isGoing = false;
        this.cancel();
      } else {
        this.validity = 'error';
      }
    },
    cancel() {
      (this.name = ''),
        (this.year = ''),
        (this.phone = ''),
        (this.email = ''),
        (this.address = ''),
        (this.bankAccount = ''),
        (this.bankName = ''),
        (this.firmId = '');
      (this.inn = ''),
        (this.logo = null),
        (this.director = ''),
        (this.parentFirmId = '');
      this.isSub = true;
      this.logo = '';
      this.$refs['logo'].value = '';
      this.toggleValidity();
    }
  },
  async created() {
    await this.$store.dispatch('firm/getData', true);
  }
  // watch: {
  //   isSubmitted() {
  //     if (this.isSubmitted === true) {
  //       // setTimeout(() => {
  //         this.isSubmitted = false;
  //         console.log('hello');
  //       // }, 500);
  //     }
  //   }
  // }
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
  position: relative;
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
  width: 100px;
  /* padding: 5px 10px; */
  color: #fff;
  background: rgba(67, 97, 238, 1);
  border: none;
  border-radius: 25px;
  outline: none;
  cursor: pointer !important;
  font-size: 11px;
}
.btn-add button:active,
#my-file:active {
  background: #fff;
  color: rgba(67, 97, 238, 1) !important;
}
.btn-add button:nth-child(2) {
  margin-left: 10px;
}
#my-file:hover,
button:hover {
  color: rgba(255, 255, 255, 0.8);
}
#my-file .icons {
  margin-left: 3px;
}
.invalid input {
  border: 1.5px solid rgb(255, 40, 40);
}
.invalid label {
  color: rgb(255, 40, 40);
}
.invalid input::placeholder {
  color: rgba(255, 40, 40, 0.7);
}
.file-input {
  opacity: 0;
  /* height: 200px; */
  width: 110px;
  position: absolute;
  left: -5%;
  top: 45%;
}
</style>

<template>
  <div id="add-balance">
    <h3>Create Balance</h3>
    <form @submit.prevent="addBalance">
      <div class="first-div">
        <div
          :class="!isValid && balances.year === '' ? 'error' : ''"
          @click="isValid = true"
          class="input-container"
        >
          <label>Year</label>
          <input
            v-model="balances.year"
            type="number"
            placeholder="Input Year"
          />
        </div>
        <div class="input-container" @click="isValid = true">
          <label>Period</label>
          <fa class="icons" :icon="['fas', 'calendar-alt']" />
          <base-dropdown
            :options="months"
            :index="true"
            :isSubmitted="isSubmitted"
            :validity="!isValid"
            @input="showIt($event)"
            defaultVal="Period"
          ></base-dropdown>
        </div>
        <div
          :class="!isValid && balances.desc === '' ? 'error' : ''"
          class="input-container"
          @click="isValid = true"
        >
          <label>Description</label>
          <textarea
            v-model="balances.desc"
            placeholder="Input Description"
            rows="3"
          ></textarea>
        </div>
        <button class="btn">Create</button>
      </div>
      <div class="second-div">
        <div class="input-container">
          <label>Upload File</label>

          <div :class="fileType" class="dropbox">
            <input
              class="input-file"
              type="file"
              ref="file"
              @change="handleFileUpload"
            />
            <span v-if="balances.file" id="file-name">{{
              balances.file.name
            }}</span>
            <fa class="icon" :icon="['fas', 'cloud-upload-alt']" />
          </div>
        </div>
        <div class="for-edit-file">
          <fa
            @click="removeFile"
            class="icons icon-trash"
            :icon="['fas', 'trash']"
          />
        </div>
        <div id="response" v-if="response.length > 0">
          <!-- {{ response[0].split(/\s*;\s*/) }} -->
          <!-- {{ newResponse }} -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import BaseDropdown from '../UI/BaseDropdown.vue';

export default {
  components: { BaseDropdown },
  props: ['options', 'validity', 'index', 'defaultVal'],
  emits: ['errors'],
  data() {
    return {
      fileType: '',
      response: [],
      isValid: true,
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      balances: {
        year: '',
        period: '',
        desc: '',
        file: ''
      },
      userInfo: {},
      isSubmitted: false
    };
  },
  // computed: {
  //   newResponse() {
  //     if (this.response.length !== 0) {
  //       return this.response[0].split(/\s*;\s*/);
  //     }
  //   }
  // },
  methods: {
    removeFile() {
      this.balances.file = '';
      this.$refs['file'].value = '';
      this.fileType = '';
    },
    showIt(val) {
      this.balances.period = val;
    },
    addBalance() {
      if (
        this.balances.year !== '' &&
        this.balances.period !== '' &&
        this.balances.desc !== ''
      ) {
        let formData = new FormData();

        formData.append('FirmId', localStorage.getItem('firmId'));
        formData.append('UserId', this.userInfo.id);
        formData.append('Period', this.balances.period.toString());
        formData.append('Year', Number(this.balances.year));
        formData.append('Description', this.balances.desc);
        formData.append('File', this.balances.file);
        axios
          .post(
            'https://bspacedev.azurewebsites.net/api/BalanceFiles/Add',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .then(res => {
            if (!res.data.isValid) {
              this.response = res.data.errors;
              //console.log('successs', this.response[0]); //.split('\r\n').split(/\s*;\s*/)
              this.$emit(
                'errors',
                this.response[0]
                  .replace(' :', ';')
                  .replace(/\r\n/g, '')
                  .split(';')
              );
            } else {
              console.log('success');
            }
          })
          .catch(() => console.log('error')); //console.log(res)

        this.$store.dispatch('balance/getAllBalances');

        this.balances.year = '';
        this.balances.desc = '';
        this.balances.period = '';
        this.removeFile();
        this.isSubmitted = true;
      } else {
        this.isValid = false;
      }
    },
    handleFileUpload() {
      this.balances.file = this.$refs.file.files[0];
      this.fileType = this.balances.file.name
        .substr(this.balances.file.name.lastIndexOf('.') + 1)
        .toLowerCase();
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userData'));
  },
  watch: {
    isSubmitted() {
      if (this.isSubmitted === true) {
        setTimeout(() => (this.isSubmitted = false), 1000);
      }
    }
  }
};
</script>

<style scoped>
#file-name {
  position: absolute;
  bottom: -30%;
  left: 0%;
  font-size: 14px;
}
#add-balance {
  width: 40%;
  background: rgba(221, 221, 221, 0.3);
  padding: 20px 10px 15px 30px;
  position: relative;
}
form {
  display: flex;
}
/* form label{
    padding-left: 8px;
    background: chartreuse;
} */
.first-div {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5px;
}
.input-container .icons {
  font-size: 15px;
  position: absolute;
  top: 30%;
  left: 4%;
  z-index: 10;
  color: rgb(211, 213, 213);
}
.second-div {
  display: flex;
  position: relative;
  margin: 5px 5px 5px 5%;
}
.first-div div {
  width: 48%;
}
.first-div div:nth-child(3) {
  margin-top: 10px;
  width: 100%;
}
.for-edit-file {
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  /* background: rosybrown; */
}
.icons {
  margin-top: 14px;
  color: rgba(170, 170, 170, 1);
  cursor: pointer;
}
.icon-edit:hover {
  color: rgba(67, 97, 238, 0.75);
}
.icon-trash:hover {
  color: rgba(204, 24, 24, 0.75);
}
.input-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
.first-div label {
  padding-left: 10px;
}
.input-container input,
.input-container textarea,
.input-container select {
  border-radius: 25px;
  padding: 5px 8px;
  border: 1px solid rgba(221, 221, 221, 1);
  outline: none;
}
.input-container select {
  padding: 3px 8px;
}
.input-container textarea {
  border-radius: 12.5px;
  resize: none;
}
.input-container select {
  cursor: pointer;
}
::placeholder,
select {
  font-family: 'Poppins', sans-serif;
  color: rgb(143, 143, 143);
  /* background: chartreuse; */
}
/*-----------  */
.dropbox {
  border: 2px dashed grey; /* the dash box */
  border-radius: 12.5px;
  width: 90px;
  height: 90px;
  margin-top: 10px;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
}
.dropbox.jpg,
.dropbox.jpeg,
.dropbox.png,
.dropbox.svg {
  background: center / contain no-repeat url('../../assets/img.png');
}
.dropbox.docx {
  background: no-repeat url('../../assets/word.png') center / 80%;
}
.dropbox.pdf {
  background: center / contain no-repeat url('../../assets/pdf.png');
}
.dropbox.xls,
.dropbox.xlsx {
  background: center / contain no-repeat url('../../assets/excel.png');
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  cursor: pointer;
  z-index: 1;
}
.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(189, 165, 165);
  pointer-events: none;
}
.dropbox.xls .icon,
.dropbox.xlsx .icon,
.dropbox.docx .icon,
.dropbox.png .icon,
.dropbox.jpg .icon,
.dropbox.jpeg .icon,
.dropbox.svg .icon,
.dropbox.pdf .icon {
  color: transparent;
}
.btn {
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
.error input,
.error textarea {
  border: 1px solid red;
}
.error input::placeholder,
.error textarea::placeholder {
  color: red;
}
</style>

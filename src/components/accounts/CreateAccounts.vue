<template>
  <base-dialog
    v-if="isAddAcc"
    title="Add Account"
    @close="closeAccDialog"
    @closeDD="closeDD"
  >
    <template #default>
      <div
        :class="{ invalid: !isValid && accData.accountCode.length === 0 }"
        class="input-container"
      >
        <label>Code</label>
        <input
          @click.stop="toggleError"
          v-model="accData.accountCode"
          type="text"
          placeholder="Input Code"
        />
      </div>
      <div
        :class="{ invalid: !isValid && accData.accountName.length === 0 }"
        class="input-container"
      >
        <label>Name</label>
        <input
          @click.stop="toggleError"
          v-model="accData.accountName"
          type="text"
          placeholder="Input Name"
        />
      </div>
      <div
        @click.stop="toggleError"
        :class="{ invalid: !isValid && accData.accountType.length === 0 }"
        class="input-container"
      >
        <label @click="closeDD">Type</label>
        <base-dropdown
          :options="['Active', 'Passive']"
          :isTouched="isTouched"
          active="true"
          :validity="!isValid"
          @input="typeSet($event)"
          @changeDD="changeTouched($event)"
          defaultVal="Input Type"
        ></base-dropdown>
      </div>
      <div
        @click.stop="toggleError"
        :class="{ invalid: !isValid && !ifrsCategory }"
        class="input-container"
      >
        <label @click="closeDD">IFRS Category</label>
        <base-dropdown
          :options="ifrsCategories"
          add="true"
          :isTouched="isTouched"
          :validity="isValid"
          withId="true"
          @sendId="ifrsSet($event)"
          @changeDD="changeTouched($event)"
          defaultVal="Choose Category"
        ></base-dropdown>
      </div>
      <div
        @click.stop="toggleError"
        :class="{ invalid: !isValid && accountCategories.length === 0 }"
        class="input-container"
      >
        <label @click="closeDD">Account Category</label>
        <base-dropdown
          :options="categories"
          :isTouched="isTouched"
          :validity="isValid"
          withId="true"
          @multiSelected="accCatSet($event)"
          @changeDD="changeTouched($event)"
          multiselect="true"
          defaultVal="Choose Category"
        ></base-dropdown>
      </div>
      <div class="input-container">
        <input type="checkbox" v-model="hasSubAcc" />
        <label>Is Sub Account?</label>
      </div>
      <div
        @click.stop="toggleError"
        v-if="hasSubAcc"
        :class="{ invalid: !isValid && parentAccountId.length === 0 }"
        class="input-container"
      >
        <label @click="closeDD">Parent Account</label>
        <base-dropdown
          :options="parentAcc"
          :isTouched="isTouched"
          :validity="isValid"
          withId="true"
          @sendId="parentAccSet($event)"
          @changeDD="changeTouched($event)"
          defaultVal="Parent Accounts"
        ></base-dropdown>
      </div>
    </template>
    <template #actions>
      <button @click.stop="addAccount" class="btn">Create</button>
    </template>
  </base-dialog>
  <!-- edit account -->
  <base-dialog
    v-if="isEditAcc"
    title="Edit Account"
    @close="closeEditDialog"
    @closeDD="closeDD"
  >
    <template #default>
      <div
        :class="{
          invalidEdit: !isEditValid && editData.accData.accountCode.length == 0
        }"
        class="input-container"
      >
        <label>Code</label>
        <input
          @click="toggleEditError"
          v-model="editData.accData.accountCode"
          type="text"
          placeholder="Input Code"
        />
      </div>
      <div
        :class="{
          invalidEdit: !isEditValid && editData.accData.accountName.length == 0
        }"
        class="input-container"
      >
        <label>Name</label>
        <input
          @click="toggleEditError"
          v-model="editData.accData.accountName"
          type="text"
          placeholder="Input Name"
        />
      </div>
      <div
        @click.stop="toggleEditError"
        :class="{
          invalidEdit: !isEditValid && editData.accData.accountType.length === 0
        }"
        class="input-container"
      >
        <label @click="closeDD">Type</label>
        <base-dropdown
          :options="['Active', 'Passive']"
          :isTouched="isTouched"
          :validity="isEditValid"
          @input="typeEditSet($event)"
          @changeDD="changeTouched($event)"
          :defaultVal="editData.accData.accountType"
        ></base-dropdown>
      </div>
      <div
        @click.stop="toggleEditError"
        :class="{ invalidEdit: !isEditValid && !editData.ifrsCategory }"
        class="input-container"
      >
        <label @click="closeDD">IFRS Category</label>
        <base-dropdown
          :options="ifrsCategories"
          :isTouched="isTouched"
          :validity="isEditValid"
          withId="ifrs"
          @sendId="ifrsEditSet($event)"
          @changeDD="changeTouched($event)"
          :defaultVal="
            editingData.ifrsCategories[0].code +
              ', ' +
              editingData.ifrsCategories[0].name
          "
        ></base-dropdown>
      </div>
      <div
        @click.stop="toggleEditError"
        :class="{
          invalidEdit: !isEditValid && editData.accountCategories.length === 0
        }"
        class="input-container"
      >
        <label @click="closeDD">Account Category</label>
        <multi-select
          :options="categories"
          :isTouched="isTouched"
          :validity="isEditValid"
          @multiEditSelected="accEditCatSet($event)"
          @changeDD="changeTouched($event)"
          @removing="removeSpan($event)"
          :defaultVal="
            editData.accountCategories.length > 1
              ? [editData.accountCategories[0], editData.accountCategories[1]]
              : [editData.accountCategories[0]]
          "
        >
        </multi-select>
      </div>
      <div class="input-container">
        <input type="checkbox" disabled v-model="editData.hasSubAcc" />
        <label>Is Sub Account?</label>
      </div>
      <div
        @click.stop="toggleEditError"
        v-if="editData.hasSubAcc"
        class="input-container"
      >
        <label @click="closeDD">Parent Account</label>
        <base-dropdown
          :options="parentAcc"
          :isTouched="isTouched"
          :validity="editData.parentAccountId && isEditValid"
          withId="true"
          @sendId="parentEditAccSet($event)"
          @changeDD="changeTouched($event)"
          :defaultVal="
            getFinalParentId[0].code + ', ' + getFinalParentId[0].name
          "
        ></base-dropdown>
      </div>
    </template>
    <template #actions>
      <button @click="editAccount" class="btn">Save</button>
    </template>
  </base-dialog>
  <!-- add ifrs -->
  <base-dialog v-if="isIFRS" title="Add IFRS" @close="closeIFRSDialog">
    <template #default>
      <div
        @click.stop="toggleIFRSerror"
        :class="{ invalid: ifrsValid && ifrsData.ifrsCode === '' }"
        class="input-container"
      >
        <label>Code</label>
        <input
          v-model="ifrsData.ifrsCode"
          type="text"
          placeholder="Input Code"
        />
      </div>
      <div
        @click.stop="toggleIFRSerror"
        :class="{ invalid: ifrsValid && ifrsData.ifrsName === '' }"
        class="input-container"
      >
        <label>Name</label>
        <input
          v-model="ifrsData.ifrsName"
          type="text"
          placeholder="Input Name"
        />
      </div>
      <div
        @click.stop="toggleIFRSerror"
        :class="{ invalid: ifrsValid && ifrsData.ifrsTypes.length === 0 }"
        class="input-container"
      >
        <label>Types</label>
        <base-dropdown
          :types="types"
          @multiSelected="getifrsTypes($event)"
          :validity="ifrsValid"
          multiselect="true"
          defaultVal="Choose Category"
        ></base-dropdown>
      </div>
    </template>
    <template #actions>
      <button @click="addIFRS" class="btn">Create</button>
    </template>
  </base-dialog>
  <div class="container">
    <div class="title_search">
      <h2>Chart of Accounts</h2>
      <div @click="toggleSearchBox" class="search-box">
        <fa class="search-icon" :icon="['fas', 'search']" />
        <input
          v-model="search"
          @input="$emit('searching', search)"
          :class="[isSearchFocused ? 'active' : '']"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
    <!-- <p v-for="p in ifrsCategories" :key="p">{{ p.name }}</p> -->
    <div class="accounts-btns">
      <div class="download">
        <fa class="search-icon" :icon="['fas', 'download']" />
      </div>
      <button @click="addAcc">Add Account</button>
      <button @click="addifrs">Add IFRS</button>
      <button @click="addMany">Add Many</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BaseDialog from '../UI/BaseDialog.vue';
import BaseDropdown from '../UI/BaseDropdown.vue';
import MultiSelect from '../UI/MultiSelect.vue';
// import { mapGetters } from 'vuex';

export default {
  components: {
    BaseDialog,
    BaseDropdown,
    MultiSelect
  },
  props: [
    'categories',
    // 'ifrs',
    'types',
    'parentAcc',
    'editingData',
    'active',
    'add',
    'validity'
  ],
  emits: ['searching'],
  data() {
    return {
      ifrsCategories: [],
      ifrsValid: false,
      isTouched: false,
      isSearchFocused: false,
      search: '',
      isValid: true,
      isEditValid: true,
      isAddAcc: false,
      isEditAcc: false,
      isIFRS: false,
      hasSubAcc: false,
      accData: {
        accountCode: '',
        accountName: '',
        accountType: ''
      },
      ifrsCategory: '',
      accountCategories: [],
      parentAccountId: '',
      editData: {
        hasSubAcc: false,
        accData: {
          accountCode: '',
          accountName: '',
          accountType: ''
        },
        ifrsCategory: [],
        accountCategories: [],
        parentAccountId: '',
        finalParentId: ''
      },
      ifrsData: {
        ifrsCode: '',
        ifrsName: '',
        ifrsTypes: []
      }
    };
  },
  computed: {
    getFirmId() {
      return localStorage.getItem('firmId');
    },
    getFinalParentId() {
      return this.parentAcc.filter(p => p.id === this.editData.parentAccountId);
    },
    getIfrsCategoriesList() {
      return this.$store.getters['account/getIfrs'];
    }
    // ...mapGetters('account', ['getIfrs'])
  },
  methods: {
    async setup() {
      // setup for ifrs getting all ifrs
      await this.$store.dispatch('account/getIfrs');
      this.ifrsCategories = this.getIfrsCategoriesList.map(i => {
        // console.log('as');
        return {
          id: i.id,
          name: i.name,
          code: i.code
        };
      });
    },
    toggleIFRSerror() {
      this.ifrsValid = false;
    },
    closeDD() {
      this.isTouched = false;
    },
    changeTouched(val) {
      this.isTouched = val;
    },
    // removeSpan(val) {
    //   if (this.editData) {
    //     console.log(val);
    //     console.log(this.editData.accountCategories.splice(val, 1));
    //   }
    // },
    toggleError() {
      this.isValid = true;
    },
    toggleEditError() {
      this.isEditValid = true;
    },
    toggleSearchBox() {
      this.isSearchFocused = !this.isSearchFocused;
    },
    closeAccDialog() {
      this.accData.accountName = '';
      this.accData.accountCode = '';
      this.accData.accountType = '';
      // this.accountCategories = []
      // this.ifrsCategory = null
      this.hasSubAcc = false;

      this.toggleError();
      this.isAddAcc = false;
    },
    closeEditDialog() {
      this.isEditAcc = false;
    },
    closeIFRSDialog() {
      this.isIFRS = false;
    },
    addAcc() {
      this.isAddAcc = true;
    },
    addifrs() {
      this.isIFRS = true;
    },
    addMany() {
      axios
        .post(
          'https://bspacedev.azurewebsites.net/api/Accounts/AddMany',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          }
        )
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
        });
    },
    addIFRS() {
      if (
        this.ifrsData.ifrsCode !== '' &&
        this.ifrsData.ifrsName !== '' &&
        this.ifrsData.ifrsTypes.length > 0
      ) {
        // console.log(this.ifrsData);
        axios
          .post(
            'https://bspacedev.azurewebsites.net/api/IfrsCategories/Add',
            {
              name: this.ifrsData.ifrsName,
              types: this.ifrsData.ifrsTypes,
              code: this.ifrsData.ifrsCode
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .catch(err => {
            console.log(err);
          });

        setTimeout(this.setup, 500);

        this.closeIFRSDialog();
        // this.getIfrsCategoriesList();
        // location.reload();
      } else {
        this.ifrsValid = true;
      }
    },
    typeSet(val) {
      this.accData.accountType = val;
      val = null;
    },
    typeEditSet(val) {
      this.editData.accData.accountType = val;

      // console.log(this.editData.accData.accountType)
    },
    ifrsSet(val) {
      this.ifrsCategory = val;
    },
    ifrsEditSet(val) {
      // console.log(val)
      this.editData.ifrsCategory.push(val);
      // console.log(this.editData.ifrsCategory)
    },
    accCatSet(val) {
      this.accountCategories = val.map(v => v.id);
    },
    accEditCatSet(val) {
      // console.log(val)
      this.editData.accountCategories = val;
      // console.log(this.editData.accountCategories.map((ac)=>ac.id))
    },
    getifrsTypes(val) {
      this.ifrsData.ifrsTypes = val;
    },
    parentAccSet(val) {
      // console.log(val)
      this.parentAccountId = val;
    },
    parentEditAccSet(val) {
      // console.log(val)
      this.editData.parentAccountId = val;
    },
    editAccount() {
      if (
        this.editData.accData.accountType.length !== 0 &&
        this.editData.accData.accountName.length !== 0 &&
        this.editData.accData.accountCode.length !== 0 &&
        this.editData.accountCategories.length !== 0 &&
        this.editData.ifrsCategory.length !== 0
      ) {
        // console.log({
        //     id: this.editingData.id,
        //     firmId: this.editingData.firmId,
        //     name: this.editData.accData.accountName,
        //     isActive: this.editData.accData.accountType === 'Active' ? true : false,
        //     isSubAccount: true,
        //     code: this.editData.accData.accountCode,
        //     parentAccountId: this.editData.parentAccountId,
        //     categories: this.editData.accountCategories, //.map((ac)=>ac.id)
        //     ifrsCategories: [
        //         this.editData.ifrsCategory
        //     ]
        // })

        axios
          .put(
            'https://bspacedev.azurewebsites.net/api/Accounts/Update',
            {
              id: this.editingData.id,
              firmId: this.editingData.firmId,
              name: this.editData.accData.accountName,
              isActive:
                this.editData.accData.accountType === 'Active' ? true : false,
              isSubAccount: true,
              code: this.editData.accData.accountCode,
              parentAccountId: this.editData.parentAccountId,
              categories: this.editData.accountCategories,
              ifrsCategories: this.editData.ifrsCategory
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .then(() => {
            // console.log(res.data.data)

            this.$store.dispatch('account/getAccounts', {
              isSubAcc: true,
              firmId: localStorage.getItem('firmId')
            });
          })
          .catch(err => {
            console.log(err);
          });

        this.editData.accData.accountType = null;
        this.editData.accData.accountName = null;
        this.editData.accData.accountCode = null;
        this.editData.accountCategories = [];
        this.editData.ifrsCategory = [];

        this.isEditValid = true;
      } else {
        this.isEditValid = false;
      }
      this.closeEditDialog();
    },
    // ----------------------------------------------------
    async addAccount() {
      if (
        this.accData.accountType.length !== 0 &&
        this.accData.accountName.length !== 0 &&
        this.accData.accountCode.length !== 0 &&
        this.accountCategories.length !== 0 &&
        this.ifrsCategory.length !== 0
      ) {
        await axios
          .post(
            'https://bspacedev.azurewebsites.net/api/Accounts/Add',
            {
              firmId: this.getFirmId,
              name: this.accData.accountName,
              isActive: this.accData.accountType === 'Active' ? true : false,
              isSubAccount: this.hasSubAcc,
              code: this.accData.accountCode,
              parentAccountId: this.hasSubAcc ? this.parentAccountId : null,
              categories: this.accountCategories,
              ifrsCategories: [this.ifrsCategory]
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .catch(err => {
            console.log(err);
          });
        this.$store.dispatch('account/getAccounts', {
          isSubAcc: true,
          firmId: localStorage.getItem('firmId')
        });

        // console.log({
        //      "firmId": this.getFirmId,
        //       "name": this.accData.accountName,
        //     "isActive": this.accData.accountType === 'Active' ? true : false,
        //      "isSubAccount": this.hasSubAcc,
        //       "code": this.accData.accountCode,
        //      "parentAccountId": this.hasSubAcc ? this.parentAccountId : null,
        //       "categories": this.accountCategories,
        //       "ifrsCategories": [
        //           this.ifrsCategory
        //       ]
        // })
        this.accData.accountName = '';
        this.accData.accountCode = '';
        this.accData.accountType = '';
        // this.accountCategories = []
        // this.ifrsCategory = null
        this.hasSubAcc = false;

        this.isValid = true;
        this.closeAccDialog();
      } else {
        this.isValid = false;
        // console.log(typeof this.accData.accountType == 'boolean')
      }
    }
  },
  watch: {
    editingData(val) {
      this.editData.hasSubAcc = val.isSubAccount;
      this.editData.accData.accountCode = val.code;
      this.editData.accData.accountName = val.name;
      this.editData.accData.accountType = val.isActive ? 'Active' : 'Passive';
      this.editData.ifrsCategory = val.ifrsCategories;
      this.editData.accountCategories = val.categories;
      this.editData.parentAccountId = val.parentAccountId;
      if (this.editingData.id) {
        return (this.isEditAcc = true);
      } else {
        return (this.isEditAcc = false);
      }
    }
  },
  created() {
    this.setup();
  },
  getIfrsCategoriesList() {
    console.log('ss');
    this.setup();
  }
};
</script>

<style scoped>
.container,
.title_search,
.accounts-btns {
  display: flex;
}
.container {
  width: 95%;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
  justify-content: space-between;
  padding-top: 20px;
  margin: 0 auto;
}
.container * {
  font-family: 'Poppins', sans-serif;
}
.container h2 {
  margin-right: 60px;
}
.search-box,
.download {
  /* margin-left: 60px; */
  background: rgba(246, 247, 249, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-radius: 40px;
  padding: 10px;
  cursor: pointer;
}
.search-box input {
  border: none;
  background: none;
  outline: none;
  font-size: 13px;
  transition: 0.5s;
  width: 0px;
  color: rgba(68, 68, 68, 0.9);
}
.search-box input::placeholder {
  color: rgba(68, 68, 68, 0.4);
}
.search-icon {
  border-radius: 50%;
  color: rgba(170, 170, 170, 1);
}
.search-box:hover > input,
.search-box input.active {
  width: 200px;
  padding: 0 8px;
}
.accounts-btns button,
.btn {
  font-family: 'Poppins', sans-serif;
  height: 30px;
  width: 100px;
  padding: 5px 8px;
  color: #fff;
  background: rgba(67, 97, 238, 1);
  border: none;
  border-radius: 25px;
  outline: none;
  cursor: pointer;
  font-size: 11px;
}
.btn {
  margin-top: 1rem;
  position: relative;
  left: 74%;
}
.input-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}
.input-container:nth-child(6) {
  margin-top: 1rem;
  flex-direction: row;
  align-items: center;
}
.input-container:nth-child(6) input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.input-container * {
  font-family: 'Poppins', sans-serif;
}
.input-container label {
  font-weight: 500;
  margin: 6px 0 6px 14px;
}
.input-container input {
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: rgba(69, 67, 67, 1);
  border-radius: 25px;
  padding: 8px 12px;
  outline: none;
  font-size: 13.5px;
}
input::placeholder {
  color: rgba(69, 67, 67, 0.8);
}
/* select{
    cursor: pointer;
    color: rgba(68, 68, 68, 0.8);
} */
.accounts-btns div,
.accounts-btns button:not(:last-child) {
  margin-right: 1rem;
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
.invalidEdit label {
  color: rgba(255, 40, 40, 0.7);
}
.invalidEdit input {
  border: 1.5px solid rgb(255, 40, 40);
}
</style>

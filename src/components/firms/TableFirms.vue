<template>
  <div class="table-title">
    <h2>Firms</h2>
    <div @click="toggleSearchBox" class="search-box">
      <fa class="search-icon" :icon="['fas', 'search']" />
      <input
        v-model="search"
        :class="[isSearchFocused ? 'active' : '']"
        type="text"
        placeholder="Search"
      />
    </div>
  </div>
  <div class="table-container">
    <div v-if="getLoader" id="loader">
      <img src="../../assets/loader.gif" alt="" />
    </div>
    <table v-else-if="contents.length > 0">
      <tr>
        <th v-for="title in titles" :key="title">
          <h3>{{ title }}</h3>
        </th>
      </tr>
      <tr v-for="content in filteredContents" :key="content">
        <td>
          {{ content.name }}
        </td>
        <td>
          <span
            id="code"
            :style="{
              backgroundColor: `hsla(${~~(360 * Math.random())},70%,70%,0.8)`
            }"
          >
            {{ content.establishedYear }}
          </span>
        </td>
        <td>
          {{ content.telephone }}
        </td>
        <td>
          {{ content.mail }}
        </td>
        <td>
          {{ substringedAddress(content.address) }}
          <span class="tooltiptext">{{ content.address }}</span>
        </td>
        <td>
          {{ content.bankAccount }}
        </td>
        <td>
          {{ content.bankName }}
        </td>
        <td>
          {{ content.innNumber }}
        </td>
        <td>
          {{ content.logo }}
        </td>
        <td>
          {{ content.director }}
        </td>
        <div id="edit-trash">
          <fa
            @click="editItem(content.id)"
            class="icons icon-edit"
            :icon="['fas', 'edit']"
          />
          <fa
            @click="deleteItem(content.id)"
            class="icons icon-trash"
            :icon="['fas', 'trash']"
          />
        </div>
      </tr>
    </table>

    <div v-else-if="!getLoader && getError">{{ getError }}</div>
    <div v-else-if="!getLoader && !contents">
      No stored firms yet
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['editing', 'deleted'],
  data() {
    return {
      isSearchFocused: false,
      search: '',
      titles: [
        'NAME',
        'ESTD YEAR',
        'TELEPHONE',
        'MAIL',
        'ADDRESS',
        'BANK ACC',
        'BANK NAME',
        'INN NUMBER',
        'LOGO',
        'DIRECTOR'
      ]
    };
  },
  computed: {
    filteredContents() {
      return this.contents.filter(content => {
        return (
          content.name.match(this.search) ||
          content.director.match(this.search) ||
          content.telephone.match(this.search)
        );
      });
    },
    getToken() {
      return localStorage.getItem('mytoken') || this.$store.state.token;
    },
    contents() {
      return this.$store.getters['firm/getLists'];
    },
    forUpdate() {
      return this.$store.getters['firm/updated'];
    },
    getLoader() {
      return this.$store.getters['firm/getLoading'];
    },
    getError() {
      return this.$store.getters['firm/getError'];
    }
  },
  methods: {
    load() {
      console.log(this.getLoader);
    },
    toggleSearchBox() {
      this.isSearchFocused = !this.isSearchFocused;
    },
    substringedAddress(val) {
      if (val.length > 20) {
        return val.substring(0, 20) + '...';
      } else {
        return val;
      }
    },
    deleteItem(id) {
      this.$store.commit('firm/toLoaderTrue');
      // this.getLoader = true;
      if (confirm('do you want to delete?')) {
        axios
          .delete('https://bspace.azurewebsites.net/api/Firms/Delete/' + id, {
            headers: {
              Accept: 'text/plain',
              Authorization: `Bearer ${localStorage.getItem('mytoken')}`
            }
          })
          .then(() => {
            this.$store.dispatch('firm/getData');
            this.$store.commit('firm/toLoaderFalse');
            // this.getLoader = false;
            this.$emit('deleted');
          })
          .catch(error => {
            this.$store.commit('firm/toLoaderFalse');
            // this.getLoader = false;
            console.log(error.message);
          });
      }
    },
    async editItem(id) {
      await axios
        .get('https://bspace.azurewebsites.net/api/Firms/GetById?id=' + id, {
          headers: {
            Accept: 'text/plain',
            Authorization: `Bearer ${localStorage.getItem('mytoken')}`
          }
        })
        .then(res => {
          // console.log(res)

          // console.log(this.$store.state['firm/isForUpdating'])
          // this.$store.state['firm/isForUpdating'] = true
          // console.log(this.$store.state['firm/isForUpdating'])
          this.$emit('editing', res.data.data);
        });
    }
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch('firm/getData');
    this.$Progress.finish();
  }
};
</script>

<style scoped>
.table-title {
  display: flex;
  margin: 15px 20px;
}
.table-title * {
  font-family: 'Poppins', sans-serif;
}
.search-box {
  margin-left: 60px;
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
  color: rgb(121, 108, 108);
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
.table-container {
  width: 100%;
  height: 58vh;
  overflow-y: scroll; /**auto */
  overflow-x: hidden;
  position: relative;
}
table {
  margin-left: 20px;
  border-collapse: collapse;
  width: 99%;
  color: rgba(68, 68, 68, 1);
}
table tr:nth-child(1) {
  position: sticky;
  background: #fff;
  top: 0;
  z-index: 1;
}
table th::after {
  content: '';
  height: 0.5px;
  width: 100%;
  position: absolute;
  bottom: 2%;
  left: 0;
  z-index: 10;
  background: rgba(170, 170, 170, 1);
}

th h3 {
  font-size: 15px;
  color: rgba(170, 170, 170, 1);
  margin-bottom: 5px;
  /* padding-left: 2px; */
}
tr,
td {
  position: relative;
  text-align: left;
}
tr {
  padding: 6px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
}
tr:nth-child(1) {
  border: none;
}
td:nth-child(5):hover .tooltiptext {
  visibility: visible;
}
.tooltiptext {
  visibility: hidden;
  background-color: rgb(30, 33, 49);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 3px;
  width: fit-content;
  position: absolute;
  top: 70%;
  left: 0%;
  z-index: 1;
}
td {
  padding: 24px 4px;
  font-size: 13px;
}
tr:hover:not(:nth-child(1)) {
  border-radius: 15px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
tr:active:not(:nth-child(1)) {
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
}
tr:hover .icon-edit {
  color: rgba(255, 255, 255, 1);
  background: rgba(204, 24, 24, 0.75);
  border-top-right-radius: 16px;
}
tr:hover .icon-trash {
  color: rgba(255, 255, 255, 1);
  background: rgba(67, 97, 238, 0.75);
  border-bottom-right-radius: 16px;
}
#edit-trash {
  display: flex;
  flex-direction: column;
  align-content: center;
  position: relative;
}
.icons {
  align-self: center;
  color: rgba(170, 170, 170, 1);
  font-size: 35px;
  width: 35px;
  padding: 10px;
}
#code {
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 14px;
}
#loader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f1f2f3;
  z-index: 100;
}
#loader img {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (min-width: 1700px) and (max-width: 2000px) {
  .icons {
    margin-right: 6px;
  }
}
@media screen and (min-width: 1700px) {
  .icons {
    align-self: flex-end;
  }
}
</style>

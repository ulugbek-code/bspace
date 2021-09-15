<template>
  <div class="container">
    <div v-if="getLoader" id="loader">
      <img src="../../assets/loader.gif" alt="" />
    </div>
    <div v-else-if="!getLoader && getError">{{ getError }}</div>
    <div
      v-else-if="
        !getLoader && (!getAccountsList || getAccountsList.length === 0)
      "
    >
      No stored accounts yet
    </div>
    <table v-else>
      <tr>
        <th v-for="title in titles" :key="title">
          <h3>{{ title }}</h3>
        </th>
      </tr>
      <tr v-for="content in filteredContents" :key="content">
        <td>
          <span
            id="code"
            :style="{
              backgroundColor: `hsla(${~~(360 * Math.random())},70%,70%,0.8)`
            }"
          >
            {{ content.code }}
          </span>
        </td>
        <td>{{ content.name }}</td>
        <td :class="content.isActive ? 'blue-bg' : 'red-bg'">
          {{ content.isActive ? 'Active' : 'Passive' }}
        </td>
        <td id="category">
          <span v-for="(c, i) in content.categories" :key="i">
            {{ c.name }}{{ ++i !== content.categories.length ? ',' : '' }}
            <br />
          </span>
        </td>
        <td v-for="c in content.ifrsCategories" :key="c">{{ c.code }}</td>
        <td v-for="c in content.ifrsCategories" :key="c">{{ c.name }}</td>
        <td>
          <template v-for="(types, i) in content.ifrsCategories" :key="i">
            <template v-for="t in types.types" :key="t"
              >{{ t }}{{ ++i !== types.types.length ? ', ' : ' ' }}</template
            >
          </template>
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['search'],
  data() {
    return {
      titles: [
        'CODE',
        'NAME',
        'TYPE',
        'ACC CATEGORY',
        'ACC N',
        'IFRS KMPG',
        'TYPES'
      ],
      categoriesName: [],
      // ifrsCategories: [],
      ifrsTypes: [],
      parentAccounts: [],
      colors: ['red', 'blue', 'green']
    };
  },
  computed: {
    filteredContents() {
      return this.getAccountsList.filter(content => {
        return (
          content.name.match(this.search) || content.code.match(this.search)
          // ||
          // content.ifrsCategories[0].code.match(this.search) ||
          // content.ifrsCategories[0].name.match(this.search)
        );
      });
    },
    getAccountsList() {
      return this.$store.getters['account/getAccountList'];
    },
    getParentAccountsList() {
      return this.$store.getters['account/getParentAccountsList'];
    },
    getCategoriesList() {
      return this.$store.getters['account/getCategories'];
    },
    // getIfrsCategoriesList() {
    //   return this.$store.getters['account/getIfrs'];
    // },
    getifrsTypes() {
      return this.$store.getters['account/getifrsTypes'];
    },
    getLoader() {
      return this.$store.getters['account/getLoader'];
    },
    getError() {
      return this.$store.getters['account/getError'];
    }
  },
  methods: {
    deleteItem(id) {
      if (confirm('do you want to delete?')) {
        axios
          .delete(
            'https://bspacedev.azurewebsites.net/api/Accounts/Delete/' + id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('mytoken')}`
              }
            }
          )
          .then(() => {
            this.$store.dispatch('account/getAccounts', {
              isSubAcc: true,
              firmId: localStorage.getItem('firmId')
            });
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    },
    async editItem(id) {
      await axios
        .get('https://bspacedev.azurewebsites.net/api/Accounts/GetById/' + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('mytoken')}`
          }
        })
        .then(res => {
          console.log(res);
          this.$emit('editAccounts', res.data.data);
        });
    }
  },
  async created() {
    await this.$store.dispatch('account/getAccounts', {
      isSubAcc: false,
      firmId: localStorage.getItem('firmId')
    });
    await this.$store.dispatch('account/getAccounts', {
      isSubAcc: true,
      firmId: localStorage.getItem('firmId')
    });

    await this.$store.dispatch('account/getCategories');
    // await this.$store.dispatch('account/getIfrs');
    await this.$store.dispatch('account/getifrsTypes');

    this.categoriesName = this.getCategoriesList.map(category => {
      return {
        name: category.name,
        id: category.id
      };
    });
    // this.ifrsCategories = this.getIfrsCategoriesList.map(i => {
    //   return {
    //     id: i.id,
    //     name: i.name,
    //     code: i.code
    //   };
    // });

    // this.$emit('ifrs', this.ifrsCategories);
    this.$emit('category', this.categoriesName);
    this.$emit('ifrsTypes', this.getifrsTypes);
    this.$emit('parentAccounts', this.getParentAccountsList);
  }
  // watch: {
  //   getIfrsCategoriesList(val) {
  //     console.log(val);
  //   }
  // }
};
</script>

<style scoped>
.container {
  overflow-y: auto; /**changed from scroll */
  overflow-x: hidden;
  height: 88vh;
  /* display:block; */
  width: 98%;
  justify-content: space-between;
  margin: 20px auto 0;
  position: relative;
}
table {
  border-collapse: collapse;
  width: 100%;
}
table tr:nth-child(1) {
  background: #fff;
  position: sticky;
  top: 0%;
  z-index: 1;
}
table th {
  padding-left: 10px;
}
table th::after {
  content: '';
  height: 0.5px;
  width: 100%;
  position: absolute;
  bottom: 10%;
  left: 0;
  background: rgba(170, 170, 170, 1);
}
th h3 {
  font-size: 16px;
  color: rgba(170, 170, 170, 1);
}
tr:not(:nth-child(1)) {
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
}
tr,
td {
  position: relative;
  text-align: left;
  height: 68px;
}
td:not(:nth-child(1)) {
  padding: 10px 8px;
  font-size: 13.5px;
}
td:nth-child(1) {
  padding-left: 5px;
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
  border-top-right-radius: 15px;
}
tr:hover .icon-trash {
  color: rgba(255, 255, 255, 1);
  background: rgba(67, 97, 238, 0.75);
  border-bottom-right-radius: 15px;
}
#edit-trash {
  display: flex;
  flex-direction: column;
  align-content: center;
  position: relative;
  right: 26%;
}
.icons {
  color: rgba(170, 170, 170, 1);
  font-size: 34px;
  width: 130%;
  padding: 8px;
}
.red-bg {
  color: rgba(181, 69, 60, 1);
}
.blue-bg {
  color: rgba(67, 97, 238, 1);
}
#code {
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 14px;
}
#loader {
  position: relative;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #f1f2f3;
  z-index: 10;
}
#loader img {
  position: relative;
  top: 40%;
  left: 40%;
  transform: translate(-40%, -40%);
}
</style>

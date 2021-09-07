<template>
  <div :class="[isNavOpened ? 'nav' : '']" class="box">
    <add-firm
      v-if="!forUpdate"
      :editedData="editedData"
      :isEdit="isEdit"
      @upping="upp($event)"
    ></add-firm>
    <table-firms @editing="editData($event)"></table-firms>
  </div>
</template>

<script>
import AddFirm from '../components/firms/AddFirm.vue';
import TableFirms from '../components/firms/TableFirms.vue';

export default {
  components: {
    'add-firm': AddFirm,
    'table-firms': TableFirms
  },
  data() {
    return {
      editedData: null,
      isEdit: false
    };
  },
  computed: {
    forUpdate() {
      return this.$store.getters['firm/updated'];
    },
    isNavOpened() {
      return this.$store.getters.isNav;
    }
  },
  methods: {
    editData(data) {
      this.editedData = data;
      this.isEdit = true;
    },
    upp(val) {
      this.isEdit = val;
    }
  }
};
</script>

<style scoped>
.box {
  margin-left: 270px;
}
.box.nav {
  margin-left: 110px;
}
</style>

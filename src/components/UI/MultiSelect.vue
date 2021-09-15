<template>
  <div
    :class="{ invalid: !validity && multiSelected.length === 0 }"
    class="custom-select"
    @blur="open = false"
  >
    <div class="selected" :class="{ open: open }" @click="toggleOpen">
      <template v-if="multiSelected.length > 0">
        <template v-for="(m, i) in multiSelected" :key="i">
          {{ m.name }}<span @click="removeSpan(i)">&#10005;</span>
        </template>
      </template>
      <template v-else-if="multiSelected.length === 0"
        >Choose Category</template
      >
      <template v-else>
        {{ defaultVal }}
      </template>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <input v-model="query" type="text" placeholder="Search by name" />
      <div
        v-for="(option, i) of filteredOptions"
        :key="i"
        @click="adding(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTouched: {
      type: Boolean
    },
    options: {
      type: Array,
      required: false
    },
    validity: {
      type: Boolean,
      required: false
    },
    defaultVal: {
      required: false
    }
  },
  emits: ['multiEditSelected', 'removing', 'changeDD'],
  data() {
    return {
      query: '',
      selected: null,
      multiSelected: [this.defaultVal],
      open: false
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        return option.name.match(this.query);
      });
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
      this.$emit('changeDD', true);
    },
    adding(option) {
      if (this.multiSelected.length < 2 && this.multiSelected[0] !== option) {
        // console.log(this.multiSelected)
        this.multiSelected.push(option);
        this.$emit('multiEditSelected', this.multiSelected);
      }
      //   this.$emit('multiSelected', this.multiSelected);
      this.open = false;
      // console.log(this.multiSelected)
    },
    removeSpan(index) {
      this.multiSelected.splice(index, 1);
      this.$emit('removing', index);
    }
  },
  created() {
    this.multiSelected = JSON.parse(JSON.stringify(this.defaultVal));
  },
  watch: {
    isTouched() {
      if (this.isTouched === false && this.open === true) {
        this.open = false;
      }
    }
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 14px;
  line-height: 36px;
}

.custom-select .selected {
  background-color: transparent;
  border-radius: 25px;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: rgb(121, 108, 108);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid rgba(67, 97, 238, 0.35);
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 18px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: rgb(121, 108, 108) transparent transparent transparent;
}
.selected span {
  background: rgba(67, 97, 238, 0.35);
  border-radius: 50%;
  margin: 0 10px 0 2px;
  padding: 2px 6px;
}
.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  max-height: 180px;
  overflow-y: auto;
  border-right: 1px solid rgba(67, 97, 238, 0.35);
  border-left: 1px solid rgba(67, 97, 238, 0.35);
  border-bottom: 1px solid rgba(67, 97, 238, 0.35);
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 10;
}

.custom-select .items div {
  color: rgb(121, 108, 108);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}
.custom-select .items div:hover {
  background-color: rgba(67, 97, 238, 0.35);
}
.selectHide {
  display: none;
}
.items input {
  height: 28px;
  font-size: 14px;
  outline: none;
  color: rgb(121, 108, 108);
  caret-color: rgba(67, 97, 238, 1);
  padding-left: 20px;
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(67, 97, 238, 0.35);
}
.items input::placeholder {
  color: rgba(121, 108, 108, 0.6);
}
.invalid.custom-select .selected {
  border-radius: 25px;
  border: 1.5px solid rgb(255, 40, 40);
  color: rgba(255, 40, 40, 0.7);
}
</style>

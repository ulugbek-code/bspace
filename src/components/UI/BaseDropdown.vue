<template>
<!-- multiselect with send id -->
<div v-if="multiselect && withId" :class="{invalid: !validity && multiSelected.length === 0 }" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open}" @click="toggleOpen">
      <template v-if="multiSelected.length > 0">
        <template  v-for="(m,i) in multiSelected" :key="i">
          {{m.name}}<span @click="removeSpan(i)">&#10005;</span>
        </template>
      </template>
      <template v-else>
        {{defaultVal}}
      </template>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <input v-model="query" type="text" placeholder="Search by name">
      <div
        v-for="(option, i) in filteredOptions2"
        :key="i"
        @click="adding(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
<!-- send indexes add ifrs-->
<div v-else-if="types" :class="{invalid: validity && multiSelected.length === 0 }" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="toggleOpen">
      <template v-if="multiSelected.length > 0">
        <template v-for="(m,i) in multiSelected" :key="i">
          {{m}}<span @click.stop="removeSpan(i)">&#10005;</span>
        </template>
      </template>
      <template v-else>
        {{defaultVal}}
      </template>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(type, i) in types"
        :key="i"
        @click="adding(type,i)">
        {{ type }}
      </div>
    </div>
  </div>
<!-- multiselect -->
  <div v-else-if="multiselect" :class="{invalid: !validity && multiSelected.length === 0}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="toggleOpen">
      <template v-if="multiSelected.length > 0">
        <template v-for="(m,i) in multiSelected" :key="i">
          {{m}}<span @click.stop="removeSpan(i)">&#10005;</span>
        </template>
      </template>
      <template v-else>
        {{defaultVal}}
      </template>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option }}
      </div>
    </div>
  </div>
  <!-- with id add -->
  <div v-else-if="withId && add" :class="{invalid: !validity && !selected}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="toggleOpen">
      {{ selected ? selected : defaultVal }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <input v-model="query" type="text" placeholder="Search by name">
      <div
        v-for="(option, i) in filteredOptions"
        :key="i"
        @click="adding(option)">
        {{option.code}}, {{ option.name }}
      </div>
    </div>
  </div>
  <!-- ---------with id parent acc-------------- -->
  <div v-else-if="withId" :class="{invalid: !validity && defaultVal.length === 0}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="toggleOpen">
      {{ selected ? selected : defaultVal }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <input v-model="query" type="text" placeholder="Search by name">
      <div
        v-for="(option, i) of filteredOptions"
        :key="i"
        @click="adding(option)">
        {{option.code}}, {{ option.name }}
      </div>
    </div>
  </div>
<!-- -------casual---------- -->
<div v-else-if="active" :class="{invalid: validity && !selected}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="toggleOpen">
      {{ selected ? selected : defaultVal }}{{hello}}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option }}
      </div>
    </div>
  </div>
  <!--  send index-->
  <div v-else-if="index" :class="{invalid: validity && !selected}" class="custom-select withIndex" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="toggleOpen">
      {{ selected ? selected : defaultVal }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option,i)">
        {{ option }}
      </div>
    </div>
  </div>
<!--  -->
  <div v-else :class="{invalid: !validity && defaultVal.length === 0}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="toggleOpen">
      {{ selected ? selected : defaultVal }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option }} 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index:{
      type: Boolean
    },
    isTouched:{
      type: Boolean
    },
    add:{
      required:false
    },
    multiselect:{
      type: String,
      required:false
    },
    withId:{
      type: String,
      required:false
    },
    options: {
      type: Array,
      required: false,
    },
    types:{
      required: false
    },
    validity:{
      type: Boolean,
      required:false
    },
    defaultVal:{
      required: false
    },
    active:{
      required: false
    }
  },
  emits:['multiSelected','sendId','input','changeDD'],
  data() {
    return {
      query: '',
      selected: null,
      multiSelected: [],
      // typesI: [],
      open: false
    };
  },
  computed:{
    filteredOptions(){
            return this.options.filter((option)=>{
                return option.name.match(this.query) || option.code.match(this.query)
            })
        },
    filteredOptions2(){
      return this.options.filter((option)=>{
                return option.name.match(this.query)
            })
    }    
  },
  methods:{
    toggleOpen(){
      this.open = !this.open
      this.$emit('changeDD', true)
    },
    adding(option,i){
      if(this.types && this.multiSelected[0] !== option && this.multiSelected.length < 2){
        this.multiSelected.push(option) 
        // this.typesI.push(option)
        this.$emit('multiSelected', this.multiSelected);
      }
      else if(this.multiselect && this.multiSelected[0] !== option && this.multiSelected.length < 2){
        this.multiSelected.push(option)
        this.$emit('multiSelected', this.multiSelected);
      }
      else if(this.withId === 'ifrs'){
        this.selected = option.name +', ' + option.code
        this.$emit('sendId', {id: option.id})
      }
      else if(this.withId){
        this.selected = option.name +', ' + option.code
        this.$emit('sendId', option.id)
      }
      else if(this.index){
        this.selected = option
        this.$emit('input', i)
      }
      else{
        this.selected = option
        this.$emit('input', this.selected)
      }
      this.open = false;
      // console.log(this.multiSelected)
    },
    removeSpan(index){
      this.multiSelected.splice(index,1)
    }
  },
  watch:{
    isTouched(){
      if(this.isTouched === false && this.open === true){
        this.open = false
      }
    }
  }
}
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
  color: rgba(69, 67, 67, 0.9);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}
.custom-select.withIndex{
  width: 100%;
  line-height: 26px;
  background: #fff;
  border-radius: 25px;
}
.custom-select .selected.open {
  border: 1px solid rgba(108, 109, 113, 0.35);
  border-radius: 6px 6px 0px 0px;
}
.custom-select.withIndex .selected{
  color: rgb(143, 143, 143);
  border: 1px solid rgba(221, 221, 221, 1);
}
.custom-select.withIndex .selected.open{
  background: #fff;
}
.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 18px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: rgb(121, 108, 108) transparent transparent transparent;
}
.selected span{
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
.items input{
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
.items input::placeholder{
  color: rgba(121, 108, 108,0.6);
}
.withIndex .selected:after{
  top: 12px;
}
.invalid.custom-select .selected{
  border-radius: 25px;
  color: rgba(255, 40, 40, 0.7);
  border: 1.5px solid rgb(255, 40, 40);
}

</style>
<template>
<div v-if="defaultVal && firm" :class="{invalid: validity && !selected}" class="custom-select firm" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="open = !open">
      {{ selected ? selected : "Select the firm..." }}<span v-if="selected" @click.stop="removeSpan()">&#10005;</span>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
  <!--  -->
  <div v-else-if="update && firm" :class="{invalid: validity && !selected}" class="custom-select firm" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="open = !open">
      {{ selected ? selected : update }}<span @click.stop="removeSpan()">&#10005;</span>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
<!--  -->
    <div v-else-if="defaultVal" :class="{invalid: validity && !selected}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="open = !open">
      {{ selected ? selected : defaultVal }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
  <!--  -->
  
  <!--  -->
  <div v-else :class="{invalid: validity && !selected}" class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }"  @click="open = !open">
      {{ selected ? selected : "Select the firm..." }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="adding(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:[
        'options','validity','defaultVal','firm','update'
    ],
    data(){
        return{
            selected: '',
            open: false
        }
    },
    methods:{
        adding(option){
          // console.log(option)
        this.selected = option.name
        this.$emit('sendId', option.id)

        this.open = false;
        },
        removeSpan(){
          this.selected = ''
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
  line-height: 40px;
  margin: 9.6px
}

.custom-select .selected {
  background-color: transparent;
  border-radius: 25px;
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: rgba(69, 67, 67, 0.8);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open,
.custom-select.firm .selected.open {
  border: 1px solid rgba(67, 97, 238, 0.35);
  color: rgba(69, 67, 67, 0.9);
  border-radius: 6px 6px 0px 0px;
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
.custom-select.firm .selected:after {
  top: 12px;
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
.custom-select.firm{
  line-height: 24px;
  margin: 0;
}
.custom-select.firm .selected{
  border: 1px solid rgb(216, 214, 214);
}
.custom-select.firm .items{
  background: rgb(243, 242, 242) !important;
}

.selectHide {
  display: none;
}
.invalid.custom-select .selected{
  border-radius: 25px;
  color: rgba(255, 40, 40, 0.7);
  border: 1.5px solid rgb(255, 40, 40);
}

</style>
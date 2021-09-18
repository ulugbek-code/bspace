<template>
  <button @click="$emit('clicked')"><slot></slot></button>
</template>

<style scoped>
button {
  font-family: 'Poppins', sans-serif;
  /* height: 26px; */
  /* width: 105px; */
  padding: 5px 10px;
  color: #fff;
  background: rgba(67, 97, 238, 1);
  border: none;
  border-radius: 25px;
  outline: none;
  cursor: pointer;
  font-size: 11px;
}
</style>

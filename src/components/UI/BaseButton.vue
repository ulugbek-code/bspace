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
  transition: 0.4s all ease;
}
button:hover {
  background: #fff;
  color: rgba(67, 97, 238, 1);
  border: 1px solid rgba(67, 97, 238, 1);
}
button:active {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>

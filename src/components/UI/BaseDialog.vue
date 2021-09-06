<template>
  <div @click="$emit('close')"></div>
  <dialog open @click="$emit('closeDD')">
    <header>
      <slot name="header">
        <h2>{{ title }}</h2>
        <span @click="$emit('close')">&#10006;</span>
      </slot>
    </header>
    <section>
      <slot></slot>
      <slot name="actions">
        <button @click="$emit('close')">Close</button>
      </slot>
    </section>
  </dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    }
  },
  emits: ['close','closeDD']
};
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translate(-50%,-10%);
  width: 520px;
  z-index: 100;
  border-radius: 18px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  /* overflow: hidden; */
}

header {
  position: relative;
  color: rgba(68, 68, 68, 1);
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}
header span {
  position: absolute;
  top: 10%;
  right: 5%;
  font-size: 24px;
  cursor: pointer;
}

section {
  padding: 1rem;
}

ul {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

/* @media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
} */
</style>

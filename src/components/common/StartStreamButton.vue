<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button class="start-button" @click="emit('click')">방송시작</button>
</template>

<style scoped>
.start-button {
  padding: 10px 15px;
  background-color: #ff9f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 100%;
  cursor: pointer;
}

.start-button:hover {
  background-color: #e13865;
}
</style>

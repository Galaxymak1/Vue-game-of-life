<template>
  <div class="cell" :class="{ alive }" @click="$emit('toggle')" />
</template>

<script setup>
const props = defineProps({
  alive: { type: Boolean, required: true }
});
</script>

<style scoped>
.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.cell.alive {
  background-color: white;
}
</style>
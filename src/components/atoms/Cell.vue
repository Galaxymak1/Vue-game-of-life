<template>
  <div
    class="cell"
    :class="{ alive }"
    :style="{ width: size + 'px', height: size + 'px' }"
    @click="$emit('toggle')"
  />
</template>

<script setup>
const props = defineProps({
  alive: { type: Boolean, required: true },
  size: { type: Number, default: 20 }
})
</script>

<style scoped>
.cell {

  border: 1px solid #ddd;
  box-sizing: border-box;
}
.cell.alive {
  background-color: white;
}
</style>
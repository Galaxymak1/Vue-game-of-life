<!-- src/components/Grid.vue -->
<template>
  <div
    class="grid"
    :style="{
      gridTemplateColumns: 'repeat(' + cols + ', 30px)',
      gridTemplateRows: 'repeat(' + rows + ',30px)'
    }"
  >
    <Cell
      v-for="(cell, index) in flattenedGrid"
      :key="index"
      :alive="cell === 1"
      @toggle="() => handleToggle(index)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Cell from '@/components/atoms/Cell.vue';

const props = defineProps({
  grid: { type: Array, required: true }
});
const emit = defineEmits(['toggle-cell']);

const rows = props.grid.length;
const cols = props.grid[0].length;

const flattenedGrid = computed(() => props.grid.flat());

const handleToggle = (index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  emit('toggle-cell', row, col);
};
</script>

<style scoped>
.grid {
  display: grid;
  user-select: none;
}
</style>
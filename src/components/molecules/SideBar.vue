<template>
  <aside class=" h-full bg-gray-900 text-white p-6 flex flex-col space-y-8 w-full max-w-xs shadow-lg">
    <!-- Controls Buttons -->
    <div>
      <Controls
        :running="running"
        :initialSpeed="initialSpeed"
        @start="$emit('start')"
        @stop="$emit('stop')"
        @clear="$emit('clear')"
        @randomize="$emit('randomize')"
        @update-speed="$emit('update-speed', $event)"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-2">Presets</h2>
      <select
        v-model="preset"
        @change="applyPreset"
        class="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option disabled value="">Select pattern…</option>
        <option value="glider">Glider</option>
        <option value="pulsar">Pulsar</option>
        <option value="gosper">Gosper Glider Gun</option>
      </select>
    </div>

    <div class="mt-auto space-y-4">
      <div class="bg-gray-800 p-3 rounded shadow-inner text-center">
        <p class="text-sm text-gray-400">Generation</p>
        <p class="text-2xl font-semibold">{{ generation }}</p>
      </div>
      <div class="bg-gray-800 p-3 rounded shadow-inner text-center">
        <p class="text-sm text-gray-400">Alive Cells</p>
        <p class="text-2xl font-semibold">{{ aliveCount }}</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Controls from '@/components/molecules/Controls.vue';

interface SidebarProps {
  running: boolean;
  initialSpeed?: number;
  generation: number;
  grid: number[][];
}

const props = defineProps<SidebarProps>();
const emit = defineEmits(['start', 'stop', 'clear', 'randomize', 'update-speed', 'preset-change']);

const preset = ref('');

const aliveCount = computed(() => props.grid.flat().reduce((sum: number, cell: number) => sum + cell, 0));

function applyPreset() {
  emit('preset-change', preset.value);
}
</script>

<style scoped>
aside {
  overflow-y: auto;
}
</style>

<!-- src/components/Controls.vue -->
<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <p class="text-xl font-semibold">{{running ? "Running" : "Stopped"}}</p>
    <button @click="$emit(running ? 'stop' : 'start')" class="hover:text-gray-300">
      <svg v-if="running" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>

    </button>
    <button @click="$emit('clear')" class="hover:text-gray-300 text-lg">Clear</button>
    <button @click="$emit('randomize')" class="hover:text-gray-300 text-lg"> Randomize</button>
    <label class="text-2xl ">
      Speed:
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        v-model="speedValue"
        @input="updateSpeed"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      {{ speedValue }}x
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  running: { type: Boolean, required: true },
  initialSpeed: { type: Number, default: 1 }
});
const emit = defineEmits(['start', 'stop', 'clear', 'randomize', 'update-speed']);

const speedValue = ref(props.initialSpeed);

function updateSpeed() {
  emit('update-speed', speedValue.value);
}
</script>

<style scoped>

</style>
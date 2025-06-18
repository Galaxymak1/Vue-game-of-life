<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header class="flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-md">
      <h1 class="text-2xl font-semibold">Conway’s Game of Life</h1>
      <button
        @click="showInfo = !showInfo"
        aria-label="Toggle rules"
        class="hover:text-gray-300 transition"
      >
        ℹ️
      </button>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <SideBar
        :running="running"
        :generation="generation"
        :grid="grid"
        @start="start"
        @stop="stop"
        @clear="clearGrid"
        @randomize="handleRandomize"
        @update-speed="setSpeed"
        @preset-change="applyPreset"
      />

      <main class="flex-1 p-4 overflow-auto flex items-center justify-center">
        <div
          class="p-2 rounded-lg shadow-inner"
          @wheel.prevent="handleWheel"
          :style="{
            gridTemplateColumns: `repeat(${cols}, var(--cell-size))`,
            '--cell-size': cellSize + 'px',
          }"
        >
          <Grid :grid="grid" @toggle-cell="toggleCellState" :size="cellSize" />
        </div>
      </main>
    </div>

    <footer class="bg-gray-800 text-gray-400 text-sm text-center py-2">
      © 2025 ·
      <a href="https://github.com/your-repo" class="underline hover:text-gray-200"
        >Source on GitHub</a
      >
    </footer>

    <div
      v-if="showInfo"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="rounded-lg p-6 max-w-md">
        <h3 class="text-xl font-semibold mb-2">How to play</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li>Any live cell with 2–3 neighbors survives.</li>
          <li>Any dead cell with exactly 3 neighbors becomes alive.</li>
          <li>All other cells die or remain dead.</li>
        </ul>
        <button
          @click="showInfo = false"
          class="mt-4 btn bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useGameOfLife from '@/composables/useGameOfLife.js'
import Grid from '@/components/molecules/Grid.vue'
import SideBar from '@/components/molecules/SideBar.vue'

const rows = 25
const cols = 50
const cellSize = ref<number>(20)
const minCellSize = 5
const maxCellSize = 100
const cellSizeStep = 1
const initialSpeed = 300 // milliseconds

const {
  grid,
  nextGeneration,
  resetGrid,
  randomizeGrid: randomizeGridFn,
  toggleCellState,
} = useGameOfLife(rows, cols)

const running = ref(false)
const speed = ref(initialSpeed)
const generation = ref(0)
const preset = ref('')
const showInfo = ref(false)
let timerId: ReturnType<typeof setTimeout> | null = null

const aliveCount = computed(() => grid.flat().reduce((sum, cell) => sum + cell, 0))

function start() {
  if (running.value) return
  running.value = true
  runSimulation()
}

function runSimulation() {
  console.log(speed.value)
  nextGeneration()
  generation.value++
  timerId = setTimeout(() => {
    if (running.value) runSimulation()
  }, speed.value)
}

function stop() {
  running.value = false
  if (timerId) clearTimeout(timerId)
}

function clearGrid() {
  stop()
  generation.value = 0
  resetGrid()
}

function handleRandomize() {
  randomizeGridFn()
  generation.value = 0
}

function setSpeed(modifier: number) {
  speed.value = initialSpeed * (1 / modifier)
  if (running.value) {
    stop()
    start()
  }
}

function applyPreset(presetName: string) {
  preset.value = presetName
  resetGrid()
  generation.value = 0
  if (preset.value === 'glider') {
    toggleCellState(1, 2)
    toggleCellState(2, 3)
    toggleCellState(3, 1)
    toggleCellState(3, 2)
    toggleCellState(3, 3)
  }
}

function handleWheel(event: WheelEvent) {
  if (event.deltaY < 0) {
    cellSize.value = Math.min(maxCellSize, cellSize.value + cellSizeStep)
  } else {
    cellSize.value = Math.max(minCellSize, cellSize.value - cellSizeStep)
  }
}
</script>

<style scoped></style>

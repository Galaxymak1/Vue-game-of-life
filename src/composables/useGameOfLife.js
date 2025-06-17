// src/composables/useGameOfLife.js
import { reactive } from 'vue';

export default function useGameOfLife(rows = 30, cols = 50) {
  // Initialize grid with zeros
  const grid = reactive(Array.from({ length: rows }, () => Array(cols).fill(0)));

  const resetGrid = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
      }
    }
  };

  const randomizeGrid = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = Math.random() > 0.7 ? 1 : 0;
      }
    }
  };

  const nextGeneration = () => {
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;
            const ni = i + x;
            const nj = j + y;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
              neighbors += grid[ni][nj];
            }
          }
        }
        if (grid[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
          newGrid[i][j] = 1;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = 0;
        }
      }
    }
    // Update grid in-place
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = newGrid[i][j];
      }
    }
  };

  const toggleCellState = (row, col) => {
    grid[row][col] = grid[row][col] ? 0 : 1;
  };

  return {
    grid,
    resetGrid,
    randomizeGrid,
    nextGeneration,
    toggleCellState
  };
}
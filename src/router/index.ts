import { createRouter, createWebHistory } from 'vue-router'
import GameOfLife from '@/components/templates/GameOfLife.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameOfLife,
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import rter from './router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [rter]
})

export default router

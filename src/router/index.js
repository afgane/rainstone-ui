import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tools',
    name: 'ToolsList',
    // route level code-splitting
    // this generates a separate chunk (WorkflowCostEstimate.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ToolsList.vue')
},
{
    path: '/tool-details',
    name: 'ToolDetails',
    component: () => import('../views/ToolDetails.vue')
},
{
    path: '/workflow',
    name: 'Workflow',
    component: () => import('../views/Workflow.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

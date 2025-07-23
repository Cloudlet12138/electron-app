import { createRouter, createWebHashHistory } from 'vue-router'
import { AppRoutes } from './routes'
import { beforeEach, afterEach } from './guards'

const router =  createRouter({
  history: createWebHashHistory(), // history 模式
  routes: AppRoutes
})


router.beforeEach(beforeEach)

router.afterEach(afterEach)


export default router
import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// 状态管理
import { createPinia } from 'pinia'
// 持久化
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)

// 引入element-plus
import 'element-plus/theme-chalk/index.css'
// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(store).mount('#app')

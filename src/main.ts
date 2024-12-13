import '../src/assets/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initEvent } from './events/eventEmitter'
import { eventEmitter } from "@/events/index"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.idPrefix = 'SliderUID:'
app.use(createPinia())
app.use(router)
window.eventEmitter = eventEmitter;
initEvent();
app.mount('#app')

import '../src/assets/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initEvent } from './events/eventEmitter'
import { eventEmitter } from "@/events/index"
const app = createApp(App)
app.config.idPrefix = 'SliderUID:'
app.use(createPinia())
app.use(router)
window.eventEmitter = eventEmitter;
initEvent();
app.mount('#app')

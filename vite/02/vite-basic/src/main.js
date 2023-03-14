import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

console.log(import.meta.env)

app.use(createPinia())
app.use(router)

app.mount('#app')

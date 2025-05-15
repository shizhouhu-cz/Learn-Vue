import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import BlobPost from './components/Blobpost/BlobPost.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.component('BlobPost', BlobPost)
app.use(pinia)
console.log(pinia)
app.mount('#app')

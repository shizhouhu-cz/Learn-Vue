import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import BlobPost from './components/Blobpost/BlobPost.vue';

const app = createApp(App)
app.component('BlobPost',BlobPost);
app.mount('#app')

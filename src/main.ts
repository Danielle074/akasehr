import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importe le fichier que vous venez de me montrer
// ✅ IMPORT DU CSS
import './style.css'
const app = createApp(App)

app.use(router) // 👈 OBLIGATOIRE : Enregistre <router-view> globalement

app.mount('#app') // 👈 Doit toujours être en dernier

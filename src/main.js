
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { useStateStore } from './store/store'
import { dataApi } from './api/dataApi'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
const state = useStateStore()
dataApi.initialize(state.api_url)
app.mount('#app')

  
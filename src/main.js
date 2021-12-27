import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";

const app = createApp(App).use(store).use(ElementPlus).use(router).mount('#app')
axios.defaults.withCredentials = true
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import {googleMapPrivateKey} from "./utils/const/const";
import GoogleMap from "googlemaps-vue3";

const app = createApp(App)
    .use(store)
    .use(ElementPlus)
    .use(router)
    .use(GoogleMap,{apiKey:googleMapPrivateKey})
    .mount('#app')
axios.defaults.withCredentials = true


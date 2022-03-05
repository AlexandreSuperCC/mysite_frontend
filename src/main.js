import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import {googleMapPrivateKey} from "./utils/const/const";
import VueGoogleMaps from '@fawmi/vue-google-maps'


const app = createApp(App)
    .use(store)
    .use(ElementPlus)
    .use(router)
    .use(VueGoogleMaps, {
            load: {
                key: googleMapPrivateKey,
                // language: 'de',
            }
        })
    .mount('#app')

axios.defaults.withCredentials = true


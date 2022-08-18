import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axios from "axios";
import {googleMapPrivateKey} from "./utils/const/const";
import VueGoogleMaps from '@fawmi/vue-google-maps'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

   app.use(store)
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


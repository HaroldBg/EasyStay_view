import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
/* import font awesome icon component */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Import specific icon packs
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
const options = {
  // Customize your options here
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};
// Add icon packs to the library
library.add(fas, far, fab)
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.use(vuetify)
app.use(Toast, options)
app.provide('icons', icons)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')

import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faGear,
  faCheckCircle,
  faCircleExclamation,
  faPlay,
  faTimes,
  faArrowCircleDown,
  faArrowCircleUp
} from '@fortawesome/free-solid-svg-icons'
import './index.css'

const icons = [
  faGear,
  faCheckCircle,
  faCircleExclamation,
  faPlay,
  faTimes,
  faArrowCircleDown,
  faArrowCircleUp
]

icons.forEach(icon => {
  library.add(icon)
})

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { 
  faShield,      
  faChartLine, 
  faTruck,       
  faAward, 
  faUsers,        
  faGlobe,
  faArrowRight,
  faPaperPlane,
  faArrowUpRightFromSquare,
  faCommentDots,
  faDownload,
  faFile,
  faEnvelope,
  faPhone,
  faLocationDot,faCalendarDays ,faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faShield, 
  faChartLine, 
  faTruck, 
  faAward, 
  faUsers, 
  faGlobe, 
  faArrowRight,
  faPaperPlane,
  faArrowUpRightFromSquare,
  faCommentDots,
  faDownload,
  faFile,
  faEnvelope,
  faPhone,
  faLocationDot,faCalendarDays ,faCircleCheck,faLocationDot
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(i18n) 
app.mount('#app')
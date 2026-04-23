import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
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
  faEnvelope
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
  faEnvelope
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
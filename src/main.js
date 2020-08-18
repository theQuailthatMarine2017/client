import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import store from "./store";
import VideoBackground from 'vue-responsive-video-background-player'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCarousel from 'vue-carousel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { VueReCaptcha } from 'vue-recaptcha-v3'

library.add(faUserSecret)

Vue.use(VueSweetalert2);
Vue.use(Loading);
Vue.use(VueReCaptcha, { siteKey: '6Le5zbYZAAAAAPYw_xfHK_60AVR5cBsAKaDx-42z',loaderOptions: {
  useRecaptchaNet: true
} })
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueCarousel);

// import style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

 Vue.component('video-background', VideoBackground);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

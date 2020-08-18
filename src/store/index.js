import Vuex from "vuex";
import Vue from "vue";
import movies from "./modules/movies";
import user_auth from "./modules/userauth";


// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    movies,
    user_auth
  }
});
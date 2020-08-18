/* eslint-disable no-mixed-spaces-and-tabs */
import store from '../store/index'

export default (to, from, next) => {

  if (localStorage != null) {

  	//User Has Token and User Info Stored Local So Auto Sign Triggered

  	var token = localStorage.getItem("token")
    store.commit('AddToken', token);

    next();

  } else {

  	localStorage.removeItem("token");
    localStorage.removeItem("user_email_mobile");

    next("/");
  }
};
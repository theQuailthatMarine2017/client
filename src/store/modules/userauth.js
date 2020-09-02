import axios from 'axios';

export default {
  state: {
    err:null,
    sign_in_token:null,
    verify_token:null,
    subscribed:null
  },
  getters: {
    err: state => state.err,
    sign_in_token: state => state.sign_in_token,
    verify_token: state => state.verify_token,
    subscribed: state => state.subscribed
  },
  mutations: {
    AddSignInToken(state, data){

        state.sign_in_token = data;
    },
    AddVerifyToken(state, data){

      state.verify_token = data;
    },
    AddSubscription(state, data){

      state.subscribed = data;
    },
    AddError(state,data){

        state.err = data;
    },
    clearError(state){

        state.err = null;
    },
    LoggOff(state){

        state.sign_in_token = null;
        state.verify_token = null;
        state.err = null;
    },
  },
  actions: {
    login({commit}, data) {

      console.log(data)

      commit("AddError", null)
          axios.post('https://83b9599fb72c.ngrok.io/api/q-flix/login-user', data).then( response => {

            console.log(response.data);
            
            localStorage.setItem("sign_in_token", response.data.token);
            localStorage.setItem("user_mobile", response.data.mobile);
            localStorage.setItem("verified_status", response.data.verified);

            commit("AddSignInToken",response.data.token);

          }).catch( err => {

              console.log(err.message);

              if(err.message === "Request failed with status code 403"){

                var error_password = "Wrong Password"
                commit("AddError", error_password)
                
              }

              if(err.message === "Request failed with status code 401"){

                var error_email = "User Does Not Exist. Check Email Address"
                commit("AddError", error_email)
                
              }

              if(err.message === "Request failed with status code 500"){

                var error_unknown = "Server Error"
                commit("AddError", error_unknown)
                
              }

          })

    },
    createuser({commit}, data) {

      commit("AddError", null)

      console.log(data)

      axios.post('https://83b9599fb72c.ngrok.io/api/q-flix/create-account', data).then( response => {

            console.log(response.data)
            
            localStorage.setItem("verify_token", response.data.token);
            localStorage.setItem("user_mobile", response.data.mobile);
            
            commit("AddVerifyToken",response.data.token);

      }).catch( err => {

        if(err.message === 'Request failed with status code 500'){

            var error = 'Server Error.'
            console.log("Request Error App: " + error);
            commit("AddError", error)

        }
      })
    },
    verify({commit},data){

      commit("AddError", null)

      axios.post('https://83b9599fb72c.ngrok.io/api/q-flix/verify-user',data).then( response => {

        if(response.data.title === 'verified'){

          localStorage.setItem("sign_in_token", response.data.token);
          localStorage.setItem('verified_status', response.data.verified);
          localStorage.setItem("user_mobile", response.data.mobile);

          commit("AddSignInToken",response.data.token);

        }

      }).catch( err => {

        if(err.message === 'Request failed with status code 401'){

          var error = 'Unknown Error'
          console.log("Verify Error App: " + error);
          commit("AddError", error)
        }

        if(err.message === 'Request failed with status code 500'){

          var error_email_mobile = 'Unknown Error'
          console.log("Verify Error App: " + error_email_mobile);
          commit("AddError", error_email_mobile)
        }

      })
    },
    subscribe({commit},data) {

      commit("AddError", null)

      //headers credentials
      let config = {
        headers: {
          Authorization: "Bearer MiqusybzGx15yt8KzK3o8pgSosAJ",
        }
      }
      axios.post('https://83b9599fb72c.ngrok.io/api/q-flix/subscribe',data,config).then( response => {
        
        localStorage.setItem("subscribed", response.data.subscribed)
        commit("AddSubscription", response.data.subscribed)
        
      }).catch( err => {

        if(err.message === 'Request failed with status code 500'){

          var error_email_mobile = 'Unknown Error'
          console.log("Verify Error App: " + error_email_mobile);
          commit("AddError", error_email_mobile)
        }

      })
    },
    signOut({commit},data) {

      axios.post('https://83b9599fb72c.ngrok.io/api/q-flix/sign-out',data).then( response => {

          if(response.data.title === 'SignedOut'){

            localStorage.clear(); 
            commit('LoggOff');

          }

      }).catch( err => {

        if(err === 'Request failed with status code 500'){

          var error = 'Unknown Error'
          console.log("Request Error App: " + error);
           commit("AddError", error)
       }

            console.log("Request Error App: " + err);
            commit("AddError", err.title)
          

      })
      
    }
  }
};
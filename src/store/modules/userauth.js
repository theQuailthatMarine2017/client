import axios from 'axios';

export default {
  state: {
    err:null,
    token:null,
  },
  getters: {
    err: state => state.err,
    token: state => state.token,
  },
  mutations: {
    AddToken(state, data){

        state.token = data;
    },
    AddError(state,data){

        state.err = data;
    },
    clearError(state){

        state.err = null;
    },
    LoggOff(state){

        state.token = null;
        state.err = null;
    },
  },
  actions: {
    login({commit}, data) {

      console.log(data)

          axios.post('http://localhost:9100/api/q-flix/login-user', data).then( response => {

            console.log(response.data);
            
            localStorage.setItem("sign_token", response.data.token);
            localStorage.setItem("user_email_mobile", response.data.user_account.email_mobile);

            commit("AddToken",response.data.token);


          }).catch( err => {
              console.log("Request Error App: " + typeof err.toString);

              if(err === 'Error: Request failed with status code 403'){
                console.log('fewreirfbmo')
              }
              commit("AddError", err)

          })

    },
    createuser({commit}, data) {

      console.log(data)

      axios.post('http://localhost:9100/api/q-flix/create-account', data).then( response => {

            console.log(response.data)
            
            localStorage.setItem("verify_token", response.data.token);
            localStorage.setItem("user_email_mobile", response.data.email_mobile);
            
            commit("AddToken",response.data.token);

      }).catch( err => {

        if(err === 'Error: Request failed with status code 500'){

            var error = 'Password Incorrect'
            console.log("Request Error App: " + error);
            commit("AddError", error)

        }
      })
    },
    verify({commit},data){

      axios.post('http://localhost:9100/api/q-flix/verify-user',data).then( response => {

        if(response.data.title === 'verified'){

          localStorage.setItem("sign_in_token", response.data.token);
          localStorage.setItem("user_email_mobile", response.data.email_mobile);
          localStorage.setItem("verified_status", response.data.verified);


          commit("AddToken",response.data.token);
        }

      }).catch( err => {

            console.log("Verify Error App: " + err);
            commit("AddError", err)

      })
    },
    signOut({commit},data) {

      axios.post('http://localhost:9100/api/q-flix/sign-out',data).then( response => {

          if(response.data.title === 'SignedOut'){

            localStorage.clear(); 
            commit('LoggOff');

          }

      }).catch( err => {

            console.log("Request Error App: " + err);
            commit("AddError", err.title)
          

      })
      
    }
  }
};
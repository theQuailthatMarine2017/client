import axios from 'axios';

export default {
  state: {
    err:null,
    sign_in_token:null,
    verify_token:null,
    subscribed:null,
    new_code:null,
    password_changed:null,
    password_token:null,
    payment_status:null
  },
  getters: {
    err: state => state.err,
    password_changed: state => state.password_changed,
    password_token: state => state.password_token,
    new_code: state => state.new_code,
    sign_in_token: state => state.sign_in_token,
    verify_token: state => state.verify_token,
    subscribed: state => state.subscribed,
    payment_status: state => state.payment_status
  },
  mutations: {
    AddSignInToken(state, data){

        state.sign_in_token = data;
    },
    PasswordChanged(state, data){

      state.password_changed = data;

    },
    AddPassToken(state, data){

      state.password_token = data
    },
    AddVerifyToken(state, data){

      state.verify_token = data;
    },
    PaymentProcessStatus(state, data){

      state.payment_status = data;

    },
    AddSubscription(state, data){

      state.subscribed = data;

    },
    AddError(state,data){

        state.err = data;

    },
    NewCode(state,data){

      state.new_code = data;
    },
    clearError(state){

        state.err = null;
    },
    LoggOff(state){

        state.sign_in_token = null;
        state.verify_token = null;
        state.err = null;
        state.subscribed = null;
        state.new_code = null;
        state.payment_status = null;
    },
  },
  actions: {
    login({commit}, data) {

      console.log(data)

      commit("AddError", null)
          axios.post('https://7278333d9272.ngrok.io/api/q-flix/login-user', data).then( response => {

            console.log(response.data);
            
            localStorage.setItem("sign_in_token", response.data.token);
            localStorage.setItem("user_mobile", response.data.mobile);
            localStorage.setItem("subscribed", response.data.subscribed);

            commit("AddSignInToken",response.data.token);

          }).catch( err => {

              console.log(err.message);

              if(err.message === "Request failed with status code 403"){

                var error_password = "Wrong Password"
                commit("AddError", error_password)
                
              }

              if(err.message === "Request failed with status code 401"){

                var error_email = "User Does Not Exist. Check Mobile Number"
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

      axios.post('https://7278333d9272.ngrok.io/api/q-flix/create-account', data).then( response => {

            console.log(response.data)
            
            localStorage.setItem("verify_token", response.data.token);
            localStorage.setItem("user_mobile", response.data.mobile);
            
            
            commit("AddVerifyToken",response.data.token);

      }).catch( err => {

        if(err.message === 'Request failed with status code 500'){

            var error = 'Please Complete Form or Use A Different Username or Mobile Number.'
            console.log("Request Error App: " + error);
            commit("AddError", error)

        }

        if(err.message === 'Request failed with status code 401'){

          var error_err = 'Phone Number Invalid.'
          console.log("Request Error App: " + error_err);
          commit("AddError", error_err)

      }
      })
    },
    request_new_verify_code({commit}){

      commit("AddError", null)
      commit("NewCode", null)

      axios.get('https://7278333d9272.ngrok.io/api/q-flix/request-token',{params: {
        verify_token: localStorage.getItem('verify_token')}
      }).then( response => {

          if(response.data.title === 'New Token Generated'){

            commit("NewCode", response.data.status)

          }

      }).catch( err => {


        if(err.message === 'Request failed with status code 501'){

          var error_email_mobile = 'Please Enter Correct Token Code or Request For New One!'
          console.log("Verify Error App: " + error_email_mobile);
          commit("AddError", error_email_mobile)
        }

      })
    },
    get_password_reset_token({commit},data){

      commit("AddError", null)
      axios.get('https://7278333d9272.ngrok.io/api/q-flix/password-reset',{params: {
        mobile: data}
      }).then( response => {

        if(response.data.title === 'token generated'){

          commit("AddPassToken",response.data.token);

        }

      }).catch( err => {

        if(err.message === 'Request failed with status code 401'){

          var error = 'Unknown Mobile / Username '
          console.log("Verify Error App: " + error);
          commit("AddError", error)
        }

        if(err.message === 'Request failed with status code 501'){

          var error_email_mobile = 'Server Error'
          console.log("Verify Error App: " + error_email_mobile);
          commit("AddError", error_email_mobile)
        }

      })

    },
    change_pass({commit},data){

      commit("AddError", null)

      axios.post('https://7278333d9272.ngrok.io/api/q-flix/change-password', data).then( resposne => {

      console.log(resposne)
          if(resposne.data.title === 'Password Changed'){

            commit("PasswordChanged", resposne.data.changed)

          }

      }).catch(err => {

          if(err.message === 'Request failed with status code 501'){

            var error_email_mobile = 'Server Error'
            console.log("Verify Error App: " + error_email_mobile);
            commit("AddError", error_email_mobile)
          }

      })
    },
    verify({commit},data){

      commit("AddError", null)

      axios.post('https://7278333d9272.ngrok.io/api/q-flix/verify-user',data).then( response => {

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

        if(err.message === 'Request failed with status code 501'){

          var error_email_mobile = 'Please Enter Correct Token Code or Request For New One!'
          console.log("Verify Error App: " + error_email_mobile);
          commit("AddError", error_email_mobile)
        }

      })
    },
    subscribe({commit},data){

      commit("AddError", null)
      commit("PaymentProcessStatus", null)

      //headers credentials
      let config = {
        headers: {
          Authorization: "Bearer ZbIXG3mX7qlqh0da9Yq1UUFuYCiK",
          "Content-Type":"application/json"
        }
      }

      axios.post('https://7278333d9272.ngrok.io/api/q-flix/subscribe',data,config).then( response => {
        
      
        if(response.data.title === 'Processing Payment Request'){

            console.log(response)
            
            commit("PaymentProcessStatus", response.data.status)
            //localstorage user_id
            localStorage.setItem("user_id", response.data.user_id);


        }
        
      }).catch( err => {

        if(err.message === 'Request failed with status code 500'){

          var error_email_mobile = 'Unknown Error'
          console.log("Verify Error App: " + error_email_mobile);
          commit("AddError", error_email_mobile)
        }

      })
    },
    confirm_payment({commit}) {

      commit("AddError", null)
      commit("PaymentProcessStatus", null)

      console.log('<----- Payment Verify ----->')
      
      axios.get('https://7278333d9272.ngrok.io/api/q-flix/confirm-user-payment',{params: {user_id: localStorage.getItem('user_id')}
    }).then( response => {

          console.log(response)

          if(response.data.title === 'Payment Failed'){

            console.log("Request Error App: " + response.data.reason);
            commit("AddError", response.data.reason)

          }else {

            //Subscribed status received and stored local storage and commit
            commit("AddSubscription", response.data.status)
            localStorage.setItem('subscribed', response.data.title)
            
          }

      }).catch( err => {

          if(err === 'Request failed with status code 500'){

            var error = 'Unknown Error'
            console.log("Request Error App: " + error);
            commit("AddError", error)

          }

      });
    },
    signOut({commit},data) {

      axios.post('https://7278333d9272.ngrok.io/api/q-flix/sign-out',data).then( response => {

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
          

      })
      
    }
  }
};
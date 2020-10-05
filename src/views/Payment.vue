<template>
    <div class="register">
        <v-toolbar color="black" height="95px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
     
    </v-toolbar>

<v-container>
    <v-row no-gutters>
        <v-col cols="12" md="4">
          <div v-if="!isMobile()" class="banner-ad"></div>
          <div v-if="isMobile()" class="banner-ad-2"></div>
        </v-col>
        <v-col cols="12" md="8">
            <v-card ref="validate" style="text-align:center;" class="mt-5">
                <img style="margin-top:19px;" src="https://www.optima.co.ke/web/image/product.template/50/image?unique=ef17b70" height="150px">
                <h3 style="text-align:center;">Pay Your Monthly Subscription with Mpesa Online!</h3>
                <p style="text-align:center;font-weight:bold">Your Subscription Will Be Charged To {{ mobile }}.</p>
                                <p style="text-align:center;font-weight:bold">Please Have Your Mobile With You To Complete Payment Proccess and Please wait for MPESA Transaction text on your Mobile before clicking the Confirm Payment Button.</p>

                <v-card-actions>
                <v-autocomplete 
              :rules="[() => !!subscription || 'This field is required']"
              :items="subscriptions"
              v-model="subscription"
              label="Select Prefered Subscription"
              required
               solo-inverted
            ></v-autocomplete>
                </v-card-actions>

                <v-card-actions>
                <v-btn block color="black" :v-if="confirm === true" :disabled="confirm_d" @click="recaptcha" style="color:white;">Click Pay Subscription</v-btn>
                </v-card-actions>
                <v-card-actions>
                <v-btn block color="black" :v-if="disable === false" :disabled="disable" @click="confirm_sub" style="color:white;">Click Here To Confirm Payment</v-btn>
                </v-card-actions>
                <p style="text-align:center;font-weight:bold">Dont Have Access Or No Funds On The Above Mobile Number?</p>
          <v-card-actions>
            <v-btn block color="black" @click="recaptcha" style="color:white;">Click Here To Pay Subscription Using Different Mobile</v-btn>
          </v-card-actions>
        </v-card>
  
        </v-col>
    </v-row>
</v-container>

    </div>
</template>

<script>
// @ is an alias to /src
import { mapActions,mapGetters } from "vuex";
import axios from 'axios';

export default{
    mounted(){

        console.log(localStorage.getItem('sign_in_token'))
        console.log(localStorage.getItem('user_mobile'))

        this.mobile = localStorage.getItem('user_mobile')
        this.getActiveSubscriptions()
    },
    data(){
        return{
            name:null,
            disable:true,
            confirm:true,
            confirm_d:false,
            alternate:null,
            mobile:null,
            subscription:null,
            subscriptions:[]

        }
    },
    methods:{
      ...mapActions(["subscribe","confirm_payment"]),
        isMobile() {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
          } else {
            return false
          }
        },
        getActiveSubscriptions(){
          
          //Fetch active subscriptions from DB
          axios.get('https://c70653a894dc.ngrok.io/api/q-flix/active-subscriptions').then( response => {

            console.log(response.data.active)

            for (let index = 0; index < response.data.active.length; index++) {
              
              this.subscriptions.push(response.data.active[index].subscriptionName)
              
            }

            console.log(this.subscriptions)

          }).catch( err => {

              this.$awn.alert(err)
              
            })

        },
        confirm_sub() {

          this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.validate.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

          
          this.confirm_payment()

        },
        async recaptcha() {


          if(localStorage.getItem('sign_in_token') != null){

            if(this.subscription != null){

              this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.validate.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

              this.subscribe({mobile:localStorage.getItem('user_mobile'),subcription:this.subscription})

            }else{

              this.$awn.alert('Please Select Subscription!')
            }


         
        } else {

          localStorage.clear()
          this.$router.push('/')
        }
    },
    //
    },
    computed:{
      ...mapGetters(["subscribed","err","payment_status"]),
    },
    watch:{
      payment_status(val){

        if(val === "true"){

          console.log('<----- Payment Processing ----->')
          this.loader.hide()
          this.confirm_d = true
          this.disable = false
        }
      },
      subscribed(val){
        if(val === true){

          //Registration succesful
          this.loader.hide()
          this.disable = true
          this.confirm = true// Check if second payment option is been useder.hide()
          this.$router.push('/')
          
        }
      },
      err(val){
        if(val != null){

          this.loader.hide()
          this.$awn.alert(val)
          this.confirm_d = false
          this.disable = true

        }
      }
    }

}

</script>

<style scoped>

.centered-input >>> input {
      text-align: center
    }

.centered-input >>> placeholder {
      color: black
    }

h3{
  word-break: normal;
}

.register{
    background-image: url("https://storemedia.cineplex.com/ways-to-watch/background/desktop-waystowatch-bb.jpg");
    
    
    min-height:100vh;
    
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
    flex: 1 0 auto;
}

.v-card {
    background: rgba(255, 255, 255, 0.75);
  }


@media only screen and (max-width: 600px) {
  .banner-ad{
    height:690px;
 background: url(https://i.ibb.co/p4mtRVQ/banner.jpg); 
  background-repeat: no-repeat;
  background-size:365px 60px;
  object-fit:contain;
  }
}

.banner-ad{
    height:520px;
    margin-top:20px;
  background: url(https://sevenbrands.com/wp-content/uploads/2018/07/Masoko-E-Commerce-Advertising-3-1200x1439.jpg); 
  background-repeat: no-repeat;
  background-size:365px 520px;
  object-fit:contain;
}

.banner-ad-2{
    height:120px;
    margin-top:10px;
  background: url(https://pbs.twimg.com/media/DQ0wiueXkAASFZB.jpg:small); 
  background-repeat: no-repeat;
  background-size:385px 120px;
  object-fit:contain;
}
</style>
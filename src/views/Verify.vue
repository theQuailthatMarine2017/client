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
                <img style="margin-top:19px;" src="https://cdn1.iconfinder.com/data/icons/basic-ui-icon-rounded-colored/512/icon-41-512.png" height="150px">
                <h3 style="text-align:center;">Please Verify Your Account!</h3>
                <p style="text-align:center;font-weight:bold">For Security and Account Validity Reasons, We Require That You Verify Your Account First.<br/><br/>Enter The Five Digit Code Sent To The Mobile Number You Registered Your Account With Below</p>
                <v-text-field
                    style="margin-left:10px;margin-right:10px;"
                    v-model="name"
                    placeholder="Enter Code"
                    class="centered-input"
                    centered
                    required
                    inverted
                ></v-text-field>
          
          <v-card-actions>
            <v-btn block color="black" @click="recaptcha" style="color:white;">Click Here To Verify Account</v-btn>
          </v-card-actions>
          <p style="font-weight:bolder;">Didn't receive verify code?</p>
          <v-card-actions>
            <v-btn block color="black" @click="request_new_code" style="color:white;">Click Here To Request New Code</v-btn>
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

export default{
    mounted(){

        console.log(localStorage.getItem('verify_token'))
        console.log(localStorage.getItem('user_mobile'))
    },
    data(){
        return{
            name:null

        }
    },
    methods:{
      ...mapActions(["verify","request_new_verify_code"]),
        isMobile() {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
          } else {
            return false
          }
        },
        request_new_code(){

          this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.validate.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

          this.request_new_verify_code();

        },
        recaptcha() {

            this.loader = this.$loading.show({
                  // Optional parameters
                  color: '#ff0000',
                  container: this.$refs.validate.$el,
                  canCancel:true,
                  width: 75,
                  height: 75,
                  opacity: 0.7,
                  
                });

            this.verify({mobile:localStorage.getItem('user_mobile'),pass_code:this.name})
            
        }
    },
    computed:{
      ...mapGetters(["sign_in_token","new_code"]),
    },
    watch:{
      sign_in_token(val){
        if(val != null){

          //Registration succesful

          this.loader.hide()
          this.$router.push('/subscribe')
          
        }
      },
      new_code(val){

        if(val === true){

          this.loader.hide()
        }
      },
      err(val){
        if(val != null){

          this.$awn.alert(val)

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
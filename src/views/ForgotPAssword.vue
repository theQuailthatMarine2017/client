<template>
    <div class="register">
        <v-toolbar color="black" height="95px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
     
    </v-toolbar>

<v-container>
    <v-row no-gutters class="justify-center">
        <v-col cols="6" md="6" sm="6">
            <v-card ref="validate" style="text-align:center;" class="mt-5">
                <img style="margin-top:19px;" src="../../public/password.png" height="150px">
                <h1 style="text-align:center;font-weight:bold">Password Recovery</h1>
                <h3 style="text-align:center;font-weight:bold">For Security and Account Validity Reasons, We Require That You Submit The Mobile Number You Registered Your Account With Before You Can Change Your Password.</h3>
                  <vue-tel-input-vuetify style="margin-left:10px;margin-right:10px;" :onlyCountries="country" mode="international"  label="Enter Mobile Number" v-model="mobile"></vue-tel-input-vuetify>
          <v-card-actions>
            <v-btn block color="black" @click="password_reset" style="color:white;">SUBMIT</v-btn>
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
            mobile:null

        }
    },
    methods:{
      ...mapActions(["get_password_reset_token"]),
        password_reset(){


          if(this.mobile != null){

            this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.validate.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

            this.get_password_reset_token(this.mobile)

          }else{

            this.$awn.alert('Please Enter Mobile Number')
          }

        }
    },
    computed:{
      ...mapGetters(["password_token","err"]),
    },
    watch:{
      password_token(val){
        if(val != null){

          //Registration succesful
          console.log('<------Password Reset Token------>')
          console.log(val)
          this.loader.hide()
          this.$router.push({ path: '/change-password/:token', query: { token:val } })
          
        }
      },
      err(val){
        if(val != null){

          this.$awn.alert(val)
          this.loader.hide()

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
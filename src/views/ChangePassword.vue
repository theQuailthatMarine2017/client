<template>
    <div class="register">
        <v-toolbar color="black" height="95px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
     
    </v-toolbar>

<v-container v-if="password_updated === false">
    <v-row no-gutters class="justify-center">
        <v-col cols="6" md="6" sm="6">
            <v-card ref="validate" style="text-align:center;" class="mt-5">
                <img style="margin-top:19px;" src="../../public/password.png" height="150px">
                <h1 style="text-align:center;font-weight:bold">Change Password</h1>
                <h3 style="text-align:center;font-weight:bold">Enter New Password, Confirm The New Password and Enter The Reset Code Sent To Your Mobile Number.</h3>

                 <v-text-field
                 style="margin-left:10px;margin-right:10px;"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Enter Secure Password"
              hint="At least 8 characters"
               solo-inverted
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="confirm_password"
              style="margin-left:10px;margin-right:10px;"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Enter Secure Password"
              hint="At least 8 characters"
               solo-inverted
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="pass_code"
              style="margin-left:10px;margin-right:10px;"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'pass_code'"
              name="input-10-1"
              label="Enter Reset Code"
               solo-inverted
              @click:append="show1 = !show1"
            ></v-text-field>

          <v-card-actions>
            <v-btn block color="black" @click="change_password" style="color:white;">CHANGE PASSWORD</v-btn>
          </v-card-actions>
        </v-card>
  
        </v-col>
    </v-row>
</v-container>


<v-container v-if="password_updated === true">
    <v-row no-gutters class="justify-center">
        <v-col cols="6" md="6" sm="6">

             <v-card ref="validate" style="text-align:center;" class="mt-5">
                <img style="margin-top:19px;" src="../../public/password.png" height="150px">
                <h3 style="text-align:center;font-weight:bold">Your Password Has Been Successfully Updated Securely!</h3>
                <v-card-actions>
                    
            <v-btn block @click="goHome" color="black" style="color:white;">GO MAIN PAGE</v-btn>
                   
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

        console.log(this.$route.query['token'])
        this.token = this.$route.query['token']
    },
    data(){
        return{
            password:null,
            confirm_password:null,
            pass_code:null,
            password_updated:false,
            token:null,
            rules: {
                required: value => !!value || 'Paswword Required.',
                min: password => password.length >= 8 || 'Min 8 characters',
            },

        }
    },
    methods:{
      ...mapActions(["change_pass"]),
        change_password(){


          if(this.token != null && this.pass_code != null && this.password === this.confirm_password){

            this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.validate.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

            this.change_pass({new_password:this.password,reset_token:this.token,pass_code:this.pass_code})

          }else{

            this.$awn.alert('Please Make Sure Password Match Or Request a New Passcode')
          }

        },
        goHome(){

            this.$router.push('/')
        }
    },
    computed:{
      ...mapGetters(["password_changed","err"]),
    },
    watch:{
      password_changed(val){
        if(val === true){

          //Registration succesful
          console.log('<------Password Reset Token------>')
          console.log(val)
          this.loader.hide()
          this.password_updated = true
          
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
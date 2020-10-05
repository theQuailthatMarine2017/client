<template>
    <div class="register">
        <v-toolbar color="black" height="95px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
      <v-toolbar-items>
         <v-btn @click="goBack"
          v-for="item in menu"
          :key="item.icon"
          :to="item.link"
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.icon">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>   
        </v-list>
      </v-menu>
    </v-toolbar>

<v-container>
    <v-row no-gutters>
        <v-col cols="12" md="4">
          <div v-if="!isMobile()" class="banner-ad"></div>
          <div v-if="isMobile()" class="banner-ad-2"></div>
        </v-col>
        <v-col cols="12" md="8">
            <v-card ref="reg" class="mt-5">
              <v-card-title>
                <h3>Create Your Account & Enjoy Endless Entertainment!</h3>
              </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="Enter Full Names"
              required
              solo-inverted
            ></v-text-field>

            <v-text-field
              v-model="username"
              :error-messages="errorMessages"
              label="Enter Username"
              required
              @click="icon_trigger()"
              solo-inverted
            ></v-text-field>

            <vue-tel-input-vuetify :onlyCountries="countries" mode="international"  label="Enter Mobile Valid Number" v-model="mobile"></vue-tel-input-vuetify>

            <v-text-field
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

            <div style="border: 2px solid grey;border-radius: 5px;padding:15px;margin-bottom:20px;">
              <p>Must Be 16 Years or Older</p>
              <VueDatePicker :visibleYearsNumber="years" name="Select Date of Birth" maxDate="2004-12-31" fullscreenMobile v-model="age" placeholder="Select Date Of Birth" />
            </div>

           <v-autocomplete
              :rules="[() => !!gender || 'This field is required']"
              :items="genders"
              v-model="gender"
              label="Select Gender"
              required
               solo-inverted
            ></v-autocomplete>

            
              <v-autocomplete 
              :rules="[() => !!city || 'This field is required']"
              :items="counties"
              v-model="city"
              label="Select County"
              required
               solo-inverted
            ></v-autocomplete>


            <v-checkbox
      v-model="user_agreement"
      label="Agree Terms and Conditions. By Accepting you have agreed to give your personal information."
    ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-slide-x-reverse-transition>
              <v-tooltip
                v-if="formHasErrors"
                left
              >
                <v-btn
                  slot="activator"
                  icon
                  class="my-0"
                  @click="resetForm"
                >
                  <v-icon>refresh</v-icon>
                </v-btn>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn block color="black" style="color:white;" @click="register">Create Account</v-btn>
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
import  Counties  from '../assets/counties.json';
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';


export default{
  components: {
    VueDatePicker
  },
    data(){
        return{
            menu: [
        { icon: 'home', title: 'Back' }
      ],
      genders: ['Male','Female','Other'],
      cities: ['Nairobi','Kisumu','Mombasa','Nakuru','Other'],
    errorMessages: [],
    currentDate:Date.now(),
    user_agreement:false,
    show1: false,
    show2: true,
    years:65,
    counties:[],
    show3: false,
    countries:['KE'],
    show4: false,
    rules: {
      required: value => !!value || 'Paswword Required.',
      min: password => password.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match'),
    },
    gender:null,
    password:'',
    age:null,
    username:null,
    city:null,
    name: null,
    mobile:null,
    formHasErrors: false,
        }
    },
    mounted(){

      for (const county of Counties){

        this.counties.push(county.name)

      }

      console.log(this.counties.length)
    },
    methods:{
      ...mapActions(["createuser"]),
        goBack(){

            this.$router.push('/')
        },
        icon_trigger(){

          this.username ='@'
          console.log('slslslsl')
        },
        isMobile() {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
          } else {
            return false
          }
        },
        register(){

          var now = new Date();
          var current_year = now.getFullYear();

          var user_dob = new Date(this.age);
          var year_birth = user_dob.getFullYear();

          console.log(current_year)
          console.log(year_birth)

          var final_age = current_year - year_birth
          var current_device = navigator.userAgent

          console.log("User Current Age is: " + final_age)

          if(this.user_agreement === false || this.password === null || this.password.length < 8){

            this.$swal('Alert!',
              'Please Agree To User Agreement or Make Sure Your Password Is Not Less Than 8 Characters',
              'warning');
            
          }else {

            if(final_age < 16){

            this.$swal('Alert!',
              'User Must Be Above 16 Years Old To Register');

             
              
            } else {

              this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.reg.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

              this.createuser({currentDeviceInfo:current_device,username:this.username,fullnames:this.name,mobile:this.mobile,age:this.age,gender:this.gender,city:this.city,password:this.password})
            }

          }

        }
    },
    computed:{
      ...mapGetters(["verify_token","err"]),
    },
    watch:{
      verify_token(val){
        if(val != null){

          //Registration succesful

          this.loader.hide()
          this.$router.push('/verify-account')
          
        }
      },
      err(val){
        if(val != null){

          this.loader.hide()
          this.$awn.alert(val)

        }
      }
    }
}

</script>

<style scoped>

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
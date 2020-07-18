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
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
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
        </v-col>
        <v-col cols="12" md="8">
            <v-card class="mt-5">
              <v-card-title>
                <h3>Create Your Account & Enjoy Endless Entertainment!</h3>
              </v-card-title>
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="Full Names"
              required
              solo-inverted
              @update:error="updateError()"
            ></v-text-field>

            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="Email or Mobile"
              required
              solo-inverted
              @update:error="updateError()"
            ></v-text-field>

            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="Enter Age"
              required
              solo-inverted
              @update:error="updateError()"
            ></v-text-field>

           <v-autocomplete
              ref="country"
              :rules="[() => !!city || 'This field is required']"
              :items="genders"
              v-model="gender"
              label="Select Gender"
              required
               solo-inverted
            ></v-autocomplete>
  
            <v-autocomplete
              ref="country"
              :rules="[() => !!city || 'This field is required']"
              :items="cities"
              v-model="city"
              label="Select City"
              required
               solo-inverted
            ></v-autocomplete>
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
            <v-btn block color="black" style="color:white;" flat @click="submit">Create Account</v-btn>
          </v-card-actions>
        </v-card>
  
        </v-col>
    </v-row>
</v-container>

    </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios';


export default{
    data(){
        return{
            menu: [
        { icon: 'home', title: 'Back' }
      ],
      genders: ['Male','Female','Other'],
      cities: ['Nairobi','Kisumu','Mombasa','Nakuru','Other'],
    errorMessages: [],
    gender:null,
    city:null,
    name: null,
    address: null,
    state: null,
    zip: null,
    country: null,
    formHasErrors: false,
        }
    },
    methods:{
        goBack(){

            this.$router.push('/')
        },
        isMobile() {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
          } else {
            return false
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
  background: url(http://www.ghafla.com/ke/wp-content/uploads/sites/4/2019/02/IMG_20190225_115956.jpg); 
  background-repeat: no-repeat;
  background-size:365px 520px;
  object-fit:contain;
}

.banner-ad-2{
    height:120px;
    margin-top:20px;
  background: url(https://i.ibb.co/p4mtRVQ/banner.jpg); 
  background-repeat: no-repeat;
  background-size:365px 620px;
  object-fit:contain;
}
</style>
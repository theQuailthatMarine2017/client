<template>
    <div class="register">
        <v-toolbar color="black" height="90px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
     <v-toolbar-items ref="signoff">
         <v-btn @click="signout"
         style="margin-right:10px;"
          v-for="item in menu2"
          :key="item.icon"
          :to="item.link"
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        
        <v-list>
          <v-list-tile v-for="item in menu2" :key="item.icon">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>   
        </v-list>
      </v-menu>
    </v-toolbar>

     <v-card-text style="margin-top:55px;" v-if="user_status === 'signed in'">
    </v-card-text>
    <v-tabs dark right hide-slider>
      <v-tab mobile-breakpoint="xs" to="/">HOME</v-tab>
      <v-tab mobile-breakpoint="xs" to="social">SOCIAL FEED</v-tab>
      <v-tab mobile-breakpoint="xs" >MANAGE ACCOUNT</v-tab>
    </v-tabs>
    <v-tabs dark right class="ma-0" hide-slider>
      <v-tab>
        <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        placeholder="Search Catalogue"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
      </v-tab>
    </v-tabs>

<v-container>
    <v-row no-gutters>
        <v-col cols="12" md="12" sm="12">

  
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
            user_status:'signed_in',
            menu: [
        { icon: 'home', title: 'Sign In' }
      ],
      menu2: [
        { icon: 'home', title: 'Sign Out' }
      ],

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

            this.get_password_reset_token({mobile:this.mobile})

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
          this.$router.push({ name: 'user', params: { val } })
          
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
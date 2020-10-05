<template>
  <div ref="pg" class="home">

    <v-toolbar color="black" height="90px;" v-if="user_status === 'signed in'">
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

    <v-toolbar color="black" height="95px;" absolute v-if="user_status === 'not signed in'">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
      <v-toolbar-items>
         <v-btn @click="dialog = true"
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
 <v-card-text style="margin-top:58px;" v-if="user_status === 'signed in'">
    </v-card-text>
    <v-tabs dark right hide-slider>
      <v-tab mobile-breakpoint="xs">HOME</v-tab>
      <v-tab @click="stop_audio" mobile-breakpoint="xs" to="/social">SOCIAL FEED</v-tab>
      <v-tab mobile-breakpoint="xs" to="/manage-account">MANAGE ACCOUNT</v-tab>
    </v-tabs>
    <v-tabs dark right class="ma-0" hide-slider>
      <v-tab>
        <v-autocomplete
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

<div class="banner">
  <!-- <video class="video-size" preload autoplay muted playsinline loop>
            <source src="../../public/trailer.mp4" type="video/mp4">
            </video> -->

            
         
                <!-- <video  preload autoplay muted playsinline loop>
                <source src="../../public/trailer.mp4" type="video/mp4">
                </video>  -->
                <div id="videoDiv">
                  <div id="videoBlock">   
                  <video ref="vid" id="video" preload autoplay muted playsinline loop>
                  <source src="../../public/trailer2.mp4" type="video/mp4">
                  </video> 
                  <div id="videoMessage">
                  <h1 class="spacer">The Drop...</h1>
                  <h2 class="spacer">Starring James Gandolfini & Tom Hardy...</h2>
                  <h2>Now Showing...</h2> 
                  <p class="videoClick" >
                  <a href="https://www.hotelsafloat.com/home-away.php">Watch Movie</a>
                  </p> 
                  </div>
                  </div>
                  </div>
                
        <!-- <div id="videoMessage">
                <h1 class="spacer">The Early Bird...</h1>
                <h2 class="spacer">...has the best holiday.</h2>
                <h3 class="spacer">Boat rentals in France</h3>
                <p class="videoClick" >
                <a href="https://www.hotelsafloat.com/home-away.php">Click here and be impressed</a>
                </p> 
                </div> -->
            
              

  </div> 

    <v-container ref="movies" grid-list-md style="color:white;margin-top:50px;">

      <h1 style="font-weight:bolder;-webkit-background-clip: text;">What's Hot</h1>

    <carousel :loop="true" 
 paginationColor="#ffffff" paginationActiveColor="#ff0000" navigationEnabled autoplay :paginationEnabled="false" :perPageCustom="[[768, 6], [480, 2]]">
  <slide v-for="movie in movies" :key="movie._id">
    <img @click="getmovie(movie._id)" class="img-size" height="200px;" width="180px;" :src="movie.imgPath">
  </slide>
</carousel>

<h1 style="font-weight:bolder;-webkit-background-clip: text;">New Movies</h1>
<carousel :loop="true" 
 paginationColor="#ffffff" paginationActiveColor="#ff0000" navigationEnabled autoplay :paginationEnabled="false" :perPageCustom="[[768, 6], [480, 2]]">
  <slide v-for="movie in movies" :key="movie._id">
    <img @click="test" class="img-size" height="200px;" width="180px;" :src="movie.imgPath">
  </slide>
</carousel>

<h1 style="font-weight:bolder;-webkit-background-clip: text;">Short Movies</h1>
<carousel :loop="true" 
 paginationColor="#ffffff" paginationActiveColor="#ff0000" navigationEnabled autoplay :paginationEnabled="false" :perPageCustom="[[768, 6], [480, 2]]">
  <slide v-for="movie in movies" :key="movie._id">
    <img @click="test" class="img-size" height="200px;" width="180px;" :src="movie.imgPath">
  </slide>
</carousel>

<h1 style="font-weight:bolder;-webkit-background-clip: text;">Documentaries</h1>
<carousel :loop="true" 
 paginationColor="#ffffff" paginationActiveColor="#ff0000" navigationEnabled autoplay :paginationEnabled="false" :perPageCustom="[[768, 6], [480, 2]]">
  <slide v-for="movie in movies" :key="movie._id">
    <img @click="test" class="img-size" height="200px;" width="180px;" :src="movie.imgPath">
  </slide>
</carousel>



    </v-container>

<v-dialog
      v-model="dialog"
      width="500"
      ref="signin"
    >

      <v-card>
        <v-card-title
          class="headline"
          primary-title
          style="background-color:black;color:white"
        >
        <img src="../../public/img/logo.png" height="60px">
        </v-card-title>

        <v-card-text>
          <v-col cols="12">                    
                <vue-tel-input-vuetify :onlyCountries="country" mode="international"  label="Enter Mobile Number" v-model="email_mobile"></vue-tel-input-vuetify>
                <v-text-field v-model="password" hide-details label="Enter Password" type="password" required></v-text-field>
              </v-col>
              <v-btn block large color="black" @click="login_user" style="color:white;margin-bottom:5px;">SIGN IN</v-btn>
              <v-btn block href="/register" large color="red" style="color:white;margin-bottom:5px;">CREATE ACCOUNT</v-btn>
              <v-btn block href="/forgot-password" large color="black" style="color:white;">Forgot Password? Click Here</v-btn>
        </v-card-text>
        <!-- <div class="banner-ad-2">
        </div> -->
      </v-card>
    </v-dialog>


    <!-- <v-dialog persistent v-model="movieplay">
      <v-toolbar dark color="#8b0000">
      <v-btn icon dark @click="stopmovie">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ movie_title }}</v-toolbar-title>
      </v-toolbar>
      <video class="video-size"  controls>
  <source :src="movie_source" type="video/mp4">
</video>
    </v-dialog> -->


  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'carrousel',
    data(){
      return{
        swiperOptions : {
        slidesPerView: 6,
        spaceBetween: 1,
        country:['KE'],
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      menu: [
        { icon: 'home', title: 'Sign In' }
      ],
      menu2: [
        { icon: 'home', title: 'Sign Out' }
      ],
        movieplay:false,
        dialog:false,
        isComponentModalActive:false,
        email_mobile:null,
        password:null,
        movie_source:'',
        movie_title:'',
        movies:null,
        user_status:'not signed in'
      }
    },
    computed: {
      ...mapGetters(["sign_in_token","err"]),
      
    },
    mounted(){
        // console.log(localStorage.getItem('verify_token') + localStorage.getItem('email_mobile'))
        console.log(this.$refs.vid)
        this.$refs.vid.defaultMuted = false
        this.$refs.vid.muted = false
        this.getmovies()
        
        //Check localstorage for token. If present user_status is signed in if not user isnt
        // if (localStorage.getItem('verify') === null){

        //   this.dialog = true
        // }

        // //Check localstorage for tokens. If none present user_status is not signed in
        // if (localStorage.getItem('sign_in_token') === null && localStorage.getItem('verify_token') === null){

        //   this.dialog = true

        // }
        this.check_status()

    },
    methods:{
      ...mapActions(["login","signOut"]),
      stop_audio(){

      
          this.audio.stop()
    },
        getmovies(){

                this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.movies.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

            // Guard all get requests with application secret base64 encoded string (Secret Phase:Secret Sentence) in header like mpesa bearer token

            axios.get('http://62.8.71.129:8500/api/q-flix/movies').then( response => {

              this.movies =  response.data
              console.log("Movies" + this.movies[0])

              this.loader.hide()


            })
            
        },
        check_subscribtion(){

          if(localStorage.getItem('subscribed') === 'false'){

            this.$router.push('/subscribe')
            this.loader.hide()

          }else {

            this.loader.hide()
          }

        },
        check_status(){

          if(localStorage.getItem('sign_in_token') === null){

            this.user_status = 'not signed in'
            this.loader.hide()

          }else {

            this.user_status = 'signed in'
            this.loader.hide()
            this.check_subscribtion()
          }

        },
        menuItems () {
      return this.menu
    },
        getmovie(id){

          if(localStorage.getItem('subscribed') === 'true'){

                this.$router.push({ name:'PlayMovie', params: { movie: id }})

          } else if(localStorage.getItem('sign_in_token') === null){

                this.dialog = true

          } else if(localStorage.getItem('subscribed') === 'false'){

                this.$router.push('/subscribe')
          }
           else{

                this.dialog = true

          }

          

        },
        login_user(){

          this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.pg.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

          

          this.login({mobile:this.email_mobile,password:this.password})

        

        },
        signout(){

          this.email_mobile = null
          this.password = null
          
          this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.signoff.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

          this.signOut({mobile:localStorage.getItem('user_mobile')})

        },
        test(){

          console.log('ksksksks')
        },
        stopmovie(){

          this.movie_source = '',
          this.movieplay = false
        }
    },
    watch:{
      sign_in_token(val){

        if(val != null){

          this.dialog = false
          this.user_status = 'signed in'
          this.check_status()

        }else if(val === null){

          this.dialog = false
          this.user_status = 'not signed in'
          this.check_status()

        }
      },
      $route (to, from){

        console.log(to,from)
        if(to != from){

         
          this.audio.stop()

        }
      },
      err(val){

        if (val != null){

          this.loader.hide()
        

          this.$awn.alert(val)

          this.user_status = 'not signed in'
  

        }

      }
    }
}
</script>

<style scoped>

#videoDiv {width: 100%; height:360px; position: relative;}
#videoBlock {width: 100%; height: 100%;  display: flex;  justify-content: center; align-items: center;}
#videoMessage {width: 100%; height:100%; position: absolute; top: 0; left: 0;}
#videoMessage *{padding:0.4em; margin:0}
#videoMessage {text-shadow: 2px 2px 2px #000000; color:white;z-index:99 }
#videoMessage h1{font-size: 2em;color:#ffffff;text-align:right;}
#videoMessage h2{font-size: 1.5em;color:#ffffff;text-align:right;}
#videoMessage h3{font-size: 1.2em;color:#ffffff;text-align:right;}
.videoClick {text-align:right}
.videoClick a{color:white;background-color:rgba(241, 241, 241, 0.25);font-size: 1.7em;cursor:pointer;cursor:hand}
.audioClick {text-align:right}
.audioClick a{margin-bottom:50px;color:white;background-color:rgba(241, 241, 241, 0.25);font-size: 1.3em;cursor:pointer;cursor:hand}

@media screen and (max-width: 450px) {
  #videoBlock {
    height:190px;
    object-fit:cover;
    width:10px; /* The width is 100%, when the viewport is 800px or smaller */
  }
}

@media screen and (max-width: 450px) {
  video{
    pointer-events: none;
   -webkit-transform: scaleX(2); 
  -moz-transform: scaleX(2.4);
  height:100%;
  padding:0;
  }
}


.video-size{
  width:100%;
  height:350px;
  
}

video {
  pointer-events: none;
   -webkit-transform: scaleX(4); 
  -moz-transform: scaleX(2.4);
  width:900px;
  height:100%;
  object-fit: contain;
}

video::-webkit-media-controls {
  display:none !important;
}

.banner-ad{
  height:300px;
  background: url(https://sevenbrands.com/wp-content/uploads/2018/07/Masoko-E-Commerce-Advertising-2-2400x1130.jpg); 
  background-repeat: no-repeat;
  background-size:1160px 650px;
  object-fit:cover;
  background-color: rgba(255, 0, 0, 0.5);
  margin:0;
  min-width: 100%
}


.banner-ad-2{
  height:120px;
  background: url(https://urbankenyans.com/wp-content/uploads/2017/11/masoko-by-safaricom.jpg); 
  background-repeat: no-repeat;
  background-size:500px 120px;
  object-fit:contain;
}

.banner {
  background-size:1160px 650px;
  
  height:300px;
  width:1240px;
  
}

.banner__video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  min-width: 100%;
  height: auto;
  min-height: 100%;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
}


@media only screen and (max-width: 450px) {
  .banner-ad-2 {
    height:60px;
  background: url(https://urbankenyans.com/wp-content/uploads/2017/11/masoko-by-safaricom.jpg); 
  background-repeat: no-repeat;
  background-size:365px 60px;
  object-fit:contain;
  }
}

@media only screen and (max-width: 450px) {
  .banner-ad {
    height:130px;
  background: url(https://i.ibb.co/p4mtRVQ/banner.jpg); 
  background-repeat: no-repeat;
  background-size:380px 130px;
  object-fit:contain;
  }
}

.img-size{
  position: relative;
  transition: transform 0.3s ease;
  transform: translateX(0px);
}

.nav-b{
  color:blue;
}

.img-size:hover{
  cursor: pointer;
  transform: translateY(-20px);
    
}

.item-nav{
 
  height: 50px;
  line-height: 50px;
  display: block;
}
.swiper-button-prev{
  background-color:black;
  padding:30px;
  color:white;
}

.swiper-button-next{
  background-color:black;
  padding:30px;
  color:white;
}
.home{
   background-image: url("https://storemedia.cineplex.com/ways-to-watch/background/desktop-waystowatch-bb.jpg");
    
    
    min-height:100vh;
    
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
    flex: 1 0 auto;
}




.video-size{
  width:100%;
  height:98%;
  
}



.wrapper {
    margin: 0 auto;
    width: 90%;
    height:auto;
}

header {
    width: 100%;
    max-width: 100%;
    position: fixed;
    margin-bottom: 90px;
    z-index: 999;
    
}

.row {
  display: flex;
}

.column {
  flex: 50%;
}

</style>

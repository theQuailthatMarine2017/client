<template>
  <div class="home">

    <v-toolbar color="black" height="95px;">
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

    <v-container grid-list-md style="margin-top:90px;color:white;">

      <div class="banner-ad">
  </div> 

      <h1 style="font-weight:bolder;-webkit-background-clip: text;">What's Hot</h1>

    <carousel :loop="true" 
 paginationColor="#ffffff" paginationActiveColor="#ff0000" :navigationStyle="nav-b" navigationEnabled autoplay paginationEnabled="false" :perPageCustom="[[768, 6], [480, 2]]">
  <slide v-for="movie in movies" :key="movie._id">
    <img @click="test" class="img-size" height="200px;" width="180px;" :src="movie.imgPath">
  </slide>
</carousel>

<h1 style="font-weight:bolder;-webkit-background-clip: text;">Live Streams</h1>
<carousel :loop="true" 
 paginationColor="#ffffff" paginationActiveColor="#ff0000" :navigationStyle="nav-b" navigationEnabled autoplay paginationEnabled="false" :perPageCustom="[[768, 6], [480, 2]]">
  <slide v-for="movie in movies" :key="movie._id">
    <img @click="test" class="img-size" height="200px;" width="180px;" :src="movie.imgPath">
  </slide>
</carousel>



    </v-container>

<v-dialog
      v-model="dialog"
      width="500"
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
                <v-text-field hide-details label="Email / Mobile" required></v-text-field>
                <v-text-field hide-details label="Password" type="password" required></v-text-field>
              </v-col>
              <v-btn block large color="black" style="color:white;">SIGN IN</v-btn>
              <p style="text-align:center;color:black;font-weight:bolder;">Don't Have An Account?</p>
              <v-btn block href="/register" large color="red">CREATE ACCOUNT</v-btn>
              <p style="text-align:center;color:black;font-weight:bolder;margin:0px;">Forgot Password? Click Here</p>
        </v-card-text>
        <div class="banner-ad-2">
        </div>
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

export default {
  name: 'carrousel',
    data(){
      return{
        swiperOptions : {
        slidesPerView: 6,
        spaceBetween: 1,
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
        movieplay:false,
        dialog:false,
        isComponentModalActive:false,
        movie_source:'',
        movie_title:'',
        movies:null,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      navigationNext: function() { return `<i class="fas fa-chevron-right"></i>` },
    },
    mounted(){

        this.getmovies()

        console.log('Current Swiper instance object', this.swiper)
        this.swiper.slideTo(3, 1000, false)
    },
    methods:{
        getmovies(){


            axios.get('http://62.8.71.129:8500/api/q-flix/movies').then( response => {

              this.movies =  response.data
              console.log("Movies" + this.movies[0])

            })
            
        },
        menuItems () {
      return this.menu
    },
        getmovie(id){


          this.$router.push({ name:'PlayMovie', params: { movie: id }})

        },
        goToRegister(){
          
          this.$router.push('/register')
        },
        stopmovie(){

          this.movie_source = '',
          this.movieplay = false
        }
    }
}
</script>

<style scoped>

.banner-ad{
  height:150px;
  background: url(https://sevenbrands.com/wp-content/uploads/2018/07/Masoko-E-Commerce-Advertising-2-2400x1130.jpg); 
  background-repeat: no-repeat;
  background-size:1160px 150px;
  object-fit:contain;
}

.banner-ad-2{
  height:60px;
  background: url(https://i.ibb.co/p4mtRVQ/banner.jpg); 
  background-repeat: no-repeat;
  background-size:500px 60px;
  object-fit:contain;
}

@media only screen and (max-width: 450px) {
  .banner-ad-2 {
    height:60px;
  background: url(https://i.ibb.co/p4mtRVQ/banner.jpg); 
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
    background: rgba(156, 11, 11, 0.95);
    box-shadow: 0 10px 20px rgba(59, 11, 11, 0.95);
}

nav {
    margin-top: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    height:auto;
}

nav a {
    font: 1.2em/1em sans-serif;
    display: inline-block;
    padding: 10px 15px;
    float: right;
    text-decoration: none;
    color: white;
}

</style>

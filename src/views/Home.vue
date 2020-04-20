<template>
  <div class="home">
    <v-app-bar style="background-color:#8b0000;">
      <v-toolbar-title style="color:white;" class="font-weight-bold ml-0 pl-4">
        <span>Q-Fliqs</span>
      </v-toolbar-title>
      <v-spacer />
      
     
    </v-app-bar>

    <v-container grid-list-md text-xs-center>
    <v-layout row >

       <v-flex xs6 lg3 @click="getmovie(movie._id)" v-for="movie in movies" :key="movie._id">
         <v-hover>
    <template v-slot:default="{ hover }">
            <v-card>
            <img v-bind:src="'movie.imgPath'" width="100%">
             <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#8b0000"
          >
          <div align="center">
            <p style="color:white" class="title">{{ movie.title }}</p>
          </div>
          </v-overlay>
        </v-fade-transition>
          </v-card>
    </template>
         </v-hover>
      </v-flex>


    </v-layout>


    </v-container>


    <v-dialog persistent v-model="movieplay">
      <v-toolbar dark color="#8b0000">
      <v-btn icon dark @click="stopmovie">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ movie_title }}</v-toolbar-title>
      </v-toolbar>
      <video class="video-size"  controls>
  <source :src="movie_source" type="video/mp4">
</video>
    </v-dialog>


  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
    data(){
      return{
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 5,
          slidesPerGroup: 3,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        movieplay:false,
        isComponentModalActive:false,
        movie_source:'',
        movie_title:'',
        movies:null,
      }
    },
    mounted(){

        this.getmovies()
    },
    methods:{
        getmovies(){


            axios.get('http://62.8.92.158:4000/api/q-flix/movies').then( response => {

              this.movies =  response.data
              console.log("Movies" + this.movies[0])

            })
            
        },
        getmovie(id){


          this.$router.push({ name:'PlayMovie', params: { movie: id }})

        },
        stopmovie(){

          this.movie_source = '',
          this.movieplay = false
        }
    }
}
</script>

<style scoped>

.img-size{
  max-height:350px;
  max-width:190px;
}

.home{
  background-color: grey;
  height:100%;
}

.video-size{
  width:100%;
  height:98%;
  
}
</style>

<template>
<div class="register">
  <div class="video">

    <v-toolbar color="black" height="95px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
      <v-toolbar-items>
         <v-btn
          v-for="item in menu"
          :key="item.icon"
          @click="goBack()"
          :to="item.link"
        >{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container v-if="movie_source != ''">
        <video class="video-size"  controls>
            <source :src="movie_source" type="video/mp4">
            </video>
    </v-container>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted(){

    this.play()
  },
    data(){
        return{
          movie_source:'',
          menu: [
        { icon: 'home', title: 'Back' }
      ],
        }
    },

    methods:{
      play(){

        axios.get('http://62.8.71.129:8500/api/q-flix/get_movie/'+this.$route.params.movie).then(response => {

             this.movie_source = "http://62.8.71.129:8500/api/q-flix/play/"+response.data[0]._id
             console.log(this.movie_source)


          })

      },
      goBack(){

        this.$router.push('/')
      }
    }
}
</script>

<style scoped>

.register{
    background-image: url("https://storemedia.cineplex.com/ways-to-watch/background/desktop-waystowatch-bb.jpg");
    
    
    min-height:100vh;
    
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    overflow: hidden;
    flex: 1 0 auto;
}

.video{
  height:100%;
}

.video-size{
  width:100%;
  height:100%;
  
}
</style>
<template>
  <div class="video">
    <v-app-bar style="background-color:#8b0000;">
      <v-toolbar-title style="color:white;" class="font-weight-bold ml-0 pl-4">
        <span>Q-Fliqs</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-container v-if="movie_source != ''">
        <video class="video-size"  controls>
            <source :src="movie_source" type="video/mp4">
            </video>
    </v-container>
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
          movie_source:''
        }
    },

    methods:{
      play(){

        axios.get('http://62.8.92.158:4000/api/q-flix/get_movie/'+this.$route.params.movie).then(response => {

             this.movie_source = "http://62.8.92.158:4000/api/q-flix/play/"+response.data[0]._id
             console.log(this.movie_source)


          })

      }
    }
}
</script>

<style scoped>

.video{
  height:100%;
}

.video-size{
  width:100%;
  height:100%;
  
}
</style>
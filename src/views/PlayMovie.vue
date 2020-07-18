<template>
  <div class="video">

    <v-toolbar color="transparent" height="95px;">
      <img src="../../public/img/logo.png" height="90px">
      <v-spacer></v-spacer>
      <v-toolbar-items>
         <v-btn
          v-for="item in menu"
          :key="item.icon"
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
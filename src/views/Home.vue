<template>
  <div class="home">

    <v-toolbar color="black" height="95px;" v-if="user_status === 'signed in'">
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

    <v-toolbar color="black" height="95px;" v-if="user_status === 'not signed in'">
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

    <v-container ref="movies" grid-list-md style="margin-top:90px;color:white;">

      <div class="banner-ad">
  </div> 

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
                <v-text-field v-model="email_mobile" hide-details label="Email / Mobile" required></v-text-field>
                <v-text-field v-model="password" hide-details label="Password" type="password" required></v-text-field>
              </v-col>
              <v-btn block large color="black" @click="login_user" style="color:white;margin-bottom:5px;">SIGN IN</v-btn>
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
import { mapGetters, mapActions } from "vuex";

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

            axios.get('http://62.8.71.129:8500/api/q-flix/movies').then( response => {

              this.movies =  response.data
              console.log("Movies" + this.movies[0])

              this.loader.hide()


            })
            
        },
        check_status(){

          if(localStorage.getItem('sign_in_token') === null){

            this.user_status = 'not signed in'
            this.loader.hide()

          }else {

            this.user_status = 'signed in'
            this.loader.hide()
          }

        },
        menuItems () {
      return this.menu
    },
        getmovie(id){

          if(localStorage.getItem('verified_status') === 'true'){

            this.$router.push({ name:'PlayMovie', params: { movie: id }})

          } else if(localStorage.getItem('sign_in_token') === null){

                this.dialog = true

          } else if((localStorage.getItem('verified_status') === 'false')){

            this.$router.push('/verify-account')

          } else{

            this.dialog = true

          }

          

        },
        login_user(){

          this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.signin.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

          this.login({email_mobile:this.email_mobile,password:this.password})

        },
        signout(){

          this.loader = this.$loading.show({
                    // Optional parameters
                    color: '#ff0000',
                    container: this.$refs.signoff.$el,
                    canCancel:true,
                    width: 75,
                    height: 75,
                    opacity: 0.7,
                    
                  });

          this.signOut({email_mobile:localStorage.getItem('user_email_mobile')})

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

        }else{

          this.user_status = 'not signed in'
          this.check_status()

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

.banner-ad{
  height:150px;
  background: url(https://sevenbrands.com/wp-content/uploads/2018/07/Masoko-E-Commerce-Advertising-2-2400x1130.jpg); 
  background-repeat: no-repeat;
  background-size:1160px 150px;
  object-fit:contain;
}

.banner-ad-2{
  height:120px;
  background: url(https://urbankenyans.com/wp-content/uploads/2017/11/masoko-by-safaricom.jpg); 
  background-repeat: no-repeat;
  background-size:500px 120px;
  object-fit:contain;
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
    background: rgba(156, 11, 11, 0.95);
    box-shadow: 0 10px 20px rgba(59, 11, 11, 0.95);
}

</style>

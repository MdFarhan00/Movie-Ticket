const VenueSearch = {

    data() {
      return {
        venue: [],
        username: sessionStorage.getItem('username'),
        profile_img_url: sessionStorage.getItem('profile_img_url'),
        poster_url: '',
        searchString: this.$route.query.searchString,
      };
    },
    mounted() {
      this.showProfile();
    },
    methods: {
      async showProfile() {
        try {
          const token = sessionStorage.getItem("token");
          console.log(token)
          if (token==null)
          { window.alert("please login first");
            this.$router.push('/user_login')
            
          }
          const response = await fetch(`http://127.0.0.1:8080/user/venue_search?search_string=${this.searchString}`, {
            headers: {
               method: 'GET',
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          });
  
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch show details.");
          }
  
          const data = await response.json();
          console.log(data)
          this.venue = data.result;
          
        } catch (error) {
          console.error(error);
          
        }
      },
      async decodeBase64Image(profile_img_url) {
        console.log(profile_img_url)
  
        return profile_img_url
      },
      async decodeBase64Image(poster_url) {
        console.log(poster_url)
  
        return poster_url
      },
      
  
    },
    template: `
    <div class="dashboard">
    <div class="container">
    <nav>
      <ul>
        <li class="sidebar">
          <router-link to="/user_profile" class="logo">
            <div v-if="profile_img_url.length > 0">
              <img v-bind:src="profile_img_url">
            </div>
            <div v-else>
              <img src=../static/logo.png alt="">
            </div>
            <span class="nav-item">{{username}}</span>
          </router-link>
        </li>

        <li class="sidebar">
          <router-link to="/user_dashboard">
            <i class="fas fa-home"></i>
            <span class="nav-item">Home</span>
          </router-link>
        </li>

        <li class="sidebar">
          <router-link to="/user_profile">
            <i class="fas fa-user"></i>
            <span class="nav-item">Profile</span>
          </router-link>
        </li>

        <li class="sidebar">
          <router-link to="/get_shows">
            <i class="fas fa-file-video"></i>
            <span class="nav-item">Shows</span>
          </router-link>
        </li>

        <li class="sidebar">
        <router-link to="/get_venues">
          <i class="fas fa fa-location-arrow"></i>
          <span class="nav-item">Venues</span>
        </router-link>
      </li>

        <li class="sidebar">
          <router-link to="/booking_history">
            <i class="fas fa fa-ticket"></i>
            <span class="nav-item">Booking History</span>
          </router-link>
        </li>

        <li class="sidebar">
          <router-link to="/user_edit_prof">
            <i class="fas fa-cogs"></i>
            <span class="nav-item">Settings</span>
          </router-link>
        </li>

       
        <li class="sidebar">
          <router-link to="/login" class="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="nav-item">Logout</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <section class="main">
      <div class="main-top">
        <router-link to="/user_edit_prof">
          <i class="fas fa-user-cog"></i>
        </router-link>
        <div class="search-bar">
          <input type="text" placeholder="Search for venues" v-model="searchString">
          <router-link :to="{ path: '/venue_search', query: { searchString: searchString } }"><button><i class="fas fa-search">  Search</i></button></router-link>
        </div>
      </div>
      <br>

        
      <section class="main-course">
      <h1>Venues</h1>
      <div class="course-box">
        <div class="course2">
          <div class="boxs2" v-for="(venue, index) in venue" :key="index">
            
            <div class="poster2">
            <h4>{{venue.venue_name}}:</h4><br><br>
              <img src="../static/venues.jpg"></img>
            </div>
            <router-link :to="{ path: '/venue_shows', query: { venue_id: venue.venue_id } }"><button>Visit</button></router-link>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/farhan17/" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="https://github.com/MdFarhan00" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-github"></i>
          </a>
          <a href="https://www.instagram.com/zeroyd_2000/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">Version 1.0.0</a>
          
          <!-- Add more social media icons as needed -->
        </div>
      </footer>
    </section>
      

    </section>

  </div>
  </div>

    
   
  `
  };
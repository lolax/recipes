<template>
  <div id="app">
    <div v-if="validated" class="nav">
      <router-link class="link" to="/recipes">Recipes</router-link>
      <router-link class="link" to="/new">New</router-link>
      <div class="link" @click="logout">Logout</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase'
  require('firebase/auth')

  export default {
    name: "app",
    data() {
      return {
        validated: false,
      }
    },
    mounted() {
      if (localStorage.getItem('token')) {
        this.validated = true
      }
    },
    methods: {
      logout() {
        firebase
        .auth()
        .signOut()
        .then(
          () => {
            this.$router.push("/")
            this.validated = false
            localStorage.clear()
          },
          () => alert(err.message)
        )
      },
    }
  }
</script>

<style>
  body {
    background: #3C5A95;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0;
  }
  .nav {
    width: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .link {
    width: 50px;
    margin: 0 20px;
    border: 1px solid #3C5A95;
    text-decoration: none;
    color: white;
    background: transparent;
    padding: 15px;
    -webkit-box-shadow: 0;
    -moz-box-shadow: 0;
    box-shadow: 0;
    cursor: pointer;
    outline: none;
  }
  .link:hover {
    background: white;
    color: black;
    border: 1px solid black;
    -webkit-box-shadow: 0 0 1px 1px lightgrey;
    -moz-box-shadow: 0 0 1px 1px lightgrey;
    box-shadow: 0 0 1px 1px lightgrey;
  }
  @media (max-width: 500px) {
    .nav {
      width: 90%;
      margin: auto;
    }
    .link {
      margin: 0 10px;
    }
  }
</style>

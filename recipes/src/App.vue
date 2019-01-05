<template>
  <div id="app">
    <div class="nav">
      <router-link class="link" to="/recipes">Recipes</router-link>
      <router-link class="link" to="/new">New Recipe</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  margin: 0;
}
.nav {
  width: 100%;
  background: lavender;
  padding: 40px 0;
}
.link {
  display: inline-block;
  width: 100px;
  margin: 0 20px;
  border: 1px solid lavender;
  text-decoration: none;
  color: black;
  background: white;
  padding: 15px;
  outline: 0;
  outline-offset: 0;
  transition: 200ms;
}
.link:hover {
  border: 1px solid black;
  outline: 1px solid black;
  outline-offset: 5px;
  transition: 200ms;
}
</style>

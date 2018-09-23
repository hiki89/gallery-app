<template>
  <div class="app">
    <NavBar :isAuthenticated="isAuthenticated" @userAuthenticated="toggleAuthenticated"/>
    <router-view @userAuthenticated="toggleAuthenticated"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import { auth } from './services/AuthService'

export default {
  name: 'app',
  components: {
    NavBar
  },

  data() {
    return {
      isAuthenticated: auth.isAuthenticated()
    }
  },

  methods: {
    toggleAuthenticated(value) {
      this.isAuthenticated = value;
    }
  }
}
</script>

<style>
.app {
  background-color: #eceaff;
}
</style>

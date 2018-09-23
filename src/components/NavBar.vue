<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" :to="{name:'all-galleries'}">Gallery App</router-link>
        <div class="navbar-nav">
            <router-link class="nav-item nav-link" :to="{name:'all-galleries'}">All Galleries</router-link>
            <router-link class="nav-item nav-link" to="/login" v-if="!isAuthenticated">Login</router-link>
            <router-link class="nav-item nav-link" to="/register" v-if="!isAuthenticated">Register</router-link>
            <router-link class="nav-item nav-link" to="/my-galleries" v-if="isAuthenticated">My Galleries</router-link>
            <router-link class="nav-item nav-link" to="/create" v-if="isAuthenticated">Create New Gallery</router-link>
            <a href="#" class="nav-item nav-link" @click="logout" v-if="isAuthenticated">Logout</a>
        </div>
    </nav>
</template>

<script>
import { auth } from './../services/AuthService'

export default {
    props: {
        isAuthenticated: Boolean
    },

    methods: {
        logout() {
            auth.logout()
            this.$emit('userAuthenticated', false)
            this.$router.push({ name: 'all-galleries' })
        }
    }
}
</script>

<style>
.navbar {
    margin-bottom: 15px;
}
</style>


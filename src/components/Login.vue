<template>
    <div class="container">
        <h3>Login</h3>
        <form @submit.prevent="login()">
            <div class="form-group row">
                <label for="email" class="col-4 col-form-label">Email:</label> 
                <div class="col-8">
                <div class="input-group">
                    <input id="email" type="email" class="form-control" v-model="email" required>
                </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-4 col-form-label">Password:</label> 
                <div class="col-8">
                <div class="input-group">
                    <input id="password" type="password" class="form-control" v-model="password" required>
                </div>
                </div>
            </div>
            <p class="alert alert-danger" v-if="errors">{{errors}}</p>

            <button type="submit" class="btn btn-primary">Log in</button>
        </form>
    </div>
</template>

<script>
import { auth } from './../services/AuthService'

export default {
    data() {
        return {
            email: '',
            password: '',
            errors: ''
        }
    },

    methods: {
        login() {
            auth.login(this.email, this.password)
            .then(() => {
                this.$emit('userAuthenticated', true)
                this.$router.push('/')
            })
            .catch(error => {
                this.errors = "Email or password are incorrect"
            })
        }
    }
}
</script>


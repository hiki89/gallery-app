<template>
    <div class="container">
        <h3>Register</h3>
        <form @submit.prevent="register()">
        <div class="form-group row">
            <label for="first_name" class="col-4 col-form-label">First name:</label> 
            <div class="col-8">
            <div class="input-group">
                <input id="first_name" type="text" class="form-control" v-model="newUser.first_name" required>
                <p class="alert alert-danger" role="alert" v-if="errors.first_name">{{errors.first_name[0]}}</p>
            </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="last_name" class="col-4 col-form-label">Last name:</label> 
            <div class="col-8">
            <div class="input-group">
                <input id="last_name" type="text" class="form-control" v-model="newUser.last_name" required>
                <p class="alert alert-danger" role="alert" v-if="errors.last_name">{{errors.last_name[0]}}</p>
            </div>
            </div>
        </div> 
        <div class="form-group row">
            <label for="email" class="col-4 col-form-label">Email:</label> 
            <div class="col-8">
            <div class="input-group">
                <input id="email" type="email" class="form-control" v-model="newUser.email" required>
                <p class="alert alert-danger" role="alert" v-if="errors.email">{{errors.email[0]}}</p>
            </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="password" class="col-4 col-form-label">Password:</label> 
            <div class="col-8">
            <div class="input-group">
                <input id="password" type="password" class="form-control" v-model="newUser.password" required>
            </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="password_confirmation" class="col-4 col-form-label">Confirm password:</label> 
            <div class="col-8">
            <div class="input-group">
                <input id="password_confirmation" type="password" class="form-control" v-model="newUser.password_confirmation" required>
                <p class="alert alert-danger" role="alert" v-if="errors.password">Password must have at least 8 characters including at least one number</p>
            </div>
            </div>
        </div>
        <div class="form-fields">
            <label for="terms_accepted" class="ol-form-label">I accept terms and conditions</label>
            <input v-model="newUser.terms_accepted" class="checkbox" id="terms_accepted" type="checkbox" name="terms_accepted" value="1" required>
            <p class="alert alert-danger" role="alert" v-if="errors.terms_accepted">{{errors.terms_accepted[0]}}</p>
        </div>
        <div class="form-group row">
            <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary">Register</button>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
import { auth } from './../services/AuthService'

export default {
    data() {
        return {
            newUser: {},
            errors: []
        }
    },

    methods: {
        register() {
            auth.register(this.newUser)
            .then(() => {
                this.$emit('userAuthenticated', true)
                this.$router.push('/')
            })
            .catch(error => {
                this.errors = error.response.data.errors
            })
        }
    }
}
</script>

<style scoped>
.ol-form-label {
    margin-right: 170px;
}
.checkbox {
    width: 20px;
    height: 20px;
}
</style>


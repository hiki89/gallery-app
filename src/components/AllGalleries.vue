<template>
    <div class="container">
        <div class="content" v-if="galleries.length !== 0" v-for="(gallery, index) in galleries" :key="index">
            <img :src="gallery.images[0].image_url" >
            <div>
                <h4><router-link :to="{name: 'single-gallery', params: {id: gallery.id}}">{{ gallery.title }}</router-link></h4>
                <h6>Author - <router-link :to="{name: 'author-galleries', params: {id: gallery.user.id}}">{{ gallery.user.first_name }} {{ gallery.user.last_name }}</router-link></h6>
                <p>Created at: {{ gallery.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <p>No galleries found</p>
        </div>
    </div>
</template>

<script>
import { galleriesService } from './../services/GalleryService'

export default {
    data() {
        return {
            galleries: []
        }
    },

    beforeRouteEnter(to, from, next) {
        galleriesService.getAll()
        .then(response => {
            next(vm => {
                vm.galleries = response.data
            })
        })
    }
}
</script>

<style scoped>
img {
    width:720px;
    border-radius: 50px; 
}
.container {
    width: 720px;
    margin: auto;
}
.container a {
    text-decoration: none;
}
.content {
    width: 720px;
    background-color: lightgray;
    text-align: center;
    border-radius: 50px;
}
</style>



<template>
    <div>
        <div v-if="galleries.length !== 0">
            <div v-for="(gallery, index) in galleries" :key="index">
                <img :src="gallery.images[0].image_url">
                <div>
                    <h4>{{ gallery.title }}</h4>
                    <p>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
                    <p>{{ gallery.created_at }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>There are no galleries...</p>
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

    created() {
        galleriesService.getAll()
        .then(response => {
            this.galleries = response.data
        })
    }
}
</script>


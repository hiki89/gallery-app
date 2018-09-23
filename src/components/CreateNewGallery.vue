<template>
    <div class="container">
        <h2>Create new gallery</h2>
        <form @submit.prevent="addNewGallery">
            <div class="form-group row">
                <label for="title" class="col-4 col-form-label">Title:</label> 
                <div class="col-8">
                <div class="input-group">
                    <input id="title" type="title" placeholder="Enter your title" class="form-control" v-model="newGallery.title" required>
                </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="description" class="col-4 col-form-label">Description:</label> 
                <div class="col-8">
                <div class="input-group">
                    <textarea id="description" placeholder="Enter your description" class="form-control" v-model="newGallery.description"></textarea>
                </div>
                </div>
            </div>
            <div class="form-group row" v-for="(number, index) in rowNumber" :key="index">
                <label id="image_url" class="col-4 col-form-label">Image:</label> 
                <input id="image_url" placeholder="Enter your image URL" class="form-control" v-model="newGallery.images[index]" required>
                <p class="alert alert-danger" role="alert" v-if="error">{{error}}</p>
                <button class="btn btn-secondary" type="button" v-if="rowNumber > 1" @click="removeRow(index)">Delete image</button>
                <button class="btn btn-success" type="button" v-if="rowNumber > 1" @click="moveImageUp(index)"><i class="up"></i></button>
                <button class="btn btn-danger" type="button" v-if="rowNumber > 1" @click="moveImageDown(index)"><i class="down"></i></button>
            </div>
            <button class="btn btn-secondary" type="button" @click="addRow">Add image</button>

            <div class="form-group row">
                <div class="offset-4 col-8">
                    <button name="submit" type="submit" class="btn btn-primary">Submit gallery</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { galleriesService } from './../services/GalleryService'
import { auth } from './../services/AuthService'

export default {
    data() {
        return {
            newGallery: {
                title: '',
                description: '',
                images: []
            },
            rowNumber: 1,
            error: ''
        }
    },
    
    methods: {
        addNewGallery() {
            this.newGallery.user_id = auth.getUserId()
            galleriesService.addGallery(this.newGallery)
            .then(response => {
                this.$router.push('/')
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        },

        addRow() {
            this.rowNumber++
        },

        removeRow(place) {
            this.newGallery.images.splice(place, 1)
            this.rowNumber--
        },

        moveImageUp(index) {
            if(index >= 1) {
                this.newGallery.images.splice(index - 1, 0, this.newGallery.images.splice(index, 1))
            }
        },
        
        moveImageDown(index) {
            if(index < this.newGallery.images.length) {
                this.newGallery.images.splice(index, 0, this.newGallery.images.splice(index + 1, 1))
            }
        }
    }
}
</script>

<style scoped>
.btn-primary {
    width: 200px;
    height: 35px;
    margin-bottom: 20px;
}
i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}
.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
</style>



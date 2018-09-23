<template>
    <div class="container">
        <div class="jumbotron">
            <div class="container text-center">
                <h4>{{gallery.title}}</h4>      
                <h6 v-if="gallery.user">Author: 
                    <router-link :to="{name: 'author-galleries', params: {id: gallery.user.id}}">
                        {{gallery.user.first_name}} {{gallery.user.last_name}}
                    </router-link>
                </h6>
                <p>{{gallery.description}}</p>
        
                <carousel class="carousel" :gallery="gallery"/>
            </div>
        </div>

        <h4>Comments</h4>
        <div class="col-sm-8" v-for="(comment, index) in gallery.comments" :key="index">
            <div class="panel panel-white post panel-shadow">
                <div class="post-heading">
                    <div class="pull-left meta">
                        <div class="title h5">
                            <p>Author: {{comment.user.first_name}} {{comment.user.last_name}}</p>
                        </div>
                        <h6 class="text-muted time">Created at: {{ comment.created_at }}</h6>
                    </div>
                </div> 
                <div class="post-description"> 
                    <p>{{ comment.comment }}</p>
                </div>
                <button class="btn btn-dark" v-if="userId == gallery.comments[index].user_id" @click="deleteComment(comment.id, index)">Delete comment</button>
            </div>
        </div><br>

        <div>
            <form @submit.prevent="AddNewComment">
                <div class="form-group row">
                    <label for="comment" class="col-4 col-form-label">Your comment:</label> 
                    <div class="col-8">
                        <div class="input-group">
                            <textarea id="comment" placeholder="Enter your comment" class="form-control" v-model="newComment.comment" required></textarea>
                        </div>
                        <div class="offset-4 col-8">
                            <button name="submit" type="submit" class="btn btn-primary">Post comment</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <button class="btn btn-danger" v-if="userId == gallery.user_id" @click="deleteGallery(gallery.id)">Delete this gallery</button>
    </div>
</template>

<script>
import { galleriesService } from './../services/GalleryService'
import { auth } from './../services/AuthService'
import { commentsService } from './../services/CommentService'
import Carousel from './Carousel'

export default {
    components: {
        Carousel
    },
    data() {
        return {
            gallery: {},
            userId: '',
            errors: [],
            newComment: {
                comment: '',
                gallery_id: '',
                user_id: ''
            }
        }
    },

    beforeRouteEnter(to, from, next) {
        galleriesService.getSingleGallery(to.params.id)
        .then(response => {
            next(vm => {
                vm.gallery = response.data
                vm.userId = auth.getUserId()
            })
        })
        .catch(error => {
            this.errors = error.response.data.errors
        })
    },

    methods: {
        deleteComment(id, index) {
            if(confirm("This comment is going to be deleted. Are you sure?")) {
                commentsService.removeComment(id)
                .then(response => {
                    this.gallery.comments.splice(index, 1)
                })
            }
        },

        AddNewComment() {
            this.newComment.gallery_id = this.gallery.id
            this.newComment.user_id = auth.getUserId()
            commentsService.addComment(this.newComment)
            .then(response => {
                this.gallery.comments.push(response.data)
                this.newComment = {}
            })
            .catch(error => {
                this.errors = error.response.data.errors
            })
        },

        deleteGallery(id) {
            if(confirm("Are you sure you want to delete this gallery?")) {
                galleriesService.removeGallery(id)
                .then(response => {
                    this.$router.push('/my-galleries')
                })
            }
        }
    }
}
</script>

<style scoped>

.panel-shadow {
    box-shadow: rgba(0, 0, 0, 0.3) 7px 7px 7px;
}
.panel-white {
  border: 1px solid #dddddd;
}
.panel-white  .panel-heading {
  color: #333;
  background-color: #fff;
  border-color: #ddd;
}
.panel-white  .panel-footer {
  background-color: #fff;
  border-color: #ddd;
}
.post .post-heading {
  height: 95px;
  padding: 20px 15px;
}
.post .post-heading .avatar {
  width: 60px;
  height: 60px;
  display: block;
  margin-right: 15px;
}
.post .post-heading .meta .title {
  margin-bottom: 0;
}
.post .post-heading .meta .title a {
  color: black;
}
.post .post-heading .meta .title a:hover {
  color: #aaaaaa;
}
.post .post-heading .meta .time {
  margin-top: 8px;
  color: #999;
}
.post .post-image .image {
  width: 100%;
  height: auto;
}
.post .post-description {
    word-wrap: break-word;
  padding: 15px;
}
.post .post-description p {
  font-size: 14px;
}
.post .post-description .stats {
  margin-top: 20px;
}
.post .post-description .stats .stat-item {
  display: inline-block;
  margin-right: 15px;
}
.post .post-description .stats .stat-item .icon {
  margin-right: 8px;
}
.post .post-footer {
  border-top: 1px solid #ddd;
  padding: 15px;
}
.post .post-footer .input-group-addon a {
  color: #454545;
}
.post .post-footer .comments-list {
  padding: 0;
  margin-top: 20px;
  list-style-type: none;
}
.post .post-footer .comments-list .comment {
  display: block;
  width: 100%;
  margin: 20px 0;
}
.post .post-footer .comments-list .comment .avatar {
  width: 35px;
  height: 35px;
}
.post .post-footer .comments-list .comment .comment-heading {
  display: block;
  width: 100%;
}
.post .post-footer .comments-list .comment .comment-heading .user {
  font-size: 14px;
  font-weight: bold;
  display: inline;
  margin-right: 10px;
}
.post .post-footer .comments-list .comment .comment-heading .time {
  font-size: 12px;
  color: #aaa;
  display: inline;
}
.post .post-footer .comments-list .comment .comment-body {
  margin-left: 50px;
}
.post .post-footer .comments-list .comment > .comments-list {
  margin-left: 50px;
}
.btn-dark {
    height: 35px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.carousel {
    box-shadow: 10px 10px 5px;
}
.btn-danger {
    margin-bottom: 30px;
}

</style>


import axios from 'axios'

export default class Comment {
    constructor () {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    addComment(comment) {
        return axios.post('comments', comment)
    }

    removeComment(id) {
        return axios.delete(`comments/${id}`)
    }
}

export const commentsService = new Comment()
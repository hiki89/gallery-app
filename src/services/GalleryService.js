import axios from 'axios'

export default class Galleries {
    constructor () {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getAll() {
        return axios.get('galleries')
    }

    getMyGalleries() {
        return axios.get(`auth/my-galleries`)
    }

    getAuthorGalleries(id) {
        return axios.get(`auth/author/${id}`)
    }

    getSingleGallery(id) {
        return axios.get(`auth/galleries/${id}`)
    }

    addGallery(gallery) {
        return axios.post('galleries', gallery)
    }

    removeGallery(id) {
        return axios.delete(`galleries/${id}`)
    }
}

export const galleriesService = new Galleries()
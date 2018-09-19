import axios from 'axios'

export default class Auth {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/';
        this.setAuthorizationHeader();
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    setAuthorizationHeader() {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    register(user) {
        return axios.post('auth/register', user)
        .then(response => {
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            this.setAuthorizationHeader();
        });
    }

    login(email, password) {
        return axios.post('auth/login', {email, password})
        .then(response => {
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            this.setAuthorizationHeader();
        });
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export const auth = new Auth();
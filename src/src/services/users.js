import axios from 'axios'
import storage from './storage.js'

const baseUrl = '/api/users'

const getAll = (token) => {
    const request = axios.get(baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const getMe = (token) => {
    const request = axios.get(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const loginUser = (user, rememberMe) => {
    let request
    if(! rememberMe) {
        request = axios.post(`${baseUrl}/login`,user)
    } else {
        request = axios.post(`${baseUrl}/login/remember`, user)
    }
    return request.then(response => response.data)
}

const loginViaRememberMe = (token) => {
    const request = axios.get(`${baseUrl}/login`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const loginRememberThenRefresh = (history) => {
    let token = storage.getToken()
    if(token !== undefined && !storage.getUser()) {
        //remember me token found & no session user
        loginViaRememberMe(token).then((response) => {
            storage.storeUser(response.user)
            storage.storeToken(response.token, true)
            history.push(document.location.pathname)
        })
    }
}

const signUpUser = (user) => {
    const request = axios.post(baseUrl,user)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const addInterest = (categoryId, token) => {
    const request = axios.post(`${baseUrl}/me/interests/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

const removeInterest = (categoryId, token) => {
    const request = axios.delete(`${baseUrl}/me/interests/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

const ban = (userId, token) => {
    const request = axios.put(`${baseUrl}/ban/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

const unban = (userId, token) => {
    const request = axios.put(`${baseUrl}/unban/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
        .catch(err => {
            console.log(err)
        })
}

const getPhoto = (userId) => {
    const request = axios.get(`http://localhost:3000/api/userPhoto/${userId}`)
    return request.then(response => response.data)
}

export default {getAll, getMe, loginUser, loginViaRememberMe,
     getById, signUpUser, addInterest, removeInterest, ban, unban, getPhoto}

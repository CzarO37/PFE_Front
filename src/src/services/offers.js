import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/offers'

const getFromMe = (token) => {
    const request = axios.get(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

const getForMe = (token) => {
    const request = axios.get(`${baseUrl}/me/asSeller`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return request.then(response => response.data)
}

export default {getFromMe, getForMe}